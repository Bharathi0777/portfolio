import React from 'react';
import { Award, Calendar, ExternalLink, ShieldCheck } from 'lucide-react';
import { CertificationData } from '../types/index.ts';
import '../styles/Certifications.css';

interface CertificationsProps {
  certifications: CertificationData[];
}

export const Certifications: React.FC<CertificationsProps> = ({ certifications }) => {
  return (
    <section id="certifications" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Award size={14} /> Credentials
          </div>
          <h2 className="section-title">Certifications & Honors</h2>
          <p className="section-subtitle">
            Industry credentials and verified specialized certifications in cloud, development, and data architecture.
          </p>
        </div>

        <div className="certifications-grid">
          {certifications.map((cert) => (
            <div key={cert._id} className="cert-card">
              <div className="cert-top-row">
                <div className="cert-badge-img-wrap">
                  {cert.badgeImageUrl ? (
                    <img
                      src={cert.badgeImageUrl}
                      alt={cert.title}
                      className="cert-badge-img"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <ShieldCheck size={26} color="var(--accent-cyan)" />
                  )}
                </div>
                <div className="cert-header-info">
                  <h3 className="cert-title">{cert.title}</h3>
                  <div className="cert-issuer">{cert.issuer}</div>
                </div>
              </div>

              <div className="cert-meta-info">
                <div className="cert-meta-item">
                  <Calendar size={14} color="var(--accent-cyan)" />
                  <span>Issued: {cert.issueDate}</span>
                </div>
                {cert.credentialId && (
                  <div className="cert-meta-item">
                    <span style={{ fontFamily: 'var(--font-mono)' }}>ID: {cert.credentialId}</span>
                  </div>
                )}
              </div>

              {cert.skillsCovered && cert.skillsCovered.length > 0 && (
                <div className="cert-skills-wrap">
                  {cert.skillsCovered.map((skill, idx) => (
                    <span key={idx} className="cert-skill-pill">
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              )}

              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="cert-verify-btn"
                >
                  <ExternalLink size={15} /> Verify Credential
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
