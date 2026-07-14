const fs = require('fs');

const works = [
  {
    id: "migros-campaigns",
    title: { en: "Migros - #ReyonSavaşları", tr: "Migros - #ReyonSavaşları" },
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800",
    links: [
      { url: "https://www.inbusiness.com.tr/sektorler/tarim-gida-perakende/2021/02/23/migros-tiktokta-rekor-kiran-markalardan-oldu" }
    ]
  },
  {
    id: "adidas-originals",
    title: { en: "adidas Originals - Into the Metaverse", tr: "adidas Originals - Into the Metaverse" },
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800",
    links: [
      { url: "https://x.com/adidasoriginals/status/1461057188529594375/photo/1" }
    ]
  },
  {
    id: "koton",
    title: { en: "Koton - #EtiketleriÇıkar", tr: "Koton - #EtiketleriÇıkar" },
    image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=800",
    links: [
      { url: "https://www.youtube.com/watch?v=mqi0DQ8OnWs" }
    ]
  },
  {
    id: "redbull-events",
    title: { en: "Red Bull - GIST 2020", tr: "Red Bull - GIST 2020" },
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800",
    links: [
      { url: "https://www.redbull.com/tr-tr/gist-gaming-istanbul-2020-basladi" }
    ]
  },
  {
    id: "defacto-tiktok",
    title: { en: "DeFacto - #HavalıveRahat", tr: "DeFacto - #HavalıveRahat" },
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800",
    links: [
      { url: "https://www.youtube.com/watch?v=4Q8UqIWxvmo" }
    ]
  },
  {
    id: "asus-gaming",
    title: { en: "ASUS Radeon CS:GO Turnuvası", tr: "ASUS Radeon CS:GO Turnuvası" },
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800",
    links: [
      { url: "https://www.facebook.com/watch/?v=1306497386049138" }
    ]
  },
  {
    id: "eti-challenges",
    title: { en: "Eti - #eticinlegülümse", tr: "Eti - #eticinlegülümse" },
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=800",
    links: [
      { url: "https://www.tiktok.com/@mutlulukdeninceakla/video/6895369042413079810?lang=tr-TR" }
    ]
  },
  {
    id: "hp-omen",
    title: { en: "HP Omen - LoL Challenge", tr: "HP Omen - LoL Challenge" },
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800",
    links: [
      { url: "https://www.youtube.com/watch?v=I8G9adrIyVM" }
    ]
  },
  {
    id: "metafluence-launch",
    title: { en: "Metafluence Ecosystem", tr: "Metafluence Ekosistemi" },
    image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=800",
    links: [
      { url: "https://metafluence.com/" }
    ]
  },
  {
    id: "yuga-labs",
    title: { en: "Yuga Labs / Otherside", tr: "Yuga Labs / Otherside" },
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800",
    links: [
      { url: "https://otherside.xyz/" }
    ]
  },
  {
    id: "fmcg-creator-integrations",
    title: { en: "Brand Integrations (FMCG)", tr: "Marka Entegrasyonları (Hızlı Tüketim)" },
    image: "https://images.unsplash.com/photo-1556910103-1c02745a872f?q=80&w=800",
    links: [
      { url: "https://www.youtube.com/watch?v=zkK4jmo_ql4" }
    ]
  }
];

let dataContent = fs.readFileSync('src/data.ts', 'utf8');

const englishWorksString = `export const ENGLISH_WORKS: SelectedWork[] = [\n` + works.map(w => {
  return `  {
    id: "${w.id}",
    title: "${w.title.en}",
    subtitle: "",
    category: "",
    tags: [],
    image: "${w.image}"${w.links ? `,\n    links: ${JSON.stringify(w.links.map(l => ({url: l.url, platform: "", label: ""})), null, 6).replace(/\\"/g, '"').replace(/\n      \}/g, '\n      }')}` : ''}
  }`;
}).join(',\n') + `\n];`;

const turkishWorksString = `export const TURKISH_WORKS: SelectedWork[] = [\n` + works.map(w => {
  return `  {
    id: "${w.id}",
    title: "${w.title.tr}",
    subtitle: "",
    category: "",
    tags: [],
    image: "${w.image}"${w.links ? `,\n    links: ${JSON.stringify(w.links.map(l => ({url: l.url, platform: "", label: ""})), null, 6).replace(/\\"/g, '"').replace(/\n      \}/g, '\n      }')}` : ''}
  }`;
}).join(',\n') + `\n];`;

// Regex replace
const startEn = 'export const ENGLISH_WORKS: SelectedWork[] = [';
const startTr = 'export const TURKISH_WORKS: SelectedWork[] = [';

let beforeEn = dataContent.split(startEn)[0];
let afterTrArr = dataContent.split(startTr)[1];
let afterTr = afterTrArr.substring(afterTrArr.indexOf('];') + 2);

const newContent = beforeEn + englishWorksString + '\n\n' + turkishWorksString + afterTr;

fs.writeFileSync('src/data.ts', newContent);
console.log('Works updated successfully');
