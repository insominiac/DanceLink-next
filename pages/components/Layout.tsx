'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link href="/">
            <a className="logo">DanceLink</a>
          </Link>

          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <li><Link href="#home"><a className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</a></Link></li>
            <li><Link href="#search"><a className="nav-link" onClick={() => setIsMenuOpen(false)}>Search</a></Link></li>
            <li><Link href="#partner-match"><a className="nav-link" onClick={() => setIsMenuOpen(false)}>Partner Match</a></Link></li>
            <li><Link href="#events"><a className="nav-link" onClick={() => setIsMenuOpen(false)}>Events</a></Link></li>
            <li><Link href="#instructors"><a className="nav-link" onClick={() => setIsMenuOpen(false)}>Instructors</a></Link></li>
            <li><Link href="#about"><a className="nav-link" onClick={() => setIsMenuOpen(false)}>About</a></Link></li>
            <li><Link href="#contact"><a className="nav-link" onClick={() => setIsMenuOpen(false)}>Contact</a></Link></li>
          </ul>

          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Mobile Menu Toggle */}
          <button 
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} 
            onClick={toggleMenu}
            style={{ 
              display: 'none',
              flexDirection: 'column',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '5px'
            }}
          >
            <span style={{
              width: '25px',
              height: '2px',
              background: 'var(--primary-dark)',
              margin: '3px 0',
              transition: '0.3s',
              transform: isMenuOpen ? 'rotate(-45deg) translate(-5px, 6px)' : 'none'
            }}></span>
            <span style={{
              width: '25px',
              height: '2px',
              background: 'var(--primary-dark)',
              margin: '3px 0',
              transition: '0.3s',
              opacity: isMenuOpen ? 0 : 1
            }}></span>
            <span style={{
              width: '25px',
              height: '2px',
              background: 'var(--primary-dark)',
              margin: '3px 0',
              transition: '0.3s',
              transform: isMenuOpen ? 'rotate(45deg) translate(-5px, -6px)' : 'none'
            }}></span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="social-links">
            <a href="#" className="social-link">📘</a>
            <a href="#" className="social-link">📷</a>
            <a href="#" className="social-link">🐦</a>
            <a href="#" className="social-link">▶️</a>
          </div>
          <p className="footer-text">© 2024 DanceLink. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        @media (max-width: 768px) {
          .menu-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
};

// Language Switcher Component
const LanguageSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState({ code: 'EN', flag: '🇺🇸', name: 'English' });

  const languages = [
    { code: 'EN', flag: '🇺🇸', name: 'English' },
    { code: 'KO', flag: '🇰🇷', name: '한국어' },
    { code: 'ES', flag: '🇪🇸', name: 'Español' },
    { code: 'VI', flag: '🇻🇳', name: 'Tiếng Việt' },
  ];

  const changeLanguage = (lang: typeof currentLang) => {
    setCurrentLang(lang);
    setIsOpen(false);
    // Here you would implement actual language switching logic
  };

  return (
    <div className="language-switcher" style={{ position: 'relative', marginLeft: '2rem' }}>
      <button 
        className={`lang-current ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 15px',
          background: 'white',
          border: '2px solid var(--neutral-light)',
          borderRadius: '25px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          fontSize: '0.9rem',
          color: 'var(--primary-dark)'
        }}
      >
        <span className="flag" style={{ fontSize: '1.2rem' }}>{currentLang.flag}</span>
        <span className="lang-code" style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
          {currentLang.code}
        </span>
        <svg className="lang-arrow" width="12" height="8" viewBox="0 0 12 8" style={{
          transition: 'transform 0.3s ease',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
        }}>
          <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"></path>
        </svg>
      </button>

      <div 
        className={`lang-dropdown ${isOpen ? 'active' : ''}`}
        style={{
          position: 'absolute',
          top: 'calc(100% + 10px)',
          right: 0,
          background: 'white',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          padding: '10px',
          minWidth: '180px',
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? 'visible' : 'hidden',
          transform: isOpen ? 'translateY(0)' : 'translateY(-10px)',
          transition: 'all 0.3s ease',
          zIndex: 1000
        }}
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            className={`lang-option ${currentLang.code === lang.code ? 'active' : ''}`}
            onClick={() => changeLanguage(lang)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 15px',
              background: currentLang.code === lang.code ? 'linear-gradient(135deg, var(--primary-gold), var(--accent-rose))' : 'transparent',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              width: '100%',
              textAlign: 'left',
              color: currentLang.code === lang.code ? 'white' : 'var(--primary-dark)',
              fontSize: '0.95rem'
            }}
          >
            <span className="flag" style={{ fontSize: '1.2rem' }}>{lang.flag}</span>
            <span className="lang-name" style={{ fontWeight: 500 }}>{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Layout;
