export default function Events() {
  return (
    <section 
      id="events" 
      style={{ padding: '80px 0', background: 'var(--white)' }}
    >
      <div className="container">
        <div className="section-header reveal active">
          <h2 className="section-title">Events</h2>
          <p>Connect with dancers who match your style, level, and passion</p>
        </div>
        
        {/* Events Filter Container */}
        <div 
          className="events-filter-container reveal active" 
          style={{ 
            maxWidth: '1000px', 
            margin: '0 auto 3rem', 
            background: 'linear-gradient(135deg, var(--neutral-light), rgba(255,255,255,0.9))', 
            padding: '2rem', 
            borderRadius: '20px', 
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)' 
          }}
        >
          <h3 style={{ color: 'var(--primary-dark)', marginBottom: '1.5rem', textAlign: 'center' }}>
            🎯 Filter Events
          </h3>
          
          {/* Main Search Bar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
            <input 
              type="text" 
              id="eventSearch" 
              placeholder="🔍 Search events by name, venue, or organizer..." 
              style={{ 
                flex: 1, 
                minWidth: '250px', 
                padding: '15px 20px', 
                border: '2px solid var(--neutral-light)', 
                borderRadius: '50px', 
                fontSize: '1rem', 
                background: 'white', 
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
              onClick={() => console.log('Search events')}
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
              Search Events
            </button>
          </div>
          
          {/* Filter Options Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            {/* Event Type Filter */}
            <div>
              <label style={{ display: 'block', color: 'var(--primary-dark)', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                Event Type
              </label>
              <select 
                id="eventTypeFilter" 
                style={{ 
                  width: '100%', 
                  padding: '12px 15px', 
                  border: '2px solid var(--neutral-light)', 
                  borderRadius: '10px', 
                  background: 'white', 
                  cursor: 'pointer', 
                  transition: 'all 0.3s' 
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--primary-gold)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--neutral-light)';
                }}
              >
                <option value="">All Events</option>
                <option value="workshop">Workshops &amp; Classes</option>
                <option value="competition">Competitions</option>
                <option value="social">Social Dances</option>
                <option value="performance">Performances</option>
                <option value="festival">Dance Festivals</option>
                <option value="bootcamp">Intensive Bootcamps</option>
                <option value="showcase">Student Showcases</option>
              </select>
            </div>
            
            {/* Date Range Filter */}
            <div>
              <label style={{ display: 'block', color: 'var(--primary-dark)', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                Date Range
              </label>
              <select 
                id="dateRangeFilter" 
                style={{ 
                  width: '100%', 
                  padding: '12px 15px', 
                  border: '2px solid var(--neutral-light)', 
                  borderRadius: '10px', 
                  background: 'white', 
                  cursor: 'pointer', 
                  transition: 'all 0.3s' 
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--primary-gold)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--neutral-light)';
                }}
              >
                <option value="">Any Time</option>
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow</option>
                <option value="week">This Week</option>
                <option value="weekend">This Weekend</option>
                <option value="month">This Month</option>
                <option value="3months">Next 3 Months</option>
                <option value="custom">Custom Date</option>
              </select>
            </div>
            
            {/* Location Filter */}
            <div>
              <label style={{ display: 'block', color: 'var(--primary-dark)', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                Location
              </label>
              <select 
                id="locationFilter" 
                style={{ 
                  width: '100%', 
                  padding: '12px 15px', 
                  border: '2px solid var(--neutral-light)', 
                  borderRadius: '10px', 
                  background: 'white', 
                  cursor: 'pointer', 
                  transition: 'all 0.3s' 
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--primary-gold)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--neutral-light)';
                }}
              >
                <option value="">All Locations</option>
                <option value="5">Within 5 miles</option>
                <option value="10">Within 10 miles</option>
                <option value="25">Within 25 miles</option>
                <option value="50">Within 50 miles</option>
                <option value="100">Within 100 miles</option>
                <option value="online">Online Events</option>
                <option value="hybrid">Hybrid (Online + In-person)</option>
              </select>
            </div>
            
            {/* Dance Style Filter */}
            <div>
              <label style={{ display: 'block', color: 'var(--primary-dark)', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                Dance Style
              </label>
              <select 
                id="danceStyleFilter" 
                style={{ 
                  width: '100%', 
                  padding: '12px 15px', 
                  border: '2px solid var(--neutral-light)', 
                  borderRadius: '10px', 
                  background: 'white', 
                  cursor: 'pointer', 
                  transition: 'all 0.3s' 
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--primary-gold)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--neutral-light)';
                }}
              >
                <option value="">All Styles</option>
                <option value="salsa">Salsa</option>
                <option value="bachata">Bachata</option>
                <option value="kizomba">Kizomba</option>
                <option value="salsa-on2">Salsa On2</option>
                <option value="cuban-salsa">Cuban Salsa</option>
                <option value="sensual-bachata">Sensual Bachata</option>
                <option value="dominican-bachata">Dominican Bachata</option>
                <option value="urban-kiz">Urban Kiz</option>
                <option value="semba">Semba</option>
                <option value="cha-cha">Cha Cha</option>
              </select>
            </div>
          </div>
          
          {/* Additional Filters */}
          <div style={{ borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
              {/* Price Range */}
              <div style={{ flex: 1, minWidth: '200px' }}>
                <label style={{ display: 'block', color: 'var(--primary-dark)', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                  Price Range
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <input 
                    type="number" 
                    id="minPrice" 
                    placeholder="Min $" 
                    style={{ width: '100px', padding: '8px', border: '2px solid var(--neutral-light)', borderRadius: '8px' }}
                  />
                  <span>-</span>
                  <input 
                    type="number" 
                    id="maxPrice" 
                    placeholder="Max $" 
                    style={{ width: '100px', padding: '8px', border: '2px solid var(--neutral-light)', borderRadius: '8px' }}
                  />
                </div>
              </div>
              
              {/* Level Filter */}
              <div style={{ flex: 1, minWidth: '200px' }}>
                <label style={{ display: 'block', color: 'var(--primary-dark)', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                  Skill Level
                </label>
                <select 
                  id="levelFilter" 
                  style={{ 
                    width: '100%', 
                    padding: '10px 15px', 
                    border: '2px solid var(--neutral-light)', 
                    borderRadius: '10px', 
                    background: 'white', 
                    cursor: 'pointer' 
                  }}
                >
                  <option value="">All Levels</option>
                  <option value="beginner">Beginner Friendly</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="professional">Professional</option>
                  <option value="open">Open Level</option>
                </select>
              </div>
              
              {/* Quick Filter Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                <button 
                  onClick={() => console.log('Filter free events')}
                  style={{ 
                    padding: '8px 16px', 
                    background: 'var(--accent-rose)', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '20px', 
                    cursor: 'pointer', 
                    fontSize: '0.9rem', 
                    transition: 'all 0.3s' 
                  }}
                  onMouseOver={(e) => {
                    const target = e.target as HTMLButtonElement;
                    target.style.transform = 'scale(1.05)';
                    target.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
                  }}
                  onMouseOut={(e) => {
                    const target = e.target as HTMLButtonElement;
                    target.style.transform = 'scale(1)';
                    target.style.boxShadow = 'none';
                  }}
                >
                  Free Events
                </button>
                <button 
                  onClick={() => console.log('Filter today events')}
                  style={{ 
                    padding: '8px 16px', 
                    background: 'var(--primary-gold)', 
                    color: 'var(--primary-dark)', 
                    border: 'none', 
                    borderRadius: '20px', 
                    cursor: 'pointer', 
                    fontSize: '0.9rem', 
                    transition: 'all 0.3s' 
                  }}
                  onMouseOver={(e) => {
                    const target = e.target as HTMLButtonElement;
                    target.style.transform = 'scale(1.05)';
                    target.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
                  }}
                  onMouseOut={(e) => {
                    const target = e.target as HTMLButtonElement;
                    target.style.transform = 'scale(1)';
                    target.style.boxShadow = 'none';
                  }}
                >
                  Today Only
                </button>
                <button 
                  onClick={() => console.log('Filter weekend events')}
                  style={{ 
                    padding: '8px 16px', 
                    background: 'linear-gradient(135deg, var(--logo-gradient-1), var(--logo-gradient-2))', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '20px', 
                    cursor: 'pointer', 
                    fontSize: '0.9rem', 
                    transition: 'all 0.3s' 
                  }}
                  onMouseOver={(e) => {
                    const target = e.target as HTMLButtonElement;
                    target.style.transform = 'scale(1.05)';
                    target.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
                  }}
                  onMouseOut={(e) => {
                    const target = e.target as HTMLButtonElement;
                    target.style.transform = 'scale(1)';
                    target.style.boxShadow = 'none';
                  }}
                >
                  Weekend
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Events Results Grid */}
        <div 
          id="eventsResults" 
          className="events-grid reveal active" 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
            gap: '2rem', 
            marginTop: '3rem' 
          }}
        >
          {/* Sample Event Card 1 */}
          <div 
            className="event-card" 
            style={{ 
              background: 'white', 
              borderRadius: '15px', 
              overflow: 'hidden', 
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)', 
              transition: 'all 0.3s', 
              cursor: 'pointer' 
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            }}
          >
            <div 
              style={{ 
                height: '200px', 
                background: "linear-gradient(135deg, rgba(212, 175, 55, 0.8), rgba(232, 180, 188, 0.8)), url('https://images.unsplash.com/photo-1504609813442-a8924e83f76e?q=80&w=600&auto=format&fit=crop') center/cover", 
                position: 'relative' 
              }}
            >
              <span 
                style={{ 
                  position: 'absolute', 
                  top: '10px', 
                  left: '10px', 
                  background: 'var(--accent-rose)', 
                  color: 'white', 
                  padding: '5px 12px', 
                  borderRadius: '20px', 
                  fontSize: '0.8rem', 
                  fontWeight: 600 
                }}
              >
                Workshop
              </span>
              <span 
                style={{ 
                  position: 'absolute', 
                  top: '10px', 
                  right: '10px', 
                  background: 'rgba(255,255,255,0.9)', 
                  color: 'var(--primary-dark)', 
                  padding: '5px 12px', 
                  borderRadius: '20px', 
                  fontSize: '0.8rem', 
                  fontWeight: 600 
                }}
              >
                $45
              </span>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <h3 style={{ color: 'var(--primary-dark)', margin: 0, fontSize: '1.2rem' }}>Sensual Bachata Intensive</h3>
                <span style={{ color: 'var(--primary-gold)', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>★ 4.8</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem', color: 'var(--neutral-gray)', fontSize: '0.9rem' }}>
                <span>📅 Dec 15, 2024</span>
                <span>⏰ 2:00 PM - 5:00 PM</span>
              </div>
              <p style={{ color: 'var(--neutral-gray)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.5 }}>
                Master body waves, isolations, and connection in this intensive Sensual Bachata workshop with world champion Carlos &amp; Maria.
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--neutral-gray)', fontSize: '0.85rem' }}>📍 Dance Studio NYC</span>
                <button 
                  style={{ 
                    background: 'var(--primary-gold)', 
                    color: 'var(--white)', 
                    border: 'none', 
                    padding: '8px 20px', 
                    borderRadius: '20px', 
                    cursor: 'pointer', 
                    fontWeight: 600, 
                    fontSize: '0.9rem' 
                  }}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
          
          {/* Sample Event Card 2 */}
          <div 
            className="event-card" 
            style={{ 
              background: 'white', 
              borderRadius: '15px', 
              overflow: 'hidden', 
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)', 
              transition: 'all 0.3s', 
              cursor: 'pointer' 
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            }}
          >
            <div 
              style={{ 
                height: '200px', 
                background: "linear-gradient(135deg, rgba(78, 205, 196, 0.8), rgba(168, 85, 247, 0.8)), url('https://images.unsplash.com/photo-1535525153412-5a42439a210d?q=80&w=600&auto=format&fit=crop') center/cover", 
                position: 'relative' 
              }}
            >
              <span 
                style={{ 
                  position: 'absolute', 
                  top: '10px', 
                  left: '10px', 
                  background: '#4CAF50', 
                  color: 'white', 
                  padding: '5px 12px', 
                  borderRadius: '20px', 
                  fontSize: '0.8rem', 
                  fontWeight: 600 
                }}
              >
                Competition
              </span>
              <span 
                style={{ 
                  position: 'absolute', 
                  top: '10px', 
                  right: '10px', 
                  background: 'rgba(255,255,255,0.9)', 
                  color: 'var(--primary-dark)', 
                  padding: '5px 12px', 
                  borderRadius: '20px', 
                  fontSize: '0.8rem', 
                  fontWeight: 600 
                }}
              >
                $125
              </span>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <h3 style={{ color: 'var(--primary-dark)', margin: 0, fontSize: '1.2rem' }}>International Salsa &amp; Bachata Congress</h3>
                <span style={{ color: 'var(--primary-gold)', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>★ 5.0</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem', color: 'var(--neutral-gray)', fontSize: '0.9rem' }}>
                <span>📅 Jan 20-21, 2025</span>
                <span>⏰ All Day Event</span>
              </div>
              <p style={{ color: 'var(--neutral-gray)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.5 }}>
                Two days of workshops, shows, and social dancing with international artists. Salsa, Bachata, and Kizomba rooms all night!
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--neutral-gray)', fontSize: '0.85rem' }}>📍 Grand Ballroom Hotel</span>
                <button 
                  style={{ 
                    background: 'var(--primary-gold)', 
                    color: 'var(--white)', 
                    border: 'none', 
                    padding: '8px 20px', 
                    borderRadius: '20px', 
                    cursor: 'pointer', 
                    fontWeight: 600, 
                    fontSize: '0.9rem' 
                  }}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
          
          {/* Sample Event Card 3 */}
          <div 
            className="event-card" 
            style={{ 
              background: 'white', 
              borderRadius: '15px', 
              overflow: 'hidden', 
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)', 
              transition: 'all 0.3s', 
              cursor: 'pointer' 
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            }}
          >
            <div 
              style={{ 
                height: '200px', 
                background: "linear-gradient(135deg, rgba(255, 107, 107, 0.8), rgba(255, 215, 0, 0.8)), url('https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?q=80&w=600&auto=format&fit=crop') center/cover", 
                position: 'relative' 
              }}
            >
              <span 
                style={{ 
                  position: 'absolute', 
                  top: '10px', 
                  left: '10px', 
                  background: '#FF6B6B', 
                  color: 'white', 
                  padding: '5px 12px', 
                  borderRadius: '20px', 
                  fontSize: '0.8rem', 
                  fontWeight: 600 
                }}
              >
                Social Dance
              </span>
              <span 
                style={{ 
                  position: 'absolute', 
                  top: '10px', 
                  right: '10px', 
                  background: '#4CAF50', 
                  color: 'white', 
                  padding: '5px 12px', 
                  borderRadius: '20px', 
                  fontSize: '0.8rem', 
                  fontWeight: 600 
                }}
              >
                FREE
              </span>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <h3 style={{ color: 'var(--primary-dark)', margin: 0, fontSize: '1.2rem' }}>Latin Fridays: Salsa, Bachata &amp; Kizomba</h3>
                <span style={{ color: 'var(--primary-gold)', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>★ 4.9</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem', color: 'var(--neutral-gray)', fontSize: '0.9rem' }}>
                <span>📅 Every Friday</span>
                <span>⏰ 8:00 PM - 2:00 AM</span>
              </div>
              <p style={{ color: 'var(--neutral-gray)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.5 }}>
                Three rooms: Salsa, Bachata, and Kizomba! Free intro lessons at 8 PM. DJ performances and live bands. All levels welcome!
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--neutral-gray)', fontSize: '0.85rem' }}>📍 Latin Dance Club</span>
                <button 
                  style={{ 
                    background: 'var(--primary-gold)', 
                    color: 'var(--white)', 
                    border: 'none', 
                    padding: '8px 20px', 
                    borderRadius: '20px', 
                    cursor: 'pointer', 
                    fontWeight: 600, 
                    fontSize: '0.9rem' 
                  }}
                >
                  RSVP
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Load More Events Button */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button 
            onClick={() => console.log('Load more events')}
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
            Show More Events
          </button>
        </div>
      </div>
    </section>
  );
}
