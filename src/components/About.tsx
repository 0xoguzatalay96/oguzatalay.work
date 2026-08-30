import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ProfileFitItem, TranslationSet } from "../types";

interface AboutProps {
  t: TranslationSet;
  profileFit: ProfileFitItem[];
}

function renderInlineStrong(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return part;
  });
}

export default function About({ t, profileFit }: AboutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={containerRef}
      className="pt-24 pb-16 md:pt-28 md:pb-20 bg-[#131313] border-b border-[#2a2a2a] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-8 md:mb-10">
          <span className="font-mono text-[#FF0000] text-sm font-semibold tracking-wider">[ 01 ]</span>
          <h2 className="font-archivo text-xs md:text-sm font-extrabold tracking-[0.25em] text-white uppercase">
            {t.aboutSub}
          </h2>
          <div className="flex-grow h-[1px] bg-[#2a2a2a]" />
        </div>

        {/* Contents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* Headline (Left) */}
          <div className="lg:col-span-5">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-archivo text-3xl md:text-5xl font-bold tracking-tight text-white leading-[1.05]"
            >
              {t.aboutTitle}
            </motion.h3>
          </div>

          {/* Description Paragraph (Right) */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-sans text-base md:text-lg text-[#A0A0A0] leading-relaxed space-y-5"
            >
              {t.aboutText.split("\n\n").map((paragraph, index) => (
                <p key={index}>{renderInlineStrong(paragraph)}</p>
              ))}
            </motion.div>

            {/* Brutalist Stats Cards Grid with zero shadows and sharp edges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
              {/* Stat 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="border border-[#2a2a2a] p-4 flex flex-col justify-between h-28 hover:border-[#FF0000] transition-all duration-300 bg-black/10 hover:bg-black/25"
              >
                <div className="font-archivo text-4xl font-bold text-[#FF0000] flex items-baseline">
                  <span>{t.aboutYears}</span>
                </div>
                <div>
                  <p className="font-sans text-sm md:text-base font-medium text-white/90">{t.aboutYearsLabel}</p>
                </div>
              </motion.div>

              {/* Stat 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="border border-[#2a2a2a] p-4 flex flex-col justify-between h-28 hover:border-[#FF0000] transition-all duration-300 bg-black/10 hover:bg-black/25"
              >
                <div className="font-archivo text-4xl font-bold text-white flex items-baseline">
                  <span>{t.aboutCreators}</span>
                </div>
                <div>
                  <p className="font-sans text-sm md:text-base font-medium text-white/90">{t.aboutCreatorsLabel}</p>
                </div>
              </motion.div>

              {/* Stat 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="border border-[#2a2a2a] p-4 flex flex-col justify-between h-28 hover:border-[#FF0000] transition-all duration-300 bg-black/10 hover:bg-black/25"
              >
                <div className="font-archivo text-4xl font-bold text-white flex items-baseline">
                  <span>{t.aboutExperience}</span>
                </div>
                <div>
                  <p className="font-sans text-sm md:text-base font-medium text-white/90">{t.aboutExperienceLabel}</p>
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {profileFit.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.75, delay: 0.55 + index * 0.08 }}
                  className="border border-[#2a2a2a] bg-[#0f0f0f]/80 p-3.5 hover:border-[#FF0000]/70 transition-colors"
                >
                  <span className="font-mono text-[10px] font-bold tracking-[0.18em] text-[#FF0000] uppercase">
                    {item.label}
                  </span>
                  <h4 className="font-archivo text-base font-bold text-white leading-tight mt-2.5">
                    {item.title}
                  </h4>
                  <p className="font-sans text-sm text-[#A0A0A0] leading-relaxed mt-2.5">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
