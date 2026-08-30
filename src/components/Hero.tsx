import { motion } from "motion/react";
import { ArrowDown, Mail } from "lucide-react";
import { TranslationSet } from "../types";

interface HeroProps {
  t: TranslationSet;
}

export default function Hero({ t }: HeroProps) {
  const isTR = t.navHome === "Ana Sayfa";
  const executiveSummary = t.heroSub;

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
      className="relative min-h-[70svh] md:min-h-[75vh] bg-[#131313] flex flex-col justify-center pt-24 md:pt-28 pb-16 md:pb-20 overflow-hidden border-b border-[#2a2a2a]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a2a2a12_1px,transparent_1px),linear-gradient(to_bottom,#2a2a2a12_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 flex flex-col justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="font-archivo text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-black tracking-tight text-white leading-[1.05] mb-6 w-full flex flex-col items-start"
        >
          <span className="block text-white">
            Influencer Marketing Manager
          </span>
          <span className="block h-[3px] md:h-[4px] w-28 sm:w-44 md:w-56 bg-[#FF0000] my-3 sm:my-4 md:my-5" />
          <span className="block text-[#E5E5E5]">
            Digital Assets Marketing Operations
          </span>
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-2 w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="font-sans text-base md:text-lg text-[#A0A0A0] leading-relaxed lg:col-span-8 max-w-4xl"
          >
            {executiveSummary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="lg:col-span-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-start lg:justify-end gap-3"
          >
            <button
              onClick={() => handleScrollToSection("works")}
              className="cursor-pointer bg-[#FF0000] text-white hover:bg-[#d80000] transition-colors duration-300 font-archivo font-bold text-xs md:text-sm tracking-widest px-5 py-3.5 flex items-center justify-center gap-2 border border-[#FF0000] active:scale-95 whitespace-nowrap shadow-[0_0_20px_rgba(255,0,0,0.25)]"
              style={{ borderRadius: "0px" }}
              id="hero-view-works-btn"
            >
              <span>{t.heroBtn || "VIEW PROJECTS"}</span>
              <ArrowDown className="w-4 h-4 text-white" />
            </button>

            <button
              onClick={() => handleScrollToSection("contact")}
              className="cursor-pointer bg-transparent text-white hover:bg-white/5 transition-colors duration-300 font-archivo font-bold text-xs md:text-sm tracking-widest px-5 py-3.5 flex items-center justify-center gap-2 border border-[#3a3a3a] hover:border-white active:scale-95 whitespace-nowrap"
              style={{ borderRadius: "0px" }}
              id="hero-get-in-touch-btn"
            >
              <span>{t.heroBtnContact || (isTR ? "İLETİŞİME GEÇ" : "GET IN TOUCH")}</span>
              <Mail className="w-4 h-4 text-[#A0A0A0]" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
