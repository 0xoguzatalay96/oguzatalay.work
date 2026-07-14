import { motion } from "motion/react";
import { ArrowDown, Sparkles, FileText } from "lucide-react";
import { TranslationSet } from "../types";
import { LOGO_BRANDS } from "../data";

interface HeroProps {
  t: TranslationSet;
  onOpenCV?: () => void;
}

export default function Hero({ t, onOpenCV }: HeroProps) {
  const words = t.heroTitle.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const handleScrollToWorks = () => {
    const element = document.getElementById("works");
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
      className="relative min-h-screen bg-[#131313] flex flex-col justify-center pt-24 overflow-hidden border-b border-[#2a2a2a]"
    >
      {/* Brutalist Grid Background overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a2a2a12_1px,transparent_1px),linear-gradient(to_bottom,#2a2a2a12_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Decorative ambient glowing center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF0000]/3 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 flex flex-col justify-center flex-grow">
        {/* Animated Bracket Metadata */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex items-center gap-2 font-mono text-xs text-[#FF0000] mb-8"
        >
          <span className="text-[#A0A0A0]">[</span>
          <span>LEAD INFLUENCER MARKETING & CAMPAIGN OPERATOR</span>
          <span className="text-[#A0A0A0]">]</span>
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1.5 h-1.5 bg-[#FF0000]"
          />
        </motion.div>

        {/* Massive Condensed Headline */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-archivo text-5xl md:text-7xl lg:text-[88px] font-bold tracking-tight leading-[0.95] text-white max-w-5xl mb-8"
        >
          {words.map((word, idx) => {
            const isRed = word === "IMPACT" || word === "ETKİ";
            return (
              <span key={idx} className="inline-block overflow-hidden mr-[0.3em] py-1">
                <motion.span
                  variants={wordVariants}
                  className={`inline-block ${isRed ? "text-[#FF0000]" : "text-white"}`}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </motion.h1>

        {/* Description & Button Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-4 max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-sans text-base md:text-lg text-[#A0A0A0] leading-relaxed lg:col-span-8"
          >
            {t.heroSub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="lg:col-span-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-start lg:justify-end gap-3"
          >
            {/* View Works Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleScrollToWorks}
              className="cursor-pointer bg-[#FF0000] text-white hover:bg-[#d60000] transition-colors duration-300 font-archivo font-bold text-sm tracking-widest px-8 py-5 flex items-center justify-center gap-3 border-0 active:scale-95 whitespace-nowrap"
              style={{ borderRadius: "0px" }}
              id="hero-view-works-btn"
            >
              <span>{t.heroBtn}</span>
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <ArrowDown className="w-4 h-4" />
              </motion.div>
            </motion.button>

            {/* Print/Export CV Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenCV}
              className="cursor-pointer bg-transparent border border-white/20 hover:border-[#FF0000] hover:bg-[#FF0000]/10 text-white hover:text-white transition-all duration-300 font-archivo font-bold text-sm tracking-widest px-8 py-5 flex items-center justify-center gap-3 active:scale-95 whitespace-nowrap"
              style={{ borderRadius: "0px" }}
              id="hero-export-cv-btn"
            >
              <FileText className="w-4 h-4 text-[#FF0000]" />
              <span>EXPORT CV</span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Infinite Logo Marquee Carousel */}
      <div className="w-full border-t border-b border-[#2a2a2a] bg-[#0e0e0e] py-6 overflow-hidden relative z-10 mt-auto">
        <div className="flex w-max items-center animate-[marquee_120s_linear_infinite]">
          {/* First loop of logos */}
          <div className="flex gap-16 md:gap-24 px-4 items-center">
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
          <div className="flex gap-16 md:gap-24 px-4 items-center">
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
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
