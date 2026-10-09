import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Home,
  User,
  Cpu,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Award,
  Trophy,
  FileText,
  Mail,
  Share2,
  Menu as MenuIcon,
  AlignLeft,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  CheckCircle,
  ExternalLink,
  Shield,
  Upload,
  Eye,
  EyeOff,
  ChevronRight,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  BookOpen,
} from 'lucide-react';
import { portfolioApi, resolveAssetUrl } from '../services/api.ts';
import {
  SkillData,
  EducationData,
  ExperienceData,
  ProjectData,
  CertificationData,
  AchievementData,
  ContactMessageData,
  SiteSettingsData,
  SkillCategory,
  INavItem,
} from '../types/index.ts';
import { Loading } from '../components/Loading.tsx';
import '../styles/Admin.css';

// ─── Section Type ─────────────────────────────────────────────────────────────
type Section =
  | 'dashboard'
  | 'home'
  | 'about'
  | 'skills'
  | 'education'
  | 'experience'
  | 'projects'
  | 'certifications'
  | 'achievements'
  | 'resume'
  | 'contact'
  | 'social-links'
  | 'navbar'
  | 'footer';

interface SidebarItem {
  id: Section;
  label: string;
  icon: React.ReactNode;
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { id: 'home', label: 'Home', icon: <Home size={18} /> },
  { id: 'about', label: 'About', icon: <User size={18} /> },
  { id: 'skills', label: 'Skills', icon: <Cpu size={18} /> },
  { id: 'education', label: 'Education', icon: <GraduationCap size={18} /> },
  { id: 'experience', label: 'Experience', icon: <Briefcase size={18} /> },
  { id: 'projects', label: 'Projects', icon: <FolderGit2 size={18} /> },
  { id: 'certifications', label: 'Certifications', icon: <Award size={18} /> },
  { id: 'achievements', label: 'Achievements', icon: <Trophy size={18} /> },
  { id: 'resume', label: 'Resume', icon: <FileText size={18} /> },
  { id: 'contact', label: 'Contact', icon: <Mail size={18} /> },
  { id: 'social-links', label: 'Social Links', icon: <Share2 size={18} /> },
  { id: 'navbar', label: 'Navbar', icon: <MenuIcon size={18} /> },
  { id: 'footer', label: 'Footer', icon: <AlignLeft size={18} /> },
];

// ─── Toast ────────────────────────────────────────────────────────────────────
interface ToastState {
  message: string;
  type: 'success' | 'error';
}

// ─── Main Component ───────────────────────────────────────────────────────────
export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<Section>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<ToastState | null>(null);

  // ── Data State ──────────────────────────────────────────────────────────────
  const [skills, setSkills] = useState<SkillData[]>([]);
  const [educationList, setEducationList] = useState<EducationData[]>([]);
  const [experienceList, setExperienceList] = useState<ExperienceData[]>([]);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [certifications, setCertifications] = useState<CertificationData[]>([]);
  const [achievements, setAchievements] = useState<AchievementData[]>([]);
  const [messages, setMessages] = useState<ContactMessageData[]>([]);
  const [settings, setSettings] = useState<SiteSettingsData | null>(null);

  // ── Toast Helper ────────────────────────────────────────────────────────────
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // ── Load All Data ───────────────────────────────────────────────────────────
  const loadAll = async () => {
    try {
      setLoading(true);
      const [sk, ed, ex, pr, ce, ac, msg, st] = await Promise.all([
        portfolioApi.getSkills(),
        portfolioApi.getEducation(),
        portfolioApi.getExperience(),
        portfolioApi.getProjects(),
        portfolioApi.getCertifications(),
        portfolioApi.getAchievements(),
        portfolioApi.getContactMessages(),
        portfolioApi.getSiteSettings(),
      ]);
      setSkills(sk);
      setEducationList(ed);
      setExperienceList(ex);
      setProjects(pr);
      setCertifications(ce);
      setAchievements(ac);
      setMessages(msg);
      setSettings(st);
    } catch (err) {
      showToast('Failed to load dashboard data. Check backend connection.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('portfolio_admin_token');
    localStorage.removeItem('portfolio_admin_user');
    navigate('/admin/login');
  };

  const navigateTo = (section: Section) => {
    setActiveSection(section);
    setSidebarOpen(false);
    window.scrollTo({ top: 0 });
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loading message="Loading Admin Dashboard..." />
      </div>
    );
  }

  const unreadCount = messages.filter((m) => !m.isRead).length;
  const sectionLabel = SIDEBAR_ITEMS.find((s) => s.id === activeSection)?.label || 'Dashboard';

  return (
    <div className="admin-layout">
      {/* ── Overlay for mobile ── */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* ── Sidebar ── */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-brand">
          <Shield size={20} color="var(--accent-cyan)" />
          <span>Admin Panel</span>
        </div>

        <nav className="admin-sidebar-nav">
          {SIDEBAR_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`sidebar-nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => navigateTo(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.id === 'contact' && unreadCount > 0 && (
                <span className="sidebar-badge">{unreadCount}</span>
              )}
            </button>
          ))}
        </nav>

        <button className="sidebar-logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </aside>

      {/* ── Main Area ── */}
      <div className="admin-main">
        {/* Topbar */}
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button className="sidebar-toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <MenuIcon size={22} />
            </button>
            <div className="admin-breadcrumb">
              <span>Admin</span>
              <ChevronRight size={14} />
              <span className="breadcrumb-active">{sectionLabel}</span>
            </div>
          </div>
          <div className="admin-topbar-right">
            <Link to="/" target="_blank" className="topbar-link">
              <ExternalLink size={16} /> View Portfolio
            </Link>
            <button onClick={handleLogout} className="topbar-logout">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="admin-content-area">
          {toast && (
            <div className={`admin-toast ${toast.type === 'error' ? 'admin-toast-error' : ''}`}>
              {toast.type === 'success' ? <CheckCircle size={18} /> : <X size={18} />}
              <span>{toast.message}</span>
            </div>
          )}

          {activeSection === 'dashboard' && (
            <DashboardSection
              skills={skills}
              projects={projects}
              certifications={certifications}
              achievements={achievements}
              experienceList={experienceList}
              messages={messages}
              unreadCount={unreadCount}
              navigateTo={navigateTo}
            />
          )}
          {activeSection === 'home' && settings && (
            <HomeSection settings={settings} setSettings={setSettings} showToast={showToast} />
          )}
          {activeSection === 'about' && settings && (
            <AboutSection settings={settings} setSettings={setSettings} showToast={showToast} />
          )}
          {activeSection === 'skills' && (
            <SkillsSection skills={skills} setSkills={setSkills} showToast={showToast} />
          )}
          {activeSection === 'education' && (
            <EducationSection educationList={educationList} setEducationList={setEducationList} showToast={showToast} />
          )}
          {activeSection === 'experience' && (
            <ExperienceSection experienceList={experienceList} setExperienceList={setExperienceList} showToast={showToast} />
          )}
          {activeSection === 'projects' && (
            <ProjectsSection projects={projects} setProjects={setProjects} showToast={showToast} />
          )}
          {activeSection === 'certifications' && (
            <CertificationsSection certifications={certifications} setCertifications={setCertifications} showToast={showToast} />
          )}
          {activeSection === 'achievements' && (
            <AchievementsSection achievements={achievements} setAchievements={setAchievements} showToast={showToast} />
          )}
          {activeSection === 'resume' && settings && (
            <ResumeSection settings={settings} setSettings={setSettings} showToast={showToast} />
          )}
          {activeSection === 'contact' && (
            <ContactSection
              settings={settings}
              setSettings={setSettings}
              messages={messages}
              setMessages={setMessages}
              showToast={showToast}
            />
          )}
          {activeSection === 'social-links' && settings && (
            <SocialLinksSection settings={settings} setSettings={setSettings} showToast={showToast} />
          )}
          {activeSection === 'navbar' && settings && (
            <NavbarSection settings={settings} setSettings={setSettings} showToast={showToast} />
          )}
          {activeSection === 'footer' && settings && (
            <FooterSection settings={settings} setSettings={setSettings} showToast={showToast} />
          )}
        </main>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION: Dashboard Overview
// ═══════════════════════════════════════════════════════════════════════════════
interface DashboardSectionProps {
  skills: SkillData[];
  projects: ProjectData[];
  certifications: CertificationData[];
  achievements: AchievementData[];
  experienceList: ExperienceData[];
  messages: ContactMessageData[];
  unreadCount: number;
  navigateTo: (s: Section) => void;
}

const DashboardSection: React.FC<DashboardSectionProps> = ({
  skills, projects, certifications, achievements, experienceList, messages, unreadCount, navigateTo,
}) => {
  const metrics = [
    { label: 'Skills', count: skills.length, color: '#38bdf8', section: 'skills' as Section, icon: <Cpu size={22} /> },
    { label: 'Projects', count: projects.length, color: '#818cf8', section: 'projects' as Section, icon: <FolderGit2 size={22} /> },
    { label: 'Certifications', count: certifications.length, color: '#10b981', section: 'certifications' as Section, icon: <Award size={22} /> },
    { label: 'Achievements', count: achievements.length, color: '#f59e0b', section: 'achievements' as Section, icon: <Trophy size={22} /> },
    { label: 'Experience', count: experienceList.length, color: '#a78bfa', section: 'experience' as Section, icon: <Briefcase size={22} /> },
    { label: 'Messages', count: messages.length, color: '#f43f5e', section: 'contact' as Section, icon: <Mail size={22} />, badge: unreadCount },
  ];

  return (
    <div>
      <div className="section-header">
        <h2 className="section-title">Dashboard Overview</h2>
        <p className="section-subtitle">Welcome back! Manage your portfolio from here.</p>
      </div>

      <div className="dashboard-metrics-grid">
        {metrics.map((m) => (
          <button key={m.label} className="metric-card" onClick={() => navigateTo(m.section)}>
            <div className="metric-icon-box" style={{ background: `${m.color}20`, color: m.color }}>
              {m.icon}
            </div>
            <div className="metric-info">
              <div className="metric-count">
                {m.count}
                {m.badge !== undefined && m.badge > 0 && (
                  <span className="metric-badge">{m.badge} new</span>
                )}
              </div>
              <div className="metric-label">{m.label}</div>
            </div>
            <ChevronRight size={16} className="metric-arrow" />
          </button>
        ))}
      </div>

      {unreadCount > 0 && (
        <div className="dashboard-alert" onClick={() => navigateTo('contact')}>
          <Mail size={18} />
          <span>You have <strong>{unreadCount}</strong> unread message{unreadCount > 1 ? 's' : ''} — click to view</span>
          <ChevronRight size={16} />
        </div>
      )}

      <div className="dashboard-quick-links">
        <h3>Quick Actions</h3>
        <div className="quick-links-grid">
          {[
            { label: 'Edit Home Page', section: 'home' as Section, icon: <Home size={16} /> },
            { label: 'Add Skill', section: 'skills' as Section, icon: <Plus size={16} /> },
            { label: 'Add Project', section: 'projects' as Section, icon: <FolderGit2 size={16} /> },
            { label: 'Update Resume', section: 'resume' as Section, icon: <FileText size={16} /> },
            { label: 'Manage Navbar', section: 'navbar' as Section, icon: <MenuIcon size={16} /> },
            { label: 'Edit Footer', section: 'footer' as Section, icon: <AlignLeft size={16} /> },
          ].map((link) => (
            <button key={link.label} className="quick-link-btn" onClick={() => navigateTo(link.section)}>
              {link.icon} {link.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION: Home
// ═══════════════════════════════════════════════════════════════════════════════
interface SettingsSectionProps {
  settings: SiteSettingsData;
  setSettings: (s: SiteSettingsData) => void;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}

const HomeSection: React.FC<SettingsSectionProps> = ({ settings, setSettings, showToast }) => {
  const [form, setForm] = useState({ ...settings.home });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await portfolioApi.updateSiteSettings({ home: form });
      setSettings(updated);
      showToast('Home section saved successfully!');
    } catch {
      showToast('Failed to save home section.', 'error');
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (settings?.home) {
      setForm({ ...settings.home });
    }
  }, [settings]);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { fileUrl } = await portfolioApi.uploadFile(file);
      const updatedForm = { ...form, profilePhotoUrl: fileUrl };
      setForm(updatedForm);
      // Auto-save immediately to MongoDB
      const updatedSettings = await portfolioApi.updateSiteSettings({ home: updatedForm });
      setSettings(updatedSettings);
      showToast('Profile photo uploaded & saved successfully to database!');
    } catch (err) {
      console.error('Upload error:', err);
      showToast('Photo upload failed.', 'error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div className="section-header">
        <h2 className="section-title">Home Section</h2>
        <p className="section-subtitle">Edit hero content, profile photo, and social links shown on the landing page.</p>
      </div>

      <form onSubmit={handleSave} className="admin-form-card">
        {/* Profile Photo */}
        <div className="form-group upload-group">
          <label className="form-label">Profile Photo</label>
          {form.profilePhotoUrl && (
            <img
              src={resolveAssetUrl(form.profilePhotoUrl)}
              alt="Profile"
              className="upload-preview-img"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
              }}
            />
          )}
          <div className="upload-row">
            <input type="text" className="form-input" value={form.profilePhotoUrl} onChange={(e) => setForm({ ...form, profilePhotoUrl: e.target.value })} placeholder="/uploads/photo.jpg or https://..." />
            <button type="button" className="btn btn-secondary" onClick={() => photoInputRef.current?.click()} disabled={uploading}>
              <Upload size={16} /> {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          <input ref={photoInputRef} type="file" accept="image/*" className="hidden-file-input" onChange={handlePhotoUpload} />
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label">Your Name</label>
            <input type="text" className="form-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="form-group">
            <label className="form-label">Professional Title</label>
            <input type="text" className="form-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Full Stack Developer" required />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Introduction (short tagline)</label>
          <input type="text" className="form-input" value={form.introduction} onChange={(e) => setForm({ ...form, introduction: e.target.value })} />
        </div>

        <div className="form-group">
          <label className="form-label">Description / Bio</label>
          <textarea className="form-textarea" rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label">Resume Button Text</label>
            <input type="text" className="form-input" value={form.resumeButtonText} onChange={(e) => setForm({ ...form, resumeButtonText: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Resume URL</label>
            <input type="text" className="form-input" value={form.resumeUrl} onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })} />
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label"><Github size={14} /> GitHub URL</label>
            <input type="text" className="form-input" value={form.githubUrl} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label"><Linkedin size={14} /> LinkedIn URL</label>
            <input type="text" className="form-input" value={form.linkedinUrl} onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })} />
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label"><Twitter size={14} /> Twitter URL</label>
            <input type="text" className="form-input" value={form.otherSocials?.twitter || ''} onChange={(e) => setForm({ ...form, otherSocials: { ...form.otherSocials, twitter: e.target.value } })} />
          </div>
          <div className="form-group">
            <label className="form-label"><Instagram size={14} /> Instagram URL</label>
            <input type="text" className="form-input" value={form.otherSocials?.instagram || ''} onChange={(e) => setForm({ ...form, otherSocials: { ...form.otherSocials, instagram: e.target.value } })} />
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label"><BookOpen size={14} /> LeetCode URL</label>
            <input type="text" className="form-input" value={form.otherSocials?.leetcode || ''} onChange={(e) => setForm({ ...form, otherSocials: { ...form.otherSocials, leetcode: e.target.value } })} />
          </div>
          <div className="form-group">
            <label className="form-label"><Globe size={14} /> Website URL</label>
            <input type="text" className="form-input" value={form.otherSocials?.website || ''} onChange={(e) => setForm({ ...form, otherSocials: { ...form.otherSocials, website: e.target.value } })} />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            <Save size={16} /> {saving ? 'Saving...' : 'Save Home Section'}
          </button>
        </div>
      </form>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION: About
// ═══════════════════════════════════════════════════════════════════════════════
const AboutSection: React.FC<SettingsSectionProps> = ({ settings, setSettings, showToast }) => {
  const [form, setForm] = useState({ ...settings.about });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newInfoLabel, setNewInfoLabel] = useState('');
  const [newInfoValue, setNewInfoValue] = useState('');
  const imgInputRef = useRef<HTMLInputElement>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await portfolioApi.updateSiteSettings({ about: form });
      setSettings(updated);
      showToast('About section saved!');
    } catch {
      showToast('Failed to save about section.', 'error');
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (settings?.about) {
      setForm({ ...settings.about });
    }
  }, [settings]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { fileUrl } = await portfolioApi.uploadFile(file);
      const updatedForm = { ...form, imageUrl: fileUrl };
      setForm(updatedForm);
      const updatedSettings = await portfolioApi.updateSiteSettings({ about: updatedForm });
      setSettings(updatedSettings);
      showToast('About image uploaded & saved successfully to database!');
    } catch {
      showToast('Image upload failed.', 'error');
    } finally {
      setUploading(false);
    }
  };

  const addPersonalInfo = () => {
    if (!newInfoLabel.trim()) return;
    setForm({ ...form, personalInfo: [...(form.personalInfo || []), { label: newInfoLabel, value: newInfoValue }] });
    setNewInfoLabel('');
    setNewInfoValue('');
  };

  const removePersonalInfo = (index: number) => {
    setForm({ ...form, personalInfo: form.personalInfo.filter((_, i) => i !== index) });
  };

  return (
    <div>
      <div className="section-header">
        <h2 className="section-title">About Section</h2>
        <p className="section-subtitle">Edit your about page content and personal information table.</p>
      </div>

      <form onSubmit={handleSave} className="admin-form-card">
        <div className="form-group">
          <label className="form-label">About Section Title</label>
          <input type="text" className="form-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>

        <div className="form-group">
          <label className="form-label">About Description</label>
          <textarea className="form-textarea" rows={5} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>

        {/* About Image */}
        <div className="form-group upload-group">
          <label className="form-label">About Image</label>
          {form.imageUrl && (
            <img
              src={resolveAssetUrl(form.imageUrl)}
              alt="About"
              className="upload-preview-img"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80';
              }}
            />
          )}
          <div className="upload-row">
            <input type="text" className="form-input" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="/uploads/about.jpg or https://..." />
            <button type="button" className="btn btn-secondary" onClick={() => imgInputRef.current?.click()} disabled={uploading}>
              <Upload size={16} /> {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          <input ref={imgInputRef} type="file" accept="image/*" className="hidden-file-input" onChange={handleImageUpload} />
        </div>

        {/* Personal Info */}
        <div className="form-group">
          <label className="form-label">Personal Information Table</label>
          <div className="info-table">
            {(form.personalInfo || []).map((info, i) => (
              <div key={i} className="info-table-row">
                <input type="text" className="form-input" value={info.label} onChange={(e) => {
                  const arr = [...form.personalInfo];
                  arr[i] = { ...arr[i], label: e.target.value };
                  setForm({ ...form, personalInfo: arr });
                }} placeholder="Label (e.g. Age)" />
                <input type="text" className="form-input" value={info.value} onChange={(e) => {
                  const arr = [...form.personalInfo];
                  arr[i] = { ...arr[i], value: e.target.value };
                  setForm({ ...form, personalInfo: arr });
                }} placeholder="Value (e.g. 21)" />
                <button type="button" className="btn btn-danger btn-sm icon-btn" onClick={() => removePersonalInfo(i)}>
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
            <div className="info-table-row add-row">
              <input type="text" className="form-input" value={newInfoLabel} onChange={(e) => setNewInfoLabel(e.target.value)} placeholder="New label..." />
              <input type="text" className="form-input" value={newInfoValue} onChange={(e) => setNewInfoValue(e.target.value)} placeholder="New value..." onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addPersonalInfo())} />
              <button type="button" className="btn btn-success btn-sm icon-btn" onClick={addPersonalInfo}>
                <Plus size={15} />
              </button>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            <Save size={16} /> {saving ? 'Saving...' : 'Save About Section'}
          </button>
        </div>
      </form>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION: Skills
// ═══════════════════════════════════════════════════════════════════════════════
interface SkillsSectionProps {
  skills: SkillData[];
  setSkills: (s: SkillData[]) => void;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}

const SKILL_CATEGORIES: SkillCategory[] = ['Frontend', 'Backend', 'Database', 'DevOps & Cloud', 'Core CS', 'Tools & Other'];

const defaultSkillForm = {
  name: '', category: 'Frontend' as SkillCategory, proficiency: 80, iconName: 'Code', featured: true, order: 0,
};

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, setSkills, showToast }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<SkillData | null>(null);
  const [form, setForm] = useState({ ...defaultSkillForm });

  const openAdd = () => {
    setEditingSkill(null);
    setForm({ ...defaultSkillForm, order: skills.length + 1 });
    setModalOpen(true);
  };

  const openEdit = (skill: SkillData) => {
    setEditingSkill(skill);
    setForm({ name: skill.name, category: skill.category, proficiency: skill.proficiency, iconName: skill.iconName || 'Code', featured: skill.featured, order: skill.order || 0 });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingSkill) {
        const updated = await portfolioApi.updateSkill(editingSkill._id, form);
        setSkills(skills.map((s) => (s._id === editingSkill._id ? updated : s)));
        showToast(`Skill "${form.name}" updated!`);
      } else {
        const created = await portfolioApi.createSkill(form);
        setSkills([...skills, created]);
        showToast(`Skill "${form.name}" added!`);
      }
      setModalOpen(false);
    } catch {
      showToast('Failed to save skill.', 'error');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete skill "${name}"?`)) return;
    try {
      await portfolioApi.deleteSkill(id);
      setSkills(skills.filter((s) => s._id !== id));
      showToast(`Skill "${name}" deleted.`);
    } catch {
      showToast('Failed to delete skill.', 'error');
    }
  };

  const grouped = SKILL_CATEGORIES.reduce((acc, cat) => {
    acc[cat] = skills.filter((s) => s.category === cat);
    return acc;
  }, {} as Record<string, SkillData[]>);

  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title">Skills Management</h2>
          <p className="section-subtitle">{skills.length} skills across {Object.keys(grouped).filter(k => grouped[k].length > 0).length} categories</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Add Skill</button>
      </div>

      {SKILL_CATEGORIES.map((cat) =>
        grouped[cat].length > 0 ? (
          <div key={cat} className="admin-form-card" style={{ marginBottom: '1.5rem' }}>
            <div className="table-card-header">
              <h3 className="table-card-title">{cat} <span className="count-badge">{grouped[cat].length}</span></h3>
            </div>
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Proficiency</th>
                    <th>Featured</th>
                    <th>Order</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {grouped[cat].sort((a, b) => (a.order || 0) - (b.order || 0)).map((sk) => (
                    <tr key={sk._id}>
                      <td><strong>{sk.name}</strong></td>
                      <td>
                        <div className="skill-bar-row">
                          <div className="skill-bar-bg">
                            <div className="skill-bar-fill" style={{ width: `${sk.proficiency}%` }} />
                          </div>
                          <span>{sk.proficiency}%</span>
                        </div>
                      </td>
                      <td><span className={`status-badge ${sk.featured ? 'badge-success' : 'badge-muted'}`}>{sk.featured ? 'Yes' : 'No'}</span></td>
                      <td>{sk.order}</td>
                      <td>
                        <div className="action-btns">
                          <button className="btn btn-sm btn-secondary icon-btn" onClick={() => openEdit(sk)}><Edit2 size={14} /></button>
                          <button className="btn btn-sm btn-danger icon-btn" onClick={() => handleDelete(sk._id, sk.name)}><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingSkill ? 'Edit Skill' : 'Add Skill'}</h3>
              <button className="modal-close" onClick={() => setModalOpen(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSave}>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Skill Name</label>
                  <input type="text" className="form-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="form-select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as SkillCategory })}>
                    {SKILL_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Proficiency: <strong>{form.proficiency}%</strong></label>
                <input type="range" min={1} max={100} value={form.proficiency} onChange={(e) => setForm({ ...form, proficiency: Number(e.target.value) })} className="range-slider" />
              </div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Icon Name</label>
                  <input type="text" className="form-input" value={form.iconName} onChange={(e) => setForm({ ...form, iconName: e.target.value })} placeholder="e.g. Code, Database..." />
                </div>
                <div className="form-group">
                  <label className="form-label">Order</label>
                  <input type="number" className="form-input" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />
                </div>
              </div>
              <div className="form-group">
                <label className="checkbox-label">
                  <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
                  <span>Featured skill</span>
                </label>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary"><Save size={16} /> Save Skill</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION: Education
// ═══════════════════════════════════════════════════════════════════════════════
interface EducationSectionProps {
  educationList: EducationData[];
  setEducationList: (e: EducationData[]) => void;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}

const defaultEduForm = {
  degree: '', college: '', university: '', department: 'Information Technology',
  location: '', startYear: 2022, endYear: 2026, current: false, score: '',
  relevantCoursework: '', description: '', order: 0,
};

const EducationSection: React.FC<EducationSectionProps> = ({ educationList, setEducationList, showToast }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState<EducationData | null>(null);
  const [form, setForm] = useState({ ...defaultEduForm });

  const openAdd = () => {
    setEditingEdu(null);
    setForm({ ...defaultEduForm, order: educationList.length + 1 });
    setModalOpen(true);
  };

  const openEdit = (edu: EducationData) => {
    setEditingEdu(edu);
    setForm({
      degree: edu.degree, college: edu.college || edu.institution || '',
      university: edu.university || '', department: edu.department,
      location: edu.location, startYear: edu.startYear, endYear: edu.endYear,
      current: edu.current, score: edu.score,
      relevantCoursework: (edu.relevantCoursework || []).join(', '),
      description: edu.description || '', order: edu.order || 0,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsedStartYear = Number(form.startYear);
    const parsedEndYear =
      form.current && (!form.endYear || isNaN(Number(form.endYear)))
        ? parsedStartYear + 4
        : Number(form.endYear);
    const payload = {
      ...form,
      startYear: parsedStartYear,
      endYear: parsedEndYear,
      relevantCoursework: form.relevantCoursework
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    };
    try {
      if (editingEdu) {
        const updated = await portfolioApi.updateEducation(editingEdu._id, payload);
        setEducationList(educationList.map((e) => (e._id === editingEdu._id ? updated : e)));
        showToast('Education record updated!');
      } else {
        const created = await portfolioApi.createEducation(payload as any);
        setEducationList([...educationList, created]);
        showToast('Education record added!');
      }
      setModalOpen(false);
    } catch (err) {
      console.error('Save education error:', err);
      showToast('Failed to save education.', 'error');
    }
  };

  const handleDelete = async (id: string, degree: string) => {
    if (!window.confirm(`Delete "${degree}"?`)) return;
    try {
      await portfolioApi.deleteEducation(id);
      setEducationList(educationList.filter((e) => e._id !== id));
      showToast('Education record deleted.');
    } catch {
      showToast('Failed to delete.', 'error');
    }
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">{educationList.length} record(s)</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Add Education</button>
      </div>

      <div className="admin-form-card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr><th>Degree</th><th>College</th><th>Department</th><th>Years</th><th>Score</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {educationList.map((edu) => (
                <tr key={edu._id}>
                  <td><strong>{edu.degree}</strong></td>
                  <td>{edu.college || edu.institution}</td>
                  <td>{edu.department}</td>
                  <td>{edu.startYear} – {edu.current ? 'Present' : edu.endYear}</td>
                  <td>{edu.score}</td>
                  <td>
                    <div className="action-btns">
                      <button className="btn btn-sm btn-secondary icon-btn" onClick={() => openEdit(edu)}><Edit2 size={14} /></button>
                      <button className="btn btn-sm btn-danger icon-btn" onClick={() => handleDelete(edu._id, edu.degree)}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {educationList.length === 0 && (
                <tr><td colSpan={6} className="empty-row">No education records yet. Add one!</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingEdu ? 'Edit Education' : 'Add Education'}</h3>
              <button className="modal-close" onClick={() => setModalOpen(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSave}>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Degree</label>
                  <input type="text" className="form-input" value={form.degree} onChange={(e) => setForm({ ...form, degree: e.target.value })} placeholder="e.g. B.Tech" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Department</label>
                  <input type="text" className="form-input" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
                </div>
              </div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">College / Institution</label>
                  <input type="text" className="form-input" value={form.college} onChange={(e) => setForm({ ...form, college: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label className="form-label">University (if different)</label>
                  <input type="text" className="form-input" value={form.university} onChange={(e) => setForm({ ...form, university: e.target.value })} />
                </div>
              </div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input type="text" className="form-input" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Score / CGPA</label>
                  <input type="text" className="form-input" value={form.score} onChange={(e) => setForm({ ...form, score: e.target.value })} placeholder="e.g. 8.5 CGPA" />
                </div>
              </div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Start Year</label>
                  <input type="number" className="form-input" value={form.startYear} onChange={(e) => setForm({ ...form, startYear: Number(e.target.value) })} />
                </div>
                <div className="form-group">
                  <label className="form-label">End Year</label>
                  <input type="number" className="form-input" value={form.endYear} onChange={(e) => setForm({ ...form, endYear: Number(e.target.value) })} disabled={form.current} />
                </div>
              </div>
              <div className="form-group">
                <label className="checkbox-label">
                  <input type="checkbox" checked={form.current} onChange={(e) => setForm({ ...form, current: e.target.checked })} />
                  <span>Currently studying here</span>
                </label>
              </div>
              <div className="form-group">
                <label className="form-label">Relevant Coursework (comma-separated)</label>
                <input type="text" className="form-input" value={form.relevantCoursework} onChange={(e) => setForm({ ...form, relevantCoursework: e.target.value })} placeholder="Data Structures, OS, DBMS, ..." />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-textarea" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary"><Save size={16} /> Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION: Experience
// ═══════════════════════════════════════════════════════════════════════════════
interface ExperienceSectionProps {
  experienceList: ExperienceData[];
  setExperienceList: (e: ExperienceData[]) => void;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}

const defaultExpForm = {
  company: '', position: '', startDate: '', endDate: '', isCurrent: false,
  description: '', technologies: '', location: '', order: 0,
};

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experienceList, setExperienceList, showToast }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<ExperienceData | null>(null);
  const [form, setForm] = useState({ ...defaultExpForm });

  const openAdd = () => {
    setEditingExp(null);
    setForm({ ...defaultExpForm, order: experienceList.length + 1 });
    setModalOpen(true);
  };

  const openEdit = (exp: ExperienceData) => {
    setEditingExp(exp);
    setForm({
      company: exp.company, position: exp.position, startDate: exp.startDate,
      endDate: exp.endDate, isCurrent: exp.isCurrent, description: exp.description,
      technologies: (exp.technologies || []).join(', '), location: exp.location || '',
      order: exp.order || 0,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form, technologies: form.technologies.split(',').map(s => s.trim()).filter(Boolean) };
    try {
      if (editingExp) {
        const updated = await portfolioApi.updateExperience(editingExp._id, payload);
        setExperienceList(experienceList.map((ex) => (ex._id === editingExp._id ? updated : ex)));
        showToast('Experience record updated!');
      } else {
        const created = await portfolioApi.createExperience(payload as any);
        setExperienceList([...experienceList, created]);
        showToast('Experience record added!');
      }
      setModalOpen(false);
    } catch {
      showToast('Failed to save experience.', 'error');
    }
  };

  const handleDelete = async (id: string, pos: string) => {
    if (!window.confirm(`Delete "${pos}"?`)) return;
    try {
      await portfolioApi.deleteExperience(id);
      setExperienceList(experienceList.filter((e) => e._id !== id));
      showToast('Experience record deleted.');
    } catch {
      showToast('Failed to delete.', 'error');
    }
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">{experienceList.length} record(s)</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Add Experience</button>
      </div>

      <div className="admin-form-card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr><th>Position</th><th>Company</th><th>Duration</th><th>Location</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {experienceList.map((exp) => (
                <tr key={exp._id}>
                  <td><strong>{exp.position}</strong></td>
                  <td>{exp.company}</td>
                  <td>{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</td>
                  <td>{exp.location || '—'}</td>
                  <td>
                    <div className="action-btns">
                      <button className="btn btn-sm btn-secondary icon-btn" onClick={() => openEdit(exp)}><Edit2 size={14} /></button>
                      <button className="btn btn-sm btn-danger icon-btn" onClick={() => handleDelete(exp._id, exp.position)}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {experienceList.length === 0 && (
                <tr><td colSpan={5} className="empty-row">No experience records yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingExp ? 'Edit Experience' : 'Add Experience'}</h3>
              <button className="modal-close" onClick={() => setModalOpen(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSave}>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Company</label>
                  <input type="text" className="form-input" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Position / Role</label>
                  <input type="text" className="form-input" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} required />
                </div>
              </div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Start Date</label>
                  <input type="text" className="form-input" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} placeholder="e.g. June 2024" required />
                </div>
                <div className="form-group">
                  <label className="form-label">End Date</label>
                  <input type="text" className="form-input" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} placeholder="e.g. August 2024" disabled={form.isCurrent} />
                </div>
              </div>
              <div className="form-group">
                <label className="checkbox-label">
                  <input type="checkbox" checked={form.isCurrent} onChange={(e) => setForm({ ...form, isCurrent: e.target.checked })} />
                  <span>Currently working here</span>
                </label>
              </div>
              <div className="form-group">
                <label className="form-label">Location</label>
                <input type="text" className="form-input" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-textarea" rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label">Technologies Used (comma-separated)</label>
                <input type="text" className="form-input" value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })} placeholder="React, Node.js, MongoDB, ..." />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary"><Save size={16} /> Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION: Projects
// ═══════════════════════════════════════════════════════════════════════════════
interface ProjectsSectionProps {
  projects: ProjectData[];
  setProjects: (p: ProjectData[]) => void;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}

type ProjectCategory = 'Full Stack' | 'Frontend' | 'Backend' | 'Mobile' | 'AI / ML' | 'Systems / DevOps';

const defaultProjectForm = {
  title: '', tagline: '', description: '', technologies: '',
  category: 'Full Stack' as ProjectCategory, githubUrl: '', liveUrl: '',
  imageUrl: '', featured: false, highlights: '', order: 0,
};

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, setProjects, showToast }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectData | null>(null);
  const [form, setForm] = useState({ ...defaultProjectForm });
  const [uploading, setUploading] = useState(false);
  const imgRef = useRef<HTMLInputElement>(null);

  const openAdd = () => {
    setEditingProject(null);
    setForm({ ...defaultProjectForm, order: projects.length + 1 });
    setModalOpen(true);
  };

  const openEdit = (proj: ProjectData) => {
    setEditingProject(proj);
    setForm({
      title: proj.title, tagline: proj.tagline || '', description: proj.description,
      technologies: proj.technologies.join(', '), category: proj.category,
      githubUrl: proj.githubUrl, liveUrl: proj.liveUrl || '', imageUrl: proj.imageUrl || '',
      featured: proj.featured, highlights: (proj.highlights || []).join('\n'), order: proj.order || 0,
    });
    setModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { fileUrl } = await portfolioApi.uploadFile(file);
      setForm((f) => ({ ...f, imageUrl: fileUrl }));
      showToast('Image uploaded!');
    } catch {
      showToast('Upload failed.', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      technologies: form.technologies.split(',').map(s => s.trim()).filter(Boolean),
      highlights: form.highlights.split('\n').map(s => s.trim()).filter(Boolean),
    };
    try {
      if (editingProject) {
        const updated = await portfolioApi.updateProject(editingProject._id, payload);
        setProjects(projects.map((p) => (p._id === editingProject._id ? updated : p)));
        showToast(`Project "${form.title}" updated!`);
      } else {
        const created = await portfolioApi.createProject(payload as any);
        setProjects([...projects, created]);
        showToast(`Project "${form.title}" added!`);
      }
      setModalOpen(false);
    } catch {
      showToast('Failed to save project.', 'error');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete project "${title}"?`)) return;
    try {
      await portfolioApi.deleteProject(id);
      setProjects(projects.filter((p) => p._id !== id));
      showToast(`Project "${title}" deleted.`);
    } catch {
      showToast('Failed to delete.', 'error');
    }
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">{projects.length} project(s)</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Add Project</button>
      </div>

      <div className="admin-form-card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr><th>Title</th><th>Category</th><th>Technologies</th><th>Featured</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {projects.map((proj) => (
                <tr key={proj._id}>
                  <td>
                    <strong>{proj.title}</strong>
                    {proj.tagline && <div className="table-subtitle">{proj.tagline}</div>}
                  </td>
                  <td><span className="status-badge badge-info">{proj.category}</span></td>
                  <td className="tech-tags-cell">{proj.technologies.slice(0, 3).map(t => <span key={t} className="tech-tag">{t}</span>)}{proj.technologies.length > 3 && <span className="tech-tag">+{proj.technologies.length - 3}</span>}</td>
                  <td><span className={`status-badge ${proj.featured ? 'badge-success' : 'badge-muted'}`}>{proj.featured ? 'Yes' : 'No'}</span></td>
                  <td>
                    <div className="action-btns">
                      <button className="btn btn-sm btn-secondary icon-btn" onClick={() => openEdit(proj)}><Edit2 size={14} /></button>
                      <button className="btn btn-sm btn-danger icon-btn" onClick={() => handleDelete(proj._id, proj.title)}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr><td colSpan={5} className="empty-row">No projects yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingProject ? 'Edit Project' : 'Add Project'}</h3>
              <button className="modal-close" onClick={() => setModalOpen(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSave}>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input type="text" className="form-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Tagline</label>
                  <input type="text" className="form-input" value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-textarea" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
              </div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="form-select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as ProjectCategory })}>
                    {['Full Stack', 'Frontend', 'Backend', 'Mobile', 'AI / ML', 'Systems / DevOps'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Order</label>
                  <input type="number" className="form-input" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Technologies (comma-separated)</label>
                <input type="text" className="form-input" value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })} placeholder="React, Node.js, MongoDB, ..." required />
              </div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">GitHub URL</label>
                  <input type="text" className="form-input" value={form.githubUrl} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Live Demo URL</label>
                  <input type="text" className="form-input" value={form.liveUrl} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })} />
                </div>
              </div>
              {/* Image Upload */}
              <div className="form-group upload-group">
                <label className="form-label">Project Image</label>
                {form.imageUrl && (
                  <img
                    src={resolveAssetUrl(form.imageUrl)}
                    alt="Project"
                    className="upload-preview-img"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                )}
                <div className="upload-row">
                  <input type="text" className="form-input" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="/uploads/project.jpg or https://..." />
                  <button type="button" className="btn btn-secondary" onClick={() => imgRef.current?.click()} disabled={uploading}><Upload size={16} /> {uploading ? '...' : 'Upload'}</button>
                </div>
                <input ref={imgRef} type="file" accept="image/*" className="hidden-file-input" onChange={handleImageUpload} />
              </div>
              <div className="form-group">
                <label className="form-label">Highlights (one per line)</label>
                <textarea className="form-textarea" rows={3} value={form.highlights} onChange={(e) => setForm({ ...form, highlights: e.target.value })} placeholder="Key feature or achievement..." />
              </div>
              <div className="form-group">
                <label className="checkbox-label">
                  <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
                  <span>Featured project</span>
                </label>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary"><Save size={16} /> Save Project</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION: Certifications
// ═══════════════════════════════════════════════════════════════════════════════
interface CertificationsSectionProps {
  certifications: CertificationData[];
  setCertifications: (c: CertificationData[]) => void;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}

const defaultCertForm = {
  title: '', issuer: '', issueDate: '', credentialId: '', credentialUrl: '',
  badgeImageUrl: '', skillsCovered: '', featured: true, order: 0,
};

const CertificationsSection: React.FC<CertificationsSectionProps> = ({ certifications, setCertifications, showToast }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<CertificationData | null>(null);
  const [form, setForm] = useState({ ...defaultCertForm });
  const [uploading, setUploading] = useState(false);
  const imgRef = useRef<HTMLInputElement>(null);

  const openAdd = () => {
    setEditingCert(null);
    setForm({ ...defaultCertForm, order: certifications.length + 1 });
    setModalOpen(true);
  };

  const openEdit = (cert: CertificationData) => {
    setEditingCert(cert);
    setForm({
      title: cert.title, issuer: cert.issuer, issueDate: cert.issueDate,
      credentialId: cert.credentialId || '', credentialUrl: cert.credentialUrl || '',
      badgeImageUrl: cert.badgeImageUrl || '', skillsCovered: (cert.skillsCovered || []).join(', '),
      featured: cert.featured, order: cert.order || 0,
    });
    setModalOpen(true);
  };

  const handleBadgeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { fileUrl } = await portfolioApi.uploadFile(file);
      setForm((f) => ({ ...f, badgeImageUrl: fileUrl }));
      showToast('Badge uploaded!');
    } catch {
      showToast('Upload failed.', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form, skillsCovered: form.skillsCovered.split(',').map(s => s.trim()).filter(Boolean) };
    try {
      if (editingCert) {
        const updated = await portfolioApi.updateCertification(editingCert._id, payload);
        setCertifications(certifications.map((c) => (c._id === editingCert._id ? updated : c)));
        showToast(`Certification "${form.title}" updated!`);
      } else {
        const created = await portfolioApi.createCertification(payload as any);
        setCertifications([...certifications, created]);
        showToast(`Certification "${form.title}" added!`);
      }
      setModalOpen(false);
    } catch {
      showToast('Failed to save certification.', 'error');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    try {
      await portfolioApi.deleteCertification(id);
      setCertifications(certifications.filter((c) => c._id !== id));
      showToast('Certification deleted.');
    } catch {
      showToast('Failed to delete.', 'error');
    }
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title">Certifications</h2>
          <p className="section-subtitle">{certifications.length} certification(s)</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Add Certification</button>
      </div>

      <div className="admin-form-card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr><th>Title</th><th>Issuer</th><th>Issue Date</th><th>Featured</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {certifications.map((cert) => (
                <tr key={cert._id}>
                  <td>
                    {cert.badgeImageUrl && <img src={resolveAssetUrl(cert.badgeImageUrl)} alt="" className="table-thumb" onError={(e) => { (e.target as HTMLImageElement).src = resolveAssetUrl(cert.badgeImageUrl) || ''; }} />}
                    <strong>{cert.title}</strong>
                  </td>
                  <td>{cert.issuer}</td>
                  <td>{cert.issueDate}</td>
                  <td><span className={`status-badge ${cert.featured ? 'badge-success' : 'badge-muted'}`}>{cert.featured ? 'Yes' : 'No'}</span></td>
                  <td>
                    <div className="action-btns">
                      <button className="btn btn-sm btn-secondary icon-btn" onClick={() => openEdit(cert)}><Edit2 size={14} /></button>
                      <button className="btn btn-sm btn-danger icon-btn" onClick={() => handleDelete(cert._id, cert.title)}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {certifications.length === 0 && (
                <tr><td colSpan={5} className="empty-row">No certifications yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingCert ? 'Edit Certification' : 'Add Certification'}</h3>
              <button className="modal-close" onClick={() => setModalOpen(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSave}>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input type="text" className="form-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Issuer</label>
                  <input type="text" className="form-input" value={form.issuer} onChange={(e) => setForm({ ...form, issuer: e.target.value })} required />
                </div>
              </div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Issue Date</label>
                  <input type="text" className="form-input" value={form.issueDate} onChange={(e) => setForm({ ...form, issueDate: e.target.value })} placeholder="e.g. March 2024" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Credential ID</label>
                  <input type="text" className="form-input" value={form.credentialId} onChange={(e) => setForm({ ...form, credentialId: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Credential URL</label>
                <input type="text" className="form-input" value={form.credentialUrl} onChange={(e) => setForm({ ...form, credentialUrl: e.target.value })} placeholder="https://..." />
              </div>
              <div className="form-group upload-group">
                <label className="form-label">Badge Image</label>
                {form.badgeImageUrl && (
                  <img
                    src={resolveAssetUrl(form.badgeImageUrl)}
                    alt="Badge"
                    className="upload-preview-img"
                    style={{ width: 80 }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&w=200&q=80';
                    }}
                  />
                )}
                <div className="upload-row">
                  <input type="text" className="form-input" value={form.badgeImageUrl} onChange={(e) => setForm({ ...form, badgeImageUrl: e.target.value })} placeholder="/uploads/badge.png or https://..." />
                  <button type="button" className="btn btn-secondary" onClick={() => imgRef.current?.click()} disabled={uploading}><Upload size={16} /> {uploading ? '...' : 'Upload'}</button>
                </div>
                <input ref={imgRef} type="file" accept="image/*" className="hidden-file-input" onChange={handleBadgeUpload} />
              </div>
              <div className="form-group">
                <label className="form-label">Skills Covered (comma-separated)</label>
                <input type="text" className="form-input" value={form.skillsCovered} onChange={(e) => setForm({ ...form, skillsCovered: e.target.value })} placeholder="Python, ML, TensorFlow, ..." />
              </div>
              <div className="form-group">
                <label className="checkbox-label">
                  <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
                  <span>Featured certification</span>
                </label>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary"><Save size={16} /> Save Certification</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION: Achievements
// ═══════════════════════════════════════════════════════════════════════════════
interface AchievementsSectionProps {
  achievements: AchievementData[];
  setAchievements: (a: AchievementData[]) => void;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}

const defaultAchForm = {
  title: '', description: '', date: '', category: '', awarder: '', proofUrl: '', order: 0,
};

const AchievementsSection: React.FC<AchievementsSectionProps> = ({ achievements, setAchievements, showToast }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAch, setEditingAch] = useState<AchievementData | null>(null);
  const [form, setForm] = useState({ ...defaultAchForm });

  const openAdd = () => {
    setEditingAch(null);
    setForm({ ...defaultAchForm, order: achievements.length + 1 });
    setModalOpen(true);
  };

  const openEdit = (ach: AchievementData) => {
    setEditingAch(ach);
    setForm({
      title: ach.title, description: ach.description, date: ach.date,
      category: ach.category, awarder: ach.awarder || '', proofUrl: ach.proofUrl || '',
      order: ach.order || 0,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingAch) {
        const updated = await portfolioApi.updateAchievement(editingAch._id, form);
        setAchievements(achievements.map((a) => (a._id === editingAch._id ? updated : a)));
        showToast(`Achievement "${form.title}" updated!`);
      } else {
        const created = await portfolioApi.createAchievement(form as any);
        setAchievements([...achievements, created]);
        showToast(`Achievement "${form.title}" added!`);
      }
      setModalOpen(false);
    } catch {
      showToast('Failed to save achievement.', 'error');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    try {
      await portfolioApi.deleteAchievement(id);
      setAchievements(achievements.filter((a) => a._id !== id));
      showToast('Achievement deleted.');
    } catch {
      showToast('Failed to delete.', 'error');
    }
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title">Achievements</h2>
          <p className="section-subtitle">{achievements.length} achievement(s)</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Add Achievement</button>
      </div>

      <div className="admin-form-card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr><th>Title</th><th>Category</th><th>Awarder</th><th>Date</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {achievements.map((ach) => (
                <tr key={ach._id}>
                  <td><strong>{ach.title}</strong></td>
                  <td><span className="status-badge badge-info">{ach.category}</span></td>
                  <td>{ach.awarder || '—'}</td>
                  <td>{ach.date}</td>
                  <td>
                    <div className="action-btns">
                      <button className="btn btn-sm btn-secondary icon-btn" onClick={() => openEdit(ach)}><Edit2 size={14} /></button>
                      <button className="btn btn-sm btn-danger icon-btn" onClick={() => handleDelete(ach._id, ach.title)}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {achievements.length === 0 && (
                <tr><td colSpan={5} className="empty-row">No achievements yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingAch ? 'Edit Achievement' : 'Add Achievement'}</h3>
              <button className="modal-close" onClick={() => setModalOpen(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label className="form-label">Title</label>
                <input type="text" className="form-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <input type="text" className="form-input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. Hackathon, Academic..." required />
                </div>
                <div className="form-group">
                  <label className="form-label">Awarder / Organization</label>
                  <input type="text" className="form-input" value={form.awarder} onChange={(e) => setForm({ ...form, awarder: e.target.value })} />
                </div>
              </div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input type="text" className="form-input" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} placeholder="e.g. Jan 2024" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Proof / Link URL</label>
                  <input type="text" className="form-input" value={form.proofUrl} onChange={(e) => setForm({ ...form, proofUrl: e.target.value })} placeholder="https://..." />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-textarea" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary"><Save size={16} /> Save Achievement</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION: Resume
// ═══════════════════════════════════════════════════════════════════════════════
const ResumeSection: React.FC<SettingsSectionProps> = ({ settings, setSettings, showToast }) => {
  const [form, setForm] = useState({ ...settings.resume });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (settings?.resume) {
      setForm({ ...settings.resume });
    }
  }, [settings]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { fileUrl, fileName } = await portfolioApi.uploadFile(file);
      const updatedForm = { ...form, resumeUrl: fileUrl, fileName, lastUpdated: new Date().toISOString() };
      setForm(updatedForm);
      const updatedSettings = await portfolioApi.updateSiteSettings({ resume: updatedForm });
      setSettings(updatedSettings);
      showToast('Resume uploaded & saved successfully to database!');
    } catch {
      showToast('Upload failed.', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await portfolioApi.updateSiteSettings({ resume: form });
      setSettings(updated);
      showToast('Resume settings saved!');
    } catch {
      showToast('Failed to save.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="section-header">
        <h2 className="section-title">Resume Management</h2>
        <p className="section-subtitle">Upload or link your resume PDF file.</p>
      </div>

      <form onSubmit={handleSave} className="admin-form-card">
        <div className="resume-upload-zone">
          <FileText size={48} color="var(--accent-cyan)" />
          <p>Upload a new PDF resume</p>
          <button type="button" className="btn btn-primary" onClick={() => fileRef.current?.click()} disabled={uploading}>
            <Upload size={16} /> {uploading ? 'Uploading...' : 'Choose PDF File'}
          </button>
          <input ref={fileRef} type="file" accept=".pdf,application/pdf" className="hidden-file-input" onChange={handleUpload} />
        </div>

        {form.resumeUrl && (
          <div className="resume-current">
            <CheckCircle size={16} color="var(--accent-green)" />
            <span>Current: <a href={resolveAssetUrl(form.resumeUrl)} target="_blank" rel="noopener noreferrer">{form.fileName || form.resumeUrl}</a></span>
          </div>
        )}

        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label">Resume URL (manual)</label>
            <input type="text" className="form-input" value={form.resumeUrl} onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })} placeholder="/uploads/resume.pdf or https://..." />
          </div>
          <div className="form-group">
            <label className="form-label">Button Text</label>
            <input type="text" className="form-input" value={form.buttonText} onChange={(e) => setForm({ ...form, buttonText: e.target.value })} placeholder="Download Resume" />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">File Name (display)</label>
          <input type="text" className="form-input" value={form.fileName} onChange={(e) => setForm({ ...form, fileName: e.target.value })} placeholder="MyResume.pdf" />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            <Save size={16} /> {saving ? 'Saving...' : 'Save Resume Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION: Contact
// ═══════════════════════════════════════════════════════════════════════════════
interface ContactSectionProps {
  settings: SiteSettingsData | null;
  setSettings: (s: SiteSettingsData) => void;
  messages: ContactMessageData[];
  setMessages: (m: ContactMessageData[]) => void;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({ settings, setSettings, messages, setMessages, showToast }) => {
  const [form, setForm] = useState(settings?.contact || { email: '', phone: '', location: '', description: '', github: '', linkedin: '', instagram: '', twitter: '' });
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'messages'>('info');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    try {
      const updated = await portfolioApi.updateSiteSettings({ contact: form });
      setSettings(updated);
      showToast('Contact info saved!');
    } catch {
      showToast('Failed to save.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleMarkRead = async (id: string) => {
    try {
      await portfolioApi.markMessageRead(id);
      setMessages(messages.map((m) => (m._id === id ? { ...m, isRead: true } : m)));
      showToast('Marked as read.');
    } catch {
      showToast('Failed.', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await portfolioApi.deleteContactMessage(id);
      setMessages(messages.filter((m) => m._id !== id));
      showToast('Message deleted.');
    } catch {
      showToast('Failed to delete.', 'error');
    }
  };

  const unread = messages.filter((m) => !m.isRead).length;

  return (
    <div>
      <div className="section-header">
        <h2 className="section-title">Contact</h2>
      </div>

      <div className="sub-tab-bar">
        <button className={`sub-tab ${activeTab === 'info' ? 'active' : ''}`} onClick={() => setActiveTab('info')}>Contact Info</button>
        <button className={`sub-tab ${activeTab === 'messages' ? 'active' : ''}`} onClick={() => setActiveTab('messages')}>
          Messages {unread > 0 && <span className="sidebar-badge">{unread}</span>}
        </button>
      </div>

      {activeTab === 'info' && (
        <form onSubmit={handleSave} className="admin-form-card">
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" className="form-input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input type="text" className="form-input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Location</label>
            <input type="text" className="form-input" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea className="form-textarea" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label"><Github size={14} /> GitHub</label>
              <input type="text" className="form-input" value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label"><Linkedin size={14} /> LinkedIn</label>
              <input type="text" className="form-input" value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} />
            </div>
          </div>
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label"><Instagram size={14} /> Instagram</label>
              <input type="text" className="form-input" value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label"><Twitter size={14} /> Twitter</label>
              <input type="text" className="form-input" value={form.twitter} onChange={(e) => setForm({ ...form, twitter: e.target.value })} />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={saving}>
              <Save size={16} /> {saving ? 'Saving...' : 'Save Contact Info'}
            </button>
          </div>
        </form>
      )}

      {activeTab === 'messages' && (
        <div className="admin-form-card">
          {messages.length === 0 ? (
            <div className="empty-state">No messages received yet.</div>
          ) : (
            messages.map((msg) => (
              <div key={msg._id} className={`message-card ${!msg.isRead ? 'message-unread' : ''}`}>
                <div className="message-card-header">
                  <div>
                    <strong>{msg.name}</strong> <span className="message-email">&lt;{msg.email}&gt;</span>
                    {!msg.isRead && <span className="status-badge badge-warning" style={{ marginLeft: 8 }}>New</span>}
                  </div>
                  <div className="message-date">{new Date(msg.createdAt).toLocaleDateString()}</div>
                </div>
                <div className="message-subject"><strong>{msg.subject}</strong></div>
                <div className="message-body">{msg.message}</div>
                <div className="action-btns" style={{ marginTop: 12 }}>
                  {!msg.isRead && (
                    <button className="btn btn-sm btn-secondary" onClick={() => handleMarkRead(msg._id)}>
                      <Eye size={14} /> Mark Read
                    </button>
                  )}
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(msg._id)}>
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION: Social Links
// ═══════════════════════════════════════════════════════════════════════════════
const SocialLinksSection: React.FC<SettingsSectionProps> = ({ settings, setSettings, showToast }) => {
  const [github, setGithub] = useState(settings.home.githubUrl || '');
  const [linkedin, setLinkedin] = useState(settings.home.linkedinUrl || '');
  const [twitter, setTwitter] = useState(settings.home.otherSocials?.twitter || '');
  const [instagram, setInstagram] = useState(settings.home.otherSocials?.instagram || '');
  const [leetcode, setLeetcode] = useState(settings.home.otherSocials?.leetcode || '');
  const [website, setWebsite] = useState(settings.home.otherSocials?.website || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await portfolioApi.updateSiteSettings({
        home: {
          ...settings.home,
          githubUrl: github,
          linkedinUrl: linkedin,
          otherSocials: { twitter, instagram, leetcode, website },
        },
      });
      setSettings(updated);
      showToast('Social links saved!');
    } catch {
      showToast('Failed to save.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="section-header">
        <h2 className="section-title">Social Links</h2>
        <p className="section-subtitle">Manage your social media and profile links.</p>
      </div>
      <form onSubmit={handleSave} className="admin-form-card">
        <div className="social-links-grid">
          {[
            { label: 'GitHub', icon: <Github size={18} />, value: github, setter: setGithub, placeholder: 'https://github.com/username' },
            { label: 'LinkedIn', icon: <Linkedin size={18} />, value: linkedin, setter: setLinkedin, placeholder: 'https://linkedin.com/in/username' },
            { label: 'Twitter / X', icon: <Twitter size={18} />, value: twitter, setter: setTwitter, placeholder: 'https://twitter.com/username' },
            { label: 'Instagram', icon: <Instagram size={18} />, value: instagram, setter: setInstagram, placeholder: 'https://instagram.com/username' },
            { label: 'LeetCode', icon: <BookOpen size={18} />, value: leetcode, setter: setLeetcode, placeholder: 'https://leetcode.com/username' },
            { label: 'Portfolio / Website', icon: <Globe size={18} />, value: website, setter: setWebsite, placeholder: 'https://yoursite.com' },
          ].map(({ label, icon, value, setter, placeholder }) => (
            <div key={label} className="social-link-row">
              <div className="social-link-icon">{icon}</div>
              <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                <label className="form-label">{label}</label>
                <input type="text" className="form-input" value={value} onChange={(e) => setter(e.target.value)} placeholder={placeholder} />
              </div>
            </div>
          ))}
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            <Save size={16} /> {saving ? 'Saving...' : 'Save Social Links'}
          </button>
        </div>
      </form>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION: Navbar
// ═══════════════════════════════════════════════════════════════════════════════
const NavbarSection: React.FC<SettingsSectionProps> = ({ settings, setSettings, showToast }) => {
  const [logoText, setLogoText] = useState(settings.navbar.logoText);
  const [items, setItems] = useState<INavItem[]>([...settings.navbar.items]);
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await portfolioApi.updateSiteSettings({ navbar: { logoText, items } });
      setSettings(updated);
      showToast('Navbar saved!');
    } catch {
      showToast('Failed to save navbar.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const updateItem = (index: number, field: keyof INavItem, value: any) => {
    const arr = [...items];
    arr[index] = { ...arr[index], [field]: value };
    setItems(arr);
  };

  const addItem = () => {
    setItems([...items, { id: `nav-${Date.now()}`, label: 'New Link', href: '#section', isVisible: true, order: items.length + 1 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="section-header">
        <h2 className="section-title">Navbar Settings</h2>
        <p className="section-subtitle">Edit navigation links shown in the header.</p>
      </div>

      <form onSubmit={handleSave} className="admin-form-card">
        <div className="form-group">
          <label className="form-label">Logo / Brand Text</label>
          <input type="text" className="form-input" value={logoText} onChange={(e) => setLogoText(e.target.value)} placeholder="My Portfolio" />
        </div>

        <div className="form-group">
          <div className="table-card-header">
            <label className="form-label" style={{ marginBottom: 0 }}>Navigation Items</label>
            <button type="button" className="btn btn-sm btn-secondary" onClick={addItem}><Plus size={14} /> Add Link</button>
          </div>
          <div className="nav-items-list">
            {items.sort((a, b) => a.order - b.order).map((item, i) => (
              <div key={item.id || i} className="nav-item-row">
                <input type="number" className="form-input order-input" value={item.order} onChange={(e) => updateItem(i, 'order', Number(e.target.value))} title="Order" />
                <input type="text" className="form-input" value={item.label} onChange={(e) => updateItem(i, 'label', e.target.value)} placeholder="Label" />
                <input type="text" className="form-input" value={item.href} onChange={(e) => updateItem(i, 'href', e.target.value)} placeholder="#section or /page" />
                <button type="button" className={`toggle-btn ${item.isVisible ? 'toggle-on' : 'toggle-off'}`} onClick={() => updateItem(i, 'isVisible', !item.isVisible)} title={item.isVisible ? 'Visible' : 'Hidden'}>
                  {item.isVisible ? <Eye size={15} /> : <EyeOff size={15} />}
                </button>
                <button type="button" className="btn btn-sm btn-danger icon-btn" onClick={() => removeItem(i)}><Trash2 size={14} /></button>
              </div>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            <Save size={16} /> {saving ? 'Saving...' : 'Save Navbar'}
          </button>
        </div>
      </form>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION: Footer
// ═══════════════════════════════════════════════════════════════════════════════
const FooterSection: React.FC<SettingsSectionProps> = ({ settings, setSettings, showToast }) => {
  const [form, setForm] = useState({ ...settings.footer });
  const [newLinkLabel, setNewLinkLabel] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await portfolioApi.updateSiteSettings({ footer: form });
      setSettings(updated);
      showToast('Footer saved!');
    } catch {
      showToast('Failed to save footer.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const addLink = () => {
    if (!newLinkLabel.trim()) return;
    setForm({ ...form, links: [...(form.links || []), { label: newLinkLabel, url: newLinkUrl }] });
    setNewLinkLabel('');
    setNewLinkUrl('');
  };

  const removeLink = (index: number) => {
    setForm({ ...form, links: form.links.filter((_, i) => i !== index) });
  };

  return (
    <div>
      <div className="section-header">
        <h2 className="section-title">Footer Settings</h2>
        <p className="section-subtitle">Edit footer description, copyright text, and footer links.</p>
      </div>

      <form onSubmit={handleSave} className="admin-form-card">
        <div className="form-group">
          <label className="form-label">Footer Description</label>
          <textarea className="form-textarea" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">Copyright Text</label>
          <input type="text" className="form-input" value={form.copyrightText} onChange={(e) => setForm({ ...form, copyrightText: e.target.value })} placeholder="© 2025 Your Name. All rights reserved." />
        </div>

        {/* Footer Links */}
        <div className="form-group">
          <label className="form-label">Footer Links</label>
          <div className="info-table">
            {(form.links || []).map((link, i) => (
              <div key={i} className="info-table-row">
                <input type="text" className="form-input" value={link.label} onChange={(e) => {
                  const arr = [...form.links];
                  arr[i] = { ...arr[i], label: e.target.value };
                  setForm({ ...form, links: arr });
                }} placeholder="Label" />
                <input type="text" className="form-input" value={link.url} onChange={(e) => {
                  const arr = [...form.links];
                  arr[i] = { ...arr[i], url: e.target.value };
                  setForm({ ...form, links: arr });
                }} placeholder="URL or #section" />
                <button type="button" className="btn btn-danger btn-sm icon-btn" onClick={() => removeLink(i)}><Trash2 size={15} /></button>
              </div>
            ))}
            <div className="info-table-row add-row">
              <input type="text" className="form-input" value={newLinkLabel} onChange={(e) => setNewLinkLabel(e.target.value)} placeholder="New link label..." />
              <input type="text" className="form-input" value={newLinkUrl} onChange={(e) => setNewLinkUrl(e.target.value)} placeholder="https://... or #section" onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addLink())} />
              <button type="button" className="btn btn-success btn-sm icon-btn" onClick={addLink}><Plus size={15} /></button>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            <Save size={16} /> {saving ? 'Saving...' : 'Save Footer'}
          </button>
        </div>
      </form>
    </div>
  );
};
