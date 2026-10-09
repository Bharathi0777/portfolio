import React from 'react';
import { GraduationCap, MapPin, Calendar, Award, BookOpen } from 'lucide-react';
import { EducationData } from '../types/index.ts';
import '../styles/Education.css';

interface EducationProps {
  educationList: EducationData[];
}

export const Education: React.FC<EducationProps> = ({ educationList }) => {
  return (
    <section id="education" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <GraduationCap size={14} /> Academic Journey
          </div>
          <h2 className="section-title">Education & Milestones</h2>
          <p className="section-subtitle">
            Formal coursework and academic foundation shaping my engineering approach.
          </p>
        </div>

        <div className="education-timeline">
          {educationList.map((item) => (
            <div key={item._id} className="timeline-item">
              <div className={`timeline-marker ${item.current ? 'current' : ''}`}></div>
              <div className="education-card">
                <div className="education-header">
                  <div>
                    <h3 className="education-degree">{item.degree}</h3>
                    <div className="education-institution">{item.college || item.institution || item.university}</div>
                    {item.university && item.college && item.university !== item.college && (
                      <div className="education-university" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                        {item.university}
                      </div>
                    )}
                  </div>
                  <div className="education-score-badge">
                    <Award size={15} />
                    <span>{item.score}</span>
                  </div>
                </div>

                <div className="education-meta">
                  <div className="meta-item">
                    <Calendar size={15} color="var(--accent-cyan)" />
                    <span>
                      {item.startYear} — {item.current ? `${item.endYear} (Expected)` : item.endYear}
                    </span>
                  </div>
                  {item.location && (
                    <div className="meta-item">
                      <MapPin size={15} color="var(--accent-cyan)" />
                      <span>{item.location}</span>
                    </div>
                  )}
                  {item.department && (
                    <div className="meta-item">
                      <BookOpen size={15} color="var(--accent-cyan)" />
                      <span>{item.department}</span>
                    </div>
                  )}
                </div>

                {item.description && (
                  <p className="education-desc">{item.description}</p>
                )}

                {item.relevantCoursework && item.relevantCoursework.length > 0 && (
                  <div className="coursework-box">
                    <div className="coursework-title">Key Core Coursework</div>
                    <div className="coursework-chips">
                      {item.relevantCoursework.map((course, idx) => (
                        <span key={idx} className="coursework-chip">
                          {course}
                        </span>
                      ))}
                    </div>
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
