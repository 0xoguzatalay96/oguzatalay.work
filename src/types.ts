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
  role?: string;
  challenge?: string;
  action?: string;
  result?: string;
  links?: { url: string; platform: string; label?: string }[];
}

export interface SkillCategory {
  title: string;
  items: string[];
}

export interface WorkStackGroup {
  title: string;
  items: string[];
}

export interface ProfileFitItem {
  label: string;
  title: string;
  text: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issuerCategory?: string;
  category: "Marketing" | "Analytics" | "Blockchain & Digital Assets" | "Blockchain & Dijital Varlıklar" | "Management" | string;
  date: string;
  coursesCount: number;
  courses?: string[];
  image: string;
  credentialUrl: string;
  pdfUrl: string;
  description: string;
  skills: string[];
}

export interface TranslationSet {
  navHome: string;
  navAbout: string;
  navExperience: string;
  navWorks: string;
  navSkills: string;
  navTools: string;
  navEducation: string;
  navCertificates: string;
  navContact: string;
  
  heroTitle: string;
  heroSub: string;
  heroBtn: string;
  heroBtnContact?: string;
  
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
  certificatesTitle: string;
  certificatesSub: string;
  certificatesVerify: string;
  certificatesPdf: string;
  certificatesCourses: string;
  certificatesFilterAll: string;
  
  ctaBtn: string;
}
