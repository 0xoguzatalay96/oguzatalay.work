const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');
content = content.replace('export const ENGLISH_SKILLS: SkillCategory[] = [', '];\n\nexport const ENGLISH_SKILLS: SkillCategory[] = [');
fs.writeFileSync('src/data.ts', content);
