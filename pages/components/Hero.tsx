'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="hero" id="home" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      background: `linear-gradient(135deg, var(--hero-overlay) 0%, var(--hero-overlay) 100%), url('/hero.jpg') center/cover`,
      overflow: 'hidden'
    }}>
      {/* Hero Background Pattern */}
      <div 
        className="hero-background"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.1,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L35 15 L45 15 L37.5 22.5 L40 32.5 L30 25 L20 32.5 L22.5 22.5 L15 15 L25 15 Z' fill='%23d4af37' fill-opacity='0.3'/%3E%3C/svg%3E")`,
          animation: 'float 20s ease-in-out infinite'
        }}
      />

      {/* Floating Elements */}
      <div className="floating-elements" style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 1
      }}>
        <div 
          className="floating-element"
          style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            fontSize: '3rem',
            opacity: 0.1,
            animation: 'floatRandom 15s infinite ease-in-out',
            animationDelay: '0s'
          }}
        >
          ✦
        </div>
        <div 
          className="floating-element"
          style={{
            position: 'absolute',
            top: '60%',
            right: '10%',
            fontSize: '2.5rem',
            opacity: 0.1,
            animation: 'floatRandom 15s infinite ease-in-out',
            animationDelay: '3s'
          }}
        >
          ❋
        </div>
        <div 
          className="floating-element"
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '50%',
            fontSize: '3.5rem',
            opacity: 0.1,
            animation: 'floatRandom 15s infinite ease-in-out',
            animationDelay: '6s'
          }}
        >
          ✧
        </div>
      </div>

      {/* Hero Content */}
      <div 
        className={`hero-content ${isLoaded ? 'fade-in' : ''}`}
        style={{
          textAlign: 'center',
          color: 'var(--white)',
          zIndex: 2,
          animation: isLoaded ? 'fadeInUp 1s ease' : 'none'
        }}
      >
        <p 
          className="hero-subtitle"
          style={{
            fontSize: '1.2rem',
            color: 'var(--primary-gold)',
            marginBottom: '1rem',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            animation: 'fadeIn 1.5s ease'
          }}
        >
          Connect Through Movement
        </p>

        <h1 
          className="hero-title dance-font"
          style={{
            fontSize: 'clamp(3rem, 8vw, 5rem)',
            fontWeight: 700,
            marginBottom: '1.5rem',
            lineHeight: 1.1,
            background: 'linear-gradient(135deg, var(--white), var(--primary-gold))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontFamily: "'Dancing Script', cursive",
            letterSpacing: '3px'
          }}
        >
          DanceLink
        </h1>

        <p 
          className="hero-description"
          style={{
            fontSize: '1.2rem',
            marginBottom: '2rem',
            color: 'rgba(255, 255, 255, 0.8)',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
        >
          Where dancers unite, stories unfold, and connections are made through the universal language of movement. Join our vibrant community today.
        </p>

        <div 
          className="hero-buttons"
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          <Link href="#classes">
            <a className="btn btn-primary">Explore Classes</a>
          </Link>
          <Link href="#contact">
            <a className="btn btn-secondary">Book Trial</a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
