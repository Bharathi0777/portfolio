export interface ProfileData {
  _id?: string;
  fullName: string;
  tagline: string;
  headline: string;
  roles: string[];
  bio: string;
  aboutStory: string;
  careerGoals: string;
  avatarUrl: string;
  resumeUrl: string;
  email: string;
  phone: string;
  location: string;
  collegeName: string;
  department: string;
  graduationYear: number;
  currentYear: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    leetcode?: string;
    codechef?: string;
    hackerrank?: string;
    youtube?: string;
    website?: string;
  };
  stats: {
    projectsCount?: number;
    certificationsCount?: number;
    solvedProblemsCount?: number;
    gpa?: string;
  };
  availableForHire: boolean;
}

export type SkillCategory = 'Frontend' | 'Backend' | 'Database' | 'DevOps & Cloud' | 'Core CS' | 'Tools & Other';

export interface SkillData {
  _id: string;
  name: string;
  category: SkillCategory;
  proficiency: number;
  iconName?: string;
  featured: boolean;
  order: number;
}

export interface EducationData {
  _id: string;
  degree: string;
  college: string;
  institution?: string;
  university?: string;
  department: string;
  location: string;
  startYear: number;
  endYear: number;
  current: boolean;
  score: string;
  relevantCoursework: string[];
  description?: string;
  order: number;
}

export interface ExperienceData {
  _id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
  technologies: string[];
  location?: string;
  order: number;
}

export interface ProjectData {
  _id: string;
  title: string;
  tagline: string;
  description: string;
  technologies: string[];
  category: 'Full Stack' | 'Frontend' | 'Backend' | 'Mobile' | 'AI / ML' | 'Systems / DevOps';
  githubUrl: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
  highlights: string[];
  order: number;
}

export interface CertificationData {
  _id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  badgeImageUrl?: string;
  skillsCovered: string[];
  featured: boolean;
  order: number;
}

export interface AchievementData {
  _id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  awarder?: string;
  proofUrl?: string;
  order: number;
}

export interface ContactMessageData {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  ipAddress?: string;
  createdAt: string;
}

export interface ContactFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface INavItem {
  id: string;
  label: string;
  href: string;
  isVisible: boolean;
  order: number;
}

export interface SiteSettingsData {
  _id?: string;
  navbar: {
    logoText: string;
    items: INavItem[];
  };
  home: {
    name: string;
    title: string;
    introduction: string;
    description: string;
    profilePhotoUrl: string;
    resumeButtonText: string;
    resumeUrl: string;
    githubUrl: string;
    linkedinUrl: string;
    otherSocials: {
      twitter?: string;
      instagram?: string;
      leetcode?: string;
      website?: string;
    };
  };
  about: {
    title: string;
    description: string;
    imageUrl: string;
    personalInfo: {
      label: string;
      value: string;
    }[];
  };
  resume: {
    resumeUrl: string;
    fileName: string;
    buttonText: string;
    lastUpdated?: string;
  };
  contact: {
    email: string;
    phone: string;
    location: string;
    description: string;
    github: string;
    linkedin: string;
    instagram: string;
    twitter: string;
  };
  footer: {
    description: string;
    copyrightText: string;
    links: { label: string; url: string }[];
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    id: string;
    email: string;
    username: string;
  };
}
