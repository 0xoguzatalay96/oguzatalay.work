const fs = require('fs');

let dataContent = fs.readFileSync('src/data.ts', 'utf8');

const kpiMapEn = {
  "migros-campaigns": '    kpi: "6.7M VIEWS | 3.4M COMMENTS",\n    image:',
  "koton": '    kpi: "6.3M VIEWS | 630K LIKES | 24K COMMENTS",\n    image:',
  "redbull-events": '    kpi: "2.4M IMPRESSIONS | 650K VIEWS | 1.2M REACH",\n    image:',
  "defacto-tiktok": '    kpi: "3.1M VIEWS | 320K LIKES | 17K COMMENTS",\n    image:',
  "eti-challenges": '    kpi: "15.4M VIEWS | 685K LIKES | 9K COMMENTS",\n    image:',
  "hp-omen": '    kpi: "1.8M VIEWS | 162K LIKES | 15K COMMENTS | 1200 PARTICIPANTS",\n    image:',
};

const kpiMapTr = {
  "migros-campaigns": '    kpi: "6.7M İZLENME | 3.4M YORUM",\n    image:',
  "koton": '    kpi: "6.3M İZLENME | 630K BEĞENİ | 24K YORUM",\n    image:',
  "redbull-events": '    kpi: "2.4M GÖSTERİM | 650K İZLENME | 1.2M ERİŞİM",\n    image:',
  "defacto-tiktok": '    kpi: "3.1M İZLENME | 320K BEĞENİ | 17K YORUM",\n    image:',
  "eti-challenges": '    kpi: "15.45M İZLENME | 685K BEĞENİ | 9K YORUM",\n    image:',
  "hp-omen": '    kpi: "1.8M İZLENME | 162K BEĞENİ | 15K YORUM | 1200 KATILIM",\n    image:',
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
