'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface DanceStyle {
  id: string;
  name: string;
  icon: string;
  subtitle: string;
  description: string;
  features: {
    [key: string]: string[];
  };
  schedule: Array<{
    day: string;
    time: string;
    level: string;
  }>;
  price: string;
  instructors: string;
}

const danceStyles: DanceStyle[] = [
  {
    id: 'salsa',
    name: 'Salsa',
    icon: '🔥',
    subtitle: 'Feel the Cuban rhythm and energy',
    description: 'Experience the vibrant energy of Cuba! Salsa is a lively, passionate dance that combines African rhythms with Latin American flair.',
    features: {
      "What You'll Learn": [
        'Basic steps and timing (On1 and On2)',
        'Partner work and leading/following',
        'Spins, turns, and styling',
        'Musical interpretation',
        'Cuban motion and body movement'
      ],
      'Class Details': [
        'Beginner to Advanced levels',
        '60-90 minute sessions',
        'Group and private lessons',
        'Social dance parties included',
        'Performance opportunities'
      ],
      'Benefits': [
        'Improve coordination and rhythm',
        'Build confidence on the dance floor',
        'Meet new people and socialize',
        'Great cardio workout',
        'Stress relief and fun'
      ]
    },
    schedule: [
      { day: 'Monday', time: '7:00 PM - 8:30 PM', level: 'Beginner' },
      { day: 'Wednesday', time: '7:00 PM - 8:30 PM', level: 'Intermediate' },
      { day: 'Friday', time: '8:00 PM - 9:30 PM', level: 'Advanced' },
      { day: 'Saturday', time: '2:00 PM - 3:30 PM', level: 'All Levels' }
    ],
    price: '$35/class',
    instructors: 'Carlos & Maria'
  },
  {
    id: 'bachata',
    name: 'Bachata',
    icon: '💕',
    subtitle: 'Experience sensual connection',
    description: 'Discover the romance of the Dominican Republic! Bachata is an intimate, sensual dance characterized by close connection and emotional expression.',
    features: {
      "What You'll Learn": [
        'Basic steps and hip movement',
        'Sensual bachata techniques',
        'Body isolations and waves',
        'Musicality and emotional expression',
        'Connection and frame'
      ],
      'Class Details': [
        'Traditional and Sensual styles',
        '60-90 minute sessions',
        'Couple-friendly classes',
        'Monthly workshops',
        'International guest instructors'
      ],
      'Benefits': [
        'Deepen partner connection',
        'Express emotions through movement',
        'Improve body awareness',
        'Build trust and communication',
        'Enhance musicality'
      ]
    },
    schedule: [
      { day: 'Tuesday', time: '7:00 PM - 8:30 PM', level: 'Beginner' },
      { day: 'Thursday', time: '7:00 PM - 8:30 PM', level: 'Intermediate' },
      { day: 'Saturday', time: '4:00 PM - 5:30 PM', level: 'Sensual' },
      { day: 'Sunday', time: '2:00 PM - 3:30 PM', level: 'All Levels' }
    ],
    price: '$40/class',
    instructors: 'Antonio & Isabella'
  },
  {
    id: 'kizomba',
    name: 'Kizomba',
    icon: '🌙',
    subtitle: 'Embrace the African soul',
    description: 'Feel the soul of Angola! Kizomba is a smooth, flowing dance known for its close embrace and deep connection between partners.',
    features: {
      "What You'll Learn": [
        'Basic ginga and weight transfer',
        'Connection and leading/following',
        'Saidas and pivots',
        'Urban Kiz variations',
        'Tarraxinha movements'
      ],
      'Class Details': [
        'Traditional and Urban styles',
        '75-minute sessions',
        'Small group classes',
        'Focus on connection',
        'African dance foundations'
      ],
      'Benefits': [
        'Develop smooth movement',
        'Build intimate connection',
        'Explore African culture',
        'Improve balance and control',
        'Relaxation through movement'
      ]
    },
    schedule: [
      { day: 'Wednesday', time: '8:00 PM - 9:15 PM', level: 'Beginner' },
      { day: 'Friday', time: '7:00 PM - 8:15 PM', level: 'Intermediate' },
      { day: 'Sunday', time: '5:00 PM - 6:15 PM', level: 'Urban Kiz' }
    ],
    price: '$45/class',
    instructors: 'João & Amara'
  },
  {
    id: 'zouk',
    name: 'Brazilian Zouk',
    icon: '🌊',
    subtitle: 'Flow with Brazilian waves',
    description: 'Experience the flowing movements of Brazil! Zouk is characterized by wave-like body movements and creative patterns.',
    features: {
      "What You'll Learn": [
        'Basic steps and rhythm',
        'Head movements and cambres',
        'Body waves and isolations',
        'Counter-balance techniques',
        'Musical interpretation'
      ],
      'Class Details': [
        'Progressive curriculum',
        '90-minute sessions',
        'Safe head movement training',
        'Monthly practice sessions',
        'Video analysis included'
      ],
      'Benefits': [
        'Improve flexibility',
        'Develop flow and fluidity',
        'Creative expression',
        'Core strength building',
        'Mind-body connection'
      ]
    },
    schedule: [
      { day: 'Monday', time: '8:30 PM - 10:00 PM', level: 'Beginner' },
      { day: 'Thursday', time: '8:30 PM - 10:00 PM', level: 'Intermediate' },
      { day: 'Saturday', time: '6:00 PM - 7:30 PM', level: 'All Levels' }
    ],
    price: '$50/class',
    instructors: 'Rafael & Luna'
  },
  {
    id: 'merengue',
    name: 'Merengue',
    icon: '🎉',
    subtitle: 'Simple steps, maximum fun',
    description: 'Dance to the beat of the Dominican Republic! Merengue is the easiest Latin dance to learn with its simple marching steps.',
    features: {
      "What You'll Learn": [
        'Basic marching steps',
        'Hip movement and styling',
        'Simple turn patterns',
        'Partner coordination',
        'Musical timing'
      ],
      'Class Details': [
        'Perfect for beginners',
        '45-minute sessions',
        'No partner required',
        'Fun party atmosphere',
        'Live music sessions'
      ],
      'Benefits': [
        'Easy to learn quickly',
        'Great for all ages',
        'Social and fun',
        'Low-impact exercise',
        'Instant confidence boost'
      ]
    },
    schedule: [
      { day: 'Tuesday', time: '6:00 PM - 6:45 PM', level: 'Beginner' },
      { day: 'Thursday', time: '6:00 PM - 6:45 PM', level: 'All Levels' },
      { day: 'Sunday', time: '1:00 PM - 1:45 PM', level: 'Family Class' }
    ],
    price: '$25/class',
    instructors: 'Miguel & Sofia'
  },
  {
    id: 'tango',
    name: 'Argentine Tango',
    icon: '🌹',
    subtitle: 'Passion and elegance combined',
    description: 'Experience the passion of Buenos Aires! Argentine Tango is an improvisational dance of connection and expression.',
    features: {
      "What You'll Learn": [
        'Walking and embrace',
        'Ochos and giros',
        'Musicality and pauses',
        'Improvisation skills',
        'Traditional milonga etiquette'
      ],
      'Class Details': [
        'Traditional and Nuevo styles',
        '90-minute sessions',
        'Practica included',
        'Monthly milongas',
        'Guest maestros'
      ],
      'Benefits': [
        'Improve posture and balance',
        'Develop elegance',
        'Deep partner connection',
        'Mental focus and presence',
        'Cultural enrichment'
      ]
    },
    schedule: [
      { day: 'Monday', time: '9:00 PM - 10:30 PM', level: 'Beginner' },
      { day: 'Wednesday', time: '9:00 PM - 10:30 PM', level: 'Intermediate' },
      { day: 'Friday', time: '9:30 PM - 11:00 PM', level: 'Milonga' }
    ],
    price: '$55/class',
    instructors: 'Diego & Valentina'
  }
];

const DanceStyles: React.FC = () => {
  const [activeTab, setActiveTab] = useState('salsa');

  const switchTab = (danceId: string) => {
    setActiveTab(danceId);
  };

  const generateFeatureCards = (features: { [key: string]: string[] }) => {
    return Object.entries(features).map(([title, items]) => (
      <div key={title} className="dance-info-card" style={{
        background: 'linear-gradient(135deg, var(--neutral-light) 0%, var(--white) 100%)',
        padding: '25px',
        borderRadius: '15px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        border: '1px solid rgba(0,0,0,0.05)'
      }}>
        <h3 style={{
          color: 'var(--primary-dark)',
          marginBottom: '15px',
          fontSize: '1.3rem',
          fontWeight: 600
        }}>{title}</h3>
        <ul style={{ listStyle: 'none' }}>
          {items.map((item, index) => (
            <li key={index} style={{
              padding: '8px 0',
              color: 'var(--neutral-gray)',
              position: 'relative',
              paddingLeft: '25px',
              transition: 'color 0.3s ease'
            }}>
              <span style={{
                content: '✓',
                position: 'absolute',
                left: 0,
                color: 'var(--primary-gold)',
                fontWeight: 'bold'
              }}>✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    ));
  };

  const generateScheduleItems = (schedule: Array<{ day: string; time: string; level: string }>) => {
    return schedule.map((item, index) => (
      <div key={index} className="dance-schedule-item" style={{
        background: 'var(--white)',
        padding: '15px',
        borderRadius: '10px',
        borderLeft: '4px solid var(--primary-gold)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: 'var(--shadow-soft)'
      }}>
        <div style={{ fontWeight: 'bold', color: 'var(--primary-dark)', marginBottom: '5px' }}>
          {item.day}
        </div>
        <div style={{ color: '#666', fontSize: '0.9rem' }}>
          {item.time}
        </div>
        <div style={{ color: 'var(--primary-dark)', fontSize: '0.85rem', marginTop: '5px' }}>
          {item.level}
        </div>
      </div>
    ));
  };

  return (
    <section id="dance-styles-tabs" style={{
      padding: '80px 0',
      background: 'linear-gradient(135deg, var(--neutral-light) 0%, var(--white) 100%)',
      position: 'relative'
    }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{
            fontSize: '3rem',
            marginBottom: '10px',
            color: 'var(--primary-dark)'
          }}>
            Discover Our Dance Styles
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: 'var(--neutral-gray)',
            fontStyle: 'italic'
          }}>
            Choose Your Perfect Dance Journey
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="dance-tab-navigation" style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '40px',
          flexWrap: 'wrap',
          animation: 'fadeInUp 0.8s ease'
        }}>
          {danceStyles.map((dance) => (
            <button
              key={dance.id}
              className={`dance-tab-btn ${activeTab === dance.id ? 'active' : ''}`}
              onClick={() => switchTab(dance.id)}
              style={{
                padding: '15px 30px',
                background: activeTab === dance.id 
                  ? 'linear-gradient(135deg, var(--primary-gold) 0%, var(--accent-rose) 100%)'
                  : 'var(--white)',
                border: '2px solid var(--primary-gold)',
                color: activeTab === dance.id ? 'var(--white)' : 'var(--primary-dark)',
                borderRadius: '50px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                fontSize: '1rem',
                fontWeight: 600,
                position: 'relative',
                overflow: 'hidden',
                boxShadow: activeTab === dance.id ? 'var(--shadow-strong)' : 'var(--shadow-soft)',
                transform: activeTab === dance.id ? 'scale(1.05)' : 'scale(1)',
                borderColor: activeTab === dance.id ? 'transparent' : 'var(--primary-gold)'
              }}
            >
              {dance.icon} {dance.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="dance-tab-content" style={{
          background: 'var(--white)',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: 'var(--shadow-medium)',
          minHeight: '500px',
          animation: 'fadeIn 0.5s ease',
          border: '1px solid rgba(0,0,0,0.05)'
        }}>
          {danceStyles.map((dance) => (
            <div
              key={dance.id}
              className={`dance-tab-panel ${activeTab === dance.id ? 'active' : ''}`}
              style={{
                display: activeTab === dance.id ? 'block' : 'none',
                animation: activeTab === dance.id ? 'slideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
              }}
            >
              {/* Dance Header */}
              <div className="dance-header" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '30px',
                marginBottom: '30px',
                paddingBottom: '30px',
                borderBottom: '2px solid var(--neutral-light)'
              }}>
                <div className="dance-icon" style={{
                  fontSize: '4rem',
                  width: '100px',
                  height: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, var(--primary-gold), var(--accent-rose))',
                  borderRadius: '20px',
                  boxShadow: 'var(--shadow-soft)',
                  transition: 'all 0.3s ease'
                }}>
                  {dance.icon}
                </div>
                <div className="dance-title-section">
                  <h2 style={{
                    fontSize: '2.5rem',
                    color: 'var(--primary-dark)',
                    marginBottom: '10px',
                    fontFamily: "'Playfair Display', serif"
                  }}>
                    {dance.name}
                  </h2>
                  <p className="dance-subtitle" style={{
                    color: 'var(--neutral-gray)',
                    fontSize: '1.1rem',
                    fontStyle: 'italic'
                  }}>
                    {dance.subtitle}
                  </p>
                </div>
              </div>

              <p style={{
                fontSize: '1.1rem',
                color: '#666',
                marginBottom: '30px',
                lineHeight: 1.8
              }}>
                {dance.description}
              </p>

              {/* Features Grid */}
              <div className="dance-info-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                marginBottom: '30px'
              }}>
                {generateFeatureCards(dance.features)}
              </div>

              {/* Schedule Section */}
              <div className="dance-schedule-section" style={{
                background: 'var(--neutral-light)',
                padding: '25px',
                borderRadius: '15px',
                marginBottom: '30px',
                border: '1px solid rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ marginBottom: '10px', color: '#333' }}>
                  📅 Class Schedule
                </h3>
                <p style={{ color: '#666', marginBottom: '20px' }}>
                  Choose a time that works for you
                </p>
                <div className="dance-schedule-grid" style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '15px',
                  marginTop: '20px'
                }}>
                  {generateScheduleItems(dance.schedule)}
                </div>
              </div>

              {/* CTA Section */}
              <div className="dance-cta-section" style={{
                background: 'linear-gradient(135deg, var(--primary-gold), var(--accent-rose))',
                padding: '30px',
                borderRadius: '15px',
                textAlign: 'center',
                color: 'var(--white)',
                boxShadow: 'var(--shadow-soft)',
                transition: 'all 0.3s ease'
              }}>
                <h3 style={{
                  fontSize: '1.8rem',
                  marginBottom: '10px',
                  fontFamily: "'Dancing Script', cursive"
                }}>
                  Ready to Start Your {dance.name} Journey?
                </h3>
                <p style={{ marginBottom: '10px' }}>
                  Join our community of passionate dancers
                </p>
                <p style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  marginBottom: '20px'
                }}>
                  {dance.price}
                </p>
                <p style={{
                  fontSize: '0.9rem',
                  opacity: 0.9,
                  marginBottom: '20px'
                }}>
                  Instructors: {dance.instructors}
                </p>
                <div style={{
                  display: 'flex',
                  gap: '15px',
                  justifyContent: 'center',
                  flexWrap: 'wrap'
                }}>
                  <button className="btn btn-primary" style={{
                    background: 'white',
                    color: 'var(--primary-dark)',
                    padding: '15px 35px',
                    borderRadius: '50px',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer'
                  }}>
                    Book Your First Class
                  </button>
                  <button className="btn btn-secondary" style={{
                    background: 'transparent',
                    color: 'white',
                    border: '2px solid white',
                    padding: '15px 35px',
                    borderRadius: '50px',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}>
                    Watch Demo Video
                  </button>
                  {(dance.id === 'salsa' || dance.id === 'bachata' || dance.id === 'kizomba') && (
                    <Link href={`/${dance.id}`}>
                      <a
                        className="btn btn-learn-more"
                        style={{
                          background: 'linear-gradient(135deg, var(--primary-gold), var(--accent-rose))',
                          color: 'white',
                          padding: '15px 35px',
                          borderRadius: '50px',
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          textDecoration: 'none',
                          display: 'inline-block',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                        }}
                      >
                        Learn More About {dance.name}
                      </a>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add styles for animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .dance-info-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-medium);
          background: var(--white);
        }
        
        .dance-schedule-item:hover {
          transform: translateX(5px);
          box-shadow: var(--shadow-medium);
          border-left-color: var(--accent-rose);
        }
        
        .dance-cta-section:hover {
          box-shadow: var(--shadow-medium);
          transform: translateY(-2px);
        }
        
        .dance-icon:hover {
          transform: scale(1.1) rotate(5deg);
          box-shadow: var(--shadow-medium);
        }
        
        @media (max-width: 768px) {
          .dance-tab-btn {
            padding: 12px 20px !important;
            font-size: 0.9rem !important;
          }
          
          .dance-tab-content {
            padding: 20px !important;
          }
          
          .dance-header {
            flex-direction: column !important;
            text-align: center !important;
          }
          
          .dance-title-section h2 {
            font-size: 1.8rem !important;
          }
          
          .dance-info-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default DanceStyles;
