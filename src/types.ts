export interface JobExperience {
  period: string;
  tag: string;
  company: string;
  role: string;
  bullets: string[];
}

export interface SelectedWork {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  image: string;
  kpi?: string;
  links?: { url: string; platform: string; label?: string }[];
}

export interface SkillCategory {
  title: string;
  items: string[];
}

export interface TranslationSet {
  navHome: string;
  navAbout: string;
  navExperience: string;
  navWorks: string;
  navSkills: string;
  navTools: string;
  navEducation: string;
  navContact: string;
  
  heroTitle: string;
  heroSub: string;
  heroBtn: string;
  
  aboutTitle: string;
  aboutSub: string;
  aboutText: string;
  aboutYears: string;
  aboutYearsLabel: string;
  aboutCreators: string;
  aboutCreatorsLabel: string;
  aboutExperience: string;
  aboutExperienceLabel: string;
  
  experienceTitle: string;
  worksTitle: string;
  skillsTitle: string;
  toolsTitle: string;
  toolsStack: string;
  educationTitle: string;
  
  ctaTitle: string;
  ctaBtn: string;
  
  contactFormTitle: string;
  contactNamePlaceholder: string;
  contactEmailPlaceholder: string;
  contactMessagePlaceholder: string;
  contactSubmitBtn: string;
  contactSuccessMsg: string;
  contactQuickTemplateLabel: string;
  contactQuickTemplate1: string;
  contactQuickTemplate2: string;
  contactQuickTemplate3: string;
}
