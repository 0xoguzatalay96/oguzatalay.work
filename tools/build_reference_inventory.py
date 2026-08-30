#!/usr/bin/env python3
"""Build a brand/campaign reference inventory from extracted metadata."""

from __future__ import annotations

import json
from collections import defaultdict
from pathlib import Path
from typing import Any
from urllib.parse import urlsplit, urlunsplit


HOMEPAGE_BRANDS = {"Migros", "DeFacto", "adidas Originals", "Koton", "Yuga Labs", "HP Omen", "ASUS", "Eti"}

EXACT_RULES = {
    "G7yRuhrMNyA": ("Migros", "Pizza Mi-go! / Danilo Şef", "migros-campaigns"),
    "mqi0DQ8OnWs": ("Koton", "#EtiketleriÇıkar / Şimdi Herkese Saygı Moda", "koton"),
    "3RR9kIwoUKQ": ("MSI", "Creator YouTube Integration", ""),
    "E17ui7kJisY": ("Lenovo", "Lenovo Game On", ""),
    "XWTU0JOG1_w": ("HP Omen", "OMEN by HP / GIST", "hp-omen"),
    "JgEEKhsTeeY": ("HP Omen", "OMEN by HP Creator Integrations", "hp-omen"),
    "ntHH_he1iRA": ("HP Omen", "OMEN by HP Creator Integrations", "hp-omen"),
    "pkVRyExtafc": ("HP Omen", "OMEN by HP Creator Integrations", "hp-omen"),
    "I8G9adrIyVM": ("HP Omen", "OMEN by HP League of Legends Challenge", "hp-omen"),
    "EBqgPNVCshw": ("Red Bull", "GIST 2020 / Creator Event Content", "redbull-events"),
    "5uZxqmt1KQQ": ("HyperX", "GIST / Creator YouTube Integrations", ""),
    "ETNhFdSdy94": ("HyperX", "GIST / Creator YouTube Integrations", ""),
    "t54CwjRDwxo": ("NVIDIA", "Minecraft RTX Edition - Türkiye ve MENA Lansmanı", ""),
    "w_AbJRRyzrA": ("ASUS", "ASUS Creator/Product Integrations", ""),
    "3uzfOzHWcXo": ("ASUS", "ASUS Creator/Product Integrations", ""),
    "I8cnf5bYTTQ": ("ASUS", "ASUS ROG Partisi 2019", "asus-rog-party"),
    "hE__Eh5aPYc": ("ASUS", "ASUS ROG Events", ""),
    "1306497386049138": ("ASUS", "ASUS Radeon CS:GO Tournament", ""),
    "754543195419227": ("Pasha Fencer", "Pasha Fencer Content Reference", ""),
    "1496170254153756675": ("Metafluence", "Final Report / 80+ Early Residents & 45M Audience", "metafluence-launch"),
    "1819071193603101132": ("Yuga Labs", "Project Dragon / Otherside", "yuga-labs-dragon"),
    "6912033546358033666": ("Canga", "#CangaDuet", ""),
}

MANUAL_METADATA = {
    "https://www.instagram.com/p/CSo0K3Fim_A/": {
        "title": "Pizza Mi-go! - Migros",
        "description": "Migros Pizza Mi-go! campaign reference.",
    },
    "https://www.tiktok.com/@migros_turkiye/video/6945872170736258305": {
        "title": "Migros #PizzaMiGo - Danilo Şef",
        "description": "Danilo Şef ile Migros #PizzaMiGo TikTok reference.",
    },
    "https://playtoearn.com/news/otherside-unveils-project-dragon-first-battle-to-kick-off-on-july-27th": {
        "title": "Yuga Labs / Otherside - Project Dragon",
        "description": "Otherside Project Dragon first battle reference for Yuga Labs.",
    },
    "https://x.com/metafluence/status/1496170254153756675": {
        "title": "Metafluence Final Report - 80+ Early Residents / 45M Audience",
        "description": "Final-report style visual highlighting 80+ early residents and 45M audience.",
    },
    "https://www.instagram.com/p/B8eDINiniNX/": {
        "title": "NVIDIA Türkiye - Minecraft RTX Edition Lansmanı",
        "description": "Minecraft RTX Edition launch reference for Türkiye and the MENA region.",
    },
}


def has_any(text: str, needles: list[str]) -> bool:
    return any(needle in text for needle in needles)


def canonical_url(url: str) -> str:
    parts = urlsplit(url)
    path = parts.path
    if path and not path.endswith("/"):
        path += "/"
    return urlunsplit((parts.scheme, parts.netloc, path, "", ""))


def manual_metadata_for(url: str) -> dict[str, str]:
    return MANUAL_METADATA.get(url) or MANUAL_METADATA.get(canonical_url(url)) or {}


def classify(row: dict[str, Any]) -> dict[str, str]:
    url = row["source_url"]
    text = f"{url} {row.get('title') or ''} {row.get('description') or ''}".lower()

    brand = "Unassigned"
    campaign = "General Reference"
    card_id = ""

    for token, rule in EXACT_RULES.items():
        if token.lower() in text:
            brand, campaign, card_id = rule
            break

    if brand != "Unassigned":
        pass
    elif "migros_turkiye" in text or has_any(text, ["cso0k3fim_a", "cwbesxcsern", "ctzpqzhoq0l"]):
        brand = "Migros"
        card_id = "migros-campaigns"
        if has_any(text, ["6923115888245869826", "6922742736273657090", "6923115583168990466", "6923116215221128449", "reyon savaş"]):
            campaign = "Reyon Savaşları"
        elif has_any(text, ["6945872170736258305", "g7yruhrmnya", "cso0k3fim_a", "cwbesxcsern", "ctzpqzhoq0l", "pizzami-go", "pizza mi-go", "danilo"]):
            campaign = "Pizza Mi-go! / Danilo Şef"
        elif has_any(text, ["6907163900156857601", "6907157474218888450", "yılbaşı", "2021 heyecan"]):
            campaign = "Yılbaşı Retail / TikTok"
        elif "6946590696677657857" in text or "migros hemen" in text:
            campaign = "Migros Hemen"
    elif "defacto" in text:
        brand = "DeFacto"
        card_id = "defacto-tiktok"
        if has_any(text, ["yılba", "6906890715075267842", "6907153549046598914", "6907590367110040834", "6907175149313838337"]):
            campaign = "Yılbaşı / Homewear TikTok Series"
        elif has_any(text, ["sevgililer", "6925106754716060929"]):
            campaign = "Sevgililer Günü / TikTok"
        elif has_any(text, ["cool", "6951043962614353153"]):
            campaign = "DeFacto COOL"
        else:
            campaign = "Havalı ve Rahat / Creator TikTok Series"
    elif has_any(text, ["mqi0dq8onws", "kotoncom", "@cellat36", "etikleriçıkar", "etiklericikar", "koton"]):
        brand = "Koton"
        card_id = "koton"
        campaign = "#EtiketleriÇıkar / Şimdi Herkese Saygı Moda"
    elif "realmeturkey" in text or "realme" in text:
        brand = "Realme"
        campaign = "Realme 5i TikTok Product Integration"
    elif has_any(text, ["cangaduet", "canga"]):
        brand = "Canga"
        campaign = "#CangaDuet"
    elif "mutlulukdeninceakla" in text or has_any(text, ["eticin", "eti puf", "eti benim"]):
        brand = "Eti"
        card_id = "eti-challenges"
        if has_any(text, ["6911335832951606529", "puf", "müzik akademisi"]):
            campaign = "Eti Puf Müzik Akademisi"
        elif has_any(text, ["6912807511548513537", "6912818584947379457", "benim"]):
            campaign = "Eti Benim'O Social Good"
        else:
            campaign = "Eti Cin #eticinlegülümse"
    elif "msi" in text:
        brand = "MSI"
        campaign = "Creator YouTube Integration"
    elif "lenovo" in text:
        brand = "Lenovo"
        campaign = "Lenovo Game On"
    elif has_any(text, ["omen", "hp "]):
        brand = "HP Omen"
        card_id = "hp-omen"
        if "league of legends challenge" in text:
            campaign = "OMEN by HP League of Legends Challenge"
        elif "gist" in text:
            campaign = "OMEN by HP / GIST"
        else:
            campaign = "OMEN by HP Creator Integrations"
    elif has_any(text, ["redbull.com", "red bull", "527409779", "544076837", "545694430", "ebqgpnvcshw", "hurriyet.com.tr"]):
        brand = "Red Bull"
        card_id = "redbull-events"
        if has_any(text, ["527409779", "meo"]):
            campaign = "Red Bull MEO 2. Sezon"
        elif has_any(text, ["544076837", "545694430", "counter-strike", "cs:go"]):
            campaign = "GIST CS:GO Special Broadcast"
        elif "flick" in text:
            campaign = "Red Bull Flick / GIST"
        else:
            campaign = "GIST 2020 / Gaming Istanbul"
    elif "hyperx" in text:
        brand = "HyperX"
        campaign = "GIST / Creator YouTube Integrations"
    elif has_any(text, ["b8edin", "nvidia", "minecraft rtx"]):
        brand = "NVIDIA"
        campaign = "Minecraft RTX Edition - Türkiye ve MENA Lansmanı"
    elif has_any(text, ["asus", "rog", "radeon"]):
        brand = "ASUS"
        if "radeon" in text:
            campaign = "ASUS Radeon CS:GO Tournament"
        elif "rog" in text:
            campaign = "ASUS ROG Events"
        else:
            campaign = "ASUS Creator/Product Integrations"
    elif "pashafencer" in text:
        brand = "Pasha Fencer"
        campaign = "Pasha Fencer Content Reference"
    elif "metafluence" in text:
        brand = "Metafluence"
        card_id = "metafluence-launch"
        campaign = "Launch Announcement / Ecosystem"
    elif has_any(text, ["othersidemeta", "project dragon", "playtoearn"]):
        brand = "Yuga Labs"
        card_id = "yuga-labs-dragon"
        campaign = "Project Dragon / Otherside"

    placement = "homepage_first_6" if brand in HOMEPAGE_BRANDS else "show_more"

    return {"brand": brand, "campaign": campaign, "placement": placement, "card_id": card_id}


def platform(row: dict[str, Any]) -> str:
    url = row["source_url"].lower()
    extractor = row.get("extractor")
    if "tiktok.com" in url:
        return "TikTok"
    if "youtube.com" in url or "youtu.be" in url:
        return "YouTube"
    if "instagram.com" in url:
        return "Instagram"
    if "twitch.tv" in url:
        return "Twitch"
    if "facebook.com" in url:
        return "Facebook"
    if "x.com" in url or "twitter.com" in url:
        return "X"
    if extractor:
        return str(extractor)
    return "Web"


def main() -> int:
    metadata_path = Path("references/raw_reference_metadata.json")
    rows = json.loads(metadata_path.read_text(encoding="utf-8"))

    entries: list[dict[str, Any]] = []
    for row in rows:
        tags = classify(row)
        manual = manual_metadata_for(row["source_url"])
        title = row.get("title") or manual.get("title")
        description = row.get("description") or manual.get("description")
        entries.append(
            {
                **tags,
                "platform": platform(row),
                "url": row["source_url"],
                "ok": row.get("ok", False),
                "manual_metadata": bool(manual) and not row.get("ok", False),
                "title": title,
                "description": description,
                "uploader": row.get("uploader"),
                "channel": row.get("channel"),
                "view_count": row.get("view_count"),
                "like_count": row.get("like_count"),
                "comment_count": row.get("comment_count"),
                "repost_count": row.get("repost_count"),
                "thumbnail": row.get("thumbnail"),
                "error": row.get("error"),
            }
        )

    grouped: dict[str, dict[str, Any]] = {}
    for entry in entries:
        brand = entry["brand"]
        grouped.setdefault(
            brand,
            {
                "brand": brand,
                "placement": entry["placement"],
                "card_id": entry["card_id"],
                "campaigns": defaultdict(list),
            },
        )
        if entry["card_id"] and not grouped[brand]["card_id"]:
            grouped[brand]["card_id"] = entry["card_id"]
        if grouped[brand]["placement"] != "homepage_first_6" and entry["placement"] == "homepage_first_6":
            grouped[brand]["placement"] = entry["placement"]
        grouped[brand]["campaigns"][entry["campaign"]].append(entry)

    inventory = {
        "summary": {
            "unique_urls": len(entries),
            "metadata_ok": sum(1 for entry in entries if entry["ok"]),
            "metadata_failed": sum(1 for entry in entries if not entry["ok"]),
            "manual_metadata": sum(1 for entry in entries if entry.get("manual_metadata")),
            "homepage_featured_8": ["Migros", "DeFacto", "adidas Originals", "Koton", "Yuga Labs", "HP Omen", "ASUS", "Eti"],
            "note": "adidas Originals remains a homepage card from existing site data; no adidas reference URLs were included in this pasted list. Yuga Labs maps to the Project Dragon reference.",
        },
        "entries": entries,
        "groups": [
            {
                "brand": group["brand"],
                "placement": group["placement"],
                "card_id": group["card_id"],
                "campaigns": [
                    {"campaign": campaign, "count": len(items), "items": items}
                    for campaign, items in sorted(group["campaigns"].items())
                ],
            }
            for group in sorted(grouped.values(), key=lambda item: (item["placement"] != "homepage_first_6", item["brand"]))
        ],
    }

    Path("references/reference_inventory.json").write_text(json.dumps(inventory, ensure_ascii=False, indent=2), encoding="utf-8")

    lines = [
        "# Reference Inventory",
        "",
        f"- Unique URLs: {inventory['summary']['unique_urls']}",
        f"- Metadata OK: {inventory['summary']['metadata_ok']}",
        f"- Metadata failed/video-dışı: {inventory['summary']['metadata_failed']}",
        f"- Manual metadata labels: {inventory['summary']['manual_metadata']}",
        "- Homepage featured 8: Migros, DeFacto, adidas Originals, Koton, Yuga Labs, HP Omen, ASUS, Eti",
        "- Note: adidas Originals is a homepage card from existing site data; this pasted list did not include adidas URLs. Yuga Labs maps to the Project Dragon reference.",
        "",
    ]

    for group in inventory["groups"]:
        lines.append(f"## {group['brand']} ({group['placement']})")
        if group["card_id"]:
            lines.append(f"- Site card id: `{group['card_id']}`")
        total = sum(campaign["count"] for campaign in group["campaigns"])
        ok = sum(1 for campaign in group["campaigns"] for item in campaign["items"] if item["ok"])
        lines.append(f"- Links: {total} total / {ok} metadata OK")
        lines.append("")
        for campaign in group["campaigns"]:
            lines.append(f"### {campaign['campaign']} ({campaign['count']})")
            for item in campaign["items"]:
                status = "OK" if item["ok"] else "MANUAL" if item.get("manual_metadata") else "FAIL"
                title = item["title"] or item["error"] or ""
                lines.append(f"- [{status}] {item['platform']} - {title}")
                lines.append(f"  {item['url']}")
            lines.append("")

    Path("references/reference_inventory.md").write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
