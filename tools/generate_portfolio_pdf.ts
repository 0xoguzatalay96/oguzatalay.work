import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";
import { ENGLISH_WORKS } from "../src/data";

const FEATURED_WORK_IDS = [
  "migros-campaigns",
  "defacto-tiktok",
  "adidas-originals",
  "koton",
  "yuga-labs-dragon",
  "hp-omen",
  "asus-rog-party",
  "eti-challenges",
];

const SHOW_MORE_WORK_IDS = [
  "redbull-events",
  "redbull-meo-season-2",
  "redbull-flick-gist",
  "redbull-csgo-special",
  "nvidia-minecraft-rtx",
  "hyperx-gist-creators",
  "asus-radeon-csgo",
  "asus-rog-maximus",
  "asus-creator-integrations",
  "hp-omen-gist-2019",
  "hp-omen-creator-integrations",
  "migros-pizza-migo",
  "migros-money",
  "defacto-kendini-sev",
  "eti-puf-muzik-akademisi",
  "eti-benimo-dostum",
  "canga-duet",
  "msi-creator-integration",
  "pubg-mobile-real-life",
  "turkcell-pubg-tournament",
  "lenovo-game-on",
  "realme-5i-tiktok",
  "metafluence-launch",
  "pasha-fencer",
];

const root = process.cwd();
const outputDir = path.join(root, "portfolio");
const publicOutputDir = path.join(root, "public", "portfolio");
const pdfName = "Oguz_Atalay_Portfolio_Selected_Work.pdf";
const htmlName = "Oguz_Atalay_Portfolio_Selected_Work.html";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const splitTitle = (title: string) => {
  const index = title.indexOf(" - ");
  if (index === -1) return { brand: title, project: "" };
  return {
    brand: title.slice(0, index),
    project: title.slice(index + 3),
  };
};

const orderedWorks = [...ENGLISH_WORKS].sort((a, b) => {
  const order = [...FEATURED_WORK_IDS, ...SHOW_MORE_WORK_IDS];
  const aIndex = order.indexOf(a.id);
  const bIndex = order.indexOf(b.id);

  if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
  if (aIndex !== -1) return -1;
  if (bIndex !== -1) return 1;
  return ENGLISH_WORKS.indexOf(a) - ENGLISH_WORKS.indexOf(b);
});

const featuredWorks = orderedWorks.filter((work) => FEATURED_WORK_IDS.includes(work.id));
const additionalWorks = orderedWorks.filter((work) => !FEATURED_WORK_IDS.includes(work.id));

const CASE_DETAILS: Record<string, { role: string; bullets: string[] }> = {
  "migros-campaigns": {
    role: "Campaign Operations, Creator Coordination & TikTok Launch",
    bullets: [
      "Translated the campaign concept into creator briefs, approval checkpoints, publishing dependencies, and a clear launch workflow for Migros' TikTok presence.",
      "Coordinated 12 top-tier creators across content delivery, brand feedback, usage expectations, timing, and publishing readiness.",
      "Supported campaign reporting and PR visibility by connecting creator output, platform engagement, and post-campaign performance signals.",
    ],
  },
  "defacto-tiktok": {
    role: "Creator Campaign Operations & Content Approval",
    bullets: [
      "Managed creator-led TikTok activation flows from creator selection and briefing to content review, stakeholder approvals, and publishing coordination.",
      "Kept creative direction, brand safety, revisions, and delivery timelines aligned across the brand, agency, and creator side.",
      "Turned platform engagement and creator performance into clear post-campaign reporting inputs for the brand team.",
    ],
  },
  "adidas-originals": {
    role: "Digital Product Communication, Community Intelligence & D2P Support",
    bullets: [
      "Supported audience-facing launch communication during the ALTS by adidas migration, translating utility, metadata, transferability, and product mechanics into clearer messaging.",
      "Supported Türkiye and MENA digital-to-physical claim workflows, helping resolve shipping, customs, and user-support bottlenecks across fulfillment windows.",
      "Helped align brand, audience, and digital asset stakeholders through live sessions, AMA formats, support messaging, and market context tracking.",
    ],
  },
  koton: {
    role: "Influencer Campaign Execution, Production Flow & Reporting",
    bullets: [
      "Converted brand objectives into creator-led TikTok content flows, clear briefing logic, and production-ready delivery steps.",
      "Coordinated creator participation, content reviews, approval cycles, and publishing readiness for a fashion retail activation built around cultural relevance.",
      "Prepared campaign reporting inputs by tracking creative output, engagement signals, and delivery performance across the activation.",
    ],
  },
  "yuga-labs-dragon": {
    role: "Launch Marketing Workstreams, Creator/KOL Coordination & Market Intelligence",
    bullets: [
      "Supported Project Dragon / Otherside launch communications by helping align creator output, audience updates, market context, and stakeholder priorities.",
      "Supported coordination for 50+ blockchain creators and KOLs, helping standardize content approval workflows across ApeChain Alpha and Project Dragon.",
      "Analyzed audience/community signals, on-chain indicators, and market movement to shape executive-ready reporting and practical next-action recommendations.",
    ],
  },
  "hp-omen": {
    role: "Gaming Creator Activation, Live Participation Mechanics & Campaign Reporting",
    bullets: [
      "Coordinated gaming creator mechanics, live audience participation flows, publishing steps, and reporting needs for HP OMEN's League of Legends activation.",
      "Aligned sponsor priorities, creator content, audience engagement points, and delivery expectations across the campaign timeline.",
      "Supported post-campaign reporting by connecting participation, viewership, creator output, and brand visibility signals.",
    ],
  },
  "asus-rog-party": {
    role: "Event Activation, Creator Program Coordination & Production Management",
    bullets: [
      "Orchestrated creator and event activation workflows for ASUS ROG Party 2019, aligning sponsor goals, creator participation, production requirements, and on-site execution.",
      "Coordinated production crews, creator teams, vendor needs, publishing flows, and brand feedback before and after the event.",
      "Connected event participation, creator output, campaign visibility, and post-event reporting into a clear reference case for gaming and hardware marketing.",
    ],
  },
  "eti-challenges": {
    role: "FMCG TikTok Activation, Creator Participation & Engagement Tracking",
    bullets: [
      "Executed creator-led TikTok activation flows for ETI, coordinating brief delivery, creator participation, content approvals, and publishing rhythm.",
      "Kept campaign timelines, brand feedback, content quality, and audience engagement tracking aligned during a high-volume FMCG activation.",
      "Supported post-campaign analysis by translating creator content, engagement signals, and platform performance into clear reporting inputs.",
    ],
  },
};

const WORK_SCOPE_OVERRIDES: Record<string, string> = {
  "migros-campaigns":
    "Supported Migros' TikTok launch campaign by coordinating creator delivery, approval flow, publishing readiness, and post-campaign performance inputs.",
  "adidas-originals":
    "Supported Into the Metaverse and ALTS rollout communication, including digital-to-physical claim guidance, audience support flows, live sessions, and market context tracking.",
  koton:
    "Managed the creator-led TikTok activation flow for Koton, aligning briefs, production timing, content approvals, publishing, and campaign reporting.",
  "redbull-events":
    "Supported Red Bull's four-day Gaming Istanbul presence through event activation planning, creator programming, content coordination, and venue-to-digital amplification.",
  "defacto-tiktok":
    "Coordinated DeFacto's creator-led TikTok series across creator selection, briefing, brand-safety review, approval cycles, and publishing.",
  "yuga-labs-dragon":
    "Supported Project Dragon launch marketing workstreams by coordinating creator/KOL output, tracking community signals, and preparing executive reporting inputs.",
  "eti-challenges":
    "Executed ETI's TikTok challenge activation across creator participation, hashtag visibility, content approvals, publishing rhythm, and engagement tracking.",
  "asus-rog-party":
    "Coordinated ASUS ROG Party 2019 across creator participation, production teams, stakeholder approvals, on-site execution, and post-event reporting inputs.",
  "hp-omen":
    "Managed HP OMEN's gaming creator activation flow, including live participation mechanics, sponsor alignment, audience engagement, and reporting inputs.",
  "redbull-meo-season-2":
    "Supported Red Bull M.E.O. Season 2 broadcast operations around a 30-country tournament ecosystem, coordinating live content, creator participation, and audience activation.",
  "redbull-flick-gist":
    "Supported Red Bull Flick's GIST visibility through tournament communication, gaming audience amplification, and playoff-to-final funnel content coordination.",
  "redbull-csgo-special":
    "Coordinated CS:GO special broadcast references across creator-led event coverage, publishing flow, and community reach support.",
  "nvidia-minecraft-rtx":
    "Supported the Türkiye and MENA launch of Minecraft RTX Edition through creator preview content, social proof, and gaming audience communication.",
  "hyperx-gist-creators":
    "Coordinated HyperX creator integrations around Gaming Istanbul with brand-content alignment, publishing coordination, and audience activation.",
  "asus-radeon-csgo":
    "Supported ASUS Radeon CS:GO tournament activation across online qualifiers, LAN final visibility, sponsor integration, gaming community participation, and content coordination.",
  "asus-rog-maximus":
    "Coordinated ROG Maximus anniversary product-event content across creator participation, hardware showcase messaging, event communication, and asset delivery.",
  "asus-creator-integrations":
    "Managed ASUS creator and product integrations across brief translation, brand placement control, publishing alignment, and creator delivery.",
  "hp-omen-gist-2019":
    "Supported HP OMEN's Gaming Istanbul presence through experience-area visibility, PUBG tournament communication, creator/event coverage, and content delivery coordination.",
  "hp-omen-creator-integrations":
    "Coordinated multi-creator HP OMEN integrations across product narrative, gaming content formats, publishing, and performance tracking inputs.",
  "migros-pizza-migo":
    "Supported Migros PizzaMi-Go campaign distribution across Danilo Şef content, TikTok, YouTube, Instagram, and multi-channel reference assets.",
  "migros-money":
    "Supported Migros Money loyalty activation across TikTok content touchpoints, creator-style publishing, performance visibility, and campaign references.",
  "defacto-kendini-sev":
    "Coordinated DeFacto's #KendiniSev TikTok activation across campaign messaging, creator publishing flow, and audience engagement tracking.",
  "eti-puf-muzik-akademisi":
    "Supported ETI Puf's Music Academy activation through creator participation, content publishing, AR/app experience amplification, and campaign reference coordination.",
  "eti-benimo-dostum":
    "Supported ETI Benim'O social-good activation through creator messaging, brand-content alignment, social impact communication, and TikTok publishing coordination.",
  "canga-duet":
    "Coordinated Canga's duet challenge activation across creator participation, TikTok publishing, hashtag visibility, and engagement references.",
  "msi-creator-integration":
    "Managed MSI's YouTube creator integration with product communication, brand placement control, and reference content delivery.",
  "pubg-mobile-real-life":
    "Supported PUBG Mobile's branded entertainment integration from creator concept and production coordination to publishing and performance reference tracking.",
  "turkcell-pubg-tournament":
    "Supported Turkcell PUBG tournament broadcast visibility through event communication, creator/audience coordination, and reference management.",
  "lenovo-game-on":
    "Coordinated Lenovo Game On reference content across gaming-center visibility, creator/video delivery, audience communication, and brand experience storytelling.",
  "realme-5i-tiktok":
    "Managed Realme 5i TikTok creator activation across product messaging, creator delivery, publishing, and campaign reference coordination.",
  "metafluence-launch":
    "Supported Metafluence launch communication through early-resident network growth, KOL onboarding support, announcement coordination, and audience-scale reporting.",
  "pasha-fencer":
    "Coordinated creator content reference delivery across campaign visibility, publishing, and Facebook video reference management.",
};

const getWorkScope = (work: typeof ENGLISH_WORKS[number]) =>
  WORK_SCOPE_OVERRIDES[work.id] || CASE_DETAILS[work.id]?.role || work.subtitle || "Campaign reference work.";

const getLinkText = (link: NonNullable<typeof ENGLISH_WORKS[number]["links"]>[number], index: number) => {
  const label = `${link.label || ""} ${link.platform || ""}`.toLowerCase();
  if (label.includes("broadcast") || label.includes("twitch")) return "Broadcast";
  if (label.includes("article") || label.includes("coverage") || label.includes("press")) return "Press";
  if (label.includes("reference")) return "Reference";
  if (label.includes("creator")) return "Creator video";
  if (label.includes("video") || label.includes("film") || label.includes("tiktok") || label.includes("youtube")) {
    return index === 0 ? "Campaign video" : "Video";
  }
  return index === 0 ? "View project" : "Reference";
};

const renderLinks = (links: typeof ENGLISH_WORKS[number]["links"], maxLinks = 2) => {
  if (!links?.length) return "";
  const visibleLinks = links.slice(0, maxLinks);

  return `
    <div class="links">
      ${visibleLinks
        .map((link, index) => {
          const label = link.label || link.platform || "Reference";
          const text = getLinkText(link, index);
          return `<a href="${escapeHtml(link.url)}" title="${escapeHtml(label)}">${text}</a>`;
        })
        .join("")}
    </div>
  `;
};

const renderKpiChips = (kpi?: string) => {
  if (!kpi) return "";

  return `
    <div class="kpi-list">
      ${kpi.split(" | ").map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
    </div>
  `;
};

const renderFeaturedProjectCard = (work: typeof ENGLISH_WORKS[number], index: number) => {
  const { brand, project } = splitTitle(work.title);
  const metrics = renderKpiChips(work.kpi);

  return `
    <article class="project-card featured-card">
      <div class="project-head">
        <div class="project-no">${String(index + 1).padStart(2, "0")}</div>
        <div class="project-title">
          <h3>${escapeHtml(brand)}</h3>
          ${project ? `<h4>${escapeHtml(project)}</h4>` : ""}
          ${work.subtitle ? `<p class="project-subtitle">${escapeHtml(work.subtitle)}</p>` : ""}
        </div>
        <div class="project-metrics">${metrics}</div>
      </div>
      <p class="project-scope">${escapeHtml(getWorkScope(work))}</p>
      ${renderLinks(work.links, 2)}
    </article>
  `;
};

const renderAdditionalProjectCard = (work: typeof ENGLISH_WORKS[number], index: number) => {
  const { brand, project } = splitTitle(work.title);
  const metrics = renderKpiChips(work.kpi);

  return `
    <article class="project-card compact-card">
      <div class="project-head compact-head">
        <div class="project-no">${String(index + FEATURED_WORK_IDS.length + 1).padStart(2, "0")}</div>
        <div class="project-title">
          <h3>${escapeHtml(brand)}</h3>
          ${project ? `<h4>${escapeHtml(project)}</h4>` : ""}
          ${work.subtitle ? `<p class="project-subtitle">${escapeHtml(work.subtitle)}</p>` : ""}
        </div>
        <div class="project-metrics">${metrics}</div>
      </div>
      <p class="project-scope">${escapeHtml(getWorkScope(work))}</p>
      ${renderLinks(work.links, 1)}
    </article>
  `;
};

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Oğuz Atalay | Campaign Portfolio</title>
  <style>
    @page {
      size: A4;
      margin: 10mm;
      background: #131313;
    }

    * {
      box-sizing: border-box;
    }

    html {
      background: #131313;
    }

    body {
      margin: 0;
      color: #f5f5f5;
      background: #131313;
      font-family: Inter, Arial, Helvetica, sans-serif;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    .masthead {
      display: grid;
      grid-template-columns: 1fr 58mm;
      gap: 8mm;
      align-items: end;
      margin-bottom: 7mm;
      padding-bottom: 5mm;
      border-bottom: 2px solid #2a2a2a;
    }

    .doc-kicker {
      color: #ff0000;
      font-size: 7px;
      font-weight: 800;
      letter-spacing: 0.22em;
      text-transform: uppercase;
    }

    h1 {
      margin: 2mm 0 2mm;
      font-size: 25px;
      line-height: 1;
      letter-spacing: 0;
      text-transform: uppercase;
    }

    h2 {
      margin: 0;
      max-width: 120mm;
      font-size: 10.5px;
      line-height: 1.28;
      color: #a0a0a0;
      font-weight: 900;
      text-transform: uppercase;
    }

    .masthead-meta {
      font-size: 7.5px;
      line-height: 1.6;
      text-align: right;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-weight: 800;
    }

    .masthead-meta a,
    .masthead-meta span {
      display: block;
      color: #a0a0a0;
    }

    .section-title {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 0 0 4mm;
      font-size: 8.5px;
      font-weight: 900;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: #f5f5f5;
    }

    .section-title::after {
      content: "";
      flex: 1;
      height: 1px;
      background: #2a2a2a;
    }

    .deck-intro {
      margin: -1mm 0 4mm;
      max-width: 162mm;
      color: #a0a0a0;
      font-size: 8px;
      line-height: 1.45;
    }

    .links {
      display: flex;
      flex-wrap: wrap;
      gap: 3mm;
      margin-top: 2mm;
    }

    .links a {
      border: 0;
      padding: 0;
      font-size: 7px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background: transparent;
      color: #f5f5f5;
      line-height: 1.1;
      text-decoration: underline;
      text-decoration-color: #ff0000;
      text-decoration-thickness: 1px;
      text-underline-offset: 2px;
    }

    .featured-grid,
    .additional-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 3.5mm;
    }

    .project-card {
      width: 100%;
      border: 1px solid #2a2a2a;
      background: #171717;
      padding: 4mm;
      break-inside: avoid;
      page-break-inside: avoid;
    }

    .featured-card {
      min-height: 34mm;
    }

    .compact-card {
      min-height: 27mm;
      padding: 3.2mm;
    }

    .project-head {
      display: grid;
      grid-template-columns: 8mm minmax(0, 1fr) 34mm;
      gap: 2.5mm;
      align-items: start;
    }

    .compact-head {
      grid-template-columns: 8mm minmax(0, 1fr) 30mm;
    }

    .project-no {
      color: #ff0000;
      font-size: 7px;
      font-weight: 900;
      letter-spacing: 0.12em;
    }

    h3 {
      margin: 0;
      display: block;
      font-size: 13px;
      line-height: 1;
      text-transform: uppercase;
      color: #f5f5f5;
    }

    .compact-card h3 {
      font-size: 11.5px;
    }

    h4 {
      margin: 1mm 0 0;
      color: #ff0000;
      font-size: 9.5px;
      font-weight: 900;
      line-height: 1.08;
      text-transform: uppercase;
    }

    .compact-card h4 {
      font-size: 8px;
    }

    .project-subtitle {
      margin: 1mm 0 0;
      font-size: 7px;
      color: #a0a0a0;
      line-height: 1.2;
    }

    .project-metrics {
      min-height: 1px;
      text-align: right;
    }

    .project-scope {
      margin: 3mm 0 0;
      font-size: 7.7px;
      line-height: 1.36;
      color: #c7c7c7;
    }

    .compact-card .project-scope {
      margin-top: 2.4mm;
      font-size: 7px;
      line-height: 1.32;
    }

    .kpi-list {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.8mm;
      margin-top: 0;
      text-align: right;
    }

    .kpi-list span {
      display: block;
      padding: 0;
      border: 0;
      background: transparent;
      color: #ff0000;
      font-size: 6.4px;
      line-height: 1.1;
      font-weight: 900;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .compact-card .kpi-list span {
      font-size: 5.8px;
    }

    .content-section {
      page-break-after: auto;
      margin-bottom: 6mm;
    }

    .selected-section {
      page-break-after: always;
    }

    .note {
      margin-top: 6mm;
      padding-top: 3mm;
      border-top: 1px solid #2a2a2a;
      font-size: 8px;
      line-height: 1.5;
      color: #a0a0a0;
    }
  </style>
</head>
<body>
  <header class="masthead">
    <div>
      <div class="doc-kicker">Portfolio PDF</div>
      <h1>Oğuz Atalay</h1>
      <h2>Influencer Marketing Manager | Digital Assets Marketing Operations</h2>
    </div>
    <div class="masthead-meta">
      <a href="https://oguzatalay.work">oguzatalay.work</a>
      <a href="mailto:oguz@oguzatalay.work">oguz@oguzatalay.work</a>
      <a href="https://www.linkedin.com/in/oguzatalay96/">linkedin.com/in/oguzatalay96</a>
      <span>Istanbul, Türkiye</span>
    </div>
  </header>

	  <section class="content-section selected-section">
	    <div class="section-title">Selected Work</div>
	    <p class="deck-intro">
	      Selected campaign and launch work across FMCG, gaming, technology, creator partnerships, and digital asset ecosystems.
	    </p>
	    <div class="featured-grid">
	      ${featuredWorks.map(renderFeaturedProjectCard).join("\n")}
	    </div>
	  </section>

	  <section class="content-section">
	    <div class="section-title">Additional Work</div>
	    <div class="additional-grid">
	      ${additionalWorks.map(renderAdditionalProjectCard).join("\n")}
	    </div>
	  </section>
	</body>
	</html>`;

await fs.mkdir(outputDir, { recursive: true });
await fs.mkdir(publicOutputDir, { recursive: true });

const htmlPath = path.join(outputDir, htmlName);
const pdfPath = path.join(outputDir, pdfName);
const publicPdfPath = path.join(publicOutputDir, pdfName);

await fs.writeFile(htmlPath, html);

const browser = await chromium.launch({
  executablePath: process.env.CHROME_BIN || "/usr/bin/google-chrome-stable",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

const page = await browser.newPage({ viewport: { width: 1240, height: 1754 } });
await page.setContent(html, { waitUntil: "networkidle" });
await page.emulateMedia({ media: "print" });
await page.pdf({
  path: pdfPath,
  format: "A4",
  printBackground: true,
  preferCSSPageSize: true,
  displayHeaderFooter: false,
});
await browser.close();

await fs.copyFile(pdfPath, publicPdfPath);

console.log(pdfPath);
console.log(publicPdfPath);
