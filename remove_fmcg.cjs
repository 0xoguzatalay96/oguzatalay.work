const fs = require('fs');
let dataContent = fs.readFileSync('src/data.ts', 'utf8');

// Regex to remove fmcg-creator-integrations
dataContent = dataContent.replace(/\{\s*id:\s*"fmcg-creator-integrations"[\s\S]*?\},/g, '');

fs.writeFileSync('src/data.ts', dataContent);
console.log('Removed fmcg');
