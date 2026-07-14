const fs = require('fs');

let content = fs.readFileSync('src/components/SelectedWorks.tsx', 'utf8');

// 1. Change import
content = content.replace(
  'import { ArrowUpRight } from "lucide-react";',
  'import { ArrowUpRight, Eye, MessageCircle, Heart, Users, Activity, Zap, BarChart2 } from "lucide-react";'
);

// 2. Add render function outside of component
const renderFunc = `
const renderKpiBadge = (kpiString: string, index: number) => {
  const lower = kpiString.toLowerCase();
  let icon = <Zap className="w-3 h-3 mr-1.5 opacity-80" />;
  let text = kpiString;

  if (lower.includes("view") || lower.includes("izlenme")) {
    icon = <Eye className="w-3 h-3 mr-1.5 opacity-80" />;
    text = kpiString.replace(/VIEWS|İZLENME/i, "").trim();
  } else if (lower.includes("impression") || lower.includes("gösterim") || lower.includes("reach") || lower.includes("erişim")) {
    icon = <BarChart2 className="w-3 h-3 mr-1.5 opacity-80" />;
    text = kpiString.replace(/IMPRESSIONS|GÖSTERİM|REACH|ERİŞİM/i, "").trim();
  } else if (lower.includes("like") || lower.includes("beğeni")) {
    icon = <Heart className="w-3 h-3 mr-1.5 opacity-80" />;
    text = kpiString.replace(/LIKES|BEĞENİ/i, "").trim();
  } else if (lower.includes("comment") || lower.includes("yorum")) {
    icon = <MessageCircle className="w-3 h-3 mr-1.5 opacity-80" />;
    text = kpiString.replace(/COMMENTS|YORUM/i, "").trim();
  } else if (lower.includes("participant") || lower.includes("katılım")) {
    icon = <Users className="w-3 h-3 mr-1.5 opacity-80" />;
    text = kpiString.replace(/PARTICIPANTS|KATILIM/i, "").trim();
  } else if (lower.includes("eth") || lower.includes("vol") || lower.includes("hacim") || lower.includes("sold") || lower.includes("tükendi") || lower.includes("raised") || lower.includes("fon") || lower.includes("txs") || lower.includes("işlem")) {
    icon = <Activity className="w-3 h-3 mr-1.5 opacity-80" />;
  }

  return (
    <div key={index} className="flex items-center font-mono text-[9px] text-white/90 bg-black/80 px-2 py-1 border border-white/10 uppercase tracking-wider backdrop-blur-md transition-colors duration-300 group-hover:border-[#FF0000]/50 group-hover:text-[#FF4444]">
      {icon}
      <span>{text}</span>
    </div>
  );
};

interface SelectedWorksProps {`;

content = content.replace('interface SelectedWorksProps {', renderFunc);

// 3. Update JSX
const oldJsx = `<div className="absolute top-3 left-3 z-20 font-mono text-[10px] text-white/90 bg-black/60 px-2 py-1.5 border border-white/10 uppercase tracking-wider backdrop-blur-md transition-colors duration-300 group-hover:border-[#FF0000]/50 group-hover:text-[#FF4444]">
                        {work.kpi ? work.kpi : \`LOC: \${work.id.substring(0, 3).toUpperCase()} // X: \${cardCoords.x} Y: \${cardCoords.y}\`}
                      </div>`;

const newJsx = `<div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap gap-1.5 pointer-events-none">
                        {work.kpi ? (
                          work.kpi.split(' | ').map((k, i) => renderKpiBadge(k, i))
                        ) : (
                          <div className="font-mono text-[9px] text-white/90 bg-black/80 px-2 py-1 border border-white/10 uppercase tracking-wider backdrop-blur-md transition-colors duration-300 group-hover:border-[#FF0000]/50 group-hover:text-[#FF4444]">
                            LOC: {work.id.substring(0, 3).toUpperCase()} // X: {cardCoords.x} Y: {cardCoords.y}
                          </div>
                        )}
                      </div>`;

content = content.replace(oldJsx, newJsx);

fs.writeFileSync('src/components/SelectedWorks.tsx', content);
console.log('Fixed SelectedWorks kpis');
