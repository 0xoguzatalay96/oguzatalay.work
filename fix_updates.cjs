const fs = require('fs');

let dataContent = fs.readFileSync('src/data.ts', 'utf8');

dataContent = dataContent.replace(
  /"6.7M VIEWS \| 3.4M COMMENTS"/g,
  '"6.7M VIEWS | 3.4M COMMENTS | 74% ENGAGEMENT"'
);
dataContent = dataContent.replace(
  /"6.7M İZLENME \| 3.4M YORUM"/g,
  '"6.7M İZLENME | 3.4M YORUM | %74 ETKİLEŞİM"'
);

dataContent = dataContent.replace(
  /"6,755 HOLDERS \| 72.7% LOYALTY \| \$93M\+ VOL"/g,
  '"6,755 HOLDERS | 72.7% LOYALTY | $93M+"'
);
dataContent = dataContent.replace(
  /"6,755 HOLDER \| %72.7 SADAKAT \| \$93M\+ HACİM"/g,
  '"6,755 HOLDER | %72.7 SADAKAT | $93M+"'
);

dataContent = dataContent.replace(
  /"1.2M IMPRESSIONS \| 12.5K\+ LIKES \| 1980 REPOSTS \| 2264 PLAYERS"/g,
  '"1.2M IMPRESSIONS | 12.5K+ LIKES | 2264 PLAYERS"'
);
dataContent = dataContent.replace(
  /"1.2M GÖSTERİM \| 12.5K\+ BEĞENİ \| 1980 REPOST \| 2264 OYUNCU"/g,
  '"1.2M GÖSTERİM | 12.5K+ BEĞENİ | 2264 OYUNCU"'
);

dataContent = dataContent.replace(
  /"1.8M VIEWS \| 162K LIKES \| 15K COMMENTS \| 1200 PARTICIPANTS"/g,
  '"1.8M VIEWS | 162K LIKES | 1200 PARTICIPANTS"'
);
dataContent = dataContent.replace(
  /"1.8M İZLENME \| 162K BEĞENİ \| 15K YORUM \| 1200 KATILIM"/g,
  '"1.8M İZLENME | 162K BEĞENİ | 1200 KATILIM"'
);

fs.writeFileSync('src/data.ts', dataContent);
console.log('Fixed data.ts');

let worksContent = fs.readFileSync('src/components/SelectedWorks.tsx', 'utf8');

worksContent = worksContent.replace(
  /\} else if \(lower\.includes\("vol"\) \|\| lower\.includes\("hacim"\)\) \{/,
  `} else if (lower.includes("vol") || lower.includes("hacim") || lower.includes("$")) {`
);

worksContent = worksContent.replace(
  /\} else if \(lower\.includes\("sold"\) \|\| lower\.includes\("tükendi"\)\) \{/,
  `} else if (lower.includes("engagement") || lower.includes("etkileşim")) {
    icon = <Activity className="w-3 h-3 mr-1.5 opacity-80" />;
    text = kpiString.replace(/ENGAGEMENT|ETKİLEŞİM/ig, "");
  } else if (lower.includes("sold") || lower.includes("tükendi")) {`
);

fs.writeFileSync('src/components/SelectedWorks.tsx', worksContent);
console.log('Fixed SelectedWorks.tsx');
