const fs = require('fs');

let content = fs.readFileSync('src/data.ts', 'utf8');

// Find the end of ENGLISH_WORKS
// Actually, let's just replace from `{ title: "Web3 & Blockchain Ecosystem Architecture"` 
// up to `export const TURKISH_SKILLS` with a complete ENGLISH_SKILLS block.

const startString = `  {
    title: "Web3 & Blockchain Ecosystem Architecture",`;

const endString = `export const TURKISH_SKILLS: SkillCategory[] = [`;

const startIndex = content.indexOf(startString);
const endIndex = content.indexOf(endString);

if (startIndex !== -1 && endIndex !== -1) {
  const replacement = `export const ENGLISH_SKILLS: SkillCategory[] = [
  {
    title: "Master Influencer & Creator Marketing",
    items: [
      "PIONEER: ONE OF THE FIRST OFFICIAL INFLUENCER MARKETING MANAGERS IN TÜRKİYE",
      "TOP-TIER TALENT SCOUTING & PURPOSE-DRIVEN TALENT ACQUISITION",
      "DATA-DRIVEN ROI, CAC REDUCTION & ADVANCED ATTRIBUTION MODELING",
      "MULTI-MILLION LIRA BUDGET MANAGEMENT & CRITICAL CONTRACT NEGOTIATIONS",
      "VIRAL CAMPAIGN ARCHITECTURE & FLAWLESS EXECUTION (TIKTOK, X, IG, YOUTUBE)",
      "GLOBAL CREATOR SYNERGY, PRIVATE NETWORK SCALING & TALENT MANAGEMENT",
      "360° CREATIVE PRODUCTION, MEDIA PLANNING & LIVE ESPORTS BROADCASTING",
      "B2C & B2B INFLUENCER STRATEGY (GAMING, FASHION, FMCG, TECH)"
    ]
  },
  {
    title: "Web3 & Blockchain Ecosystem Architecture",
    items: [
      "DECENTRALIZED COMMUNITY DESIGN, TOKENOMICS AWARENESS & GROWTH HACKING",
      "X (TWITTER) SPACES HOSTING, DISCORD AMAS & GLOBAL KOL ACTIVATIONS",
      "D2C PHYSICAL-DIGITAL (PHYGITAL) FULFILLMENT & LOGISTICS BRIDGING",
      "ON-CHAIN METRICS, SMART MONEY TRACKING & WALLET BEHAVIOR ANALYSIS",
      "DISCORD SENTIMENT SCALING, MODERATION TRIAGE & CRISIS MANAGEMENT",
      "NFT MINT MARKETING, WHITELIST (WL) STRATEGIES & FLOOR PRICE PSYCHOLOGY",
      "WEB3 INFLUENCER SEEDING & PRIVATE-SALE (ICO/IDO/NFT) HIGH-DEMAND CAMPAIGN EXECUTION",
      "METAVERSE LAND ACTIVATIONS & DECENTRALIZED BRAND PARTNERSHIPS"
    ]
  },
  {
    title: "Rapid Learning & Performance Operations",
    items: [
      "AGILE TECHNOLOGY INTEGRATION OF EMERGING TECHNOLOGIES & AI TOOLS",
      "HIGH-VOLUME SATELLITE WORKFLOW OPTIMIZATION & RESOURCE ALLOCATION",
      "REAL-TIME MARKET INTELLIGENCE REPORTING & COMPETITIVE INTELLIGENCE",
      "EXPONENTIAL NEW-TECH INTEGRATION INTO LEGACY MARKETING PIPELINES",
      "CROSS-PLATFORM KPI, BRAND LIFT & CONVERSION AUDITING",
      "AGILE STAKEHOLDER MANAGEMENT & GLOBAL C-LEVEL REPORTING",
      "AUTOMATED BRIEFING PIPELINES & EXECUTIVE DASHBOARD CREATION",
      "DATA WAREHOUSING SYNERGY (GOOGLE ANALYTICS, SQL BASICS, BI TOOLS)"
    ]
  }
];

export const TURKISH_SKILLS: SkillCategory[] = [`;

  content = content.substring(0, startIndex) + replacement + content.substring(endIndex + endString.length);
  fs.writeFileSync('src/data.ts', content);
  console.log('Fixed ENGLISH_SKILLS');
} else {
  console.log('Could not find boundaries');
}
