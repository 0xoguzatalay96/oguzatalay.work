const fs = require('fs');

let headerContent = fs.readFileSync('src/components/Header.tsx', 'utf8');
headerContent = headerContent.replace(
  /CV YAZDIR \/ PDF KAYDET/g,
  'CV GÖRÜNTÜLE / MD İNDİR'
);
headerContent = headerContent.replace(
  /PRINT \/ EXPORT HARVARD CV/g,
  'VIEW CV / EXPORT MD'
);
fs.writeFileSync('src/components/Header.tsx', headerContent);

let appContent = fs.readFileSync('src/App.tsx', 'utf8');
appContent = appContent.replace(
  /DOWNLOAD PDF/g,
  'DOWNLOAD MD'
);
appContent = appContent.replace(
  /PDF İNDİR/g,
  'MD İNDİR'
);
fs.writeFileSync('src/App.tsx', appContent);

let heroContent = fs.readFileSync('src/components/Hero.tsx', 'utf8');
heroContent = heroContent.replace(
  /EXPORT CV/g,
  'EXPORT MD'
);
heroContent = heroContent.replace(
  /CV İNDİR/g,
  'MD İNDİR'
);
fs.writeFileSync('src/components/Hero.tsx', heroContent);

console.log('Fixed PDF text in all files');
