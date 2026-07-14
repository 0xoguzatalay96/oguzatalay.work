const fs = require('fs');

let dataContent = fs.readFileSync('src/data.ts', 'utf8');

// --- Task 1: Hero Section ---
dataContent = dataContent.replace(
  /heroTitle: "ÖNCÜ INFLUENCER PAZARLAMASI VE WEB3 MİMARİSİ",/,
  'heroTitle: "INFLUENCER PAZARLAMASI VE WEB3 TOPLULUK STRATEJİSİ",'
);
dataContent = dataContent.replace(
  /heroSub: "Türkiye'deki ilk Influencer Pazarlama Yöneticilerinden biri olarak.*?",/,
  'heroSub: "Web2 influencer ekosistemlerini Web3 topluluk operasyonlarıyla birleştiriyorum. Küresel teknoloji, perakende ve blockchain markaları için yüksek ölçekli içerik üreticisi ortaklıkları, dijitalden fiziksele (D2P) aktivasyonlar ve veriye dayalı kampanyalar yönetme konusunda 9 yıllık deneyim. Karmaşık marka hedeflerini ölçülebilir yatırım getirisine (ROI) ve sürdürülebilir topluluk etkileşimine dönüştürmeye odaklanıyorum.",'
);

dataContent = dataContent.replace(
  /heroTitle: "PIONEERING INFLUENCER MARKETING & WEB3 ARCHITECTURE",/,
  'heroTitle: "INFLUENCER MARKETING & WEB3 COMMUNITY STRATEGY",'
);
dataContent = dataContent.replace(
  /heroSub: "One of Turkey's first Influencer Marketing Managers.*?",/,
  'heroSub: "Bridging Web2 influencer ecosystems with Web3 community operations. 9 years of experience managing high-scale creator partnerships, digital-to-physical (D2P) activations, and data-driven campaigns for global tech, retail, and blockchain brands. Focused on turning complex brand objectives into measurable ROI and sustainable community engagement.",'
);

// --- Task 2: About Section ---
dataContent = dataContent.replace(
  /aboutTitle: "9 Years of Scalable Growth: Bridging Web2 Influencer Ecosystems with Web3 Architecture.",/,
  'aboutTitle: "9 Years of Scalable Growth: Bridging Digital Ecosystems with Web3 Architecture.",'
);
dataContent = dataContent.replace(
  /aboutText: "Recognized as one of the very first Influencer Marketing Managers in Turkey.*?",/,
  'aboutText: "With 9 years of experience across agency, technology, gaming, retail, and Web3 environments, I specialize in building and scaling influencer marketing strategies for industry leaders like Yuga Labs, adidas Originals, ASUS, and Red Bull. My expertise lies in translating complex product narratives into actionable creator briefs, coordinating large-scale influencer operations, and developing sophisticated data-attribution models. Whether executing high-pressure launches with multi-million view engagements or architecting decentralized community support across X and Discord, my focus is always on strategic alignment, clear reporting, and measurable growth.",'
);

dataContent = dataContent.replace(
  /aboutTitle: "Ölçeklenebilir Büyümenin 9 Yılı: Web2 Influencer Ekosistemlerini Web3 Mimarisiyle Birleştirmek.",/,
  'aboutTitle: "Ölçeklenebilir Büyümenin 9 Yılı: Dijital Ekosistemleri Web3 Mimarisiyle Birleştirmek.",'
);
dataContent = dataContent.replace(
  /aboutText: "Türkiye'deki ilk Influencer Pazarlama Yöneticilerinden biri olarak.*?",/,
  'aboutText: "Ajans, teknoloji, oyun, perakende ve Web3 ortamlarında 9 yıllık deneyimimle Yuga Labs, adidas Originals, ASUS ve Red Bull gibi endüstri liderleri için influencer pazarlama stratejileri oluşturma ve ölçeklendirme konusunda uzmanlaşıyorum. Uzmanlığım karmaşık ürün hikayelerini eyleme dönüştürülebilir kreatör brieflerine çevirmek, büyük ölçekli influencer operasyonlarını koordine etmek ve gelişmiş veri ilişkilendirme modelleri geliştirmekte yatıyor. İster milyonlarca görüntülenmeye sahip yüksek baskılı lansmanlar yürütmek olsun, ister X ve Discord\'da merkeziyetsiz topluluk desteği tasarlamak olsun, odak noktam her zaman stratejik uyum, net raporlama ve ölçülebilir büyümedir.",'
);

// --- Task 3: Experience (Consulting) ---
dataContent = dataContent.replace(
  /Leading aggressive creator-led campaign execution, decentralized community activation, and viral growth loops for advanced Web3 and digital product teams\./,
  'Directing strategic creator-led campaigns and community activations for digital asset platforms.'
);
dataContent = dataContent.replace(
  /Architecting massive multi-platform launch playbooks \(X, Discord, Telegram\) to drive maximum awareness and TVL \(Total Value Locked\) across the blockchain space\./,
  'Architecting comprehensive multi-platform playbooks across X, Discord, Telegram, YouTube, TikTok, and Instagram to optimize creator outreach and ROI.'
);
dataContent = dataContent.replace(
  /Serving as the definitive bridge between aggressive commercial goals and boots-on-the-ground community execution, optimizing ROI on top-tier global talent acquisitions\./,
  'Translating commercial goals into creator shortlists, content workflows, and executive-ready reporting.'
);

dataContent = dataContent.replace(
  /İleri düzey Web3 ve dijital ürün ekipleri için agresif içerik üreticisi operasyonlarına, merkeziyetsiz topluluk aktivasyonlarına ve viral büyüme döngülerine liderlik etme\./,
  'Dijital varlık platformları için stratejik içerik üreticisi odaklı kampanyaları ve topluluk aktivasyonlarını yönetme.'
);
dataContent = dataContent.replace(
  /Maksimum farkındalık ve TVL'yi \(Kilitlenmiş Toplam Değer\) artırmak için devasa çok platformlu lansman stratejileri \(X, Discord, Telegram\) tasarlama\./,
  'İçerik üreticisi erişimini ve ROI\'yi (yatırım getirisini) optimize etmek için X, Discord, Telegram, YouTube, TikTok ve Instagram genelinde kapsamlı çok platformlu strateji rehberleri oluşturma.'
);
dataContent = dataContent.replace(
  /Agresif ticari hedefler ile sahadaki topluluk etkileşimi arasında kesin bir köprü görevi görerek, üst düzey küresel yetenek kazanımlarında ROI'yi optimize etme\./,
  'Ticari hedefleri içerik üreticisi kısa listelerine, içerik iş akışlarına ve yöneticilere sunulmaya hazır raporlara dönüştürme.'
);

// --- Task 4: Skills Section ---

dataContent = dataContent.replace(
  /skillsTitle: "SKILLS"/,
  'skillsTitle: "CORE COMPETENCIES"'
);
dataContent = dataContent.replace(
  /skillsTitle: "UZMANLIK ALANLARI"/,
  'skillsTitle: "TEMEL YETKİNLİKLER"'
);

const oldEngSkillsStart = dataContent.indexOf("export const ENGLISH_SKILLS: SkillCategory[] = [");
const oldEngSkillsEnd = dataContent.indexOf("export const TURKISH_SKILLS: SkillCategory[] = [");
const oldTurkSkillsStart = dataContent.indexOf("export const TURKISH_SKILLS: SkillCategory[] = [");
const endOfFile = dataContent.indexOf("];", oldTurkSkillsStart) + 2;

const newSkills = `export const ENGLISH_SKILLS: SkillCategory[] = [
  {
    title: "Influencer & Creator Partnerships",
    items: [
      "End-to-end Creator Campaign Management & Production",
      "Budget Management & Contract Negotiations",
      "Talent Scouting & B2B/B2C Strategy (Gaming, Fashion, Tech)",
      "Data-Driven ROI Analysis & Advanced Attribution Modeling"
    ]
  },
  {
    title: "Web3 & Community Operations",
    items: [
      "Decentralized Community Architecture (X, Discord, Telegram)",
      "D2P (Digital-to-Physical) Fulfillment & Logistics Support",
      "On-chain Metrics, Market-driven Behavior Analysis & Sentiment Reporting",
      "Crisis Management & Moderation Triage"
    ]
  },
  {
    title: "Performance & Reporting",
    items: [
      "Real-time Market Intelligence & Executive Dashboard Creation",
      "Multi-platform KPI Tracking & Brand Lift Auditing",
      "Cross-functional Stakeholder Management"
    ]
  }
];

export const TURKISH_SKILLS: SkillCategory[] = [
  {
    title: "Influencer ve Kreatör Ortaklıkları",
    items: [
      "Uçtan Uca İçerik Üreticisi Kampanya Yönetimi ve Prodüksiyonu",
      "Bütçe Yönetimi ve Sözleşme Müzakereleri",
      "Yetenek Keşfi ve B2B/B2C Stratejisi (Oyun, Moda, Teknoloji)",
      "Veri Odaklı ROI Analizi ve İleri Düzey İlişkilendirme Modelleri"
    ]
  },
  {
    title: "Web3 ve Topluluk Operasyonları",
    items: [
      "Merkeziyetsiz Topluluk Mimarisi (X, Discord, Telegram)",
      "D2P (Dijitalden Fiziksele) Lojistik Desteği",
      "Zincir Üstü (On-chain) Metrikler, Piyasa Odaklı Davranış Analizi ve Duyarlılık Raporlaması",
      "Kriz Yönetimi ve Moderasyon Triage (Önceliklendirme) Süreçleri"
    ]
  },
  {
    title: "Performans ve Raporlama",
    items: [
      "Gerçek Zamanlı Piyasa İstihbaratı ve Yönetici Dashboard'ları Oluşturma",
      "Çoklu Platform KPI Takibi ve Marka Değeri Denetimi",
      "Çapraz Fonksiyonel Paydaş Yönetimi"
    ]
  }
];
`;

dataContent = dataContent.substring(0, oldEngSkillsStart) + newSkills;

fs.writeFileSync('src/data.ts', dataContent);
console.log('Fixed Tasks 1-4 successfully in data.ts');
