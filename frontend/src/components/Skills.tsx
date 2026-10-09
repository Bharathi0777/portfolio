import React, { useState } from 'react';
import {
  Code,
  Layers,
  Database,
  Cloud,
  Cpu,
  Server,
  Atom,
  FileCode2,
  Palette,
  Layout,
  Network,
  Coffee,
  Terminal,
  Box,
  Workflow,
  Binary,
  Blocks,
  HardDrive,
  Globe,
  GitBranch,
  Send,
} from 'lucide-react';
import { SkillData } from '../types/index.ts';
import '../styles/Skills.css';

interface SkillsProps {
  skills: SkillData[];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Frontend',
    'Backend',
    'Database',
    'DevOps & Cloud',
    'Core CS',
    'Tools & Other',
  ];

  const filteredSkills =
    selectedCategory === 'All'
      ? skills
      : skills.filter((s) => s.category === selectedCategory);

  const getSkillIcon = (iconName?: string) => {
    switch (iconName?.toLowerCase()) {
      case 'atom':
        return <Atom size={20} />;
      case 'filecode2':
        return <FileCode2 size={20} />;
      case 'palette':
        return <Palette size={20} />;
      case 'layout':
        return <Layout size={20} />;
      case 'server':
        return <Server size={20} />;
      case 'layers':
        return <Layers size={20} />;
      case 'network':
        return <Network size={20} />;
      case 'coffee':
        return <Coffee size={20} />;
      case 'terminal':
        return <Terminal size={20} />;
      case 'database':
        return <Database size={20} />;
      case 'box':
        return <Box size={20} />;
      case 'cloud':
        return <Cloud size={20} />;
      case 'workflow':
        return <Workflow size={20} />;
      case 'binary':
        return <Binary size={20} />;
      case 'blocks':
        return <Blocks size={20} />;
      case 'harddrive':
        return <HardDrive size={20} />;
      case 'globe':
        return <Globe size={20} />;
      case 'gitbranch':
        return <GitBranch size={20} />;
      case 'send':
        return <Send size={20} />;
      case 'cpu':
        return <Cpu size={20} />;
      default:
        return <Code size={20} />;
    }
  };

  return (
    <section id="skills" className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Cpu size={14} /> Technical Arsenal
          </div>
          <h2 className="section-title">Skills & Competencies</h2>
          <p className="section-subtitle">
            Languages, frameworks, databases, and foundational CS tools I actively work with.
          </p>
        </div>

        {/* Filter categories */}
        <div className="skills-filter-row">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div className="skills-grid">
          {filteredSkills.map((skill) => (
            <div key={skill._id} className="skill-card">
              <div className="skill-header">
                <div className="skill-icon-name">
                  <div className="skill-icon-wrap">
                    {getSkillIcon(skill.iconName)}
                  </div>
                  <div className="skill-name">{skill.name}</div>
                </div>
                <span className="skill-category-badge">{skill.category}</span>
              </div>

              <div className="skill-progress-section">
                <div className="skill-progress-labels">
                  <span>Proficiency</span>
                  <span className="skill-percent">{skill.proficiency}%</span>
                </div>
                <div className="skill-bar-track">
                  <div
                    className="skill-bar-fill"
                    style={{ width: `${skill.proficiency}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
