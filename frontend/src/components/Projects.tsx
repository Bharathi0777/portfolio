import React, { useState } from 'react';
import { FolderGit2, ExternalLink, Github, CheckCircle2 } from 'lucide-react';
import { ProjectData } from '../types/index.ts';
import '../styles/Projects.css';

interface ProjectsProps {
  projects: ProjectData[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Full Stack',
    'Frontend',
    'Backend',
    'Systems / DevOps',
  ];

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <FolderGit2 size={14} /> Featured Projects
          </div>
          <h2 className="section-title">Built with Passion & Purpose</h2>
          <p className="section-subtitle">
            A selection of software platforms, developer utilities, and academic projects I've designed and engineered.
          </p>
        </div>

        {/* Category Filters */}
        <div className="projects-filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <article key={project._id} className="project-card">
              <div className="project-thumbnail-wrapper">
                <img
                  src={
                    project.imageUrl ||
                    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
                  }
                  alt={project.title}
                  className="project-image"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <span className="project-overlay-badge">{project.category}</span>
                {project.featured && (
                  <span className="project-featured-badge">★ Featured</span>
                )}
              </div>

              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                {project.tagline && (
                  <div className="project-tagline">{project.tagline}</div>
                )}
                <p className="project-description">{project.description}</p>

                {/* Highlights */}
                {project.highlights && project.highlights.length > 0 && (
                  <div className="project-highlights">
                    {project.highlights.map((highlight, idx) => (
                      <div key={idx} className="highlight-item">
                        <CheckCircle2 size={14} color="var(--accent-cyan)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Tags */}
                <div className="project-tech-tags">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="project-actions">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="project-btn project-btn-secondary"
                  >
                    <Github size={16} /> Code Repo
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="project-btn project-btn-primary"
                    >
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
