const fs = require('fs');

let dataContent = fs.readFileSync('src/data.ts', 'utf8');

// We have multiple occurrences in ENGLISH and TURKISH arrays. We can use a replacer function.
const kpiMapEn = {
  "yuga-labs-dragon": '    kpi: "AUG 2024 | OTHERSIDE ALPHA APECHAIN LAUNCH",\n    image:',
  "yuga-labs": '    kpi: "AUG 2024 | OTHERSIDE ALPHA APECHAIN LAUNCH",\n    image:',
  "adidas-originals": '    kpi: "0.59 ETH FLOOR | $600K SECONDARY VOL",\n    image:',
  "metafluence-launch": '    kpi: "100% SOLD OUT | 305 TXS | $50K RAISED",\n    image:',
};

const kpiMapTr = {
  "yuga-labs-dragon": '    kpi: "AĞU 2024 | OTHERSIDE ALPHA APECHAIN LANSMANI",\n    image:',
  "yuga-labs": '    kpi: "AĞU 2024 | OTHERSIDE ALPHA APECHAIN LANSMANI",\n    image:',
  "adidas-originals": '    kpi: "0.59 ETH TABAN | $600K İKİNCİL HACİM",\n    image:',
  "metafluence-launch": '    kpi: "%100 TÜKENDİ | 305 İŞLEM | $50K FON",\n    image:',
};

function processArray(arrayText, isTr) {
  let modified = arrayText;
  const kpiMap = isTr ? kpiMapTr : kpiMapEn;
  
  for (const [id, kpiReplace] of Object.entries(kpiMap)) {
    const regex = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?)(image:)`, 'g');
    modified = modified.replace(regex, `$1${kpiReplace}`);
  }
  return modified;
}

const enMatch = dataContent.match(/export const ENGLISH_WORKS: SelectedWork\[\] = \[([\s\S]*?)export const TURKISH_WORKS/);
if (enMatch) {
  const enReplaced = processArray(enMatch[1], false);
  dataContent = dataContent.replace(enMatch[1], enReplaced);
}

const trMatch = dataContent.match(/export const TURKISH_WORKS: SelectedWork\[\] = \[([\s\S]*?)\];/);
if (trMatch) {
  const trReplaced = processArray(trMatch[1], true);
  dataContent = dataContent.replace(trMatch[1], trReplaced);
}

fs.writeFileSync('src/data.ts', dataContent);
console.log('KPIs added');
