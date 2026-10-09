import React from 'react';
import { Terminal, Github, Linkedin, Twitter, ArrowUp, Code2, Instagram, Globe } from 'lucide-react';
import { ProfileData, SiteSettingsData } from '../types/index.ts';
import '../styles/Footer.css';

interface FooterProps {
  profile: ProfileData;
  settings?: SiteSettingsData | null;
}

export const Footer: React.FC<FooterProps> = ({ profile, settings }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerDesc = settings?.footer?.description ||
    '3rd-year Information Technology engineering undergrad passionate about building reliable software, web systems, and cloud infrastructure.';
  const copyrightText = settings?.footer?.copyrightText ||
    `© ${new Date().getFullYear()} ${settings?.home?.name || profile.fullName}. Crafted with React, TypeScript & Plain CSS.`;

  const footerLinks = settings?.footer?.links && settings.footer.links.length > 0
    ? settings.footer.links
    : [
        { label: 'Home', url: '#home' },
        { label: 'About Me', url: '#about' },
        { label: 'Skills', url: '#skills' },
        { label: 'Experience', url: '#experience' },
        { label: 'Projects', url: '#projects' },
      ];

  const githubUrl = settings?.home?.githubUrl || profile.socialLinks?.github;
  const linkedinUrl = settings?.home?.linkedinUrl || profile.socialLinks?.linkedin;
  const twitterUrl = settings?.home?.otherSocials?.twitter || profile.socialLinks?.twitter;
  const instagramUrl = settings?.home?.otherSocials?.instagram || profile.socialLinks?.instagram;
  const leetcodeUrl = settings?.home?.otherSocials?.leetcode || profile.socialLinks?.leetcode;
  const websiteUrl = settings?.home?.otherSocials?.website || profile.socialLinks?.website;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="nav-logo-badge">
                <Terminal size={18} />
              </div>
              <span>{settings?.navbar?.logoText || settings?.home?.name || profile.fullName}</span>
            </div>
            <p className="footer-desc">
              {footerDesc}
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              {footerLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.url} className="footer-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Links */}
          <div>
            <h4 className="footer-col-title">Explore</h4>
            <ul className="footer-links-list">
              <li><a href="#certifications" className="footer-link">Certifications</a></li>
              <li><a href="#achievements" className="footer-link">Achievements</a></li>
              <li><a href="#resume" className="footer-link">Download Resume</a></li>
              <li><a href="#contact" className="footer-link">Contact Me</a></li>
              <li><a href="/admin/dashboard" className="footer-link">Admin Portal</a></li>
            </ul>
          </div>

          {/* Social Profiles Column */}
          <div>
            <h4 className="footer-col-title">Profiles</h4>
            <ul className="footer-links-list">
              {githubUrl && (
                <li>
                  <a href={githubUrl} target="_blank" rel="noreferrer" className="footer-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Github size={15} /> GitHub
                  </a>
                </li>
              )}
              {linkedinUrl && (
                <li>
                  <a href={linkedinUrl} target="_blank" rel="noreferrer" className="footer-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Linkedin size={15} /> LinkedIn
                  </a>
                </li>
              )}
              {leetcodeUrl && (
                <li>
                  <a href={leetcodeUrl} target="_blank" rel="noreferrer" className="footer-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Code2 size={15} /> LeetCode
                  </a>
                </li>
              )}
              {twitterUrl && (
                <li>
                  <a href={twitterUrl} target="_blank" rel="noreferrer" className="footer-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Twitter size={15} /> Twitter / X
                  </a>
                </li>
              )}
              {instagramUrl && (
                <li>
                  <a href={instagramUrl} target="_blank" rel="noreferrer" className="footer-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Instagram size={15} /> Instagram
                  </a>
                </li>
              )}
              {websiteUrl && (
                <li>
                  <a href={websiteUrl} target="_blank" rel="noreferrer" className="footer-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Globe size={15} /> Website
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>{copyrightText}</p>

          <button
            onClick={scrollToTop}
            className="scroll-top-btn"
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};
