import { X, FileText, Check, Copy } from "lucide-react";
import { useState, useRef } from "react";
import { JobExperience, SkillCategory, TranslationSet } from "../types";
import {
  EDUCATION_LIST_EN,
  EDUCATION_LIST_TR,
  ENGLISH_TOOL_GROUPS,
  ENGLISH_WORKS,
  TURKISH_TOOL_GROUPS,
  TURKISH_WORKS,
} from "../data";

interface HarvardCVModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "EN" | "TR";
  t: TranslationSet;
  experiences: JobExperience[];
  skills: SkillCategory[];
}

export default function HarvardCVModal({
  isOpen,
  onClose,
  lang,
  t,
  experiences,
  skills,
}: HarvardCVModalProps) {
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const cvRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

    const handleExportMD = () => {
    setIsGenerating(true);
    const works = lang === "EN" ? ENGLISH_WORKS : TURKISH_WORKS;
    const educations = lang === "EN" ? EDUCATION_LIST_EN : EDUCATION_LIST_TR;
    const tools = lang === "EN" ? ENGLISH_TOOL_GROUPS : TURKISH_TOOL_GROUPS;

    let md = `# OGUZ ATALAY\n\n`;
    md += `## ${t.heroTitle}\n\n`;
    md += `${t.heroSub}\n\n---\n\n`;

    md += `## ${t.aboutTitle}\n\n`;
    md += `${t.aboutText}\n\n`;
    md += `- **${t.aboutYearsLabel}**: ${t.aboutYears}\n`;
    md += `- **${t.aboutCreatorsLabel}**: ${t.aboutCreators}\n`;
    md += `- **${t.aboutExperienceLabel}**: ${t.aboutExperience}\n\n---\n\n`;

    md += `## ${t.experienceTitle}\n\n`;
    experiences.forEach(exp => {
      md += `### ${exp.role} @ ${exp.company}\n`;
      md += `**${exp.period}** | *${exp.tag}*\n\n`;
      exp.bullets.forEach(bullet => {
        md += `- ${bullet}\n`;
      });
      md += `\n`;
    });
    md += `---\n\n`;

    md += `## ${t.worksTitle}\n\n`;
    works.forEach(work => {
      md += `### ${work.title}\n`;
      md += `**KPI**: ${work.kpi}\n\n`;
    });
    md += `---\n\n`;

    md += `## ${t.skillsTitle}\n\n`;
    skills.forEach(skillCat => {
      md += `### ${skillCat.title}\n`;
      skillCat.items.forEach(item => {
        md += `- ${item}\n`;
      });
      md += `\n`;
    });
    md += `---\n\n`;

    md += `## ${t.toolsTitle}\n\n`;
    md += `### ${t.toolsStack}\n`;
    tools.forEach(group => {
      md += `\n#### ${group.title}\n`;
      group.items.forEach(item => {
        md += `- ${item}\n`;
      });
    });
    md += `\n---\n\n`;

    md += `## ${t.educationTitle}\n\n`;
    educations.forEach(edu => {
      md += `### ${edu.institution}\n`;
      md += `**${edu.program}**\n`;
      md += `${edu.details}\n\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Oguz_Atalay_Profile_${lang}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsGenerating(false);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("oguz@oguzatalay.work");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const educations = lang === "EN" ? EDUCATION_LIST_EN : EDUCATION_LIST_TR;
  const toolGroups = lang === "EN" ? ENGLISH_TOOL_GROUPS : TURKISH_TOOL_GROUPS;
  const marketingCvHref = "/cv/Oguz_Atalay_Influencer_Marketing_Digital_Assets_CV.md";
  const cryptoCvHref = lang === "EN"
    ? "/cv/Oguz_Atalay_Crypto_Web3_Community_Growth_CV.md"
    : "/cv/Oguz_Atalay_Crypto_Web3_Community_Growth_CV_TR.md";
  const brandCvHref = lang === "EN"
    ? "/cv/Oguz_Atalay_Brand_Agency_Creator_Marketing_CV.md"
    : "/cv/Oguz_Atalay_Marka_Ajans_Kreator_Marketing_CV_TR.md";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000]/95 backdrop-blur-md overflow-y-auto p-4">
      {/* Non-printable Control Overlay bar */}
      <div className="absolute top-4 right-4 flex items-center gap-3 z-50">
        <button
          onClick={handleExportMD}
          disabled={isGenerating}
          className="flex items-center gap-2 bg-[#FF0000] hover:bg-[#d60000] disabled:bg-[#525252] text-[#fff] font-archivo font-bold text-xs tracking-wider px-4 py-2.5 transition-all cursor-pointer shadow-lg"
          style={{ borderRadius: "0px" }}
          id="print-cv-btn"
        >
          <FileText className="w-4 h-4" />
          <span>{isGenerating ? (lang === "EN" ? "GENERATING..." : "HAZIRLANIYOR...") : (lang === "EN" ? "DOWNLOAD MD" : "MD İNDİR")}</span>
        </button>

        <button
          onClick={copyEmail}
          className="flex items-center gap-2 bg-[#262626] hover:bg-[#404040] text-[#fff] font-archivo font-bold text-xs tracking-wider px-4 py-2.5 transition-all cursor-pointer border border-[#404040]"
          style={{ borderRadius: "0px" }}
          id="copy-cv-email-btn"
        >
          {copied ? <Check className="w-4 h-4 text-[#00FF66]" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? (lang === "EN" ? "COPIED!" : "KOPYALANDI!") : "oguz@oguzatalay.work"}</span>
        </button>

        <button
          onClick={onClose}
          className="p-2.5 bg-[#171717] hover:bg-[#262626] text-[#a3a3a3] hover:text-[#fff] border border-[#262626] transition-all cursor-pointer"
          aria-label="Close CV"
          id="close-cv-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main CV Container Wrapper for styling */}
      <div className="w-full max-w-4xl my-8 overflow-y-auto max-h-[90vh] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
        {/* This is what gets printed */}
        <div 
          ref={cvRef}
          className="w-full bg-[#fff] text-[#000] p-10 md:p-16 font-serif border border-[#e5e5e5]"
        >
        {/* Harvard CV Header */}
        <div className="text-center border-b-2 border-[#000] pb-5 mb-6">
          <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-wide text-[#000] uppercase mb-2">
            Oğuz Atalay
          </h1>
          <p className="font-serif text-xs md:text-sm text-[#404040] font-medium tracking-wide italic mb-3">
            {lang === "EN"
              ? "Influencer Marketing Manager | Digital Assets Marketing"
              : "Influencer Marketing Yöneticisi | Dijital Varlık Pazarlaması"}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 font-sans text-xs text-[#262626] font-medium">
            <span>{lang === "EN" ? "Istanbul" : "İstanbul"}</span>
            <span className="text-[#a3a3a3]">•</span>
            <a href="tel:+905437725066" className="hover:underline">
              +90 543 772 50 66
            </a>
            <span className="text-[#a3a3a3]">•</span>
            <a href="mailto:oguz@oguzatalay.work" className="hover:underline">
              oguz@oguzatalay.work
            </a>
            <span className="text-[#a3a3a3]">•</span>
            <a href="https://oguzatalay.work" target="_blank" rel="noopener noreferrer" className="hover:underline font-semibold">
              oguzatalay.work
            </a>
          </div>
        </div>

        {/* Section: Targeted Downloads */}
        <div className="mb-6 bg-[#fafafa] border border-[#e5e5e5] p-4" style={{ pageBreakInside: 'avoid' }}>
          <h2 className="font-sans text-[11px] font-bold tracking-widest text-[#000] uppercase mb-3">
            {lang === "EN" ? "ROLE-TARGETED CV DOWNLOADS" : "ROLE ODAKLI CV İNDİRMELERİ"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <a
              href={marketingCvHref}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#d4d4d4] bg-[#fff] hover:border-[#000] transition-colors p-3 block"
            >
              <span className="font-sans text-[11px] font-bold text-[#000] uppercase tracking-wider block">
                {lang === "EN" ? "Marketing Manager CV" : "Marketing Manager CV"}
              </span>
              <span className="font-serif text-[11px] text-[#525252] mt-1 block leading-snug">
                {lang === "EN"
                  ? "Integrated marketing, growth, partnerships, campaign operations, and reporting."
                  : "Entegre pazarlama, büyüme, partnerlikler, kampanya operasyonu ve raporlama."}
              </span>
            </a>
            <a
              href={cryptoCvHref}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#d4d4d4] bg-[#fff] hover:border-[#000] transition-colors p-3 block"
            >
              <span className="font-sans text-[11px] font-bold text-[#000] uppercase tracking-wider block">
                {lang === "EN" ? "Crypto / Digital Assets / Exchange CV" : "Kripto / Dijital Varlık / Borsa CV"}
              </span>
              <span className="font-serif text-[11px] text-[#525252] mt-1 block leading-snug">
                {lang === "EN"
                  ? "Community, KOL growth, digital assets, fintech, and exchange roles."
                  : "Community, KOL growth, dijital varlık, fintech ve borsa rolleri."}
              </span>
            </a>
            <a
              href={brandCvHref}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#d4d4d4] bg-[#fff] hover:border-[#000] transition-colors p-3 block"
            >
              <span className="font-sans text-[11px] font-bold text-[#000] uppercase tracking-wider block">
                {lang === "EN" ? "Brand / Agency / Creator CV" : "Marka / Ajans / Kreatör CV"}
              </span>
              <span className="font-serif text-[11px] text-[#525252] mt-1 block leading-snug">
                {lang === "EN"
                  ? "Influencer marketing, creator partnerships, campaign ops, and reporting roles."
                  : "Influencer marketing, kreatör ortaklıkları, kampanya operasyonu ve raporlama rolleri."}
              </span>
            </a>
          </div>
        </div>

        {/* Section: Summary */}
        <div className="mb-6">
          <h2 className="font-sans text-sm font-bold tracking-widest text-[#000] border-b border-[#000] uppercase pb-1 mb-3">
            {lang === "EN" ? "PROFESSIONAL PROFILE" : "PROFESYONEL ÖZET"}
          </h2>
          <p className="font-serif text-[13px] text-[#262626] leading-relaxed text-justify">
            {lang === "EN"
              ? "Influencer Marketing Manager with 10+ years of experience spanning two connected chapters. Career started in traditional influencer marketing — building and scaling creator programmes for consumer, gaming, and technology brands (TEM Agency, H2O United, 2Gether Social), managing 150+ campaigns and a 200+ creator network for companies including Red Bull, ASUS, HP OMEN, Migros, Koton, and DeFacto. Since 2022, expanded into blockchain and digital-asset ecosystems — continuing to lead influencer marketing alongside broader launch operations, partnerships, and market intelligence for Metafluence, adidas Originals: Into the Metaverse, and Yuga Labs, covering blockchain launch communication, crypto KOL coordination, on-chain/market intelligence, and community workflows. Skilled in creator & KOL sourcing, negotiation, brief development, budget management, cross-functional production, and executive reporting."
              : "Kariyeri birbiriyle bağlantılı iki ana dönemden oluşan, 10+ yıllık deneyime sahip Influencer Marketing Yöneticisi. Kariyerine geleneksel influencer marketing ile başlayarak tüketici, oyun ve teknoloji markaları (TEM Agency, H2O United, 2Gether Social) için kreatör programları kurdu ve ölçeklendirdi; Red Bull, ASUS, HP OMEN, Migros, Koton ve DeFacto gibi devler için 150+ kampanya ve 200+ kişilik bir kreatör ağını yönetti. 2022'den itibaren blockchain ve dijital varlık ekosistemlerine genişleyerek Metafluence, adidas Originals: Into the Metaverse ve Yuga Labs projelerinde blockchain lansman iletişimi, crypto KOL koordinasyonu, on-chain/pazar istihbaratı ve operasyonel süreçleri yönetti. Kreatör ve KOL seçimi, bütçe yönetimi, prodüksiyon ve yönetici raporlamasında uzmanlaşmıştır."}
          </p>
        </div>

        {/* Section: Experience */}
        <div className="mb-6">
          <h2 className="font-sans text-sm font-bold tracking-widest text-[#000] border-b border-[#000] uppercase pb-1 mb-4">
            {lang === "EN" ? "PROFESSIONAL EXPERIENCE" : "MESLEKİ DENEYİM"}
          </h2>
          <div className="space-y-5">
            {experiences.map((exp, idx) => (
              <div key={idx} style={{ pageBreakInside: 'avoid' }}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-serif text-sm font-bold text-[#000]">
                      {exp.company}
                    </h3>
                    <p className="font-serif text-xs text-[#404040] italic">
                      {exp.role}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-sans text-[11px] font-bold text-[#171717] tracking-wider">
                      {exp.period}
                    </span>
                    <p className="font-sans text-[9px] font-semibold text-[#737373] uppercase tracking-widest">
                      {exp.tag}
                    </p>
                  </div>
                </div>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="font-serif text-[12px] text-[#262626] leading-relaxed">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Skills & Tools */}
        <div className="mb-6" style={{ pageBreakInside: 'avoid' }}>
          <h2 className="font-sans text-sm font-bold tracking-widest text-[#000] border-b border-[#000] uppercase pb-1 mb-4">
            {lang === "EN" ? "CORE COMPETENCIES & TECHNICAL TOOLS" : "YETENEKLER VE TEKNİK ARAÇLAR"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            {skills.map((category, idx) => (
              <div key={idx}>
                <h3 className="font-sans text-[11px] font-bold text-[#000] tracking-wider uppercase mb-2">
                  {category.title}
                </h3>
                <ul className="space-y-1">
                  {category.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="font-serif text-[11px] text-[#404040] flex items-start gap-1.5 leading-snug">
                      <span className="text-[#000] font-bold select-none">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-[#fafafa] p-4 border border-[#e5e5e5]" style={{ pageBreakInside: 'avoid' }}>
            <h3 className="font-sans text-[10px] font-bold text-[#000] tracking-wider uppercase mb-2">
              {lang === "EN" ? "WORK TOOLS" : "İŞ ARAÇLARI"}
            </h3>
            <div className="flex flex-wrap gap-x-2.5 gap-y-1 font-mono text-[10px] text-[#262626]">
              {toolGroups.flatMap((group) => group.items).map((item, idx) => (
                <span key={idx} className="after:content-[','] last:after:content-[''] font-semibold">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Section: Education */}
        <div className="mb-6" style={{ pageBreakInside: 'avoid' }}>
          <h2 className="font-sans text-sm font-bold tracking-widest text-[#000] border-b border-[#000] uppercase pb-1 mb-4">
            {lang === "EN" ? "EDUCATION" : "EĞİTİM"}
          </h2>
          <div className="space-y-4">
            {educations.map((edu, idx) => (
              <div key={idx} className="flex justify-between items-start">
                <div>
                  <h3 className="font-serif text-sm font-bold text-[#000]">
                    {edu.institution}
                  </h3>
                  <p className="font-serif text-xs text-[#404040] italic">
                    {edu.program}
                  </p>
                  <p className="font-serif text-[11px] text-[#525252] mt-1">
                    {edu.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer/Aesthetic Stamp */}
        <div className="text-center pt-6 border-t border-[#e5e5e5] mt-8">
          <p className="font-sans text-[9px] text-[#a3a3a3] uppercase tracking-[0.25em]">
            {lang === "EN"
              ? "Harvard Standard Layout Resume • Verified Professional Marketing Document"
              : "Harvard Standartlarında Resume • Doğrulanmış Profesyonel Pazarlama Dokümanı"}
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}
