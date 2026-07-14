const fs = require('fs');

let content = fs.readFileSync('src/components/About.tsx', 'utf8');

// Fix counts in useEffect
content = content.replace(
  /if \(prev >= 10\) \{\s*clearInterval\(expTimer\);\s*return 10;\s*\}/,
  'if (prev >= 9) { clearInterval(expTimer); return 9; }'
);
content = content.replace(
  /if \(prev >= 70\) \{\s*clearInterval\(creatorTimer\);\s*return 70;\s*\}/,
  'if (prev >= 200) { clearInterval(creatorTimer); return 200; }'
);
content = content.replace(
  /if \(prev >= 15\) \{\s*clearInterval\(brandsTimer\);\s*return 15;\s*\}/,
  'if (prev >= 150) { clearInterval(brandsTimer); return 150; }'
);
content = content.replace(
  /return prev \+ 5;\s*\}\);\s*\}, 50\);/g,
  'return prev + 10; }); }, 50);' // faster increment for 200
);
content = content.replace(
  /return prev \+ 1;\s*\}\);\s*\}, 80\);/,
  'return prev + 5; }); }, 50);' // faster increment for 150
);

// Fix JSX for Stat 1
content = content.replace(
  `                <div>
                  <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider mb-1">
                    {t.aboutYears}
                  </h4>
                  <p className="font-sans text-xs text-[#A0A0A0]">{t.aboutYearsLabel}</p>
                </div>`,
  `                <div>
                  <p className="font-sans text-sm md:text-base font-medium text-white/90">{t.aboutYearsLabel}</p>
                </div>`
);

// Fix JSX for Stat 2
content = content.replace(
  `                <div>
                  <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider mb-1">
                    {t.aboutCreators}
                  </h4>
                  <p className="font-sans text-xs text-[#A0A0A0]">{t.aboutCreatorsLabel}</p>
                </div>`,
  `                <div>
                  <p className="font-sans text-sm md:text-base font-medium text-white/90">{t.aboutCreatorsLabel}</p>
                </div>`
);

// Fix JSX for Stat 3
content = content.replace(
  `                <div>
                  <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider mb-1">
                    {t.aboutExperience}
                  </h4>
                  <p className="font-sans text-xs text-[#A0A0A0]">{t.aboutExperienceLabel}</p>
                </div>`,
  `                <div>
                  <p className="font-sans text-sm md:text-base font-medium text-white/90">{t.aboutExperienceLabel}</p>
                </div>`
);

fs.writeFileSync('src/components/About.tsx', content);
console.log('Fixed About.tsx');
