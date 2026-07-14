import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { JobExperience, TranslationSet } from "../types";
import { Briefcase, Calendar, ChevronDown, ChevronUp } from "lucide-react";

interface ExperienceProps {
  experiences: JobExperience[];
  t: TranslationSet;
}

export default function Experience({ experiences, t }: ExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // first is open by default

  const toggleExpand = (idx: number) => {
    if (expandedIndex === idx) {
      setExpandedIndex(null); // close it
    } else {
      setExpandedIndex(idx); // open it
    }
  };

  return (
    <section
      id="experience"
      ref={containerRef}
      className="py-24 md:py-32 bg-[#131313] border-b border-[#2a2a2a] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16 md:mb-24">
          <span className="font-mono text-[#FF0000] text-sm font-semibold tracking-wider">[ 02 ]</span>
          <h2 className="font-archivo text-xs md:text-sm font-extrabold tracking-[0.25em] text-white uppercase">
            {t.experienceTitle}
          </h2>
          <div className="flex-grow h-[1px] bg-[#2a2a2a]" />
        </div>

        {/* Timeline List */}
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          {experiences.map((exp, idx) => {
            const isExpanded = expandedIndex === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={`border border-[#2a2a2a] bg-[#1a1a1a]/40 p-6 md:p-8 transition-all duration-300 relative cursor-pointer group ${
                  isExpanded ? "border-[#FF0000]" : "hover:border-white/20"
                }`}
                onClick={() => toggleExpand(idx)}
              >
                {/* Accent Left Red/White Bar */}
                <div
                  className={`absolute left-0 top-0 h-full w-[3px] transition-all duration-300 ${
                    isExpanded ? "bg-[#FF0000]" : "bg-transparent group-hover:bg-white/30"
                  }`}
                />

                {/* Main Row Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left block (Date, Tag) */}
                  <div className="flex items-center gap-4 min-w-[200px]">
                    <span className="font-mono text-xs text-[#A0A0A0] flex items-center gap-1.5 uppercase font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-[#FF0000]" />
                      {exp.period}
                    </span>
                    <span className="font-mono text-[10px] font-bold text-[#FF0000] border border-[#FF0000] px-2 py-0.5 tracking-widest uppercase">
                      {exp.tag}
                    </span>
                  </div>

                  {/* Center Block (Company, Role) */}
                  <div className="flex-grow">
                    <h3 className="font-archivo text-xl font-bold text-white group-hover:text-[#FF0000] transition-colors duration-200">
                      {exp.company}
                    </h3>
                    {(() => {
                      const roleText = exp.role;
                      const parenIndex = roleText.indexOf("(");
                      const mainRole = parenIndex !== -1 ? roleText.substring(0, parenIndex).trim() : roleText;
                      const contractType = parenIndex !== -1 ? roleText.substring(parenIndex + 1, roleText.length - 1).trim() : "";
                      return (
                        <p className="font-sans text-sm text-[#A0A0A0] font-medium flex flex-wrap items-center gap-2 mt-1">
                          <span>{mainRole}</span>
                          {contractType && (
                            <span className="font-mono text-[9px] font-semibold text-[#FF0000] bg-[#FF0000]/5 border border-[#FF0000]/20 px-2 py-0.5 uppercase tracking-wider whitespace-nowrap inline-flex items-center">
                              {contractType}
                            </span>
                          )}
                        </p>
                      );
                    })()}
                  </div>

                  {/* Expand/Collapse Toggle Button */}
                  <div className="self-end md:self-center flex items-center gap-2">
                    <span className="font-mono text-xs text-[#555] group-hover:text-white transition-colors">
                      {isExpanded ? "[ CLOSE ]" : "[ OPEN ]"}
                    </span>
                    <div className="p-1.5 border border-[#2a2a2a] bg-[#131313] text-white">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-[#FF0000]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expandable Bullets Content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: "auto", opacity: 1, marginTop: 24 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden border-t border-[#2a2a2a]/60 pt-6"
                    >
                      <ul className="space-y-3.5 font-sans text-sm text-[#A0A0A0] list-none">
                        {exp.bullets.map((bullet, bIdx) => (
                          <motion.li
                            key={bIdx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: bIdx * 0.08 }}
                            className="flex items-start gap-3"
                          >
                            <span className="w-1.5 h-1.5 bg-[#FF0000] mt-1.5 flex-shrink-0" />
                            <span className="leading-relaxed">{bullet}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
