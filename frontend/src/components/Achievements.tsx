import React from 'react';
import { Trophy, Calendar, ExternalLink, Award } from 'lucide-react';
import { AchievementData } from '../types/index.ts';
import '../styles/Achievements.css';

interface AchievementsProps {
  achievements: AchievementData[];
}

export const Achievements: React.FC<AchievementsProps> = ({ achievements }) => {
  if (!achievements || achievements.length === 0) return null;

  return (
    <section id="achievements" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag" style={{ borderColor: 'rgba(245, 158, 11, 0.3)', color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)' }}>
            <Trophy size={14} /> Honors
          </div>
          <h2 className="section-title">Achievements & Recognition</h2>
          <p className="section-subtitle">
            Hackathons, algorithmic contest ranks, and competitive milestones achieved.
          </p>
        </div>

        <div className="achievements-grid">
          {achievements.map((item) => (
            <div key={item._id} className="achievement-card">
              <div className="achievement-header">
                <div className="achievement-icon-wrap">
                  <Award size={24} />
                </div>
                <div>
                  <h3 className="achievement-title">{item.title}</h3>
                  <div className="achievement-category">{item.category}</div>
                </div>
              </div>

              <div className="achievement-meta">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Calendar size={14} color="#f59e0b" />
                  <span>{item.date}</span>
                </div>
                {item.awarder && (
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {item.awarder}
                  </span>
                )}
              </div>

              <p className="achievement-desc">{item.description}</p>

              {item.proofUrl && (
                <a
                  href={item.proofUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="achievement-proof-link"
                >
                  <ExternalLink size={14} /> View Certificate / Recognition
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
