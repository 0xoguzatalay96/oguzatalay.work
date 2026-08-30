import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { TranslationSet } from "../types";
import { LOGO_BRANDS } from "../data";

const EN_DESKTOP_TITLES = [
  ["Marketing", "Manager"],
  ["Integrated Marketing", "Manager"],
  ["Growth & Partnerships", "Manager"],
  ["Digital Asset", "Marketing Manager"],
  ["Marketing Operations &", "Partnerships Manager"],
];

const EN_MOBILE_TITLES = [
  ["Marketing", "Manager"],
  ["Integrated", "Marketing", "Manager"],
  ["Growth &", "Partnerships", "Manager"],
  ["Digital Asset", "Marketing", "Manager"],
  ["Marketing Operations", "& Partnerships", "Manager"],
];

const TR_DESKTOP_TITLES = [
  ["Marketing", "Manager"],
  ["Entegre Pazarlama", "Yöneticisi"],
  ["Büyüme & Partnerlikler", "Yöneticisi"],
  ["Dijital Varlık", "Pazarlama Yöneticisi"],
  ["Pazarlama Operasyonları &", "Ortaklıklar Yöneticisi"],
];

const TR_MOBILE_TITLES = [
  ["Marketing", "Manager"],
  ["Entegre", "Pazarlama", "Yöneticisi"],
  ["Büyüme &", "Partnerlikler", "Yöneticisi"],
  ["Dijital Varlık", "Pazarlama", "Yöneticisi"],
  ["Pazarlama Operasyonları", "& Ortaklıklar", "Yöneticisi"],
];

interface HeroProps {
  t: TranslationSet;
}

export default function Hero({ t }: HeroProps) {
  const [titleIndex, setTitleIndex] = useState(0);
  const isTR = t.navHome === "Ana Sayfa";
  const executiveSummary = t.heroSub;
  const desktopTitles = isTR ? TR_DESKTOP_TITLES : EN_DESKTOP_TITLES;
  const mobileTitles = isTR ? TR_MOBILE_TITLES : EN_MOBILE_TITLES;

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTitleIndex((current) => (current + 1) % EN_DESKTOP_TITLES.length);
    }, 2600);

    return () => window.clearInterval(intervalId);
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
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
    <section
      id="home"
      className="relative min-h-[82svh] md:min-h-[88vh] bg-[#131313] flex flex-col pt-20 md:pt-24 overflow-hidden border-b border-[#2a2a2a]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a2a2a12_1px,transparent_1px),linear-gradient(to_bottom,#2a2a2a12_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 flex flex-col justify-center py-12 md:py-14">
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          aria-label={desktopTitles.map((titleLines) => titleLines.join(" ")).join(" / ")}
          className="headline-perspective mb-6"
        >
          <span className="headline-stage headline-stage-desktop" aria-hidden="true">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={`desktop-title-${titleIndex}`}
                className="headline-face-frame"
                initial={{ opacity: 0, rotateX: -78, y: 16 }}
                animate={{ opacity: 1, rotateX: 0, y: 0 }}
                exit={{ opacity: 0, rotateX: 78, y: -16 }}
                transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
              >
                {desktopTitles[titleIndex].map((line) => (
                  <span key={line} className="headline-line">
                    {line}
                  </span>
                ))}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="headline-stage headline-stage-mobile" aria-hidden="true">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={`mobile-title-${titleIndex}`}
                className="headline-face-frame"
                initial={{ opacity: 0, rotateX: -78, y: 12 }}
                animate={{ opacity: 1, rotateX: 0, y: 0 }}
                exit={{ opacity: 0, rotateX: 78, y: -12 }}
                transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
              >
                {mobileTitles[titleIndex].map((line) => (
                  <span key={line} className="headline-line">
                    {line}
                  </span>
                ))}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-2 max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="font-sans text-base md:text-lg text-[#A0A0A0] leading-relaxed lg:col-span-8"
          >
            {executiveSummary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="lg:col-span-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-start lg:justify-end gap-3"
          >
            <button
              onClick={() => handleScrollToSection("works")}
              className="cursor-pointer bg-transparent text-white hover:bg-white/5 transition-colors duration-300 font-archivo font-bold text-sm tracking-widest px-6 py-4 flex items-center justify-center gap-3 border border-[#3a3a3a] active:scale-95 whitespace-nowrap"
              style={{ borderRadius: "0px" }}
              id="hero-view-works-btn"
            >
              <span>{t.heroBtn}</span>
              <ArrowDown className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Infinite Logo Marquee Carousel */}
      <div className="w-full border-t border-b border-[#2a2a2a] bg-[#0e0e0e] py-4 md:py-5 overflow-hidden relative z-10 mt-auto">
        <div className="brand-marquee-track flex w-max items-center animate-[marquee_120s_linear_infinite]">
          {/* First loop of logos */}
          <div className="brand-marquee-group flex items-center">
            {LOGO_BRANDS.map((brand, i) => (
              <div
                key={`b1-${i}`}
                className="flex items-center gap-3 font-archivo text-sm md:text-base font-bold tracking-[0.2em] text-[#555555] hover:text-white transition-colors duration-300 cursor-default"
              >
                <span className="w-1.5 h-1.5 bg-[#FF0000]" />
                <span>{brand}</span>
              </div>
            ))}
          </div>
          {/* Repeated loop for seamless scrolling */}
          <div className="brand-marquee-group flex items-center">
            {LOGO_BRANDS.map((brand, i) => (
              <div
                key={`b2-${i}`}
                className="flex items-center gap-3 font-archivo text-sm md:text-base font-bold tracking-[0.2em] text-[#555555] hover:text-white transition-colors duration-300 cursor-default"
              >
                <span className="w-1.5 h-1.5 bg-[#FF0000]" />
                <span>{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Keyframes in inline style or Tailwind */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .brand-marquee-track {
          --brand-gap: clamp(4rem, 7vw, 6rem);
          will-change: transform;
        }
        .brand-marquee-group {
          gap: var(--brand-gap);
          padding-right: var(--brand-gap);
        }
        .headline-perspective {
          display: inline-block;
          width: fit-content;
          max-width: 100%;
          height: 9.2rem;
          perspective: 1200px;
        }
        .headline-stage {
          position: relative;
          display: block;
          width: max-content;
          max-width: 100%;
          height: 100%;
          transform-style: preserve-3d;
        }
        .headline-stage-mobile {
          display: none;
        }
        .headline-face-frame {
          display: flex;
          width: max-content;
          max-width: calc(100vw - 3rem);
          flex-direction: column;
          align-items: flex-start;
          backface-visibility: hidden;
          padding: 0;
          color: #fff;
          font-family: Archivo, ui-sans-serif, system-ui, sans-serif;
          font-size: 4.25rem;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 0.98;
          text-align: left;
          transform-origin: 50% 50%;
          will-change: transform, opacity;
        }
        .headline-line {
          display: block;
          width: max-content;
          max-width: 100%;
          white-space: nowrap;
        }
        @media (max-width: 767px) {
          .headline-perspective {
            height: 7.45rem;
          }
          .headline-stage-desktop {
            display: none;
          }
          .headline-stage-mobile {
            display: block;
          }
          .headline-face-frame {
            font-size: 1.55rem;
            line-height: 1.02;
            padding: 0;
          }
        }
        @media (min-width: 1280px) {
          .headline-perspective {
            height: 9.6rem;
          }
          .headline-face-frame {
            font-size: 4.55rem;
          }
        }
        @media (max-width: 374px) {
          .headline-perspective {
            height: 7.1rem;
          }
          .headline-face-frame {
            font-size: 1.45rem;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .headline-face-frame {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
