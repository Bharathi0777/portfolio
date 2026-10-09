import React, { useState, useEffect } from 'react';
import { portfolioApi } from '../services/api.ts';
import {
  ProfileData,
  SkillData,
  EducationData,
  ExperienceData,
  ProjectData,
  CertificationData,
  AchievementData,
  SiteSettingsData,
} from '../types/index.ts';
import { Navbar } from '../components/Navbar.tsx';
import { Hero } from '../components/Hero.tsx';
import { About } from '../components/About.tsx';
import { Skills } from '../components/Skills.tsx';
import { Education } from '../components/Education.tsx';
import { Experience } from '../components/Experience.tsx';
import { Projects } from '../components/Projects.tsx';
import { Certifications } from '../components/Certifications.tsx';
import { Achievements } from '../components/Achievements.tsx';
import { Resume } from '../components/Resume.tsx';
import { Contact } from '../components/Contact.tsx';
import { Footer } from '../components/Footer.tsx';
import { Loading } from '../components/Loading.tsx';
import { ErrorMessage } from '../components/ErrorMessage.tsx';

export const Home: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [settings, setSettings] = useState<SiteSettingsData | null>(null);
  const [skills, setSkills] = useState<SkillData[]>([]);
  const [educationList, setEducationList] = useState<EducationData[]>([]);
  const [experienceList, setExperienceList] = useState<ExperienceData[]>([]);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [certifications, setCertifications] = useState<CertificationData[]>([]);
  const [achievements, setAchievements] = useState<AchievementData[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPortfolioData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all collections concurrently
      const [
        profileData,
        settingsData,
        skillsData,
        eduData,
        expData,
        projectsData,
        certsData,
        achieveData,
      ] = await Promise.all([
        portfolioApi.getProfile(),
        portfolioApi.getSiteSettings(),
        portfolioApi.getSkills(),
        portfolioApi.getEducation(),
        portfolioApi.getExperience(),
        portfolioApi.getProjects(),
        portfolioApi.getCertifications(),
        portfolioApi.getAchievements(),
      ]);

      setProfile(profileData);
      setSettings(settingsData);
      setSkills(skillsData);
      setEducationList(eduData);
      setExperienceList(expData);
      setProjects(projectsData);
      setCertifications(certsData);
      setAchievements(achieveData);
    } catch (err) {
      console.error('Error loading portfolio data:', err);
      setError(
        'Failed to connect to the backend server. Please verify the Express backend is running on port 5000 and MongoDB is connected.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loading message="Loading live portfolio from database..." />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="container" style={{ paddingTop: '8rem', minHeight: '80vh' }}>
        <ErrorMessage message={error || 'Profile could not be loaded.'} onRetry={fetchPortfolioData} />
      </div>
    );
  }

  return (
    <div className="portfolio-app">
      <Navbar fullName={profile.fullName} settings={settings} />
      <main>
        <Hero profile={profile} settings={settings} />
        <About profile={profile} settings={settings} />
        <Skills skills={skills} />
        <Education educationList={educationList} />
        <Experience experienceList={experienceList} />
        <Projects projects={projects} />
        <Certifications certifications={certifications} />
        <Achievements achievements={achievements} />
        <Resume profile={profile} settings={settings} />
        <Contact profile={profile} settings={settings} />
      </main>
      <Footer profile={profile} settings={settings} />
    </div>
  );
};
