import { X, Download, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { CertificateItem, JobExperience, SkillCategory, TranslationSet } from "../types";

interface HarvardCVModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "EN" | "TR";
  t?: TranslationSet;
  experiences?: JobExperience[];
  skills?: SkillCategory[];
  certificates?: CertificateItem[];
}

export default function HarvardCVModal({
  isOpen,
  onClose,
  lang,
}: HarvardCVModalProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const cvRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const pdfCvHref = `/cv/Oguz_Atalay_CV.pdf?v=20261108_safebit`;

  const handleDownloadClick = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md overflow-y-auto p-4 md:p-6">
      {/* Top Action Bar: ONLY Download PDF and Close X */}
      <div className="fixed top-4 right-4 flex items-center gap-3 z-50">
        <a
          href={pdfCvHref}
          download="Oguz_Atalay_CV.pdf"
          onClick={handleDownloadClick}
          className="flex items-center gap-2 bg-[#FF0000] hover:bg-[#d60000] active:scale-95 text-white font-archivo font-bold text-xs tracking-wider px-4 py-2.5 transition-all cursor-pointer shadow-xl border border-[#FF0000] select-none"
          style={{ borderRadius: "0px" }}
          id="download-cv-pdf-btn"
        >
          {isDownloading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{lang === "EN" ? "DOWNLOADING..." : "İNDİRİLİYOR..."}</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>{lang === "EN" ? "DOWNLOAD PDF" : "PDF İNDİR"}</span>
            </>
          )}
        </a>

        <button
          onClick={onClose}
          className="p-2.5 bg-[#171717] hover:bg-[#262626] text-[#a3a3a3] hover:text-white border border-[#3a3a3a] transition-all cursor-pointer shadow-xl"
          aria-label="Close CV"
          id="close-cv-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main CV Container (Exact 1:1 Harvard ATS CV Representation) */}
      <div className="w-full max-w-4xl my-8 overflow-y-auto max-h-[92vh] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] border border-[#333]">
        <div 
          ref={cvRef}
          className="w-full bg-[#ffffff] text-[#111111] p-8 md:p-14 font-serif text-[13px] leading-relaxed"
          style={{ fontFamily: "'Times New Roman', Times, Georgia, serif" }}
        >
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1a2b49] uppercase mb-1">
              OĞUZ ATALAY
            </h1>
            <p className="text-sm text-[#333] font-normal italic mb-2">
              Influencer Marketing Manager | Digital Assets Marketing Operations
            </p>
            <p className="text-xs text-[#333]">
              İstanbul, Türkiye &nbsp;|&nbsp; +90 543 772 50 66 &nbsp;|&nbsp;{" "}
              <a href="mailto:oguz@oguzatalay.work" className="hover:underline text-[#111]">
                oguz@oguzatalay.work
              </a>{" "}
              &nbsp;|&nbsp;{" "}
              <a href="https://linkedin.com/in/oguzatalay96" target="_blank" rel="noopener noreferrer" className="hover:underline text-[#111]">
                linkedin.com/in/oguzatalay96
              </a>{" "}
              &nbsp;|&nbsp;{" "}
              <a href="https://oguzatalay.work" target="_blank" rel="noopener noreferrer" className="hover:underline text-[#111]">
                oguzatalay.work
              </a>
            </p>
          </div>

          {/* PROFESSIONAL SUMMARY */}
          <div className="mb-5">
            <h2 className="text-xs font-bold tracking-wider text-[#1a2b49] uppercase border-b border-[#222] pb-0.5 mb-2">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-[#222] text-justify leading-relaxed">
              Influencer Marketing Manager with 10+ years of experience spanning two connected chapters. Career started in traditional influencer marketing, building and scaling creator programmes for consumer, gaming, and technology brands while managing 150+ campaigns and a 200+ creator/KOL network for companies including Red Bull, ASUS, HP OMEN, Migros, Koton, and DeFacto. Since 2022, expanded into blockchain and digital-asset ecosystems — continuing to lead influencer/creator marketing alongside broader marketing operations, partnerships, and community management for SAFEbit, Yuga Labs, adidas Originals: Into the Metaverse, and Metafluence, covering blockchain launch communication, crypto KOL coordination, on-chain/market intelligence, and community management. Skilled in creator sourcing and negotiation, brief development, budget management, cross-functional production, and executive reporting.
            </p>
          </div>

          {/* CORE COMPETENCIES */}
          <div className="mb-5">
            <h2 className="text-xs font-bold tracking-wider text-[#1a2b49] uppercase border-b border-[#222] pb-0.5 mb-2">
              CORE COMPETENCIES
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-[#222]">
              <li>
                <strong>360° Campaign Operations:</strong> End-to-end planning and execution across digital, social, PR, creator, gaming, and experiential channels.
              </li>
              <li>
                <strong>Influencer & Creator Partnerships:</strong> Creator discovery, negotiation, briefing, activation coordination, content approval, and long-term ambassador management.
              </li>
              <li>
                <strong>Digital Asset & Blockchain Marketing Operations:</strong> Blockchain launch communication, crypto KOL coordination, community management, and on-chain/market analysis.
              </li>
              <li>
                <strong>Budget & Stakeholder Management:</strong> Campaign budget planning, multi-stakeholder approval processes, vendor coordination, and executive communication.
              </li>
              <li>
                <strong>Marketing Reporting & Analysis:</strong> KPI dashboards, ROI and CAC analysis, campaign retrospectives, and C-level reporting.
              </li>
              <li>
                <strong>Growth & Acquisition:</strong> Creator-led growth strategies, audience segmentation, and acquisition funnel design.
              </li>
            </ul>
          </div>

          {/* PROFESSIONAL EXPERIENCE */}
          <div className="mb-5">
            <h2 className="text-xs font-bold tracking-wider text-[#1a2b49] uppercase border-b border-[#222] pb-0.5 mb-3">
              PROFESSIONAL EXPERIENCE
            </h2>

            {/* 1. SAFEbit */}
            <div className="mb-4">
              <div className="flex justify-between items-baseline font-bold text-[#111]">
                <span>SAFEbit</span>
                <span className="font-normal text-[#444] text-xs">2026 – Present</span>
              </div>
              <div className="italic text-[#333] text-xs mb-1.5">
                Marketing Manager
              </div>
              <ul className="list-disc pl-5 space-y-1 text-[#222]">
                <li>Lead marketing operations, brand positioning, product communication and social media strategy for SAFEbit, a Türkiye-based cryptocurrency exchange.</li>
                <li>Design customer acquisition and retention campaign proposals, including staking and launchpool mechanics, participation rules and reward structures.</li>
                <li>Coordinate token listing launch communications, listing packages, corporate presentations and partner proposals.</li>
                <li>Develop Web3 business partnerships and project outreach centered on direct TRY spot trading pairs and access to Turkish investors.</li>
                <li>Collaborate with legal and compliance teams to align public-facing marketing communications with SPK regulatory requirements.</li>
                <li>Translate market intelligence and customer insights into marketing plans, executive presentations and cross-channel content.</li>
              </ul>
            </div>

            {/* 2. Yuga Labs */}
            <div className="mb-4">
              <div className="flex justify-between items-baseline font-bold text-[#111]">
                <span>Yuga Labs, Contract-Based</span>
                <span className="font-normal text-[#444] text-xs">May 2024 – Apr 2025</span>
              </div>
              <div className="italic text-[#333] text-xs mb-1.5">
                Marketing Operations & Partnerships Consultant
              </div>
              <ul className="list-disc pl-5 space-y-1 text-[#222]">
                <li>Executed digital asset and blockchain launch marketing workstreams for Yuga Labs initiatives, bringing together creator output, community signals, and market movement into executive-ready reporting.</li>
                <li>Coordinated 50+ top-tier blockchain creators and KOLs, standardizing content approval workflows and creator activation processes across ApeChain Alpha launch operations and Project Dragon.</li>
                <li>Drove Project Dragon / Otherside launch communications, aligning creator output and market context across product, marketing, and executive stakeholders; launch activity reached 1.2M+ impressions, 12.5K+ likes, and 2,264 active players.</li>
                <li>Delivered weekly market intelligence reports analyzing on-chain indicators, audience/community metrics, and competitor activity, including consumer brand partnership opportunity research.</li>
                <li>Developed go-to-market research, competitor analyses, and opportunity-mapping files for Yuga Labs' digital asset and metaverse ecosystems.</li>
              </ul>
            </div>

            {/* 3. adidas Originals */}
            <div className="mb-4">
              <div className="flex justify-between items-baseline font-bold text-[#111]">
                <span>adidas Originals: Into the Metaverse, Contract-Based</span>
                <span className="font-normal text-[#444] text-xs">Oct 2022 – Nov 2023</span>
              </div>
              <div className="italic text-[#333] text-xs mb-1.5">
                Marketing Operations & Partnerships Consultant
              </div>
              <ul className="list-disc pl-5 space-y-1 text-[#222]">
                <li>Led digital product and audience launch communication during the migration to the ALTS by adidas dynamic NFT collection, translating complex mechanics (utility, transferability, metadata) into clear audience-facing messaging.</li>
                <li>Managed Türkiye and MENA Phase 2 digital-to-physical claim workflows, resolving shipping, customs, and user-support bottlenecks across global merchandise fulfillment.</li>
                <li>Moderated high-visibility live audience sessions and AMA formats covering secondary-market context, future drops, and ecosystem partners including Bored Ape Yacht Club and GMoney.</li>
                <li>Operated across a premium digital product ecosystem with 6,755 holders, 72.7% brand loyalty, and $93M+ secondary-market volume, decoding holder context for clearer brand communication.</li>
                <li>Aligned critical communication and escalation paths between brand, audience, and digital asset stakeholders during sensitive rollout periods.</li>
              </ul>
            </div>

            {/* 4. Metafluence */}
            <div className="mb-4">
              <div className="flex justify-between items-baseline font-bold text-[#111]">
                <span>Metafluence, Project-Based</span>
                <span className="font-normal text-[#444] text-xs">Mar 2022 – Sep 2022</span>
              </div>
              <div className="italic text-[#333] text-xs mb-1.5">
                Influencer Marketing Manager
              </div>
              <ul className="list-disc pl-5 space-y-1 text-[#222]">
                <li>Scouted, negotiated with, and onboarded 80+ top Turkish creators and crypto KOLs during the platform's launch and post-IDO expansion phase.</li>
                <li>Standardized PR and influencer marketing operations by building automated creator briefs, KPI dashboards, and streamlined campaign reporting workflows.</li>
                <li>Executed the 15-influencer TIBIT private-sale activation end to end, connecting creator output with launch-stage acquisition goals; campaign supported 305 transactions and $50K in seed funding.</li>
                <li>Designed a repeatable Türkiye creator acquisition and activation system linking scouting, negotiation, briefing, KPI tracking, and reporting.</li>
                <li>Mapped crypto-native audience segments, KOL categories, and trust-building content angles to strengthen acquisition and launch communication.</li>
              </ul>
            </div>

            {/* 5. 2Gether */}
            <div className="mb-4">
              <div className="flex justify-between items-baseline font-bold text-[#111]">
                <span>2Gether, Full-Time</span>
                <span className="font-normal text-[#444] text-xs">Sep 2021 – Feb 2022</span>
              </div>
              <div className="italic text-[#333] text-xs mb-1.5">
                Social Influencer Marketing Manager
              </div>
              <ul className="list-disc pl-5 space-y-1 text-[#222]">
                <li>Owned end-to-end creator campaign operations for Franke, Alix Avien, and LC Waikiki, covering creator discovery, budget negotiation, briefing, QA approvals, and publishing.</li>
                <li>Expanded the agency's creator roster across fashion, lifestyle, and FMCG sectors, using engagement and audience-fit analytics to improve portfolio quality.</li>
                <li>Produced C-level performance reports for brand teams, connecting campaign ROI, CAC impact, and recurring budget rationale.</li>
                <li>Standardized briefing, content review, and reporting expectations across creators and brand stakeholders, improving campaign handoff quality.</li>
              </ul>
            </div>

            {/* 6. H2O United */}
            <div className="mb-4">
              <div className="flex justify-between items-baseline font-bold text-[#111]">
                <span>H2O United, Full-Time</span>
                <span className="font-normal text-[#444] text-xs">Jul 2020 – Aug 2021</span>
              </div>
              <div className="italic text-[#333] text-xs mb-1.5">
                Projects & Influencer Marketing Manager
              </div>
              <ul className="list-disc pl-5 space-y-1 text-[#222]">
                <li>Orchestrated concurrent high-pressure influencer campaigns, PR distributions, and production workflows for DeFacto, Koton, ETI, Migros, Reeder, Realme, and Casper.</li>
                <li>Delivered the Migros #ReyonSavaşları TikTok campaign, coordinating 12 top-tier creators and driving 6.7M views, 3.4M comments, and 74% engagement, launching the brand's TikTok presence with widespread industry PR coverage.</li>
                <li>Executed major creator-led activations: DeFacto #HavalıveRahat (3.1M views), Koton #EtiketleriÇıkar (6.3M views, 630K likes), and ETI #eticinlegülümse (15.4M views, 685K likes).</li>
                <li>Directed cross-functional production teams, vendor coordination, client approvals, and large campaign budgets across parallel FMCG, fashion, and retail operations.</li>
                <li>Planned creative sprints, budgets, and timelines for fast-moving retail and FMCG campaigns, generating 450K+ organic engagements within 48-hour windows.</li>
              </ul>
            </div>

            {/* 7. TEM Agency */}
            <div className="mb-4">
              <div className="flex justify-between items-baseline font-bold text-[#111]">
                <span>TEM Agency, Full-Time</span>
                <span className="font-normal text-[#444] text-xs">May 2015 – Feb 2020</span>
              </div>
              <div className="italic text-[#333] text-xs mb-1.5">
                Influencer Marketing Manager
              </div>
              <ul className="list-disc pl-5 space-y-1 text-[#222]">
                <li>Joined as a founding member (within the agency's first 4 employees) and built the influencer marketing function from the ground up, scaling the creator network to 100+ active profiles across gaming, technology, and lifestyle.</li>
                <li>Directed 360-degree event and production programs for global technology brands including ASUS, AMD, HP OMEN, and Red Bull, coordinating creator teams, production crews, and global stakeholders.</li>
                <li>Orchestrated the ASUS ROG Party 2019 activation achieving 15M impressions and 3.5M views, aligning sponsor goals, creator participation, and event production.</li>
                <li>Managed HP OMEN gaming creator activations including the LoL Challenge (1.8M views, 162K likes, 1,200 participants) and oversaw creator mechanics, live audience participation, and campaign reporting.</li>
                <li>Produced Red Bull gaming and esports activations including GIST 2020, MEO Season 2 (15K+ registrants, 30 countries), Flick @ GIST, and CS:GO special broadcasts.</li>
                <li>Controlled large-scale campaign and event budgets, balancing sponsor priorities, creator deliverables, venue execution, and post-event reporting.</li>
              </ul>
            </div>
          </div>

          {/* SELECTED BRAND & CATEGORY EXPERIENCE */}
          <div className="mb-5">
            <h2 className="text-xs font-bold tracking-wider text-[#1a2b49] uppercase border-b border-[#222] pb-0.5 mb-2">
              SELECTED BRAND & CATEGORY EXPERIENCE
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-[#222]">
              <li>
                <strong>Consumer, FMCG, Retail & Fashion:</strong> Migros, DeFacto, Koton, ETI, Canga, LC Waikiki, Franke, Alix Avien, Realme, Casper.
              </li>
              <li>
                <strong>Technology, Gaming & Hardware:</strong> Red Bull, ASUS, AMD, HP OMEN, NVIDIA, MSI, Lenovo, HyperX, PUBG Mobile, Turkcell.
              </li>
              <li>
                <strong>Digital Assets & Blockchain:</strong> SAFEbit, Yuga Labs (ApeChain, Project Dragon, Otherside), adidas Originals: Into the Metaverse (ALTS), Metafluence (TIBIT).
              </li>
            </ul>
          </div>

          {/* TOOLS & PLATFORMS */}
          <div className="mb-5">
            <h2 className="text-xs font-bold tracking-wider text-[#1a2b49] uppercase border-b border-[#222] pb-0.5 mb-2">
              TOOLS & PLATFORMS
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-[#222]">
              <li>
                <strong>Data Analytics & Market Intelligence:</strong> Power BI, Looker Studio, Google Analytics (GA4), Dune Analytics, Nansen, Token Terminal, Chainalysis, AppsFlyer, Meta Business Suite, X Analytics, Social Bakers (Emplifi), Brandwatch, Meltwater.
              </li>
              <li>
                <strong>Creator, KOL & Marketing Tech:</strong> CreatorIQ, Modash, Upfluence, HypeAuditor, HubSpot.
              </li>
              <li>
                <strong>Operations, Budget & Production Management:</strong> Notion, Google Workspace, Slack, Asana, Jira, Figma, Adobe Creative Suite.
              </li>
            </ul>
          </div>

          {/* CERTIFICATIONS */}
          <div className="mb-5">
            <h2 className="text-xs font-bold tracking-wider text-[#1a2b49] uppercase border-b border-[#222] pb-0.5 mb-2">
              CERTIFICATIONS
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-[#222]">
              <li>Google Digital Marketing & E-commerce — Google (8 Courses)</li>
              <li>Google Data Analytics Professional Certificate — Google (9 Courses)</li>
              <li>Google Project Management Professional Certificate — Google (7 Courses)</li>
              <li>Meta Community Management Professional Certificate — Meta (4 Courses)</li>
              <li>Microsoft Power BI Data Analyst Professional Certificate — Microsoft (8 Courses)</li>
              <li>Influencer Marketing Strategy — Rutgers, The State University of New Jersey (1 Course)</li>
              <li>Decentralized Finance (DeFi): The Future of Finance — Duke University (4 Courses)</li>
              <li>Blockchain Revolution in Financial Services — INSEAD (4 Courses)</li>
              <li>Web3 and Blockchain in Global Commerce — INSEAD & Blockchain Research Institute (4 Courses)</li>
              <li>Blockchain Specialization — University at Buffalo (4 Courses)</li>
              <li>Anti Money Laundering (AML) Fundamentals — EDUCBA</li>
            </ul>
          </div>

          {/* EDUCATION */}
          <div className="mb-5">
            <h2 className="text-xs font-bold tracking-wider text-[#1a2b49] uppercase border-b border-[#222] pb-0.5 mb-2">
              EDUCATION
            </h2>
            <div className="mb-2">
              <div className="font-bold text-[#111]">University of the People</div>
              <div className="text-xs text-[#333]">Bachelor of Science, Business Administration and Management · 2017 – 2020</div>
            </div>
            <div>
              <div className="font-bold text-[#111]">İstanbul Ayvansaray Üniversitesi</div>
              <div className="text-xs text-[#333]">Associate Degree, Computer Systems Networking and Telecommunications · 2014 – 2016</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
