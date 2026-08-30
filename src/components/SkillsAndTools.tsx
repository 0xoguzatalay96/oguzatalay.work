import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { SkillCategory, TranslationSet, WorkStackGroup } from "../types";
import { BarChart3, Cpu, LayoutGrid, Terminal, Shield } from "lucide-react";

interface SkillsAndToolsProps {
  skills: SkillCategory[];
  tools: WorkStackGroup[];
  t: TranslationSet;
}

export default function SkillsAndTools({ skills, tools, t }: SkillsAndToolsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  // State to track currently hovered skill item to show custom active status
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Helper to generate a matrix of high-contrast digital particles
  const [hoveredStackItem, setHoveredStackItem] = useState<string | null>(null);

  const renderStackGroup = (group: WorkStackGroup, groupIdx: number) => (
    <motion.div
      key={group.title}
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
      transition={{ duration: 0.5, delay: groupIdx * 0.08 }}
      className="border border-[#2a2a2a] bg-black/30 p-5"
    >
      <h4 className="font-archivo text-xs font-bold text-white tracking-[0.18em] mb-4">
        {group.title}
      </h4>
      <div className="flex flex-wrap gap-2">
        {group.items.map((item) => {
          const isHovered = hoveredStackItem === item;
          return (
            <button
              key={item}
              type="button"
              onMouseEnter={() => setHoveredStackItem(item)}
              onMouseLeave={() => setHoveredStackItem(null)}
              className={`border px-3 py-2 text-left font-mono text-[11px] font-bold tracking-wider transition-all duration-300 ${
                isHovered
                  ? "border-[#FF0000] bg-[#FF0000] text-white"
                  : "border-[#2a2a2a] bg-[#131313] text-[#A0A0A0] hover:border-white/20"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
    </motion.div>
  );

  return (
    <section
      id="skills"
      ref={containerRef}
      className="py-16 md:py-20 bg-[#131313] border-b border-[#2a2a2a] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* SKILLS SECTION */}
        <div className="mb-12 md:mb-14">
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-8 md:mb-10">
            <span className="font-mono text-[#FF0000] text-sm font-semibold tracking-wider">[ 04 ]</span>
            <h2 className="font-archivo text-xs md:text-sm font-extrabold tracking-[0.25em] text-white uppercase">
              {t.skillsTitle}
            </h2>
            <div className="flex-grow h-[1px] bg-[#2a2a2a]" />
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {skills.map((category, catIdx) => {
              const iconComponents = [Cpu, Shield, Terminal, BarChart3];
              const IconComponent = iconComponents[catIdx] || Terminal;
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: catIdx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="border border-[#2a2a2a] p-4 lg:p-5 bg-[#1a1a1a]/10 hover:border-white/10 transition-colors flex flex-col h-full"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-4 border-b border-[#2a2a2a] pb-3">
                    <div className="text-[#FF0000]">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-archivo text-base font-bold text-white tracking-wide">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills Bullet items with high-contrast text */}
                  <div className="space-y-2.5 flex-grow">
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
            <div className="flex items-center gap-4 mb-7 md:mb-8">
            <span className="font-mono text-[#FF0000] text-sm font-semibold tracking-wider">[ 05 ]</span>
            <h2 className="font-archivo text-xs md:text-sm font-extrabold tracking-[0.25em] text-white uppercase">
              {t.toolsTitle}
            </h2>
            <div className="flex-grow h-[1px] bg-[#2a2a2a]" />
          </div>

          <div className="border border-[#2a2a2a] p-4 lg:p-5 bg-[#1a1a1a]/10">
            <div className="flex items-center gap-3 mb-4">
              <LayoutGrid className="w-5 h-5 text-[#FF0000]" />
              <h3 className="font-archivo text-lg font-bold text-white tracking-wide">
                {t.toolsStack}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tools.map(renderStackGroup)}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
