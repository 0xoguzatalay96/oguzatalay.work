const fs = require('fs');
let content = fs.readFileSync('src/components/SelectedWorks.tsx', 'utf8');

content = content.replace(
  'import { ArrowUpRight, Eye, MessageCircle, Heart, Users, Activity, Zap, BarChart2 } from "lucide-react";',
  'import { ArrowUpRight, Eye, MessageCircle, Heart, Users, Activity, Zap, BarChart2, Repeat } from "lucide-react";'
);

const oldLogic = `  } else if (lower.includes("participant") || lower.includes("katılım")) {
    icon = <Users className="w-3 h-3 mr-1.5 opacity-80" />;
    text = kpiString.replace(/PARTICIPANTS|KATILIM/i, "").trim();`;

const newLogic = `  } else if (lower.includes("participant") || lower.includes("katılım") || lower.includes("oyuncu") || lower.includes("player")) {
    icon = <Users className="w-3 h-3 mr-1.5 opacity-80" />;
    text = kpiString.replace(/PARTICIPANTS|KATILIM|OYUNCU|PLAYERS/i, "").trim();
  } else if (lower.includes("repost")) {
    icon = <Repeat className="w-3 h-3 mr-1.5 opacity-80" />;
    text = kpiString.replace(/REPOSTS|REPOST/i, "").trim();`;

content = content.replace(oldLogic, newLogic);
fs.writeFileSync('src/components/SelectedWorks.tsx', content);
console.log('Fixed SelectedWorks.tsx');
