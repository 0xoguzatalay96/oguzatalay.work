import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import SelectedWorks from "./components/SelectedWorks";
import SkillsAndTools from "./components/SkillsAndTools";
import Certificates from "./components/Certificates";
import Education from "./components/Education";
import ContactSection from "./components/ContactSection";
import HarvardCVModal from "./components/HarvardCVModal";

import {
  EN_TRANSLATION,
  TR_TRANSLATION,
  ENGLISH_EXPERIENCE,
  TURKISH_EXPERIENCE,
  ENGLISH_WORKS,
  TURKISH_WORKS,
  ENGLISH_SKILLS,
  TURKISH_SKILLS,
  ENGLISH_TOOL_GROUPS,
  TURKISH_TOOL_GROUPS,
  ENGLISH_PROFILE_FIT,
  TURKISH_PROFILE_FIT,
  CERTIFICATES_EN,
  CERTIFICATES_TR,
} from "./data";

export default function App() {
  const [lang, setLang] = useState<"EN" | "TR">("EN");
  const [activeSection, setActiveSection] = useState("about");
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);

  // Localized data selection
  const t = lang === "EN" ? EN_TRANSLATION : TR_TRANSLATION;
  const experiences = lang === "EN" ? ENGLISH_EXPERIENCE : TURKISH_EXPERIENCE;
  const works = lang === "EN" ? ENGLISH_WORKS : TURKISH_WORKS;
  const skills = lang === "EN" ? ENGLISH_SKILLS : TURKISH_SKILLS;
  const tools = lang === "EN" ? ENGLISH_TOOL_GROUPS : TURKISH_TOOL_GROUPS;
  const profileFit = lang === "EN" ? ENGLISH_PROFILE_FIT : TURKISH_PROFILE_FIT;
  const certificates = lang === "EN" ? CERTIFICATES_EN : CERTIFICATES_TR;

  // Enforce global standard title
  useEffect(() => {
    document.title = "Influencer Marketing Manager | Digital Assets Marketing Operations";
  }, [lang]);

  // Scroll section tracking using IntersectionObserver
  useEffect(() => {
    const sections = ["home", "about", "works", "experience", "skills", "certificates", "education", "contact"];
    const observers: IntersectionObserver[] = [];

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // Trigger when section occupies the active view zone
      threshold: 0,
    };

    sections.forEach((sectionId) => {
      const el = document.getElementById(sectionId);
      if (el) {
        const observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(sectionId);
          }
        }, observerOptions);
        
        observer.observe(el);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <div className="bg-[#131313] text-[#e4e2e1] min-h-screen font-sans selection:bg-[#FF0000] selection:text-white antialiased overflow-x-hidden">
      {/* Absolute top grid lines to establish brutalist grid theme across full frame */}
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#2a2a2a07_1px,transparent_1px)] bg-[size:80px_100%] pointer-events-none z-0" />

      {/* Header bar */}
      <Header
        t={t}
        lang={lang}
        setLang={setLang}
        activeSection={activeSection}
        onOpenCvModal={() => setIsCvModalOpen(true)}
      />

      {/* Full-width container sections */}
      <main className="relative z-10">
        <Hero t={t} />
        <About t={t} profileFit={profileFit} />
        <SelectedWorks works={works} t={t} lang={lang} />
        <Experience experiences={experiences} t={t} />
        <SkillsAndTools skills={skills} tools={tools} t={t} />
        <Certificates certificates={certificates} t={t} lang={lang} />
        <Education t={t} lang={lang} />
        <ContactSection t={t} />
      </main>

      {/* Harvard Standard CV Modal */}
      <HarvardCVModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
        lang={lang}
        t={t}
        experiences={experiences}
        skills={skills}
        certificates={certificates}
      />
    </div>
  );
}
