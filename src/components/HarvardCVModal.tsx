import { X, FileText, Check, Copy, Download, ExternalLink } from "lucide-react";
import { useState, useRef } from "react";
import { CertificateItem, JobExperience, SkillCategory, TranslationSet } from "../types";
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
  certificates?: CertificateItem[];
}

export default function HarvardCVModal({
  isOpen,
  onClose,
  lang,
  t,
  experiences,
  skills,
  certificates = [],
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

    let md = `# OĞUZ ATALAY\n`;
    md += `**Influencer Marketing Manager | Digital Assets Marketing Operations**\n`;
    md += `İstanbul, Türkiye | +90 543 772 50 66 | oguz@oguzatalay.work | [linkedin.com/in/oguzatalay96](https://linkedin.com/in/oguzatalay96) | [oguzatalay.work](https://oguzatalay.work)\n\n`;
    md += `---\n\n`;

    md += `## ${lang === "EN" ? "PROFESSIONAL SUMMARY" : "PROFESYONEL ÖZET"}\n\n`;
    md += lang === "EN"
      ? `Influencer Marketing Manager with 10+ years of experience spanning two connected chapters. Career started in traditional influencer marketing — building and scaling creator programmes for consumer, gaming, and technology brands (TEM Agency, H2O United, 2Gether Social), managing 150+ campaigns and a 200+ creator/KOL network for companies including Red Bull, ASUS, HP OMEN, Migros, Koton, and DeFacto. Since 2022, expanded into blockchain and digital-asset ecosystems — continuing to manage influencer/creator marketing alongside broader marketing operations, partnerships, and community management for Metafluence, adidas Originals: Into the Metaverse, and Yuga Labs, covering blockchain launch communication, crypto KOL coordination, on-chain/market intelligence, and community management. Skilled in creator sourcing and negotiation, brief development, budget management, cross-functional production, and executive reporting.\n\n`
      : `İki birbiriyle bağlantılı dönemi kapsayan 10+ yıllık deneyime sahip Influencer Marketing Manager. Kariyerine geleneksel influencer marketing ile başladı — tüketici, oyun ve teknoloji markaları için (TEM Agency, H2O United, 2Gether Social) kreatör programları kurdu ve ölçeklendirdi; Red Bull, ASUS, HP OMEN, Migros, Koton ve DeFacto dahil olmak üzere sektör devleri için 150'den fazla kampanyayı ve 200'den fazla kreatör/KOL ağını yönetti. 2022'den bu yana blokzincir ve dijital varlık ekosistemlerine genişleyerek; Metafluence, adidas Originals: Into the Metaverse ve Yuga Labs için blokzincir lansman iletişimi, kripto KOL koordinasyonu, on-chain/pazar analitiği ve topluluk operasyonlarını yürüttü. Kreatör keşfi ve müzakeresi, brief geliştirme, bütçe yönetimi, çapraz fonksiyonlu prodüksiyon ve C-seviye yönetici raporlamasında derin yetkinliğe sahiptir.\n\n`;

    md += `## ${lang === "EN" ? "CORE COMPETENCIES" : "TEMEL YETKİNLİKLER"}\n\n`;
    skills.forEach((cat) => {
      md += `- **${cat.title}**: ${cat.items.join(", ")}\n`;
    });
    md += `\n`;

    md += `## ${lang === "EN" ? "PROFESSIONAL EXPERIENCE" : "MESLEKİ DENEYİM"}\n\n`;
    experiences.forEach((exp) => {
      md += `### ${exp.company} — ${exp.role}\n`;
      md += `*${exp.period} | ${exp.tag}*\n\n`;
      exp.bullets.forEach((bullet) => {
        md += `- ${bullet}\n`;
      });
      md += `\n`;
    });

    md += `## ${lang === "EN" ? "SELECTED CAMPAIGN IMPACT & PORTFOLIO" : "SEÇİLİ KAMPANYA BAŞARILARI"}\n\n`;
    works.forEach((work) => {
      md += `- **${work.title}** (${work.category}): ${work.subtitle} — *KPI: ${work.kpi}*\n`;
    });
    md += `\n`;

    if (certificates && certificates.length > 0) {
      md += `## ${lang === "EN" ? "CERTIFICATIONS & CREDENTIALS" : "SERTİFİKALAR VE UZMANLIKLAR"}\n\n`;
      certificates.forEach((cert) => {
        md += `- **${cert.title}** — ${cert.issuer} (${cert.date}) | [Verify Credential](${cert.credentialUrl})\n`;
      });
      md += `\n`;
    }

    md += `## ${lang === "EN" ? "TECHNICAL TOOLS & PLATFORMS" : "TEKNİK ARAÇLAR VE PLATFORMLAR"}\n\n`;
    tools.forEach((group) => {
      md += `- **${group.title}**: ${group.items.join(", ")}\n`;
    });
    md += `\n`;

    md += `## ${lang === "EN" ? "EDUCATION" : "EĞİTİM"}\n\n`;
    educations.forEach((edu) => {
      md += `- **${edu.institution}** — ${edu.program} (${edu.details})\n`;
    });

    const blob = new Blob([md], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Oguz_Atalay_CV_${lang}.md`);
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
  const works = lang === "EN" ? ENGLISH_WORKS : TURKISH_WORKS;
  const masterCvHref = lang === "EN"
    ? "/cv/Oguz_Atalay_CV.md"
    : "/cv/Oguz_Atalay_CV_TR.md";
  const pdfCvHref = "/cv/Oguz_Atalay_ATS_Harvard_CV_2025.pdf";
  const docxCvHref = "/cv/Oguz_Atalay_ATS_Harvard_CV_2025.docx";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000]/95 backdrop-blur-md overflow-y-auto p-4 md:p-6">
      {/* Top Action Bar */}
      <div className="fixed top-4 right-4 flex items-center gap-2.5 z-50">
        <button
          onClick={handleExportMD}
          disabled={isGenerating}
          className="flex items-center gap-2 bg-[#FF0000] hover:bg-[#d60000] disabled:bg-[#525252] text-[#fff] font-archivo font-bold text-xs tracking-wider px-4 py-2.5 transition-all cursor-pointer shadow-xl border border-[#FF0000]"
          style={{ borderRadius: "0px" }}
          id="print-cv-btn"
        >
          <Download className="w-4 h-4" />
          <span>{isGenerating ? (lang === "EN" ? "GENERATING..." : "HAZIRLANIYOR...") : (lang === "EN" ? "DOWNLOAD MD" : "MD İNDİR")}</span>
        </button>

        <button
          onClick={copyEmail}
          className="flex items-center gap-2 bg-[#1c1c1c] hover:bg-[#2e2e2e] text-[#fff] font-archivo font-bold text-xs tracking-wider px-4 py-2.5 transition-all cursor-pointer border border-[#3a3a3a]"
          style={{ borderRadius: "0px" }}
          id="copy-cv-email-btn"
        >
          {copied ? <Check className="w-4 h-4 text-[#00FF66]" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? (lang === "EN" ? "COPIED!" : "KOPYALANDI!") : "oguz@oguzatalay.work"}</span>
        </button>

        <button
          onClick={onClose}
          className="p-2.5 bg-[#171717] hover:bg-[#262626] text-[#a3a3a3] hover:text-[#fff] border border-[#3a3a3a] transition-all cursor-pointer"
          aria-label="Close CV"
          id="close-cv-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main CV Container (Harvard & Resume-Matcher ATS Aesthetic) */}
      <div className="w-full max-w-4xl my-8 overflow-y-auto max-h-[92vh] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border border-[#333]">
        <div 
          ref={cvRef}
          className="w-full bg-[#ffffff] text-[#111111] p-8 md:p-14 font-serif"
        >
          {/* Harvard Standard CV Header */}
          <div className="text-center border-b-2 border-[#111] pb-5 mb-6">
            <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-[#000] uppercase mb-2">
              OĞUZ ATALAY
            </h1>
            <p className="font-serif text-xs md:text-sm text-[#333] font-semibold tracking-wide italic mb-3">
              Influencer Marketing Manager | Digital Assets Marketing Operations
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-3.5 gap-y-1 font-sans text-xs text-[#333] font-medium">
              <span>{lang === "EN" ? "Istanbul, Turkey" : "İstanbul, Türkiye"}</span>
              <span className="text-[#999]">•</span>
              <a href="tel:+905437725066" className="hover:underline text-[#111]">
                +90 543 772 50 66
              </a>
              <span className="text-[#999]">•</span>
              <a href="mailto:oguz@oguzatalay.work" className="hover:underline text-[#111] font-semibold">
                oguz@oguzatalay.work
              </a>
              <span className="text-[#999]">•</span>
              <a href="https://linkedin.com/in/oguzatalay96" target="_blank" rel="noopener noreferrer" className="hover:underline text-[#111]">
                linkedin.com/in/oguzatalay96
              </a>
              <span className="text-[#999]">•</span>
              <a href="https://oguzatalay.work" target="_blank" rel="noopener noreferrer" className="hover:underline font-bold text-[#000]">
                oguzatalay.work
              </a>
            </div>
          </div>

          {/* Quick Downloads Bar */}
          <div className="mb-6 bg-[#f8f8f8] border border-[#e0e0e0] p-4" style={{ pageBreakInside: "avoid" }}>
            <h2 className="font-sans text-[11px] font-bold tracking-widest text-[#000] uppercase mb-2.5">
              {lang === "EN" ? "OFFICIAL RESUME FORMATS (ATS COMPLIANT)" : "RESMİ RESUME FORMATLARI (ATS UYUMLU)"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              <a
                href={masterCvHref}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="border border-[#d0d0d0] bg-[#fff] hover:border-[#000] transition-colors p-2.5 block"
              >
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[11px] font-bold text-[#000] uppercase tracking-wider">
                    Markdown CV (.MD)
                  </span>
                  <FileText className="w-3.5 h-3.5 text-[#555]" />
                </div>
                <span className="font-serif text-[11px] text-[#555] mt-0.5 block leading-tight">
                  {lang === "EN" ? "Full portfolio & metrics source" : "Tüm metrik ve kampanya dökümü"}
                </span>
              </a>

              <a
                href={pdfCvHref}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="border border-[#d0d0d0] bg-[#fff] hover:border-[#000] transition-colors p-2.5 block"
              >
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[11px] font-bold text-[#000] uppercase tracking-wider">
                    Harvard ATS (PDF)
                  </span>
                  <Download className="w-3.5 h-3.5 text-[#FF0000]" />
                </div>
                <span className="font-serif text-[11px] text-[#555] mt-0.5 block leading-tight">
                  {lang === "EN" ? "Corporate ATS-verified PDF" : "Kurumsal ATS uyumlu PDF"}
                </span>
              </a>

              <a
                href={docxCvHref}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="border border-[#d0d0d0] bg-[#fff] hover:border-[#000] transition-colors p-2.5 block"
              >
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[11px] font-bold text-[#000] uppercase tracking-wider">
                    Editable Word (.DOCX)
                  </span>
                  <FileText className="w-3.5 h-3.5 text-[#555]" />
                </div>
                <span className="font-serif text-[11px] text-[#555] mt-0.5 block leading-tight">
                  {lang === "EN" ? "Editable recruitment DOCX" : "Düzenlenebilir İK formatı"}
                </span>
              </a>
            </div>
          </div>

          {/* Section: Professional Summary */}
          <div className="mb-6">
            <h2 className="font-sans text-xs font-bold tracking-widest text-[#000] border-b border-[#000] uppercase pb-1 mb-2.5">
              {lang === "EN" ? "PROFESSIONAL SUMMARY" : "PROFESYONEL ÖZET"}
            </h2>
            <p className="font-serif text-[12.5px] text-[#222] leading-relaxed text-justify">
              {lang === "EN"
                ? "Influencer Marketing Manager with 10+ years of experience spanning two connected chapters. Career started in traditional influencer marketing — building and scaling creator programmes for consumer, gaming, and technology brands (TEM Agency, H2O United, 2Gether Social), managing 150+ campaigns and a 200+ creator/KOL network for companies including Red Bull, ASUS, HP OMEN, Migros, Koton, and DeFacto. Since 2022, expanded into blockchain and digital-asset ecosystems — continuing to manage influencer/creator marketing alongside broader marketing operations, partnerships, and community management for Metafluence, adidas Originals: Into the Metaverse, and Yuga Labs, covering blockchain launch communication, crypto KOL coordination, on-chain/market intelligence, and community management. Skilled in creator sourcing and negotiation, brief development, budget management, cross-functional production, and executive reporting."
                : "İki birbiriyle bağlantılı dönemi kapsayan 10+ yıllık deneyime sahip Influencer Marketing Manager. Kariyerine geleneksel influencer marketing ile başladı — tüketici, oyun ve teknoloji markaları için (TEM Agency, H2O United, 2Gether Social) kreatör programları kurdu ve ölçeklendirdi; Red Bull, ASUS, HP OMEN, Migros, Koton ve DeFacto dahil olmak üzere sektör devleri için 150'den fazla kampanyayı ve 200'den fazla kreatör/KOL ağını yönetti. 2022'den bu yana blokzincir ve dijital varlık ekosistemlerine genişleyerek; Metafluence, adidas Originals: Into the Metaverse ve Yuga Labs için blokzincir lansman iletişimi, kripto KOL koordinasyonu, on-chain/pazar analitiği ve topluluk operasyonlarını yürüttü. Kreatör keşfi ve müzakeresi, brief geliştirme, bütçe yönetimi, çapraz fonksiyonlu prodüksiyon ve C-seviye yönetici raporlamasında derin yetkinliğe sahiptir."}
            </p>
          </div>

          {/* Section: Core Competencies */}
          <div className="mb-6" style={{ pageBreakInside: "avoid" }}>
            <h2 className="font-sans text-xs font-bold tracking-widest text-[#000] border-b border-[#000] uppercase pb-1 mb-2.5">
              {lang === "EN" ? "CORE COMPETENCIES" : "TEMEL YETKİNLİKLER"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
              {skills.map((category, idx) => (
                <div key={idx} className="text-[12px]">
                  <span className="font-sans font-bold text-[#000] uppercase text-[11px] block mb-0.5">
                    {category.title}
                  </span>
                  <p className="font-serif text-[#333] leading-snug">
                    {category.items.join(" • ")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Professional Experience */}
          <div className="mb-6">
            <h2 className="font-sans text-xs font-bold tracking-widest text-[#000] border-b border-[#000] uppercase pb-1 mb-4">
              {lang === "EN" ? "PROFESSIONAL EXPERIENCE" : "MESLEKİ DENEYİM"}
            </h2>
            <div className="space-y-4">
              {experiences.map((exp, idx) => (
                <div key={idx} style={{ pageBreakInside: "avoid" }}>
                  <div className="flex justify-between items-baseline mb-1">
                    <div>
                      <h3 className="font-serif text-[13.5px] font-bold text-[#000]">
                        {exp.company}
                      </h3>
                      <p className="font-serif text-xs text-[#444] italic">
                        {exp.role}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-sans text-[11px] font-bold text-[#111] tracking-wider block">
                        {exp.period}
                      </span>
                      <span className="font-sans text-[9px] font-semibold text-[#666] uppercase tracking-widest">
                        {exp.tag}
                      </span>
                    </div>
                  </div>
                  <ul className="list-disc pl-4 space-y-1 mt-1.5">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="font-serif text-[12px] text-[#222] leading-relaxed">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Selected Campaign Impact */}
          <div className="mb-6" style={{ pageBreakInside: "avoid" }}>
            <h2 className="font-sans text-xs font-bold tracking-widest text-[#000] border-b border-[#000] uppercase pb-1 mb-3">
              {lang === "EN" ? "SELECTED CAMPAIGN IMPACT" : "SEÇİLİ KAMPANYA ETKİSİ"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {works.map((work, idx) => (
                <div key={idx} className="border-l-2 border-[#111] pl-2.5 py-0.5">
                  <span className="font-sans text-[11px] font-bold text-[#000] block">
                    {work.title}
                  </span>
                  <span className="font-serif text-[11px] text-[#555] block">
                    {work.subtitle}
                  </span>
                  {work.kpi && (
                    <span className="font-mono text-[10px] font-bold text-[#FF0000] block mt-0.5">
                      KPI: {work.kpi}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section: Verified Certifications */}
          {certificates && certificates.length > 0 && (
            <div className="mb-6" style={{ pageBreakInside: "avoid" }}>
              <h2 className="font-sans text-xs font-bold tracking-widest text-[#000] border-b border-[#000] uppercase pb-1 mb-3">
                {lang === "EN" ? "VERIFIED CERTIFICATIONS & SPECIALIZATIONS" : "DOĞRULANMIŞ SERTİFİKALAR VE UZMANLIKLAR"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11.5px]">
                {certificates.map((cert, idx) => (
                  <div key={idx} className="flex items-start justify-between gap-2 border-b border-[#f0f0f0] pb-1.5">
                    <div>
                      <span className="font-serif font-bold text-[#000] block leading-tight">
                        {cert.title}
                      </span>
                      <span className="font-sans text-[10px] text-[#666]">
                        {cert.issuer} • {cert.date}
                      </span>
                    </div>
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-[10px] font-bold text-[#FF0000] hover:underline shrink-0 flex items-center gap-0.5"
                    >
                      <span>Verify</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Technical Tools & Platforms */}
          <div className="mb-6" style={{ pageBreakInside: "avoid" }}>
            <h2 className="font-sans text-xs font-bold tracking-widest text-[#000] border-b border-[#000] uppercase pb-1 mb-2.5">
              {lang === "EN" ? "TOOLS & PLATFORMS" : "ARAÇLAR VE PLATFORMLAR"}
            </h2>
            <div className="space-y-1.5 font-mono text-[11px] text-[#222]">
              {toolGroups.map((group, idx) => (
                <div key={idx} className="flex flex-wrap gap-x-1.5 items-baseline">
                  <span className="font-sans font-bold text-[10.5px] text-[#000] uppercase">
                    {group.title}:
                  </span>
                  <span className="text-[#444]">
                    {group.items.join(", ")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Education */}
          <div className="mb-6" style={{ pageBreakInside: "avoid" }}>
            <h2 className="font-sans text-xs font-bold tracking-widest text-[#000] border-b border-[#000] uppercase pb-1 mb-3">
              {lang === "EN" ? "EDUCATION" : "EĞİTİM"}
            </h2>
            <div className="space-y-2.5">
              {educations.map((edu, idx) => (
                <div key={idx} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-[13px] font-bold text-[#000]">
                      {edu.institution}
                    </h3>
                    <p className="font-serif text-xs text-[#444] italic">
                      {edu.program}
                    </p>
                  </div>
                  <span className="font-sans text-[11px] font-semibold text-[#666]">
                    {edu.details}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Stamp */}
          <div className="text-center pt-5 border-t border-[#e0e0e0] mt-6">
            <p className="font-sans text-[9px] text-[#888] uppercase tracking-[0.25em]">
              {lang === "EN"
                ? "Harvard Standard Layout Resume • Verified Executive Marketing Document"
                : "Harvard Standartlarında Resume • Doğrulanmış Yönetici Pazarlama Dokümanı"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
