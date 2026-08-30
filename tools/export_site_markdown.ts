import {
  EDUCATION_LIST_EN,
  EDUCATION_LIST_TR,
  EN_TRANSLATION,
  ENGLISH_EXPERIENCE,
  ENGLISH_PROFILE_FIT,
  ENGLISH_SKILLS,
  ENGLISH_TOOL_GROUPS,
  ENGLISH_WORKS,
  LOGO_BRANDS,
  TR_TRANSLATION,
  TURKISH_EXPERIENCE,
  TURKISH_PROFILE_FIT,
  TURKISH_SKILLS,
  TURKISH_TOOL_GROUPS,
  TURKISH_WORKS,
} from "../src/data";

const FEATURED_WORK_IDS = [
  "migros-campaigns",
  "defacto-tiktok",
  "adidas-originals",
  "koton",
  "yuga-labs-dragon",
  "hp-omen",
  "asus-rog-party",
  "eti-challenges",
];

const SHOW_MORE_WORK_IDS = [
  "redbull-events",
  "redbull-meo-season-2",
  "redbull-flick-gist",
  "redbull-csgo-special",
  "nvidia-minecraft-rtx",
  "hyperx-gist-creators",
  "asus-radeon-csgo",
  "asus-rog-maximus",
  "asus-creator-integrations",
  "hp-omen-gist-2019",
  "hp-omen-creator-integrations",
  "migros-pizza-migo",
  "migros-money",
  "defacto-kendini-sev",
  "eti-puf-muzik-akademisi",
  "eti-benimo-dostum",
  "canga-duet",
  "msi-creator-integration",
  "pubg-mobile-real-life",
  "turkcell-pubg-tournament",
  "lenovo-game-on",
  "realme-5i-tiktok",
  "metafluence-launch",
  "pasha-fencer",
];

type Experience = typeof ENGLISH_EXPERIENCE[number];
type Work = typeof ENGLISH_WORKS[number];
type Skill = typeof ENGLISH_SKILLS[number];
type WorkStackGroup = typeof ENGLISH_TOOL_GROUPS[number];
type ProfileFit = typeof ENGLISH_PROFILE_FIT[number];

const orderWorks = (works: Work[]) => {
  const order = [...FEATURED_WORK_IDS, ...SHOW_MORE_WORK_IDS];
  return [...works].sort((a, b) => {
    const aIndex = order.indexOf(a.id);
    const bIndex = order.indexOf(b.id);
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return works.indexOf(a) - works.indexOf(b);
  });
};

const titleParts = (title: string) => {
  const index = title.indexOf(" - ");
  if (index === -1) return { brand: title, project: "" };
  return {
    brand: title.slice(0, index),
    project: title.slice(index + 3),
  };
};

const linesForExperience = (items: Experience[]) =>
  items.flatMap((item) => [
    `### ${item.company}`,
    "",
    `**${item.role}**`,
    "",
    `_${item.period} / ${item.tag}_`,
    "",
    ...item.bullets.map((bullet) => `- ${bullet}`),
    "",
  ]);

const linesForWorks = (works: Work[]) => {
  const ordered = orderWorks(works);
  const featured = ordered.filter((work) => FEATURED_WORK_IDS.includes(work.id));
  const showMore = ordered.filter((work) => SHOW_MORE_WORK_IDS.includes(work.id));

  const renderWork = (work: Work, isFeatured = false) => {
    const parts = titleParts(work.title);
    const heading = isFeatured && parts.project
      ? `### ${parts.brand}\n\n**${parts.project}**`
      : `### ${work.title}`;

    return [
      heading,
      "",
      work.subtitle ? `_${work.subtitle}_` : "",
      work.kpi ? `**KPI:** ${work.kpi}` : "",
      `**Image:** ${work.image}`,
      work.links?.length ? "**Links:**" : "",
      ...(work.links || []).map((link) => {
        const label = link.label || link.platform || "Reference";
        const platform = link.platform ? `${link.platform}: ` : "";
        return `- ${platform}[${label}](${link.url})`;
      }),
      "",
    ].filter(Boolean);
  };

  return [
    "## Selected Works",
    "",
    "### Main Portfolio",
    "",
    ...featured.flatMap((work) => renderWork(work, true)),
    "### Show More",
    "",
    ...showMore.flatMap((work) => renderWork(work)),
  ];
};

const linesForSkills = (skills: Skill[]) =>
  skills.flatMap((category) => [
    `### ${category.title}`,
    "",
    ...category.items.map((item) => `- ${item}`),
    "",
  ]);

const linesForWorkStack = (groups: WorkStackGroup[]) =>
  groups.flatMap((group) => [
    `### ${group.title}`,
    "",
    ...group.items.map((item) => `- ${item}`),
    "",
  ]);

const linesForProfileFit = (items: ProfileFit[]) =>
  items.flatMap((item) => [
    `### ${item.label}`,
    "",
    `**${item.title}**`,
    "",
    item.text,
    "",
  ]);

const page = ({
  label,
  t,
  experiences,
  works,
  skills,
  tools,
  profileFit,
  education,
}: {
  label: string;
  t: typeof EN_TRANSLATION;
  experiences: Experience[];
  works: Work[];
  skills: Skill[];
  tools: WorkStackGroup[];
  profileFit: ProfileFit[];
  education: typeof EDUCATION_LIST_EN;
}) => [
  `# Oğuz Atalay Website Content - ${label}`,
  "",
  "## Navigation",
  "",
  [
    t.navHome,
    t.navAbout,
    t.navExperience,
    t.navWorks,
    t.navSkills,
    t.navEducation,
    t.navContact,
  ].map((item) => `- ${item}`).join("\n"),
  "",
  "## Hero",
  "",
  `# ${t.heroTitle}`,
  "",
  t.heroSub,
  "",
  `**CTA:** ${t.heroBtn}`,
  "",
  "## About",
  "",
  `# ${t.aboutTitle}`,
  "",
  t.aboutText,
  "",
  `- ${t.aboutYears} ${t.aboutYearsLabel}`,
  `- ${t.aboutCreators} ${t.aboutCreatorsLabel}`,
  `- ${t.aboutExperience} ${t.aboutExperienceLabel}`,
  "",
  "## Strategic Fit",
  "",
  ...linesForProfileFit(profileFit),
  "## Professional Experience",
  "",
  ...linesForExperience(experiences),
  ...linesForWorks(works),
  "## Core Competencies",
  "",
  ...linesForSkills(skills),
  `## ${t.toolsTitle}`,
  "",
  `### ${t.toolsStack}`,
  "",
  ...linesForWorkStack(tools),
  "",
  "## Brand Strip",
  "",
  ...LOGO_BRANDS.map((brand) => `- ${brand}`),
  "",
  "## Education",
  "",
  ...education.flatMap((item) => [
    `### ${item.institution}`,
    "",
    `**${item.program}**`,
    "",
    item.details,
    "",
  ]),
  "## Contact",
  "",
  "- Email: oguz@oguzatalay.work",
  "- Phone: +90 543 772 50 66",
  "- LinkedIn: https://www.linkedin.com/in/oguzatalay96/",
  "- WhatsApp: https://wa.me/905437725066",
  "- Location: Istanbul",
  "",
].join("\n");

const markdown = [
  "<!-- Generated from src/data.ts. Do not edit by hand unless the site content intentionally diverges. -->",
  "",
  page({
    label: "EN",
    t: EN_TRANSLATION,
    experiences: ENGLISH_EXPERIENCE,
    works: ENGLISH_WORKS,
    skills: ENGLISH_SKILLS,
    tools: ENGLISH_TOOL_GROUPS,
    profileFit: ENGLISH_PROFILE_FIT,
    education: EDUCATION_LIST_EN,
  }),
  "---",
  "",
  page({
    label: "TR",
    t: TR_TRANSLATION,
    experiences: TURKISH_EXPERIENCE,
    works: TURKISH_WORKS,
    skills: TURKISH_SKILLS,
    tools: TURKISH_TOOL_GROUPS,
    profileFit: TURKISH_PROFILE_FIT,
    education: EDUCATION_LIST_TR,
  }),
].join("\n");

process.stdout.write(markdown);
