import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, Terminal, Shield } from 'lucide-react';
import { useTheme } from '../hooks/useTheme.ts';
import { SiteSettingsData } from '../types/index.ts';
import '../styles/Navbar.css';

interface NavbarProps {
  fullName?: string;
  settings?: SiteSettingsData | null;
}

export const Navbar: React.FC<NavbarProps> = ({ fullName = 'Bharathi k', settings }) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  // Dynamic nav items from MongoDB settings
  const navItems = settings?.navbar?.items && settings.navbar.items.length > 0
    ? settings.navbar.items
        .filter((item) => item.isVisible !== false)
        .sort((a, b) => (a.order || 0) - (b.order || 0))
    : [
        { id: 'home', label: 'Home', href: '#home', isVisible: true, order: 1 },
        { id: 'about', label: 'About', href: '#about', isVisible: true, order: 2 },
        { id: 'skills', label: 'Skills', href: '#skills', isVisible: true, order: 3 },
        { id: 'education', label: 'Education', href: '#education', isVisible: true, order: 4 },
        { id: 'experience', label: 'Experience', href: '#experience', isVisible: true, order: 5 },
        { id: 'projects', label: 'Projects', href: '#projects', isVisible: true, order: 6 },
        { id: 'certifications', label: 'Certifications', href: '#certifications', isVisible: true, order: 7 },
        { id: 'achievements', label: 'Achievements', href: '#achievements', isVisible: true, order: 8 },
        { id: 'resume', label: 'Resume', href: '#resume', isVisible: true, order: 9 },
        { id: 'contact', label: 'Contact', href: '#contact', isVisible: true, order: 10 },
      ];

  const logoText = settings?.navbar?.logoText || fullName;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section highlight spy
      const scrollPos = window.scrollY + 100;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      window.location.href = `/${href}`;
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#home" className="nav-brand" onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}>
          <div className="nav-logo-badge">
            <Terminal size={18} />
          </div>
          <span className="nav-brand-text">
            {logoText}
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav>
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Controls */}
        <div className="nav-actions">
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          <Link
            to="/admin/dashboard"
            className="theme-toggle-btn"
            title="Admin Portal"
            aria-label="Admin Portal"
          >
            <Shield size={18} />
          </Link>

          <a
            href="#contact"
            className="btn btn-primary btn-sm btn-contact-nav"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#contact');
            }}
          >
            Let's Talk
          </a>

          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(item.href);
            }}
          >
            {item.label}
          </a>
        ))}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
          <Link
            to="/admin/dashboard"
            className="btn btn-secondary btn-sm"
            style={{ flex: 1 }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Shield size={16} /> Admin Portal
          </Link>
          <a
            href="#contact"
            className="btn btn-primary btn-sm"
            style={{ flex: 1 }}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#contact');
            }}
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
};
