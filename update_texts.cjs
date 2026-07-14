const fs = require('fs');

let dataContent = fs.readFileSync('src/data.ts', 'utf8');

// Replacements for EN
dataContent = dataContent.replace(
  'aboutTitle: "A Decade of Relentless Growth: From Web2 Influencer Pioneer to Web3 Campaign Mastermind."',
  'aboutTitle: "A Decade of Scalable Growth: Bridging Web2 Influencer Ecosystems with Web3 Architecture."'
);

dataContent = dataContent.replace(
  '10 years of aggressive, high-scale experience across agencies, tech, gaming, retail, and elite Web3 ecosystems. Fast learner, exponential scaler. Managing 100+ top-tier creators, executing high-value viral campaigns, and leading global ecosystem coordination.',
  '10 years of strategic, high-scale experience across agencies, tech, gaming, retail, and elite Web3 ecosystems. Fast learner, sustainable scaler. Managing 100+ top-tier creators, executing high-value viral campaigns, and leading global ecosystem coordination.'
);

dataContent = dataContent.replace(
  'driving exponential community growth',
  'driving sustainable community growth'
);

// Replacements for TR
dataContent = dataContent.replace(
  'aboutTitle: "Durmaksızın Büyümenin 10 Yılı: Web2 Influencer Öncülüğünden Web3 Kampanya Ustalığına."',
  'aboutTitle: "Ölçeklenebilir Büyümenin 10 Yılı: Web2 Influencer Ekosistemlerini Web3 Mimarisiyle Birleştirmek."'
);

dataContent = dataContent.replace(
  '10 yıllık agresif ve devasa ölçekli deneyim. Hızlı öğrenen, eksponansiyel büyüten bir stratejist.',
  '10 yıllık stratejik ve devasa ölçekli deneyim. Hızlı öğrenen, sürdürülebilir büyüme sağlayan bir stratejist.'
);

dataContent = dataContent.replace(
  'TIER-1 TALENT DISCOVERY, ACQUISITION & AGGRESSIVE OUTREACH',
  'TIER-1 TALENT DISCOVERY, ACQUISITION & TARGETED TALENT ACQUISITION'
);
// Fix the double acquisition issue. Just change AGGRESSIVE OUTREACH to TARGETED TALENT ACQUISITION
dataContent = dataContent.replace(
  'TIER-1 TALENT DISCOVERY, ACQUISITION & TARGETED TALENT ACQUISITION',
  'TIER-1 TALENT DISCOVERY & TARGETED TALENT ACQUISITION'
);

dataContent = dataContent.replace(
  'WEB3 INFLUENCER SEEDING & PRIVATE-SALE (ICO/IDO/NFT) FOMO GENERATION',
  'WEB3 INFLUENCER SEEDING & PRIVATE-SALE (ICO/IDO/NFT) HIGH-DEMAND CAMPAIGN EXECUTION'
);

dataContent = dataContent.replace(
  'RECORD-SPEED ADOPTION OF EMERGING TECHNOLOGIES & AI TOOLS',
  'AGILE TECHNOLOGY INTEGRATION OF EMERGING TECHNOLOGIES & AI TOOLS'
);

fs.writeFileSync('src/data.ts', dataContent);
console.log('Texts updated');
