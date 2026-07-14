const fs = require('fs');

let dataContent = fs.readFileSync('src/data.ts', 'utf8');

// Update EN stats
dataContent = dataContent.replace(
  'aboutYears: "10+",',
  'aboutYears: "9",'
);
dataContent = dataContent.replace(
  'aboutCreators: "150+",\n  aboutCreatorsLabel: "Top-Tier Creators Managed",\n  aboutExperience: "30+",\n  aboutExperienceLabel: "Global Brands Scaled",',
  `aboutCreators: "200+",\n  aboutCreatorsLabel: "Influencer Collaborations",\n  aboutExperience: "150+",\n  aboutExperienceLabel: "Brand Collaborations",`
);

// Update TR stats
dataContent = dataContent.replace(
  'aboutYears: "10+",',
  'aboutYears: "9",'
);
dataContent = dataContent.replace(
  'aboutCreators: "150+",\n  aboutCreatorsLabel: "Yönetilen Üst Düzey Kreatör",\n  aboutExperience: "30+",\n  aboutExperienceLabel: "Büyütülen Küresel Marka",',
  `aboutCreators: "200+",\n  aboutCreatorsLabel: "Influencer İş Birliği",\n  aboutExperience: "150+",\n  aboutExperienceLabel: "Marka İş Birliği",`
);

// Update 10 -> 9 in text
dataContent = dataContent.replace(
  /10 years of strategic/g,
  '9 years of strategic'
);
dataContent = dataContent.replace(
  /Over 10 years of turning/g,
  'Over 9 years of turning'
);
dataContent = dataContent.replace(
  /A Decade of Scalable Growth/g,
  '9 Years of Scalable Growth'
);

dataContent = dataContent.replace(
  /Ölçeklenebilir Büyümenin 10 Yılı/g,
  'Ölçeklenebilir Büyümenin 9 Yılı'
);
dataContent = dataContent.replace(
  /10 yılı aşkın süredir/g,
  '9 yılı aşkın süredir'
);

fs.writeFileSync('src/data.ts', dataContent);
console.log('Fixed data.ts text and stats');
