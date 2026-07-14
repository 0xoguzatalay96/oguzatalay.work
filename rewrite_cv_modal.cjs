const fs = require('fs');
let content = fs.readFileSync('src/components/HarvardCVModal.tsx', 'utf8');

// replace html2pdf import and add works import
content = content.replace(
  /import html2pdf from "html2pdf\.js";\n/,
  ''
);

content = content.replace(
  /import { EDUCATION_LIST_EN, EDUCATION_LIST_TR, TOOLS_LIST } from "\.\.\/data";/,
  `import { EDUCATION_LIST_EN, EDUCATION_LIST_TR, TOOLS_LIST, ENGLISH_WORKS, TURKISH_WORKS } from "../data";`
);

// replace handlePrint
const newHandlePrint = `  const handleExportMD = () => {
    setIsGenerating(true);
    const works = lang === "EN" ? ENGLISH_WORKS : TURKISH_WORKS;
    const educations = lang === "EN" ? EDUCATION_LIST_EN : EDUCATION_LIST_TR;

    let md = \`# OGUZ ATALAY\\n\\n\`;
    md += \`## \${t.heroTitle}\\n\\n\`;
    md += \`\${t.heroSub}\\n\\n---\\n\\n\`;

    md += \`## \${t.aboutTitle}\\n\\n\`;
    md += \`\${t.aboutText}\\n\\n\`;
    md += \`- **\${t.aboutYearsLabel}**: \${t.aboutYears}\\n\`;
    md += \`- **\${t.aboutCreatorsLabel}**: \${t.aboutCreators}\\n\`;
    md += \`- **\${t.aboutExperienceLabel}**: \${t.aboutExperience}\\n\\n---\\n\\n\`;

    md += \`## \${t.experienceTitle}\\n\\n\`;
    experiences.forEach(exp => {
      md += \`### \${exp.role} @ \${exp.company}\\n\`;
      md += \`**\${exp.period}** | *\${exp.tag}*\\n\\n\`;
      exp.bullets.forEach(bullet => {
        md += \`- \${bullet}\\n\`;
      });
      md += \`\\n\`;
    });
    md += \`---\\n\\n\`;

    md += \`## \${t.worksTitle}\\n\\n\`;
    works.forEach(work => {
      md += \`### \${work.title}\\n\`;
      md += \`**KPI**: \${work.kpi}\\n\\n\`;
    });
    md += \`---\\n\\n\`;

    md += \`## \${t.skillsTitle}\\n\\n\`;
    skills.forEach(skillCat => {
      md += \`### \${skillCat.title}\\n\`;
      skillCat.items.forEach(item => {
        md += \`- \${item}\\n\`;
      });
      md += \`\\n\`;
    });
    md += \`---\\n\\n\`;

    md += \`## \${t.toolsTitle}\\n\\n\`;
    md += TOOLS_LIST.map(tool => \`- \${tool}\`).join('\\n') + \`\\n\\n---\\n\\n\`;

    md += \`## \${t.educationTitle}\\n\\n\`;
    educations.forEach(edu => {
      md += \`### \${edu.institution}\\n\`;
      md += \`**\${edu.program}**\\n\`;
      md += \`\${edu.details}\\n\\n\`;
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', \`Oguz_Atalay_Profile_\${lang}.md\`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsGenerating(false);
  };`;

content = content.replace(
  /const handlePrint = async \(\) => \{[\s\S]*?setIsGenerating\(false\);\n    \}\n  \};/,
  newHandlePrint
);

// replace handlePrint call and button text
content = content.replace(
  /onClick=\{handlePrint\}/,
  'onClick={handleExportMD}'
);

content = content.replace(
  /DOWNLOAD PDF/g,
  'DOWNLOAD MD'
);
content = content.replace(
  /PDF İNDİR/g,
  'MD İNDİR'
);

fs.writeFileSync('src/components/HarvardCVModal.tsx', content);
