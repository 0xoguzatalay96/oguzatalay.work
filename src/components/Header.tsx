import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Globe, Sparkles } from "lucide-react";
import { TranslationSet } from "../types";

interface HeaderProps {
  t: TranslationSet;
  lang: "EN" | "TR";
  setLang: (lang: "EN" | "TR") => void;
  activeSection: string;
  onOpenCvModal?: () => void;
}

export default function Header({ t, lang, setLang, activeSection, onOpenCvModal }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: t.navAbout, id: "about" },
    { label: t.navWorks, id: "works" },
    { label: t.navExperience, id: "experience" },
    { label: t.navSkills, id: "skills" },
    { label: t.navCertificates, id: "certificates" },
    { label: t.navEducation, id: "education" },
    { label: t.navContact, id: "contact" },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
          isScrolled
            ? "bg-[#131313]/90 backdrop-blur-md border-[#2a2a2a] py-4"
            : "bg-transparent border-transparent py-6"
        }`}
        id="app-header"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("about");
            }}
            className="group flex items-center gap-2 font-archivo text-xl md:text-2xl font-bold tracking-wider text-white"
            id="header-logo-link"
          >
            <span>OĞUZ ATALAY</span>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="text-[#FF0000] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" id="desktop-nav">
            <ul className="flex items-center gap-6 font-archivo text-sm font-semibold tracking-wider text-[#A0A0A0]">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id} className="relative">
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`cursor-pointer hover:text-white transition-colors duration-200 py-2 px-1 relative ${
                        isActive ? "text-white" : ""
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="activeUnderline"
                          className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FF0000]"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Language Switcher & Harvard CV Button */}
            <div className="flex items-center gap-3 pl-4 border-l border-[#2a2a2a] font-mono text-xs">
              {onOpenCvModal && (
                <button
                  onClick={onOpenCvModal}
                  className="cursor-pointer border border-[#FF0000] text-[#FF0000] hover:bg-[#FF0000] hover:text-white transition-all font-archivo font-bold px-2.5 py-1 flex items-center gap-1.5 uppercase tracking-wider text-[11px]"
                  id="header-cv-btn"
                >
                  <span>CV</span>
                </button>
              )}

              <div className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-[#A0A0A0]" />
                <button
                  onClick={() => setLang("EN")}
                  className={`cursor-pointer font-bold px-1 py-0.5 transition-colors ${
                    lang === "EN" ? "text-[#FF0000] border-b border-[#FF0000]" : "text-[#A0A0A0] hover:text-white"
                  }`}
                  id="lang-en-btn"
                >
                  EN
                </button>
                <span className="text-[#2a2a2a]">/</span>
                <button
                  onClick={() => setLang("TR")}
                  className={`cursor-pointer font-bold px-1 py-0.5 transition-colors ${
                    lang === "TR" ? "text-[#FF0000] border-b border-[#FF0000]" : "text-[#A0A0A0] hover:text-white"
                  }`}
                  id="lang-tr-btn"
                >
                  TR
                </button>
              </div>
            </div>
          </nav>

          {/* Mobile Menu & Lang Trigger */}
          <div className="flex lg:hidden items-center gap-4">
            {/* Quick Lang Switcher for mobile */}
            <button
              onClick={() => setLang(lang === "EN" ? "TR" : "EN")}
              className="font-mono text-xs text-[#A0A0A0] hover:text-white border border-[#2a2a2a] px-2 py-1 flex items-center gap-1.5"
              id="mobile-lang-btn"
            >
              <Globe className="w-3 h-3 text-[#FF0000]" />
              {lang === "EN" ? "TR" : "EN"}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-[#FF0000] transition-colors p-1 border border-[#2a2a2a]"
              aria-label="Toggle menu"
              id="mobile-menu-trigger"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[73px] left-0 w-full bg-[#131313]/95 backdrop-blur-lg border-b border-[#2a2a2a] z-40 lg:hidden py-8 px-6"
            id="mobile-nav-menu"
          >
            <ul className="flex flex-col gap-5 font-archivo text-base font-bold tracking-wider text-[#A0A0A0]">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left py-2 px-3 border-l-2 transition-all ${
                        isActive
                          ? "border-[#FF0000] text-white bg-white/5"
                          : "border-transparent hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
