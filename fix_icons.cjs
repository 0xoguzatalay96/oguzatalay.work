const fs = require('fs');

let worksContent = fs.readFileSync('src/components/SelectedWorks.tsx', 'utf8');

worksContent = worksContent.replace(
  /<Globe className="w-3 h-3 mr-1.5 opacity-80" \/>/g,
  '<Target className="w-3 h-3 mr-1.5 opacity-80" />'
);

fs.writeFileSync('src/components/SelectedWorks.tsx', worksContent);
console.log('Fixed SelectedWorks.tsx icons');
