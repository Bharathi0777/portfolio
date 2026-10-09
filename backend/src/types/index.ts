import { Document } from 'mongoose';

export interface IAdmin extends Document {
  username: string;
  email: string;
  passwordHash: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProfile extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

export type SkillCategory = 'Frontend' | 'Backend' | 'Database' | 'DevOps & Cloud' | 'Core CS' | 'Tools & Other';

export interface ISkill extends Document {
  name: string;
  category: SkillCategory;
  proficiency: number; // 1 - 100
  iconName?: string;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEducation extends Document {
  degree: string;
  college: string;
  institution?: string;
  university?: string;
  department: string;
  location: string;
  startYear: number;
  endYear: number;
  current: boolean;
  score: string; // e.g., "8.92 CGPA" or "94.2%"
  relevantCoursework: string[];
  description?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IExperience extends Document {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
  technologies: string[];
  location?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProject extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

export interface ICertification extends Document {
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  badgeImageUrl?: string;
  skillsCovered: string[];
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAchievement extends Document {
  title: string;
  description: string;
  date: string;
  category: string; // e.g. "Hackathon", "Coding Contest", "Academic", "Leadership"
  awarder?: string;
  proofUrl?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IContactMessage extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  ipAddress?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface INavItem {
  id: string;
  label: string;
  href: string;
  isVisible: boolean;
  order: number;
}

export interface ISiteSettings extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthTokenPayload {
  id: string;
  email: string;
  username: string;
}
