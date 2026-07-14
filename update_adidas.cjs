const fs = require('fs');

let dataContent = fs.readFileSync('src/data.ts', 'utf8');

// Update Adidas English
dataContent = dataContent.replace(
  /id: "adidas-originals",[\s\S]*?"url": "[^"]*"/,
  `id: "adidas-originals",
    title: "adidas Originals - Into the Metaverse",
    subtitle: "",
    category: "",
    tags: [],
    kpi: "6,755 HOLDERS | 72.7% LOYALTY | $93M+ VOL",
    image: "https://i.ytimg.com/vi/EVQ6fPrwi0M/maxresdefault.jpg",
    links: [{ "url": "https://news.adidas.com/originals/virtual-gear-for-new-realities--adidas-originals-launches-inaugural-nft-wearables-collection/s/b9c13f73-b7b4-412f-9e19-f8a4d9781621"`
);

// Update Adidas Turkish
dataContent = dataContent.replace(
  /id: "adidas-originals",[\s\S]*?"url": "[^"]*"/,
  `id: "adidas-originals",
    title: "adidas Originals - Into the Metaverse",
    subtitle: "",
    category: "",
    tags: [],
    kpi: "6,755 HOLDER | %72.7 SADAKAT | $93M+ HACİM",
    image: "https://i.ytimg.com/vi/EVQ6fPrwi0M/maxresdefault.jpg",
    links: [{ "url": "https://news.adidas.com/originals/virtual-gear-for-new-realities--adidas-originals-launches-inaugural-nft-wearables-collection/s/b9c13f73-b7b4-412f-9e19-f8a4d9781621"`
);

fs.writeFileSync('src/data.ts', dataContent);
console.log('Fixed Adidas in data.ts');

// Now let's fix SelectedWorks.tsx to clean up the text better
let worksContent = fs.readFileSync('src/components/SelectedWorks.tsx', 'utf8');

worksContent = worksContent.replace(
  /import \{ [^}]* \} from "lucide-react";/,
  `import { ArrowUpRight, Eye, MessageCircle, Heart, Users, Activity, Zap, BarChart2, Repeat, Target, Wallet, Award, TrendingUp, CheckCircle, Globe } from "lucide-react";`
);

const newRenderKpiBadge = `const renderKpiBadge = (kpiString: string, index: number) => {
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
    icon = <Globe className="w-3 h-3 mr-1.5 opacity-80" />;
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
  } else if (lower.includes("vol") || lower.includes("hacim")) {
    icon = <TrendingUp className="w-3 h-3 mr-1.5 opacity-80" />;
    text = kpiString.replace(/SECONDARY|ECOSYSTEM|TRADE|VOL|HACİM/ig, "");
  } else if (lower.includes("sold") || lower.includes("tükendi")) {
    icon = <CheckCircle className="w-3 h-3 mr-1.5 opacity-80" />;
    text = kpiString.replace(/SOLD OUT|TÜKENDİ/ig, "");
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
};`;

// Find and replace the old renderKpiBadge function
worksContent = worksContent.replace(
  /const renderKpiBadge = \([\s\S]*?  \);\n};/,
  newRenderKpiBadge
);

fs.writeFileSync('src/components/SelectedWorks.tsx', worksContent);
console.log('Fixed SelectedWorks.tsx');
