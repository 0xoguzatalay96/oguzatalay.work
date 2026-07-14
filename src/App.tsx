import { useState, useEffect } from "react";
import { FileDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Header from "./components/Header";
import Hero from "./components/Hero";
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
  TOOLS_LIST,
} from "./data";

export default function App() {
  const [lang, setLang] = useState<"EN" | "TR">("EN");
  const [activeSection, setActiveSection] = useState("home");
  const [cvOpen, setCvOpen] = useState(false);
  const [showFab, setShowFab] = useState(false);

  // Localized data selection
  const t = lang === "EN" ? EN_TRANSLATION : TR_TRANSLATION;
  const experiences = lang === "EN" ? ENGLISH_EXPERIENCE : TURKISH_EXPERIENCE;
  const works = lang === "EN" ? ENGLISH_WORKS : TURKISH_WORKS;
  const skills = lang === "EN" ? ENGLISH_SKILLS : TURKISH_SKILLS;

  // Scroll section tracking using IntersectionObserver
  useEffect(() => {
    const sections = ["home", "about", "experience", "works", "skills", "education", "contact"];
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

    // Handle scroll for FAB
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowFab(true);
      } else {
        setShowFab(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observers.forEach((obs) => obs.disconnect());
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-[#131313] text-[#e4e2e1] min-h-screen font-sans selection:bg-[#FF0000] selection:text-white antialiased overflow-x-hidden">
      {/* Absolute top grid lines to establish brutalist grid theme across full frame */}
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#2a2a2a07_1px,transparent_1px)] bg-[size:80px_100%] pointer-events-none z-0" />

      {/* Header bar */}
      <Header t={t} lang={lang} setLang={setLang} activeSection={activeSection} onOpenCV={() => setCvOpen(true)} />

      {/* Full-width container sections */}
      <main className="relative z-10">
        <Hero t={t} onOpenCV={() => setCvOpen(true)} />
        <About t={t} onOpenCV={() => setCvOpen(true)} />
        <Experience experiences={experiences} t={t} />
        <SelectedWorks works={works} t={t} lang={lang} />
        <SkillsAndTools skills={skills} tools={TOOLS_LIST} t={t} />
        <Education t={t} lang={lang} />
        <ContactSection t={t} />
      </main>

      {/* Footer bar */}
      <Footer />

      {/* Harvard standard printable CV Modal */}
      <HarvardCVModal
        isOpen={cvOpen}
        onClose={() => setCvOpen(false)}
        lang={lang}
        t={t}
        experiences={experiences}
        skills={skills}
      />

      {/* Floating Action Button for CV Export */}
      <AnimatePresence>
        {showFab && !cvOpen && (
          <motion.button
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCvOpen(true)}
            className="fixed bottom-8 right-8 z-40 bg-[#FF0000] text-white p-4 shadow-[0_0_30px_rgba(255,0,0,0.4)] flex items-center gap-3 cursor-pointer group"
            style={{ borderRadius: "0px" }}
            id="fab-export-cv-btn"
          >
            <div className="flex flex-col items-start pr-2">
              <span className="font-archivo font-bold text-xs tracking-widest leading-none">
                {lang === "EN" ? "DOWNLOAD MD" : "MD İNDİR"}
              </span>
              <span className="text-[9px] font-medium tracking-widest text-white/70 mt-1 uppercase">
                {lang === "EN" ? "Harvard Format CV" : "Harvard Formatlı CV"}
              </span>
            </div>
            <div className="bg-white/20 p-2 group-hover:bg-white/30 transition-colors">
              <FileDown className="w-5 h-5" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
