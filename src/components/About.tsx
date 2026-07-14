import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { TranslationSet } from "../types";

interface AboutProps {
  t: TranslationSet;
  onOpenCV?: () => void;
}

export default function About({ t, onOpenCV }: AboutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [experienceCount, setExperienceCount] = useState(0);
  const [creatorsCount, setCreatorsCount] = useState(0);
  const [brandsCount, setBrandsCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      // Animate Experience Count
      let expTimer = setInterval(() => {
        setExperienceCount((prev) => {
          if (prev >= 9) { clearInterval(expTimer); return 9; }
          return prev + 1;
        });
      }, 100);

      // Animate Creators Count
      let creatorTimer = setInterval(() => {
        setCreatorsCount((prev) => {
          if (prev >= 200) { clearInterval(creatorTimer); return 200; }
          return prev + 10; }); }, 50);

      // Animate Brands Count
      let brandsTimer = setInterval(() => {
        setBrandsCount((prev) => {
          if (prev >= 150) { clearInterval(brandsTimer); return 150; }
          return prev + 5; }); }, 50);

      return () => {
        clearInterval(expTimer);
        clearInterval(creatorTimer);
        clearInterval(brandsTimer);
      };
    }
  }, [isInView]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-24 md:py-32 bg-[#131313] border-b border-[#2a2a2a] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16 md:mb-24">
          <span className="font-mono text-[#FF0000] text-sm font-semibold tracking-wider">[ 01 ]</span>
          <h2 className="font-archivo text-xs md:text-sm font-extrabold tracking-[0.25em] text-white uppercase">
            {t.aboutSub}
          </h2>
          <div className="flex-grow h-[1px] bg-[#2a2a2a]" />
        </div>

        {/* Contents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
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
          <div className="lg:col-span-7 flex flex-col gap-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-sans text-base md:text-lg text-[#A0A0A0] leading-relaxed"
            >
              {t.aboutText}
            </motion.p>

            {/* Brutalist Stats Cards Grid with zero shadows and sharp edges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {/* Stat 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="border border-[#2a2a2a] p-6 flex flex-col justify-between h-40 hover:border-[#FF0000] transition-all duration-300 bg-black/10 hover:bg-black/25"
              >
                <div className="font-archivo text-5xl font-bold text-[#FF0000] flex items-baseline">
                  <span>{experienceCount}</span>
                  <span className="text-white">+</span>
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
                className="border border-[#2a2a2a] p-6 flex flex-col justify-between h-40 hover:border-[#FF0000] transition-all duration-300 bg-black/10 hover:bg-black/25"
              >
                <div className="font-archivo text-5xl font-bold text-white flex items-baseline">
                  <span>{creatorsCount}</span>
                  <span className="text-[#FF0000]">+</span>
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
                className="border border-[#2a2a2a] p-6 flex flex-col justify-between h-40 hover:border-[#FF0000] transition-all duration-300 bg-black/10 hover:bg-black/25"
              >
                <div className="font-archivo text-5xl font-bold text-white flex items-baseline">
                  <span>{brandsCount}</span>
                  <span className="text-[#FF0000]">+</span>
                </div>
                <div>
                  <p className="font-sans text-sm md:text-base font-medium text-white/90">{t.aboutExperienceLabel}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
