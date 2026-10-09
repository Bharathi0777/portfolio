import React from 'react';
import { Briefcase, Calendar, MapPin, Sparkles } from 'lucide-react';
import { ExperienceData } from '../types/index.ts';
import '../styles/Experience.css';

interface ExperienceProps {
  experienceList: ExperienceData[];
}

export const Experience: React.FC<ExperienceProps> = ({ experienceList }) => {
  if (!experienceList || experienceList.length === 0) return null;

  return (
    <section id="experience" className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag" style={{ borderColor: 'rgba(129, 140, 248, 0.3)', color: 'var(--accent-indigo)', background: 'rgba(129, 140, 248, 0.1)' }}>
            <Briefcase size={14} /> Experience
          </div>
          <h2 className="section-title">Internships & Leadership</h2>
          <p className="section-subtitle">
            Hands-on technical internships, engineering clubs, and campus leadership roles.
          </p>
        </div>

        <div className="experience-timeline">
          {experienceList.map((exp) => (
            <div key={exp._id} className="exp-item">
              <div className={`exp-marker ${exp.isCurrent ? 'current' : ''}`}></div>
              <div className="exp-card">
                <div className="exp-header">
                  <div>
                    <h3 className="exp-position">{exp.position}</h3>
                    <div className="exp-company">{exp.company}</div>
                  </div>
                  {exp.isCurrent && (
                    <span className="badge badge-cyan" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Sparkles size={13} /> Current Role
                    </span>
                  )}
                </div>

                <div className="exp-meta">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Calendar size={14} color="var(--accent-indigo)" />
                    <span>{exp.startDate} — {exp.endDate}</span>
                  </div>
                  {exp.location && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <MapPin size={14} color="var(--accent-indigo)" />
                      <span>{exp.location}</span>
                    </div>
                  )}
                </div>

                <p className="exp-desc">{exp.description}</p>

                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="exp-tech-tags">
                    {exp.technologies.map((tech, idx) => (
                      <span key={idx} className="exp-tech-pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
