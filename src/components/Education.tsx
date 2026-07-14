import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { GraduationCap, Award } from "lucide-react";
import { TranslationSet } from "../types";
import { EDUCATION_LIST_EN, EDUCATION_LIST_TR } from "../data";

interface EducationProps {
  t: TranslationSet;
  lang: "EN" | "TR";
}

export default function Education({ t, lang }: EducationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const educationItems = lang === "EN" ? EDUCATION_LIST_EN : EDUCATION_LIST_TR;

  return (
    <section
      id="education"
      ref={containerRef}
      className="py-24 md:py-32 bg-[#131313] border-b border-[#2a2a2a] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16 md:mb-24">
          <span className="font-mono text-[#FF0000] text-sm font-semibold tracking-wider">[ 06 ]</span>
          <h2 className="font-archivo text-xs md:text-sm font-extrabold tracking-[0.25em] text-white uppercase">
            {t.educationTitle}
          </h2>
          <div className="flex-grow h-[1px] bg-[#2a2a2a]" />
        </div>

        {/* Education Blocks */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {educationItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: idx * 0.2 }}
              className="border border-[#2a2a2a] bg-black/30 p-6 md:p-8 hover:border-[#FF0000] transition-colors duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 border border-[#2a2a2a] bg-[#131313] text-[#FF0000] group-hover:border-[#FF0000]/40 transition-colors">
                    {idx === 0 ? <GraduationCap className="w-5 h-5" /> : <Award className="w-5 h-5" />}
                  </div>
                  <span className="font-mono text-[10px] font-bold text-[#FF0000] tracking-widest uppercase">
                    {idx === 0 ? "DEGREE" : "ACCREDITATION"}
                  </span>
                </div>

                <h3 className="font-archivo text-xl font-bold text-white tracking-wide mb-2 group-hover:text-[#FF0000] transition-colors">
                  {item.institution}
                </h3>
                
                <h4 className="font-sans text-sm text-[#A0A0A0] font-semibold mb-4 group-hover:text-white transition-colors">
                  {item.program}
                </h4>
              </div>

              <div className="border-t border-[#2a2a2a]/60 pt-4 mt-6">
                <p className="font-sans text-xs text-[#555] leading-relaxed group-hover:text-[#A0A0A0] transition-colors">
                  {item.details}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
