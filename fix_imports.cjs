const fs = require('fs');
let hero = fs.readFileSync('src/components/Hero.tsx', 'utf8');
hero = hero.replace(
  /import \{ ArrowDown, Sparkles, FileText \} from "lucide-react";/,
  'import { ArrowDown } from "lucide-react";'
);
fs.writeFileSync('src/components/Hero.tsx', hero);
console.log('Fixed unused imports');
