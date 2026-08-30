const fs = require('fs');

const works = [
  {
    id: "migros-campaigns",
    title: { en: "Migros Viral Campaigns", tr: "Migros Viral Kampanyaları" },
    subtitle: { en: "SOCIAL-FIRST & VIRAL", tr: "SOSYAL MEDYA & VİRAL" },
    category: { en: "CAMPAIGN OPERATIONS & DIRECTION", tr: "KAMPANYA OPERASYONLARI VE YÖNETİMİ" },
    tags: { en: ["TIKTOK CAMPAIGN", "YOUTUBE", "INSTAGRAM", "3.8M+ VIEWS"], tr: ["TIKTOK KAMPANYASI", "YOUTUBE", "INSTAGRAM", "3.8M+ İZLENME"] },
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800",
    links: [
      { url: "https://www.inbusiness.com.tr/sektorler/tarim-gida-perakende/2021/02/23/migros-tiktokta-rekor-kiran-markalardan-oldu", platform: "Web", label: {en: "Case Study", tr: "Vaka Çalışması"} },
      { url: "https://www.tiktok.com/@migros_turkiye/video/6923115888245869826", platform: "TikTok", label: {en: "Reyon Savaşları 1", tr: "Reyon Savaşları 1"} },
      { url: "https://www.tiktok.com/@migros_turkiye/video/6922742736273657090", platform: "TikTok", label: {en: "Reyon Savaşları 2", tr: "Reyon Savaşları 2"} },
      { url: "https://www.youtube.com/watch?v=G7yRuhrMNyA", platform: "YouTube", label: {en: "PizzaMi-Go x Danilo Şef", tr: "PizzaMi-Go x Danilo Şef"} },
      { url: "https://www.instagram.com/p/CSo0K3Fim_A/", platform: "Instagram", label: {en: "Danilo Zanna Collab", tr: "Danilo Zanna Collab"} }
    ]
  },
  {
    id: "defacto-tiktok",
    title: { en: "DeFacto TikTok Series", tr: "DeFacto TikTok Serisi" },
    subtitle: { en: "FASHION RETAIL", tr: "MODA PERAKENDE" },
    category: { en: "CREATOR ACTIVATION", tr: "İÇERİK ÜRETİCİ AKTİVASYONU" },
    tags: { en: ["TIKTOK DANCE", "FASHION", "GEN-Z TARGETING"], tr: ["TIKTOK DANCE", "MODA", "Z KUŞAĞI"] },
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800",
    links: [
      { url: "https://www.tiktok.com/@defacto/video/6889065973509360897", platform: "TikTok", label: {en: "Viral Content 1", tr: "Viral İçerik 1"} },
      { url: "https://www.tiktok.com/@defacto/video/6893871760693873922", platform: "TikTok", label: {en: "Viral Content 2", tr: "Viral İçerik 2"} },
      { url: "https://www.tiktok.com/@defacto/video/6906890715075267842", platform: "TikTok", label: {en: "Viral Content 3", tr: "Viral İçerik 3"} },
      { url: "https://www.tiktok.com/@defacto/video/6925106754716060929", platform: "TikTok", label: {en: "Viral Content 4", tr: "Viral İçerik 4"} },
      { url: "https://www.tiktok.com/@defacto/video/6951043962614353153", platform: "TikTok", label: {en: "Viral Content 5", tr: "Viral İçerik 5"} }
    ]
  },
  {
    id: "eti-challenges",
    title: { en: "Eti Cin, Puf & Canga", tr: "Eti Cin, Puf & Canga" },
    subtitle: { en: "FMCG SOCIAL VIRAL", tr: "HIZLI TÜKETİM VİRAL" },
    category: { en: "SOCIAL MEDIA CHALLENGES", tr: "SOSYAL MEDYA MEYDAN OKUMALARI" },
    tags: { en: ["#eticinlegülümse", "#CangaDuet", "TIKTOK DUETS"], tr: ["#eticinlegülümse", "#CangaDuet", "TIKTOK DUET"] },
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=800",
    links: [
      { url: "https://iabtr.org/odul/eti-cinle-gulumse-hashtag-challange/", platform: "Web", label: {en: "IAB Award Case Study", tr: "IAB Ödülü Vaka Çalışması"} },
      { url: "https://www.tiktok.com/@mutlulukdeninceakla/video/6895369042413079810", platform: "TikTok", label: {en: "Eti Cin Challenge", tr: "Eti Cin Akımı"} },
      { url: "https://www.tiktok.com/@mutlulukdeninceakla/video/6911335832951606529", platform: "TikTok", label: {en: "Eti Puf Music Academy", tr: "Eti Puf Müzik Akademisi"} },
      { url: "https://www.tiktok.com/@mutlulukdeninceakla/video/6912023390186458370", platform: "TikTok", label: {en: "Canga Duet 1", tr: "Canga Düet 1"} },
      { url: "https://www.tiktok.com/@berkejuan/video/6912033546358033666", platform: "TikTok", label: {en: "Canga Duet x Berke Juan", tr: "Canga Düet x Berke Juan"} }
    ]
  },
  {
    id: "koton-realme",
    title: { en: "Koton & Realme", tr: "Koton & Realme" },
    subtitle: { en: "LIFESTYLE & TECH", tr: "YAŞAM TARZI VE TEKNOLOJİ" },
    category: { en: "INFLUENCER OUTREACH", tr: "INFLUENCER ERİŞİMİ" },
    tags: { en: ["#ETİKETLERİÇIKAR", "TECH LAUNCH", "YOUTH FASHION"], tr: ["#ETİKETLERİÇIKAR", "TEKNOLOJİ LANSMANI", "GENÇLİK MODASI"] },
    image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=800",
    links: [
      { url: "https://www.youtube.com/watch?v=mqi0DQ8OnWs", platform: "YouTube", label: {en: "Koton Campaign", tr: "Koton Kampanyası"} },
      { url: "https://www.tiktok.com/@cellat36/video/6894306658910997761", platform: "TikTok", label: {en: "Cellat36 x Koton", tr: "Cellat36 x Koton"} },
      { url: "https://www.behance.net/gallery/107983541/KOTON-ETKETLER-CIKAR", platform: "Web", label: {en: "Koton Behance Archive", tr: "Koton Behance Arşivi"} },
      { url: "https://www.tiktok.com/@realmeturkey/video/6800995380419988741", platform: "TikTok", label: {en: "Realme Turkey", tr: "Realme Türkiye"} }
    ]
  },
  {
    id: "fmcg-creator-integrations",
    title: { en: "Brand Integrations", tr: "Marka Entegrasyonları" },
    subtitle: { en: "FMCG & LIFESTYLE", tr: "HIZLI TÜKETİM & YAŞAM" },
    category: { en: "CREATOR PRODUCT PLACEMENT", tr: "İÇERİK ÜRETİCİ ÜRÜN YERLEŞTİRME" },
    tags: { en: ["BARILLA", "FRANKE", "ALIX AVIEN"], tr: ["BARILLA", "FRANKE", "ALIX AVIEN"] },
    image: "https://images.unsplash.com/photo-1556910103-1c02745a872f?q=80&w=800",
    links: [
      { url: "https://www.youtube.com/watch?v=zkK4jmo_ql4", platform: "YouTube", label: {en: "Barilla Creator Integration", tr: "Barilla İçerik Entegrasyonu"} },
      { url: "https://www.instagram.com/p/CZegCpJDBW_/", platform: "Instagram", label: {en: "Franke x Yağız İzgül", tr: "Franke x Yağız İzgül"} },
      { url: "https://www.youtube.com/watch?v=0UDQCxOeaII", platform: "YouTube", label: {en: "Alix Avien Integration", tr: "Alix Avien Entegrasyonu"} }
    ]
  },
  {
    id: "redbull-events",
    title: { en: "Red Bull Esports & Auto", tr: "Red Bull E-Spor & Motor" },
    subtitle: { en: "LIVE EXPERIENCES", tr: "CANLI DENEYİMLER" },
    category: { en: "GAMING STRATEGY & BROADCAST", tr: "GAMING STRATEJİ VE CANLI YAYIN" },
    tags: { en: ["GIST 2020", "MOTORSPORT", "TWITCH CO-STREAM"], tr: ["GIST 2020", "MOTOR SPORLARI", "TWITCH CO-STREAM"] },
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800",
    links: [
      { url: "https://www.redbull.com/tr-tr/events/red-bull-oyun-meydani-gist-2020", platform: "Web", label: {en: "Gaming Ground GIST 2020", tr: "Oyun Meydanı GIST 2020"} },
      { url: "https://www.twitch.tv/videos/527409779?filter=archives&sort=time", platform: "Twitch", label: {en: "Red Bull MEO Broadcast", tr: "Red Bull MEO Yayını"} },
      { url: "https://www.twitch.tv/videos/544076837?filter=archives&sort=time", platform: "Twitch", label: {en: "AlpTV CS:GO Stream", tr: "AlpTV CS:GO Yayını"} },
      { url: "https://www.youtube.com/watch?v=EBqgPNVCshw", platform: "YouTube", label: {en: "Creator Motorsport Experience", tr: "İçerik Üretici Motor Sporları Deneyimi"} }
    ]
  },
  {
    id: "hardware-gaming",
    title: { en: "Global Tech & Hardware", tr: "Küresel Teknoloji & Donanım" },
    subtitle: { en: "ESPORTS & HARDWARE", tr: "E-SPOR VE DONANIM" },
    category: { en: "EVENT LAUNCH & SPONSORSHIPS", tr: "ETKİNLİK LANSMANI VE SPONSORLUKLAR" },
    tags: { en: ["LENOVO", "HP OMEN", "HYPERX", "ASUS"], tr: ["LENOVO", "HP OMEN", "HYPERX", "ASUS"] },
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800",
    links: [
      { url: "https://www.youtube.com/watch?v=E17ui7kJisY", platform: "YouTube", label: {en: "Lenovo Game On", tr: "Lenovo Game On"} },
      { url: "https://bjk.com.tr/tr/haber/73055/turkiye_rsquo_nin_ilk_gercek_kapsamli_gaming_alani_ldquo_lenovo_game_on_rdquo_kapilarini_ozel_bir_davetle_acti.html", platform: "Web", label: {en: "Lenovo Game On Press", tr: "Lenovo Game On Basın"} },
      { url: "https://www.youtube.com/watch?v=XWTU0JOG1_w", platform: "YouTube", label: {en: "HP Omen Gaming Content", tr: "HP Omen Gaming İçeriği"} },
      { url: "https://www.youtube.com/watch?v=I8G9adrIyVM", platform: "YouTube", label: {en: "HP Omen Tournament Highlight", tr: "HP Omen Turnuva Özeti"} },
      { url: "https://www.youtube.com/watch?v=5uZxqmt1KQQ", platform: "YouTube", label: {en: "HyperX Collab", tr: "HyperX İşbirliği"} },
      { url: "https://www.facebook.com/watch/?v=1306497386049138", platform: "Facebook", label: {en: "Asus Radeon CS:GO Tournament", tr: "Asus Radeon CS:GO Turnuvası"} }
    ]
  },
  {
    id: "tech-marketing",
    title: { en: "Tech Product Marketing", tr: "Teknoloji Ürün Pazarlaması" },
    subtitle: { en: "PC & MOBILE HARDWARE", tr: "BİLGİSAYAR & MOBİL DONANIM" },
    category: { en: "CREATOR PREVIEWS & INTEGRATIONS", tr: "İÇERİK ÜRETİCİ İNCELEMELERİ" },
    tags: { en: ["NVIDIA", "MSI", "ASUS", "CASPER"], tr: ["NVIDIA", "MSI", "ASUS", "CASPER"] },
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800",
    links: [
      { url: "https://gameinfluencer.com/minecraft-rtx-case-study/", platform: "Web", label: {en: "Nvidia Minecraft RTX Case Study", tr: "Nvidia Minecraft RTX Vaka Çalışması"} },
      { url: "https://www.youtube.com/watch?v=t54CwjRDwxo", platform: "YouTube", label: {en: "Nvidia Creator Preview", tr: "Nvidia İçerik Üretici Önizlemesi"} },
      { url: "https://www.youtube.com/watch?v=3RR9kIwoUKQ", platform: "YouTube", label: {en: "MSI Creator Integration", tr: "MSI Entegrasyonu"} },
      { url: "https://www.youtube.com/watch?v=w_AbJRRyzrA", platform: "YouTube", label: {en: "Asus Product Integration", tr: "Asus Ürün Entegrasyonu"} },
      { url: "https://www.youtube.com/watch?v=Ro2WYxaDzvU", platform: "YouTube", label: {en: "Casper Via S Communication", tr: "Casper Via S İletişimi"} }
    ]
  },
  {
    id: "metafluence-launch",
    title: { en: "Metafluence Ecosystem", tr: "Metafluence Ekosistemi" },
    subtitle: { en: "WEB3 & METAVERSE", tr: "WEB3 & METAVERSE" },
    category: { en: "INFLUENCER MARKETING & PR", tr: "INFLUENCER PAZARLAMA VE PR" },
    tags: { en: ["TOKEN LAUNCH", "CRYPTO KOLs", "WHITEPAPER"], tr: ["TOKEN LANSMANI", "KRİPTO KOL'LARI", "WHITEPAPER"] },
    image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=800",
    links: [
      { url: "https://metafluence.com/", platform: "Web", label: {en: "Metafluence Platform", tr: "Metafluence Platformu"} },
      { url: "https://x.com/metafluence/status/1496170254153756675", platform: "X", label: {en: "Launch Announcement", tr: "Lansman Duyurusu"} },
      { url: "https://metafluence.com/wp-content/uploads/2021/11/Metafluence-Whitepaper-V2.0-1.pdf", platform: "Web", label: {en: "Official Whitepaper", tr: "Resmi Whitepaper"} }
    ]
  },
  {
    id: "adidas-originals",
    title: { en: "adidas Into the Metaverse", tr: "adidas Into the Metaverse" },
    subtitle: { en: "WEB3 ECOSYSTEM", tr: "WEB3 EKOSİSTEMİ" },
    category: { en: "COMMUNITY OPERATIONS & CREATOR SUPPORT", tr: "TOPLULUK OPERASYONLARI VE İÇERİK ÜRETİCİ DESTEĞİ" },
    tags: { en: ["WEB3 STRATEGY", "DISCORD", "D2P FULFILMENT"], tr: ["KREATÖR STRATEJİSİ", "DISCORD TOPLULUĞU", "D2P FİZİKSEL ÜRÜN"] },
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800"
  },
  {
    id: "yuga-labs",
    title: { en: "Yuga Labs", tr: "Yuga Labs" },
    subtitle: { en: "METAVERSE STRATEGY", tr: "KÜRESEL EKOSİSTEM" },
    category: { en: "CREATOR PARTNERSHIPS & INTEL REPORTING", tr: "ORTAKLIKLAR VE TOPLULUK RAPORLAMALARI" },
    tags: { en: ["METAVERSE", "X OPERATIONS", "CREATOR NETWORKS"], tr: ["METAVERSE", "X OPERASYONLARI", "İÇERİK ÜRETİCİ AĞI"] },
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800"
  }
];

let dataContent = fs.readFileSync('src/data.ts', 'utf8');

const englishWorksString = `export const ENGLISH_WORKS: SelectedWork[] = [\n` + works.map(w => {
  return `  {
    id: "${w.id}",
    title: "${w.title.en}",
    subtitle: "${w.subtitle.en}",
    category: "${w.category.en}",
    tags: ${JSON.stringify(w.tags.en)},
    image: "${w.image}"${w.links ? `,\n    links: ${JSON.stringify(w.links.map(l => ({url: l.url, platform: l.platform, label: l.label.en})), null, 6).replace(/\\"/g, '"').replace(/\n      \}/g, '\n      }')}` : ''}
  }`;
}).join(',\n') + `\n];`;

const turkishWorksString = `export const TURKISH_WORKS: SelectedWork[] = [\n` + works.map(w => {
  return `  {
    id: "${w.id}",
    title: "${w.title.tr}",
    subtitle: "${w.subtitle.tr}",
    category: "${w.category.tr}",
    tags: ${JSON.stringify(w.tags.tr)},
    image: "${w.image}"${w.links ? `,\n    links: ${JSON.stringify(w.links.map(l => ({url: l.url, platform: l.platform, label: l.label.tr})), null, 6).replace(/\\"/g, '"').replace(/\n      \}/g, '\n      }')}` : ''}
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
