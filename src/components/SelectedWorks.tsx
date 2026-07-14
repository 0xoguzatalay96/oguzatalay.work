import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { SelectedWork, TranslationSet } from "../types";
import { ArrowUpRight } from "lucide-react";

interface SelectedWorksProps {
  works: SelectedWork[];
  t: TranslationSet;
  lang?: "EN" | "TR";
}

export default function SelectedWorks({ works, t, lang = "EN" }: SelectedWorksProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [showAll, setShowAll] = useState(false);

  // Custom coordinate tracker for mouse hover to create architectural blueprint vibe
  const [coords, setCoords] = useState<{ [key: string]: { x: number; y: number } }>({});

  const handleMouseMove = (id: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setCoords((prev) => ({
      ...prev,
      [id]: { x, y }
    }));
  };

  const displayedWorks = showAll ? works : works.slice(0, 8);

  return (
    <section
      id="works"
      ref={sectionRef}
      className="py-24 md:py-32 bg-[#131313] border-b border-[#2a2a2a] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-12 md:mb-16">
          <span className="font-mono text-[#FF0000] text-sm font-semibold tracking-wider">[ 03 ]</span>
          <h2 className="font-archivo text-xs md:text-sm font-extrabold tracking-[0.25em] text-white uppercase">
            {t.worksTitle}
          </h2>
          <div className="flex-grow h-[1px] bg-[#2a2a2a]" />
        </div>

        {/* Selected Works Grid with AnimatePresence for smooth transitions */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {displayedWorks.map((work) => {
              const cardCoords = coords[work.id] || { x: 0, y: 0 };
              const projectLink = work.links && work.links.length > 0 ? work.links[0].url : "#";
              
              return (
                <motion.div
                  layout
                  key={work.id}
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={projectLink}
                    target={projectLink !== "#" ? "_blank" : undefined}
                    rel={projectLink !== "#" ? "noopener noreferrer" : undefined}
                    onMouseMove={(e) => handleMouseMove(work.id, e)}
                    className="group relative flex flex-col justify-between border border-[#2a2a2a] p-4 bg-[#1a1a1a]/20 hover:border-[#FF0000] transition-colors duration-300 h-full"
                  >
                    {/* Visual Image Container with custom height and full viewport coverage */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-black mb-6 flex-shrink-0">
                      {/* Subtle Grid overlay */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:20px_20px] z-10 pointer-events-none" />

                      {/* Absolute Corner Blueprint Coordinates */}
                      <div className="absolute top-3 left-3 z-20 font-mono text-[9px] text-white/50 bg-[#131313]/80 px-2 py-1 border border-[#2a2a2a] uppercase tracking-wider backdrop-blur-sm">
                        LOC: {work.id.substring(0, 3).toUpperCase()} // X: {cardCoords.x} Y: {cardCoords.y}
                      </div>

                      {/* Image tag with referrer policy and hover effect */}
                      <img
                        src={work.image}
                        alt={work.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover grayscale contrast-125 transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                      />

                      {/* Dark transparent gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                    </div>

                    {/* Info and Titles */}
                    <div className="px-2 flex justify-between items-center gap-4 flex-grow">
                      <h3 className="font-archivo text-xl font-bold text-white group-hover:text-[#FF0000] transition-colors duration-200">
                        {work.title}
                      </h3>

                      {/* Magnetic Directional Icon */}
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 45 }}
                        className="p-2 border border-[#2a2a2a] bg-[#131313] text-white group-hover:border-[#FF0000] group-hover:text-[#FF0000] transition-all duration-300 flex-shrink-0"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
        
        {/* More Button */}
        {!showAll && works.length > 8 && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="group flex items-center gap-3 bg-transparent border border-[#2a2a2a] hover:border-[#FF0000] text-white px-8 py-4 transition-all duration-300"
            >
              <span className="font-mono text-xs font-bold tracking-widest uppercase">
                {lang === "TR" ? "DAHA FAZLA GÖSTER +" : "MORE +"}
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
