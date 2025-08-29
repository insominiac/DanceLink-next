export default function PartnerSearch() {
  return (
    <section 
      id="search" 
      className="partner-search" 
      style={{ 
        padding: '80px 0', 
        background: 'linear-gradient(135deg, var(--neutral-light), rgba(255,255,255,0.8))' 
      }}
    >
      <div className="container">
        <div className="section-header reveal active">
          <h2 className="section-title">Find Your Dance Partner</h2>
          <p>Discover workshops, competitions, socials, and performances near you</p>
        </div>
        
        {/* Search Box */}
        <div 
          className="search-container reveal active" 
          style={{ 
            maxWidth: '800px', 
            margin: '0 auto 3rem', 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '20px', 
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)' 
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <input 
              type="text" 
              id="partnerSearch" 
              placeholder="🔍 Search by name, style, or location..." 
              style={{ 
                flex: 1, 
                minWidth: '250px', 
                padding: '15px 20px', 
                border: '2px solid var(--neutral-light)', 
                borderRadius: '50px', 
                fontSize: '1rem', 
                transition: 'all 0.3s' 
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--primary-gold)';
                e.target.style.boxShadow = '0 0 20px rgba(212,175,55,0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--neutral-light)';
                e.target.style.boxShadow = 'none';
              }}
            />
            <button 
              onClick={() => console.log('Search partners')}
              style={{ 
                padding: '15px 40px', 
                background: 'var(--primary-gold)', 
                color: 'var(--white)', 
                border: 'none', 
                borderRadius: '50px', 
                fontSize: '1rem', 
                fontWeight: 600, 
                cursor: 'pointer', 
                transition: 'all 0.3s' 
              }}
              onMouseOver={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.transform = 'translateY(-2px)';
                target.style.boxShadow = '0 10px 30px rgba(212,175,55,0.4)';
              }}
              onMouseOut={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.transform = 'translateY(0)';
                target.style.boxShadow = 'none';
              }}
            >
              Search Partners
            </button>
          </div>
          
          {/* Filter Options */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <select 
              id="styleFilter" 
              style={{ 
                padding: '10px 20px', 
                border: '2px solid var(--neutral-light)', 
                borderRadius: '25px', 
                background: 'white', 
                cursor: 'pointer' 
              }}
            >
              <option value="">All Styles</option>
              <option value="salsa">Salsa</option>
              <option value="bachata">Bachata</option>
              <option value="kizomba">Kizomba</option>
              <option value="latin">Other Latin Styles</option>
              <option value="zouk">Brazilian Zouk</option>
              <option value="merengue">Merengue</option>
              <option value="cha-cha">Cha-Cha</option>
            </select>
            
            <select 
              id="levelFilter" 
              style={{ 
                padding: '10px 20px', 
                border: '2px solid var(--neutral-light)', 
                borderRadius: '25px', 
                background: 'white', 
                cursor: 'pointer' 
              }}
            >
              <option value="">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="professional">Professional</option>
            </select>
            
            <select 
              id="goalFilter" 
              style={{ 
                padding: '10px 20px', 
                border: '2px solid var(--neutral-light)', 
                borderRadius: '25px', 
                background: 'white', 
                cursor: 'pointer' 
              }}
            >
              <option value="">All Goals</option>
              <option value="social">Social Dancing</option>
              <option value="competition">Competition</option>
              <option value="performance">Performance</option>
              <option value="practice">Practice Partner</option>
              <option value="teaching">Teaching Partner</option>
            </select>
            
            <select 
              id="distanceFilter" 
              style={{ 
                padding: '10px 20px', 
                border: '2px solid var(--neutral-light)', 
                borderRadius: '25px', 
                background: 'white', 
                cursor: 'pointer' 
              }}
            >
              <option value="">Any Distance</option>
              <option value="5">Within 5 miles</option>
              <option value="10">Within 10 miles</option>
              <option value="25">Within 25 miles</option>
              <option value="50">Within 50 miles</option>
              <option value="online">Online/Virtual</option>
            </select>
          </div>
        </div>
        
        {/* Partner Results Grid */}
        <div 
          id="partnerResults" 
          className="partner-grid" 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '2rem', 
            marginTop: '3rem' 
          }}
        >
          {/* Partner Card 1 */}
          <div 
            className="partner-card reveal active" 
            style={{ 
              background: 'white', 
              borderRadius: '15px', 
              overflow: 'hidden', 
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)', 
              transition: 'all 0.3s', 
              cursor: 'pointer' 
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            }}
          >
            <div 
              style={{ 
                height: '200px', 
                background: "linear-gradient(135deg, rgba(212, 175, 55, 0.3), rgba(232, 180, 188, 0.3)), url('https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=400&auto=format&fit=crop') center/cover", 
                position: 'relative' 
              }}
            >
              <span 
                style={{ 
                  position: 'absolute', 
                  top: '10px', 
                  right: '10px', 
                  background: '#4CAF50', 
                  color: 'white', 
                  padding: '5px 10px', 
                  borderRadius: '20px', 
                  fontSize: '0.8rem' 
                }}
              >
                Available
              </span>
              <div 
                style={{ 
                  position: 'absolute', 
                  bottom: 0, 
                  left: 0, 
                  right: 0, 
                  padding: '1rem', 
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' 
                }}
              >
                <h3 style={{ color: 'white', margin: 0 }}>Sarah Mitchell</h3>
                <p 
                  style={{ 
                    color: 'rgba(255,255,255,0.8)', 
                    fontSize: '0.9rem', 
                    margin: '5px 0' 
                  }}
                >
                  📍 New York, NY • 2 miles away
                </p>
              </div>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div 
                style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '0.5rem', 
                  marginBottom: '1rem' 
                }}
              >
                <span 
                  style={{ 
                    background: 'var(--neutral-light)', 
                    padding: '5px 12px', 
                    borderRadius: '20px', 
                    fontSize: '0.85rem' 
                  }}
                >
                  Salsa
                </span>
                <span 
                  style={{ 
                    background: 'var(--neutral-light)', 
                    padding: '5px 12px', 
                    borderRadius: '20px', 
                    fontSize: '0.85rem' 
                  }}
                >
                  Bachata
                </span>
                <span 
                  style={{ 
                    background: 'var(--neutral-light)', 
                    padding: '5px 12px', 
                    borderRadius: '20px', 
                    fontSize: '0.85rem' 
                  }}
                >
                  Advanced
                </span>
              </div>
              <p 
                style={{ 
                  color: 'var(--neutral-gray)', 
                  fontSize: '0.95rem', 
                  marginBottom: '1rem' 
                }}
              >
                &quot;Looking for a dedicated partner for salsa socials and bachata performances. 5+ years experience.&quot;
              </p>
              <div 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center' 
                }}
              >
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--primary-gold)' }}>⭐⭐⭐⭐⭐</span>
                  <span style={{ color: 'var(--neutral-gray)', fontSize: '0.85rem' }}>(4.9)</span>
                </div>
                <button 
                  style={{ 
                    background: 'var(--primary-gold)', 
                    color: 'var(--white)', 
                    border: 'none', 
                    padding: '8px 20px', 
                    borderRadius: '20px', 
                    cursor: 'pointer', 
                    fontWeight: 600 
                  }}
                >
                  Connect
                </button>
              </div>
            </div>
          </div>
          
          {/* Partner Card 2 */}
          <div 
            className="partner-card reveal active" 
            style={{ 
              background: 'white', 
              borderRadius: '15px', 
              overflow: 'hidden', 
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)', 
              transition: 'all 0.3s', 
              cursor: 'pointer' 
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            }}
          >
            <div 
              style={{ 
                height: '200px', 
                background: "linear-gradient(135deg, rgba(212, 175, 55, 0.3), rgba(232, 180, 188, 0.3)), url('https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop') center/cover", 
                position: 'relative' 
              }}
            >
              <span 
                style={{ 
                  position: 'absolute', 
                  top: '10px', 
                  right: '10px', 
                  background: '#4CAF50', 
                  color: 'white', 
                  padding: '5px 10px', 
                  borderRadius: '20px', 
                  fontSize: '0.8rem' 
                }}
              >
                Available
              </span>
              <div 
                style={{ 
                  position: 'absolute', 
                  bottom: 0, 
                  left: 0, 
                  right: 0, 
                  padding: '1rem', 
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' 
                }}
              >
                <h3 style={{ color: 'white', margin: 0 }}>Michael Chen</h3>
                <p 
                  style={{ 
                    color: 'rgba(255,255,255,0.8)', 
                    fontSize: '0.9rem', 
                    margin: '5px 0' 
                  }}
                >
                  📍 Brooklyn, NY • 5 miles away
                </p>
              </div>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div 
                style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '0.5rem', 
                  marginBottom: '1rem' 
                }}
              >
                <span 
                  style={{ 
                    background: 'var(--neutral-light)', 
                    padding: '5px 12px', 
                    borderRadius: '20px', 
                    fontSize: '0.85rem' 
                  }}
                >
                  Bachata
                </span>
                <span 
                  style={{ 
                    background: 'var(--neutral-light)', 
                    padding: '5px 12px', 
                    borderRadius: '20px', 
                    fontSize: '0.85rem' 
                  }}
                >
                  Kizomba
                </span>
                <span 
                  style={{ 
                    background: 'var(--neutral-light)', 
                    padding: '5px 12px', 
                    borderRadius: '20px', 
                    fontSize: '0.85rem' 
                  }}
                >
                  Intermediate
                </span>
              </div>
              <p 
                style={{ 
                  color: 'var(--neutral-gray)', 
                  fontSize: '0.95rem', 
                  marginBottom: '1rem' 
                }}
              >
                &quot;Passionate about Bachata and Kizomba! Seeking partner for social events and practice sessions.&quot;
              </p>
              <div 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center' 
                }}
              >
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--primary-gold)' }}>⭐⭐⭐⭐⭐</span>
                  <span style={{ color: 'var(--neutral-gray)', fontSize: '0.85rem' }}>(4.8)</span>
                </div>
                <button 
                  style={{ 
                    background: 'var(--primary-gold)', 
                    color: 'var(--white)', 
                    border: 'none', 
                    padding: '8px 20px', 
                    borderRadius: '20px', 
                    cursor: 'pointer', 
                    fontWeight: 600 
                  }}
                >
                  Connect
                </button>
              </div>
            </div>
          </div>
          
          {/* Partner Card 3 */}
          <div 
            className="partner-card reveal active" 
            style={{ 
              background: 'white', 
              borderRadius: '15px', 
              overflow: 'hidden', 
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)', 
              transition: 'all 0.3s', 
              cursor: 'pointer' 
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            }}
          >
            <div 
              style={{ 
                height: '200px', 
                background: "linear-gradient(135deg, rgba(212, 175, 55, 0.3), rgba(232, 180, 188, 0.3)), url('https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400&auto=format&fit=crop') center/cover", 
                position: 'relative' 
              }}
            >
              <span 
                style={{ 
                  position: 'absolute', 
                  top: '10px', 
                  right: '10px', 
                  background: '#FF9800', 
                  color: 'white', 
                  padding: '5px 10px', 
                  borderRadius: '20px', 
                  fontSize: '0.8rem' 
                }}
              >
                Busy This Week
              </span>
              <div 
                style={{ 
                  position: 'absolute', 
                  bottom: 0, 
                  left: 0, 
                  right: 0, 
                  padding: '1rem', 
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' 
                }}
              >
                <h3 style={{ color: 'white', margin: 0 }}>Emma Rodriguez</h3>
                <p 
                  style={{ 
                    color: 'rgba(255,255,255,0.8)', 
                    fontSize: '0.9rem', 
                    margin: '5px 0' 
                  }}
                >
                  📍 Manhattan, NY • 3 miles away
                </p>
              </div>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div 
                style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '0.5rem', 
                  marginBottom: '1rem' 
                }}
              >
                <span 
                  style={{ 
                    background: 'var(--neutral-light)', 
                    padding: '5px 12px', 
                    borderRadius: '20px', 
                    fontSize: '0.85rem' 
                  }}
                >
                  Kizomba
                </span>
                <span 
                  style={{ 
                    background: 'var(--neutral-light)', 
                    padding: '5px 12px', 
                    borderRadius: '20px', 
                    fontSize: '0.85rem' 
                  }}
                >
                  Salsa
                </span>
                <span 
                  style={{ 
                    background: 'var(--neutral-light)', 
                    padding: '5px 12px', 
                    borderRadius: '20px', 
                    fontSize: '0.85rem' 
                  }}
                >
                  Professional
                </span>
              </div>
              <p 
                style={{ 
                  color: 'var(--neutral-gray)', 
                  fontSize: '0.95rem', 
                  marginBottom: '1rem' 
                }}
              >
                &quot;Professional Latin dancer specializing in Kizomba and Salsa. Festival and workshop experience.&quot;
              </p>
              <div 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center' 
                }}
              >
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--primary-gold)' }}>⭐⭐⭐⭐⭐</span>
                  <span style={{ color: 'var(--neutral-gray)', fontSize: '0.85rem' }}>(5.0)</span>
                </div>
                <button 
                  style={{ 
                    background: 'var(--primary-gold)', 
                    color: 'var(--white)', 
                    border: 'none', 
                    padding: '8px 20px', 
                    borderRadius: '20px', 
                    cursor: 'pointer', 
                    fontWeight: 600 
                  }}
                >
                  Connect
                </button>
              </div>
            </div>
          </div>
          
          {/* Partner Card 4 */}
          <div 
            className="partner-card reveal active" 
            style={{ 
              background: 'white', 
              borderRadius: '15px', 
              overflow: 'hidden', 
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)', 
              transition: 'all 0.3s', 
              cursor: 'pointer' 
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            }}
          >
            <div 
              style={{ 
                height: '200px', 
                background: "linear-gradient(135deg, rgba(212, 175, 55, 0.3), rgba(232, 180, 188, 0.3)), url('https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop') center/cover", 
                position: 'relative' 
              }}
            >
              <span 
                style={{ 
                  position: 'absolute', 
                  top: '10px', 
                  right: '10px', 
                  background: '#4CAF50', 
                  color: 'white', 
                  padding: '5px 10px', 
                  borderRadius: '20px', 
                  fontSize: '0.8rem' 
                }}
              >
                Available
              </span>
              <div 
                style={{ 
                  position: 'absolute', 
                  bottom: 0, 
                  left: 0, 
                  right: 0, 
                  padding: '1rem', 
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' 
                }}
              >
                <h3 style={{ color: 'white', margin: 0 }}>David Thompson</h3>
                <p 
                  style={{ 
                    color: 'rgba(255,255,255,0.8)', 
                    fontSize: '0.9rem', 
                    margin: '5px 0' 
                  }}
                >
                  📍 Queens, NY • 8 miles away
                </p>
              </div>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div 
                style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '0.5rem', 
                  marginBottom: '1rem' 
                }}
              >
                <span 
                  style={{ 
                    background: 'var(--neutral-light)', 
                    padding: '5px 12px', 
                    borderRadius: '20px', 
                    fontSize: '0.85rem' 
                  }}
                >
                  Salsa
                </span>
                <span 
                  style={{ 
                    background: 'var(--neutral-light)', 
                    padding: '5px 12px', 
                    borderRadius: '20px', 
                    fontSize: '0.85rem' 
                  }}
                >
                  Bachata
                </span>
                <span 
                  style={{ 
                    background: 'var(--neutral-light)', 
                    padding: '5px 12px', 
                    borderRadius: '20px', 
                    fontSize: '0.85rem' 
                  }}
                >
                  Beginner
                </span>
              </div>
              <p 
                style={{ 
                  color: 'var(--neutral-gray)', 
                  fontSize: '0.95rem', 
                  marginBottom: '1rem' 
                }}
              >
                &quot;New to Latin dancing, eager to learn Salsa and Bachata! Looking for patient partner for practice.&quot;
              </p>
              <div 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center' 
                }}
              >
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--primary-gold)' }}>⭐⭐⭐⭐</span>
                  <span style={{ color: 'var(--neutral-gray)', fontSize: '0.85rem' }}>(4.5)</span>
                </div>
                <button 
                  style={{ 
                    background: 'var(--primary-gold)', 
                    color: 'var(--white)', 
                    border: 'none', 
                    padding: '8px 20px', 
                    borderRadius: '20px', 
                    cursor: 'pointer', 
                    fontWeight: 600 
                  }}
                >
                  Connect
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Load More Button */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button 
            onClick={() => console.log('Load more partners')}
            style={{ 
              padding: '15px 40px', 
              background: 'transparent', 
              color: 'var(--primary-dark)', 
              border: '2px solid var(--primary-gold)', 
              borderRadius: '50px', 
              fontSize: '1rem', 
              fontWeight: 600, 
              cursor: 'pointer', 
              transition: 'all 0.3s' 
            }}
            onMouseOver={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.background = 'var(--primary-gold)';
              target.style.transform = 'translateY(-2px)';
              target.style.boxShadow = '0 10px 30px rgba(212,175,55,0.4)';
            }}
            onMouseOut={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.background = 'transparent';
              target.style.transform = 'translateY(0)';
              target.style.boxShadow = 'none';
            }}
          >
            Load More Partners
          </button>
        </div>
        
        {/* Statistics Section */}
        <div 
          style={{ 
            marginTop: '4rem', 
            padding: '3rem', 
            background: 'white', 
            borderRadius: '20px', 
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)' 
          }}
        >
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '2rem', 
              textAlign: 'center' 
            }}
          >
            <div>
              <div 
                style={{ 
                  fontSize: '3rem', 
                  fontWeight: 'bold', 
                  color: 'var(--primary-gold)', 
                  marginBottom: '0.5rem' 
                }}
              >
                500+
              </div>
              <div style={{ color: 'var(--neutral-gray)' }}>Active Dancers</div>
            </div>
            <div>
              <div 
                style={{ 
                  fontSize: '3rem', 
                  fontWeight: 'bold', 
                  color: 'var(--primary-gold)', 
                  marginBottom: '0.5rem' 
                }}
              >
                85%
              </div>
              <div style={{ color: 'var(--neutral-gray)' }}>Match Success Rate</div>
            </div>
            <div>
              <div 
                style={{ 
                  fontSize: '3rem', 
                  fontWeight: 'bold', 
                  color: 'var(--primary-gold)', 
                  marginBottom: '0.5rem' 
                }}
              >
                50+
              </div>
              <div style={{ color: 'var(--neutral-gray)' }}>Dance Styles</div>
            </div>
            <div>
              <div 
                style={{ 
                  fontSize: '3rem', 
                  fontWeight: 'bold', 
                  color: 'var(--primary-gold)', 
                  marginBottom: '0.5rem' 
                }}
              >
                24/7
              </div>
              <div style={{ color: 'var(--neutral-gray)' }}>Community Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
