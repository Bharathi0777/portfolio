import React from 'react';
import { User, School, MapPin, Mail, Calendar, Compass, Award } from 'lucide-react';
import { ProfileData, SiteSettingsData } from '../types/index.ts';
import { resolveAssetUrl } from '../services/api.ts';
import '../styles/About.css';

interface AboutProps {
  profile: ProfileData;
  settings?: SiteSettingsData | null;
}

export const About: React.FC<AboutProps> = ({ profile, settings }) => {
  const careerInterests = [
    'Full Stack Engineering',
    'Cloud-Native Architecture',
    'Distributed Systems',
    'REST & GraphQL APIs',
    'Data Structures & Algorithms',
    'Microservices Architecture',
    'DevOps & CI/CD Pipelines',
    'Open Source Contribution',
  ];

  const aboutTitle = settings?.about?.title || 'Driven by Curiosity & Code';
  const aboutDescription = settings?.about?.description || profile.aboutStory || profile.bio;
  const aboutImageUrl = settings?.about?.imageUrl ? resolveAssetUrl(settings.about.imageUrl) : '';

  const displayName = settings?.home?.name || profile.fullName;
  const displayYear = profile.currentYear || '3rd Year B.Tech';
  const displayCgpa = profile.stats?.gpa || '7.73';

  // Dynamic personal info cards: prefer settings.about.personalInfo, fallback to profile
  const personalInfoList =
    settings?.about?.personalInfo && settings.about.personalInfo.length > 0
      ? settings.about.personalInfo
      : [
          { label: 'Degree & Institution', value: profile.collegeName },
          { label: 'Graduation Year', value: `Class of ${profile.graduationYear} (${profile.currentYear})` },
          { label: 'Current Location', value: profile.location },
          { label: 'Primary Email', value: profile.email },
        ];

  const getInfoIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes('degree') || l.includes('college') || l.includes('institution') || l.includes('university') || l.includes('school')) {
      return <School size={20} />;
    }
    if (l.includes('year') || l.includes('grad') || l.includes('batch')) {
      return <Calendar size={20} />;
    }
    if (l.includes('location') || l.includes('city') || l.includes('address')) {
      return <MapPin size={20} />;
    }
    if (l.includes('email') || l.includes('mail') || l.includes('contact')) {
      return <Mail size={20} />;
    }
    if (l.includes('cgpa') || l.includes('gpa') || l.includes('score') || l.includes('grade')) {
      return <Award size={20} />;
    }
    return <User size={20} />;
  };

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <User size={14} /> About Me
          </div>
          <h2 className="section-title">{aboutTitle}</h2>
          <p className="section-subtitle">
            An engineering journey combining strong computer science fundamentals with modern software practices.
          </p>
        </div>

        <div className="about-grid">
          {/* Left Column: Narrative and Dynamic Info Cards */}
          <div className="about-text-content">
            <p className="about-intro-lead">
              {profile.bio}
            </p>

            <p className="about-paragraph">
              {aboutDescription}
            </p>

            <p className="about-paragraph">
              <strong style={{ color: 'var(--accent-cyan)' }}>Career Objective: </strong>
              {profile.careerGoals}
            </p>

            {/* Dynamic Info Cards from MongoDB */}
            <div className="about-info-cards">
              {personalInfoList.map((item, idx) => (
                <div key={idx} className="about-info-card">
                  <div className="info-card-icon">
                    {getInfoIcon(item.label)}
                  </div>
                  <div>
                    <div className="info-card-label">{item.label}</div>
                    <div className="info-card-value">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Career Interests Chips */}
            <div className="about-interests-box">
              <h4 className="interests-title">
                <Compass size={18} color="var(--accent-cyan)" /> Core Areas of Technical Interest
              </h4>
              <div className="interests-chips">
                {careerInterests.map((interest, idx) => (
                  <span key={idx} className="interest-chip">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: About Image & Code / Terminal Window */}
          <div className="about-code-visual">
            {aboutImageUrl && (
              <div className="about-image-card">
                <img
                  src={aboutImageUrl}
                  alt={displayName}
                  className="about-profile-img"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}

            <div className="terminal-window">
              <div className="terminal-header">
                <span className="terminal-dot red"></span>
                <span className="terminal-dot yellow"></span>
                <span className="terminal-dot green"></span>
                <span className="terminal-title">
                  {displayName.toLowerCase().replace(/\s+/g, '_')}@workstation:~ student_profile.json
                </span>
              </div>
              <div className="terminal-body">
                <div className="terminal-line">
                  <span className="term-prompt">$</span>
                  <span className="term-cmd">cat student_profile.json</span>
                </div>
                <div className="terminal-line">
                  <span className="term-str">&#123;</span>
                </div>
                <div className="terminal-line" style={{ paddingLeft: '1.2rem' }}>
                  <span className="term-key">"name":</span>
                  <span className="term-str">"{displayName}"</span>,
                </div>
                <div className="terminal-line" style={{ paddingLeft: '1.2rem' }}>
                  <span className="term-key">"department":</span>
                  <span className="term-str">"{profile.department}"</span>,
                </div>
                <div className="terminal-line" style={{ paddingLeft: '1.2rem' }}>
                  <span className="term-key">"currentStatus":</span>
                  <span className="term-str">"{displayYear}"</span>,
                </div>
                <div className="terminal-line" style={{ paddingLeft: '1.2rem' }}>
                  <span className="term-key">"cgpa":</span>
                  <span className="term-num">"{displayCgpa}"</span>,
                </div>
                <div className="terminal-line" style={{ paddingLeft: '1.2rem' }}>
                  <span className="term-key">"seeking":</span>
                  <span className="term-str">"Summer 2026 SDE Internship"</span>,
                </div>
                <div className="terminal-line" style={{ paddingLeft: '1.2rem' }}>
                  <span className="term-key">"preferredStack":</span>
                  <span className="term-str">["TypeScript", "React", "Node.js", "Docker", "AWS"]</span>,
                </div>
                <div className="terminal-line" style={{ paddingLeft: '1.2rem' }}>
                  <span className="term-key">"availableForHire":</span>
                  <span className="term-num">{profile.availableForHire ? 'true' : 'false'}</span>
                </div>
                <div className="terminal-line">
                  <span className="term-str">&#125;</span>
                </div>
                <div className="terminal-line" style={{ marginTop: '0.75rem' }}>
                  <span className="term-prompt">$</span>
                  <span className="term-cmd">git status</span>
                </div>
                <div className="terminal-line">
                  <span className="term-comment"># On branch main: 100% commit frequency, ready to push impact.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
