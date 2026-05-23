export type CardId = 'about' | 'projects' | 'experience' | 'skills' | 'contact';

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  stats?: { label: string; value: string }[];
  featured?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string[];
  tech: string[];
  logoType: 'code' | 'server' | 'database' | 'globe';
}

export interface SkillCategory {
  title: string;
  icon: string; // lucide icon name
  skills: {
    name: string;
    level: number; // 0-100 percentage
    years: number;
    description: string;
  }[];
}

export interface PortfolioMeta {
  fullName: string;
  title: string;
  location: string;
  bio: string;
  subBio: string;
  avatarUrl?: string;
  stats: { label: string; value: string; suffix?: string }[];
}
