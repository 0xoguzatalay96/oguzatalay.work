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
  const degreeLabels = lang === "EN" ? ["BACHELOR", "ASSOCIATE"] : ["LİSANS", "ÖN LİSANS"];

  return (
    <section
      id="education"
      ref={containerRef}
      className="py-16 md:py-20 bg-[#131313] border-b border-[#2a2a2a] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-8 md:mb-10">
          <span className="font-mono text-[#FF0000] text-sm font-semibold tracking-wider">[ 07 ]</span>
          <h2 className="font-archivo text-xs md:text-sm font-extrabold tracking-[0.25em] text-white uppercase">
            {t.educationTitle}
          </h2>
          <div className="flex-grow h-[1px] bg-[#2a2a2a]" />
        </div>

        {/* Education Blocks */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {educationItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: idx * 0.2 }}
              className="border border-[#2a2a2a] bg-black/30 p-4 md:p-5 hover:border-[#FF0000] transition-colors duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 border border-[#2a2a2a] bg-[#131313] text-[#FF0000] group-hover:border-[#FF0000]/40 transition-colors">
                    {idx === 0 ? <GraduationCap className="w-5 h-5" /> : <Award className="w-5 h-5" />}
                  </div>
                  <span className="font-mono text-[10px] font-bold text-[#FF0000] tracking-widest uppercase">
                    {degreeLabels[idx] ?? (lang === "EN" ? "EDUCATION" : "EĞİTİM")}
                  </span>
                </div>

                <h3 className="font-archivo text-xl font-bold text-white tracking-wide mb-2 group-hover:text-[#FF0000] transition-colors">
                  {item.institution}
                </h3>
                
                <h4 className="font-sans text-sm text-[#A0A0A0] font-semibold mb-3 group-hover:text-white transition-colors">
                  {item.program}
                </h4>
              </div>

              <div className="border-t border-[#2a2a2a]/60 pt-3 mt-4">
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
