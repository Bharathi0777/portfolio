import axios, { AxiosInstance } from 'axios';
import {
  ApiResponse,
  AuthResponse,
  ProfileData,
  SkillData,
  EducationData,
  ExperienceData,
  ProjectData,
  CertificationData,
  AchievementData,
  ContactMessageData,
  ContactFormInput,
  SiteSettingsData,
} from '../types/index.ts';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Backend origin (without /api) — used to resolve uploaded file URLs
export const BACKEND_ORIGIN = API_BASE_URL.replace(/\/api$/, '');

/**
 * Resolves a stored asset URL to a fully-qualified URL.
 * Uploaded files are stored as "/uploads/filename.ext" relative to the
 * backend. The frontend runs on a different port (5173), so we must
 * prepend the backend origin for the browser to fetch the file correctly.
 *
 * Examples:
 *   "/uploads/photo.jpg"   → "http://localhost:5000/uploads/photo.jpg"
 *   "https://cdn.example"  → "https://cdn.example"   (unchanged)
 *   ""                     → ""
 */
export const resolveAssetUrl = (url?: string | null): string => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//')) {
    return url;
  }
  // It's a relative path like /uploads/...
  return `${BACKEND_ORIGIN}${url.startsWith('/') ? '' : '/'}${url}`;
};

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Attach JWT token automatically for authenticated requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('portfolio_admin_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const portfolioApi = {
  // Profile
  getProfile: async (): Promise<ProfileData> => {
    const res = await apiClient.get<ApiResponse<ProfileData>>('/profile');
    return res.data.data;
  },
  updateProfile: async (data: Partial<ProfileData>): Promise<ProfileData> => {
    const res = await apiClient.put<ApiResponse<ProfileData>>('/profile', data);
    return res.data.data;
  },

  // Site Settings (Home, About, Resume, Contact, Navbar, Footer, etc.)
  getSiteSettings: async (): Promise<SiteSettingsData> => {
    const res = await apiClient.get<ApiResponse<SiteSettingsData>>('/settings');
    return res.data.data;
  },
  updateSiteSettings: async (data: Partial<SiteSettingsData>): Promise<SiteSettingsData> => {
    const res = await apiClient.put<ApiResponse<SiteSettingsData>>('/settings', data);
    return res.data.data;
  },

  // Skills
  getSkills: async (): Promise<SkillData[]> => {
    const res = await apiClient.get<ApiResponse<SkillData[]>>('/skills');
    return res.data.data;
  },
  createSkill: async (data: Omit<SkillData, '_id'>): Promise<SkillData> => {
    const res = await apiClient.post<ApiResponse<SkillData>>('/skills', data);
    return res.data.data;
  },
  updateSkill: async (id: string, data: Partial<SkillData>): Promise<SkillData> => {
    const res = await apiClient.put<ApiResponse<SkillData>>(`/skills/${id}`, data);
    return res.data.data;
  },
  deleteSkill: async (id: string): Promise<void> => {
    await apiClient.delete(`/skills/${id}`);
  },

  // Education
  getEducation: async (): Promise<EducationData[]> => {
    const res = await apiClient.get<ApiResponse<EducationData[]>>('/education');
    return res.data.data;
  },
  createEducation: async (data: Omit<EducationData, '_id'>): Promise<EducationData> => {
    const res = await apiClient.post<ApiResponse<EducationData>>('/education', data);
    return res.data.data;
  },
  updateEducation: async (id: string, data: Partial<EducationData>): Promise<EducationData> => {
    const res = await apiClient.put<ApiResponse<EducationData>>(`/education/${id}`, data);
    return res.data.data;
  },
  deleteEducation: async (id: string): Promise<void> => {
    await apiClient.delete(`/education/${id}`);
  },

  // Experience
  getExperience: async (): Promise<ExperienceData[]> => {
    const res = await apiClient.get<ApiResponse<ExperienceData[]>>('/experience');
    return res.data.data;
  },
  createExperience: async (data: Omit<ExperienceData, '_id'>): Promise<ExperienceData> => {
    const res = await apiClient.post<ApiResponse<ExperienceData>>('/experience', data);
    return res.data.data;
  },
  updateExperience: async (id: string, data: Partial<ExperienceData>): Promise<ExperienceData> => {
    const res = await apiClient.put<ApiResponse<ExperienceData>>(`/experience/${id}`, data);
    return res.data.data;
  },
  deleteExperience: async (id: string): Promise<void> => {
    await apiClient.delete(`/experience/${id}`);
  },

  // Projects
  getProjects: async (): Promise<ProjectData[]> => {
    const res = await apiClient.get<ApiResponse<ProjectData[]>>('/projects');
    return res.data.data;
  },
  createProject: async (data: Omit<ProjectData, '_id'>): Promise<ProjectData> => {
    const res = await apiClient.post<ApiResponse<ProjectData>>('/projects', data);
    return res.data.data;
  },
  updateProject: async (id: string, data: Partial<ProjectData>): Promise<ProjectData> => {
    const res = await apiClient.put<ApiResponse<ProjectData>>(`/projects/${id}`, data);
    return res.data.data;
  },
  deleteProject: async (id: string): Promise<void> => {
    await apiClient.delete(`/projects/${id}`);
  },

  // Certifications
  getCertifications: async (): Promise<CertificationData[]> => {
    const res = await apiClient.get<ApiResponse<CertificationData[]>>('/certifications');
    return res.data.data;
  },
  createCertification: async (data: Omit<CertificationData, '_id'>): Promise<CertificationData> => {
    const res = await apiClient.post<ApiResponse<CertificationData>>('/certifications', data);
    return res.data.data;
  },
  updateCertification: async (id: string, data: Partial<CertificationData>): Promise<CertificationData> => {
    const res = await apiClient.put<ApiResponse<CertificationData>>(`/certifications/${id}`, data);
    return res.data.data;
  },
  deleteCertification: async (id: string): Promise<void> => {
    await apiClient.delete(`/certifications/${id}`);
  },

  // Achievements
  getAchievements: async (): Promise<AchievementData[]> => {
    const res = await apiClient.get<ApiResponse<AchievementData[]>>('/achievements');
    return res.data.data;
  },
  createAchievement: async (data: Omit<AchievementData, '_id'>): Promise<AchievementData> => {
    const res = await apiClient.post<ApiResponse<AchievementData>>('/achievements', data);
    return res.data.data;
  },
  updateAchievement: async (id: string, data: Partial<AchievementData>): Promise<AchievementData> => {
    const res = await apiClient.put<ApiResponse<AchievementData>>(`/achievements/${id}`, data);
    return res.data.data;
  },
  deleteAchievement: async (id: string): Promise<void> => {
    await apiClient.delete(`/achievements/${id}`);
  },

  // File Upload
  uploadFile: async (file: File): Promise<{ success: boolean; fileUrl: string; fileName: string }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        try {
          const base64Data = reader.result as string;
          const res = await apiClient.post<{ success: boolean; fileUrl: string; fileName: string }>('/upload', {
            fileName: file.name,
            fileData: base64Data,
            fileType: file.type,
          });
          resolve(res.data);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = (error) => reject(error);
    });
  },

  // Contact
  sendContactMessage: async (data: ContactFormInput): Promise<{ success: boolean; message: string }> => {
    const res = await apiClient.post<{ success: boolean; message: string }>('/contact', data);
    return res.data;
  },
  getContactMessages: async (): Promise<ContactMessageData[]> => {
    const res = await apiClient.get<ApiResponse<ContactMessageData[]>>('/contact');
    return res.data.data;
  },
  markMessageRead: async (id: string): Promise<void> => {
    await apiClient.patch(`/contact/${id}/read`);
  },
  deleteContactMessage: async (id: string): Promise<void> => {
    await apiClient.delete(`/contact/${id}`);
  },

  // Auth
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const res = await apiClient.post<AuthResponse>('/auth/login', { email, password });
    return res.data;
  },
  checkAuth: async (): Promise<boolean> => {
    try {
      const res = await apiClient.get<{ success: boolean }>('/auth/me');
      return res.data.success;
    } catch {
      return false;
    }
  },
};
