import { useState, useEffect } from "react";
import Header from "./components/Header";
import About from "./components/About";
import Experience from "./components/Experience";
import SelectedWorks from "./components/SelectedWorks";
import SkillsAndTools from "./components/SkillsAndTools";
import Education from "./components/Education";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
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
} from "./data";

export default function App() {
  const [lang, setLang] = useState<"EN" | "TR">("EN");
  const [activeSection, setActiveSection] = useState("about");
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  // Localized data selection
  const t = lang === "EN" ? EN_TRANSLATION : TR_TRANSLATION;
  const experiences = lang === "EN" ? ENGLISH_EXPERIENCE : TURKISH_EXPERIENCE;
  const works = lang === "EN" ? ENGLISH_WORKS : TURKISH_WORKS;
  const skills = lang === "EN" ? ENGLISH_SKILLS : TURKISH_SKILLS;
  const tools = lang === "EN" ? ENGLISH_TOOL_GROUPS : TURKISH_TOOL_GROUPS;
  const profileFit = lang === "EN" ? ENGLISH_PROFILE_FIT : TURKISH_PROFILE_FIT;

  // Scroll section tracking using IntersectionObserver
  useEffect(() => {
    const sections = ["about", "experience", "works", "skills", "education", "contact"];
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
        onOpenCV={() => setIsCVModalOpen(true)}
      />

      {/* Full-width container sections */}
      <main className="relative z-10">
        <About t={t} profileFit={profileFit} />
        <Experience experiences={experiences} t={t} />
        <SelectedWorks works={works} t={t} lang={lang} />
        <SkillsAndTools skills={skills} tools={tools} t={t} />
        <Education t={t} lang={lang} />
        <ContactSection t={t} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Harvard ATS CV Modal */}
      <HarvardCVModal
        isOpen={isCVModalOpen}
        onClose={() => setIsCVModalOpen(false)}
        lang={lang}
        t={t}
        experiences={experiences}
        skills={skills}
      />

    </div>
  );
}
