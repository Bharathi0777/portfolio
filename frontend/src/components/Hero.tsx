import React, { useState, useEffect } from 'react';
import { ArrowRight, Download, Github, Linkedin, Twitter, Code2, GraduationCap, Sparkles, Instagram, Globe } from 'lucide-react';
import { ProfileData, SiteSettingsData } from '../types/index.ts';
import { resolveAssetUrl } from '../services/api.ts';
import '../styles/Hero.css';


interface HeroProps {
  profile: ProfileData;
  settings?: SiteSettingsData | null;
}

export const Hero: React.FC<HeroProps> = ({ profile, settings }) => {
  const [roleIndex, setRoleIndex] = useState(0);

  const roles = profile.roles && profile.roles.length > 0
    ? profile.roles
    : ['Full Stack Developer', 'Information Technology Student', 'Problem Solver'];

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [roles.length]);

  const fullName = settings?.home?.name || profile.fullName;
  const headline = settings?.home?.description || profile.headline || profile.tagline;
  const avatarUrl = resolveAssetUrl(settings?.home?.profilePhotoUrl || profile.avatarUrl);
  const introGreeting = settings?.home?.introduction || '👋 Hello World, I am';
  const resumeBtnText = settings?.home?.resumeButtonText || 'Download Resume';
  const resumeUrl = settings?.home?.resumeUrl || settings?.resume?.resumeUrl || profile.resumeUrl || '/sample-resume.pdf';
  const githubUrl = settings?.home?.githubUrl || profile.socialLinks?.github;
  const linkedinUrl = settings?.home?.linkedinUrl || profile.socialLinks?.linkedin;
  const twitterUrl = settings?.home?.otherSocials?.twitter || profile.socialLinks?.twitter;
  const instagramUrl = settings?.home?.otherSocials?.instagram || profile.socialLinks?.instagram;
  const leetcodeUrl = settings?.home?.otherSocials?.leetcode || profile.socialLinks?.leetcode;
  const websiteUrl = settings?.home?.otherSocials?.website || profile.socialLinks?.website;
  const collegeName =
    settings?.about?.personalInfo?.find((p) => p.label.toLowerCase().includes('college'))?.value ||
    profile.collegeName;
  const currentCgpa =
    settings?.about?.personalInfo?.find((p) => p.label.toLowerCase().includes('cgpa'))?.value?.split('/')[0]?.trim() ||
    profile.stats?.gpa ||
    '7.73';

  return (
    <section id="home" className="hero-section">
      <div className="hero-glow-blob"></div>
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Intro info */}
          <div className="hero-content">
            {profile.availableForHire && (
              <div className="hero-badge-status">
                <span className="status-dot"></span>
                <span>Available for SDE Internships & Projects</span>
              </div>
            )}

            <p className="hero-greeting">{introGreeting}</p>

            <h1 className="hero-title">
              <span className="hero-gradient-text">{fullName}</span>
            </h1>

            <div className="hero-roles-bar">
              <span>A dedicated</span>
              <span className="hero-role-active">{roles[roleIndex]}</span>
            </div>

            <p className="hero-description">
              {headline}
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta-group">
              <a href="#projects" className="btn btn-primary">
                View My Work <ArrowRight size={18} />
              </a>
              <a href="#contact" className="btn btn-secondary">
                Let's Connect
              </a>
              <a
                href={resumeUrl}
                className="btn btn-outline"
                download="Resume.pdf"
                target="_blank"
                rel="noreferrer"
              >
                <Download size={17} /> {resumeBtnText}
              </a>
            </div>

            {/* Social Links */}
            <div className="hero-socials">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hero-social-link"
                  title="GitHub Profile"
                >
                  <Github size={20} />
                </a>
              )}
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hero-social-link"
                  title="LinkedIn Profile"
                >
                  <Linkedin size={20} />
                </a>
              )}
              {leetcodeUrl && (
                <a
                  href={leetcodeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hero-social-link"
                  title="LeetCode Profile"
                >
                  <Code2 size={20} />
                </a>
              )}
              {twitterUrl && (
                <a
                  href={twitterUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hero-social-link"
                  title="Twitter / X Profile"
                >
                  <Twitter size={20} />
                </a>
              )}
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hero-social-link"
                  title="Instagram Profile"
                >
                  <Instagram size={20} />
                </a>
              )}
              {websiteUrl && (
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hero-social-link"
                  title="Personal Website"
                >
                  <Globe size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Visual Avatar card */}
          <div className="hero-visual">
            <div className="hero-card-frame">
              <div className="hero-card-backdrop"></div>
              <div className="hero-avatar-card">
                <div className="hero-img-wrap">
                  <img
                    src={avatarUrl}
                    alt={fullName}
                    className="hero-avatar-img"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <div className="hero-avatar-badge">
                    <span className="hero-college-tag">
                      <GraduationCap size={16} /> {profile.currentYear || '3rd Year B.Tech'}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#38bdf8' }}>
                      <Sparkles size={14} /> IT Major
                    </span>
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {fullName}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                    {collegeName}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Strip */}
          <div className="hero-stats-strip">
            <div className="stat-item">
              <span className="stat-value">{currentCgpa}</span>
              <span className="stat-label">Academic CGPA</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{profile.stats?.projectsCount || '6'}+</span>
              <span className="stat-label">Full-Stack Projects</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{profile.stats?.solvedProblemsCount || '400'}+</span>
              <span className="stat-label">DSA Problems Solved</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{profile.stats?.certificationsCount || '4'}</span>
              <span className="stat-label">Professional Certs</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
