#!/usr/bin/env python3
"""Extract lightweight reference metadata from social/video URLs.

Usage examples:
  .venv/bin/python tools/extract_reference_metadata.py links.txt
  .venv/bin/python tools/extract_reference_metadata.py links.txt --csv refs.csv
  .venv/bin/python tools/extract_reference_metadata.py https://www.youtube.com/watch?v=...
"""

from __future__ import annotations

import argparse
import csv
import json
import re
import sys
import time
from pathlib import Path
from typing import Any

import yt_dlp


URL_RE = re.compile(r"https?://[^\s\"'`)]+")


def normalize_url(url: str) -> str:
    url = url.strip().rstrip(".,")
    url = url.replace("?lang=tr-TR", "")
    url = url.replace("?img_index=8", "")
    return url


def collect_urls(inputs: list[str]) -> list[str]:
    urls: list[str] = []

    for item in inputs:
        path = Path(item)
        text = path.read_text(encoding="utf-8") if path.exists() else item
        urls.extend(normalize_url(match.group(0)) for match in URL_RE.finditer(text))

    seen: set[str] = set()
    unique_urls: list[str] = []
    for url in urls:
        if url not in seen:
            seen.add(url)
            unique_urls.append(url)

    return unique_urls


def simplify_info(url: str, info: dict[str, Any] | None, error: str | None = None) -> dict[str, Any]:
    if not info:
        return {"source_url": url, "ok": False, "error": error or "No metadata returned"}

    return {
        "source_url": url,
        "ok": True,
        "extractor": info.get("extractor_key") or info.get("extractor"),
        "id": info.get("id"),
        "webpage_url": info.get("webpage_url") or url,
        "title": info.get("title"),
        "description": info.get("description"),
        "uploader": info.get("uploader"),
        "uploader_id": info.get("uploader_id"),
        "channel": info.get("channel"),
        "duration": info.get("duration"),
        "timestamp": info.get("timestamp"),
        "upload_date": info.get("upload_date"),
        "view_count": info.get("view_count"),
        "like_count": info.get("like_count"),
        "comment_count": info.get("comment_count"),
        "repost_count": info.get("repost_count"),
        "thumbnail": info.get("thumbnail"),
        "tags": info.get("tags") or [],
        "categories": info.get("categories") or [],
    }


def csv_value(value: Any) -> str:
    if isinstance(value, (list, dict)):
        return json.dumps(value, ensure_ascii=False)
    if value is None:
        return ""
    return str(value)


def write_csv(path: Path, rows: list[dict[str, Any]]) -> None:
    fieldnames = [
        "ok",
        "source_url",
        "extractor",
        "id",
        "title",
        "description",
        "uploader",
        "uploader_id",
        "channel",
        "duration",
        "timestamp",
        "upload_date",
        "view_count",
        "like_count",
        "comment_count",
        "repost_count",
        "thumbnail",
        "tags",
        "categories",
        "webpage_url",
        "error",
    ]

    with path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        for row in rows:
            writer.writerow({field: csv_value(row.get(field)) for field in fieldnames})


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Extract metadata from reference URLs with yt-dlp.")
    parser.add_argument("inputs", nargs="+", help="URL(s) or text file path(s) containing URLs.")
    parser.add_argument("--output", "-o", default="reference_metadata.json", help="JSON output path.")
    parser.add_argument("--csv", default=None, help="Optional CSV output path.")
    parser.add_argument("--limit", type=int, default=None, help="Only process the first N unique URLs.")
    parser.add_argument("--sleep", type=float, default=0.5, help="Seconds to sleep between URLs.")
    parser.add_argument("--cookies", default=None, help="Netscape cookies.txt path for sites that need cookies.")
    parser.add_argument(
        "--cookies-from-browser",
        default=None,
        help="Browser name for yt-dlp cookie import, e.g. chrome, chromium, firefox.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    urls = collect_urls(args.inputs)

    if args.limit:
        urls = urls[: args.limit]

    if not urls:
        print("No URLs found.", file=sys.stderr)
        return 1

    ydl_opts: dict[str, Any] = {
        "quiet": True,
        "no_warnings": True,
        "skip_download": True,
        "noplaylist": True,
        "ignoreerrors": False,
    }
    if args.cookies:
        ydl_opts["cookiefile"] = args.cookies
    if args.cookies_from_browser:
        ydl_opts["cookiesfrombrowser"] = (args.cookies_from_browser,)

    results: list[dict[str, Any]] = []
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        for index, url in enumerate(urls, start=1):
            print(f"[{index}/{len(urls)}] {url}", file=sys.stderr)
            try:
                info = ydl.extract_info(url, download=False)
                results.append(simplify_info(url, info))
            except Exception as exc:  # yt-dlp raises extractor-specific exceptions.
                results.append(simplify_info(url, None, str(exc)))
            if args.sleep and index < len(urls):
                time.sleep(args.sleep)

    output_path = Path(args.output)
    output_path.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")

    if args.csv:
        write_csv(Path(args.csv), results)

    ok_count = sum(1 for row in results if row.get("ok"))
    print(f"Done. {ok_count}/{len(results)} URLs extracted. JSON: {output_path}", file=sys.stderr)
    if args.csv:
        print(f"CSV: {args.csv}", file=sys.stderr)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
