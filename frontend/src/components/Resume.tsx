import React from 'react';
import { FileText, Download, CheckCircle, Eye } from 'lucide-react';
import { ProfileData, SiteSettingsData } from '../types/index.ts';
import '../styles/Resume.css';

interface ResumeProps {
  profile: ProfileData;
  settings?: SiteSettingsData | null;
}

export const Resume: React.FC<ResumeProps> = ({ profile, settings }) => {
  const resumeHighlights = [
    '3rd-Year Information Technology Undergrad maintaining 8.92+ CGPA',
    'Demonstrated mastery of React, TypeScript, Node.js, and MongoDB',
    'Experience architecting zero-knowledge encryption & distributed monitors',
    'Solid foundation in Data Structures, Algorithms, OS, DBMS & Networks',
    'Strong communication, team leadership & open-source collaboration',
  ];

  const resumeUrl = settings?.resume?.resumeUrl || settings?.home?.resumeUrl || profile.resumeUrl || '/sample-resume.pdf';
  const buttonText = settings?.resume?.buttonText || settings?.home?.resumeButtonText || 'Download Resume (PDF)';
  const fileName = settings?.resume?.fileName || 'Resume.pdf';

  return (
    <section id="resume" className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <FileText size={14} /> Curriculum Vitae
          </div>
          <h2 className="section-title">Resume & Qualifications</h2>
          <p className="section-subtitle">
            Looking for a complete overview of my education, experience, and projects? Download the updated resume.
          </p>
        </div>

        <div className="resume-banner-card">
          <div className="resume-glow"></div>
          <div className="resume-grid">
            {/* Left Column: Highlights & Download CTA */}
            <div className="resume-info">
              <h3>Ready to Join Your Engineering Team</h3>
              <p>
                My resume includes in-depth documentation of academic coursework, engineering projects, competitive programming stats, and open-source contributions.
              </p>

              <div className="resume-highlights-list">
                {resumeHighlights.map((highlight, idx) => (
                  <div key={idx} className="resume-highlight-item">
                    <CheckCircle size={18} className="resume-check-icon" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              <div className="resume-actions">
                <a
                  href={resumeUrl}
                  download={fileName}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Download size={18} /> {buttonText}
                </a>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary"
                >
                  <Eye size={18} /> View in Browser
                </a>
              </div>
            </div>

            {/* Right Column: Mini Resume Paper Simulation */}
            <div className="resume-paper-preview">
              <div className="preview-header">
                <div className="preview-name">{settings?.home?.name || profile.fullName}</div>
                <div className="preview-role">{profile.headline.slice(0, 50)}...</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.2rem' }}>
                  {settings?.contact?.email || profile.email} • {settings?.contact?.location || profile.location}
                </div>
              </div>

              <div>
                <div className="preview-section-title">Education</div>
                <div className="preview-text">
                  <strong>B.Tech in Information Technology</strong> (2023 - 2027)<br />
                  {profile.collegeName} • CGPA: {profile.stats?.gpa || '8.92'}
                </div>

                <div className="preview-section-title">Technical Expertise</div>
                <div className="preview-text">
                  Languages: TypeScript, JavaScript, Java, Python, C++, SQL<br />
                  Frameworks: React, Express.js, Node.js, Vite<br />
                  Databases: MongoDB, PostgreSQL, Redis<br />
                  Cloud/DevOps: Docker, AWS, Git, CI/CD
                </div>

                <div className="preview-section-title">Featured Projects</div>
                <div className="preview-text">
                  • CampusHub — Full-Stack Academic Collaboration Portal<br />
                  • CloudPulse — Distributed Container Monitoring Agent<br />
                  • SecureVault — AES-GCM Encrypted Cloud Storage
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
