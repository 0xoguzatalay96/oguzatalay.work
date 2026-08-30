import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { SelectedWork, TranslationSet } from "../types";
import { ArrowUpRight, Eye, MessageCircle, Heart, Users, Activity, Zap, BarChart2, Repeat, Target, Wallet, Award, TrendingUp, Globe } from "lucide-react";


const renderKpiBadge = (kpiString: string, index: number) => {
  const lower = kpiString.toLowerCase();
  let icon = <Zap className="w-3 h-3 mr-1.5 opacity-80" />;
  let text = kpiString;

  if (lower.includes("view") || lower.includes("izlenme")) {
    icon = <Eye className="w-3 h-3 mr-1.5 opacity-80" />;
    text = kpiString.replace(/VIEWS|VIEW|İZLENME/ig, "");
  } else if (lower.includes("impression") || lower.includes("gösterim")) {
    icon = <BarChart2 className="w-3 h-3 mr-1.5 opacity-80" />;
    text = kpiString.replace(/IMPRESSIONS|IMPRESSION|GÖSTERİM/ig, "");
  } else if (lower.includes("reach") || lower.includes("erişim")) {
    icon = <Target className="w-3 h-3 mr-1.5 opacity-80" />;
    text = kpiString.replace(/REACH|ERİŞİM/ig, "");
  } else if (lower.includes("like") || lower.includes("beğeni")) {
    icon = <Heart className="w-3 h-3 mr-1.5 opacity-80" />;
    text = kpiString.replace(/LIKES|LIKE|BEĞENİ/ig, "");
  } else if (lower.includes("comment") || lower.includes("yorum")) {
    icon = <MessageCircle className="w-3 h-3 mr-1.5 opacity-80" />;
    text = kpiString.replace(/COMMENTS|COMMENT|YORUM/ig, "");
  } else if (lower.includes("participant") || lower.includes("katılım") || lower.includes("oyuncu") || lower.includes("player")) {
    icon = <Users className="w-3 h-3 mr-1.5 opacity-80" />;
    text = kpiString.replace(/PARTICIPANTS|PARTICIPANT|KATILIM|OYUNCULAR|OYUNCU|PLAYERS|PLAYER/ig, "");
  } else if (lower.includes("repost")) {
    icon = <Repeat className="w-3 h-3 mr-1.5 opacity-80" />;
    text = kpiString.replace(/REPOSTS|REPOST/ig, "");
  } else if (lower.includes("holder")) {
    icon = <Wallet className="w-3 h-3 mr-1.5 opacity-80" />;
    text = kpiString.replace(/HOLDERS|HOLDER/ig, "");
  } else if (lower.includes("loyalty") || lower.includes("sadakat")) {
    icon = <Award className="w-3 h-3 mr-1.5 opacity-80" />;
    text = kpiString.replace(/LOYALTY|SADAKAT|BRAND/ig, "");
  } else if (lower.includes("vol") || lower.includes("hacim") || lower.includes("$")) {
    icon = <TrendingUp className="w-3 h-3 mr-1.5 opacity-80" />;
    text = kpiString.replace(/SECONDARY|ECOSYSTEM|TRADE|VOL|HACİM/ig, "");
  } else if (lower.includes("engagement") || lower.includes("etkileşim")) {
    icon = <Activity className="w-3 h-3 mr-1.5 opacity-80" />;
    text = kpiString.replace(/ENGAGEMENT|ETKİLEŞİM/ig, "");
  } else if (lower.includes("raised") || lower.includes("fon")) {
    icon = <TrendingUp className="w-3 h-3 mr-1.5 opacity-80" />;
    text = kpiString.replace(/RAISED|FON/ig, "");
  } else if (lower.includes("txs") || lower.includes("işlem")) {
    icon = <Activity className="w-3 h-3 mr-1.5 opacity-80" />;
    text = kpiString.replace(/TXS|İŞLEM/ig, "");
  }

  // Clean up any double spaces
  text = text.trim();

  return (
    <div key={index} className="flex items-center font-mono text-[9px] text-white/90 bg-black/80 px-2 py-1 border border-white/10 uppercase tracking-wider backdrop-blur-md transition-colors duration-300 group-hover:border-[#FF0000]/50 group-hover:text-[#FF4444]" title={kpiString.trim()}>
      {icon}
      <span>{text}</span>
    </div>
  );
};

interface SelectedWorksProps {
  works: SelectedWork[];
  t: TranslationSet;
  lang?: "EN" | "TR";
}

const FEATURED_WORK_IDS = [
  "migros-campaigns",
  "defacto-tiktok",
  "adidas-originals",
  "koton",
  "yuga-labs-dragon",
  "hp-omen",
  "asus-rog-party",
  "eti-challenges",
];

const SHOW_MORE_WORK_IDS = [
  "redbull-events",
  "redbull-meo-season-2",
  "redbull-flick-gist",
  "redbull-csgo-special",
  "nvidia-minecraft-rtx",
  "hyperx-gist-creators",
  "asus-radeon-csgo",
  "asus-rog-maximus",
  "asus-creator-integrations",
  "hp-omen-gist-2019",
  "hp-omen-creator-integrations",
  "migros-pizza-migo",
  "migros-money",
  "defacto-kendini-sev",
  "eti-puf-muzik-akademisi",
  "eti-benimo-dostum",
  "canga-duet",
  "msi-creator-integration",
  "pubg-mobile-real-life",
  "turkcell-pubg-tournament",
  "lenovo-game-on",
  "realme-5i-tiktok",
  "metafluence-launch",
  "pasha-fencer",
];

const getFeaturedTitleParts = (title: string, isFeatured: boolean) => {
  if (!isFeatured) {
    return { brand: title, project: "" };
  }

  const separatorIndex = title.indexOf(" - ");
  if (separatorIndex === -1) {
    return { brand: title, project: "" };
  }

  return {
    brand: title.slice(0, separatorIndex),
    project: title.slice(separatorIndex + 3)
  };
};

export default function SelectedWorks({ works, t, lang = "EN" }: SelectedWorksProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [showAll, setShowAll] = useState(false);

  const orderedWorks = [...works].sort((a, b) => {
    const featuredA = FEATURED_WORK_IDS.indexOf(a.id);
    const featuredB = FEATURED_WORK_IDS.indexOf(b.id);

    if (featuredA !== -1 && featuredB !== -1) {
      return featuredA - featuredB;
    }

    if (featuredA !== -1) {
      return -1;
    }

    if (featuredB !== -1) {
      return 1;
    }

    const showMoreA = SHOW_MORE_WORK_IDS.indexOf(a.id);
    const showMoreB = SHOW_MORE_WORK_IDS.indexOf(b.id);

    if (showMoreA !== -1 && showMoreB !== -1) {
      return showMoreA - showMoreB;
    }

    if (showMoreA !== -1) {
      return -1;
    }

    if (showMoreB !== -1) {
      return 1;
    }

    return works.indexOf(a) - works.indexOf(b);
  });
  const displayedWorks = showAll ? orderedWorks : orderedWorks.slice(0, FEATURED_WORK_IDS.length);

  return (
    <section
      id="works"
      ref={sectionRef}
      className="py-16 md:py-20 bg-[#131313] border-b border-[#2a2a2a] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-7 md:mb-8">
          <span className="font-mono text-[#FF0000] text-sm font-semibold tracking-wider">[ 02 ]</span>
          <h2 className="font-archivo text-xs md:text-sm font-extrabold tracking-[0.25em] text-white uppercase">
            {t.worksTitle}
          </h2>
          <div className="flex-grow h-[1px] bg-[#2a2a2a]" />
        </div>

        {/* Selected Works Grid with AnimatePresence for smooth transitions */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {displayedWorks.map((work) => {
              const projectLink = work.links && work.links.length > 0 ? work.links[0].url : "#";
              const titleParts = getFeaturedTitleParts(work.title, FEATURED_WORK_IDS.includes(work.id));
              
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
                    className="group relative flex flex-col justify-between border border-[#2a2a2a] p-3.5 bg-[#1a1a1a]/20 hover:border-[#FF0000] transition-colors duration-300 h-full"
                  >
                    {/* Visual Image Container with custom height and full viewport coverage */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-black mb-3 flex-shrink-0">
                      {/* Subtle Grid overlay */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:20px_20px] z-10 pointer-events-none" />

                      {/* Absolute Corner Blueprint Coordinates */}
                      <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap gap-1.5 pointer-events-none">
                        {work.kpi && work.kpi.split(' | ').map((k, i) => renderKpiBadge(k, i))}
                      </div>

                      {/* Image tag with referrer policy and hover effect */}
                      <img
                        src={work.image}
                        alt={work.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain grayscale contrast-125 transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                      />

                      {/* Dark transparent gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                    </div>

                    {/* Info and Titles */}
                    <div className="px-2 flex justify-between items-center gap-4">
                      <h3 className="font-archivo font-bold text-white transition-colors duration-200 min-w-0">
                        {titleParts.project ? (
                          <>
                            <span className="block text-lg leading-tight text-white group-hover:text-[#FF0000] transition-colors duration-200">
                              {titleParts.brand}
                            </span>
                            <span className="block mt-0.5 text-lg leading-tight text-white group-hover:text-[#FF0000] transition-colors duration-200">
                              {titleParts.project}
                            </span>
                          </>
                        ) : (
                          <span className="block text-xl leading-tight group-hover:text-[#FF0000] transition-colors duration-200">
                            {titleParts.brand}
                          </span>
                        )}
                      </h3>

                      {/* Magnetic Directional Icon */}
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 45 }}
                        className="p-2 border border-[#2a2a2a] bg-[#131313] text-white group-hover:border-[#FF0000] group-hover:text-[#FF0000] transition-all duration-300 flex-shrink-0"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </motion.div>
                    </div>

                    {/* Role & Operational Context */}
                    {(work.role || work.action || work.challenge) && (
                      <div className="px-2 pt-2.5 mt-2 border-t border-[#2a2a2a]/60 text-[11px] font-sans text-[#A0A0A0] leading-snug group-hover:text-white transition-colors">
                        <p className="line-clamp-2">
                          <span className="font-mono font-bold text-[#FF0000] tracking-wider uppercase text-[10px] mr-1.5">
                            {lang === "EN" ? "ROLE:" : "ROL:"}
                          </span>
                          {work.role || work.action || work.challenge}
                        </p>
                      </div>
                    )}
                  </a>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
        
        {/* More Button */}
        {!showAll && orderedWorks.length > FEATURED_WORK_IDS.length && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="group flex items-center gap-3 bg-transparent border border-[#2a2a2a] hover:border-[#FF0000] text-white px-7 py-3.5 transition-all duration-300"
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
