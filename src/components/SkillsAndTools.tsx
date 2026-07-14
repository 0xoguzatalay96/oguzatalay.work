import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { SkillCategory, TranslationSet } from "../types";
import { Cpu, LayoutGrid, Terminal, Shield } from "lucide-react";

interface SkillsAndToolsProps {
  skills: SkillCategory[];
  tools: string[];
  t: TranslationSet;
}

export default function SkillsAndTools({ skills, tools, t }: SkillsAndToolsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  // State to track currently hovered skill item to show custom active status
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Helper to generate a matrix of high-contrast digital particles
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="py-24 md:py-32 bg-[#131313] border-b border-[#2a2a2a] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* SKILLS SECTION */}
        <div className="mb-24">
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-16 md:mb-24">
            <span className="font-mono text-[#FF0000] text-sm font-semibold tracking-wider">[ 04 ]</span>
            <h2 className="font-archivo text-xs md:text-sm font-extrabold tracking-[0.25em] text-white uppercase">
              {t.skillsTitle}
            </h2>
            <div className="flex-grow h-[1px] bg-[#2a2a2a]" />
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {skills.map((category, catIdx) => {
              const IconComponent = catIdx === 0 ? Cpu : catIdx === 1 ? Shield : Terminal;
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: catIdx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="border border-[#2a2a2a] p-6 lg:p-8 bg-[#1a1a1a]/10 hover:border-white/10 transition-colors flex flex-col h-full"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-8 border-b border-[#2a2a2a] pb-4">
                    <div className="text-[#FF0000]">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-archivo text-base lg:text-lg font-bold text-white uppercase tracking-wide">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills Bullet items with high-contrast text */}
                  <div className="space-y-4 flex-grow">
                    {category.items.map((item, itemIdx) => {
                      const isHovered = hoveredSkill === item;
                      return (
                        <div
                          key={itemIdx}
                          className="relative cursor-pointer py-1"
                          onMouseEnter={() => setHoveredSkill(item)}
                          onMouseLeave={() => setHoveredSkill(null)}
                        >
                          {/* Interactive sliding line and text color change */}
                          <div className="flex items-center justify-between text-left relative z-10">
                            <div className="flex items-start gap-3">
                              <span
                                className={`w-1.5 h-1.5 mt-2 transition-colors duration-200 flex-shrink-0 ${
                                  isHovered ? "bg-[#FF0000]" : "bg-white/20"
                                }`}
                              />
                              <span
                                className={`font-mono text-xs font-semibold tracking-wider transition-all duration-300 ${
                                  isHovered ? "text-white translate-x-2" : "text-[#A0A0A0]"
                                }`}
                              >
                                {item}
                              </span>
                            </div>
                            
                            <span
                              className={`font-mono text-[9px] text-white/40 transition-opacity duration-300 flex-shrink-0 ${
                                isHovered ? "opacity-100 animate-pulse" : "opacity-0"
                              }`}
                            >
                              // ACTIVE
                            </span>
                          </div>

                          {/* Slide-out light background bar on hover */}
                          <div
                            className={`absolute inset-0 bg-white/5 transition-transform duration-300 origin-left -z-0 ${
                              isHovered ? "scale-x-100" : "scale-x-0"
                            }`}
                            style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* TOOLS SECTION */}
        <div>
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-12 md:mb-16">
            <span className="font-mono text-[#FF0000] text-sm font-semibold tracking-wider">[ 05 ]</span>
            <h2 className="font-archivo text-xs md:text-sm font-extrabold tracking-[0.25em] text-white uppercase">
              {t.toolsTitle}
            </h2>
            <div className="flex-grow h-[1px] bg-[#2a2a2a]" />
          </div>

          <div className="border border-[#2a2a2a] p-6 lg:p-8 bg-[#1a1a1a]/10">
            <div className="flex items-center gap-3 mb-6">
              <LayoutGrid className="w-5 h-5 text-[#FF0000]" />
              <h3 className="font-archivo text-lg font-bold text-white tracking-wide uppercase">
                {t.toolsStack}
              </h3>
            </div>

            {/* Sharp grid container */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {tools.map((tool, idx) => {
                const isHovered = hoveredTool === tool;
                return (
                  <motion.div
                    key={tool}
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    onMouseEnter={() => setHoveredTool(tool)}
                    onMouseLeave={() => setHoveredTool(null)}
                    className={`border p-4 text-center font-mono text-xs font-bold tracking-wider relative cursor-pointer transition-all duration-300 ${
                      isHovered
                        ? "border-[#FF0000] bg-[#FF0000] text-white scale-[1.03]"
                        : "border-[#2a2a2a] bg-black/40 text-[#A0A0A0] hover:border-white/20"
                    }`}
                  >
                    <span>{tool}</span>
                    
                    {/* Tiny custom graphic decoration on hover */}
                    {isHovered && (
                      <span className="absolute bottom-1 right-1 text-[7px] opacity-65 font-mono">
                        ▲ OK
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
