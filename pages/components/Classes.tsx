export default function Classes() {
  return (
    <section 
      className="classes" 
      id="classes" 
      style={{ position: 'relative' }}
    >
      {/* Decorative elements */}
      <div 
        style={{ 
          position: 'absolute', 
          top: '10%', 
          left: '5%', 
          width: '100px', 
          height: '100px', 
          opacity: 0.05, 
          background: 'radial-gradient(circle, var(--primary-gold), transparent)', 
          borderRadius: '50%', 
          animation: 'float 15s ease-in-out infinite' 
        }}
      ></div>
      <div 
        style={{ 
          position: 'absolute', 
          bottom: '10%', 
          right: '5%', 
          width: '150px', 
          height: '150px', 
          opacity: 0.05, 
          background: 'radial-gradient(circle, var(--accent-rose), transparent)', 
          borderRadius: '50%', 
          animation: 'float 20s ease-in-out infinite', 
          animationDelay: '5s' 
        }}
      ></div>
      
      <div className="container">
        <div className="section-header reveal active">
          <h2 className="section-title">Our Classes</h2>
          <p>From classical to contemporary, find your perfect rhythm</p>
        </div>
        <div className="class-grid">
          <div className="class-card reveal active">
            <div className="class-content">
              <h3 className="class-title">Salsa Fundamentals</h3>
              <p className="class-level">Beginner to Intermediate</p>
              <p className="class-description">Master the foundations of Salsa On1 and On2. Learn timing, footwork, turns, and partner connection.</p>
            </div>
          </div>
          <div className="class-card reveal active">
            <div className="class-content">
              <h3 className="class-title">Sensual Bachata</h3>
              <p className="class-level">All Levels</p>
              <p className="class-description">Explore body movement, waves, and the intimate connection that defines Sensual Bachata.</p>
            </div>
          </div>
          <div className="class-card reveal active">
            <div className="class-content">
              <h3 className="class-title">Kizomba &amp; Urban Kiz</h3>
              <p className="class-level">Beginner to Advanced</p>
              <p className="class-description">Discover the smooth, flowing movements of Kizomba and the dynamic style of Urban Kiz.</p>
            </div>
          </div>
          <div className="class-card reveal active">
            <div className="class-content">
              <h3 className="class-title">Cuban Salsa (Casino)</h3>
              <p className="class-level">All Levels</p>
              <p className="class-description">Learn the circular, energetic style of Cuban Salsa with its unique turns and Rueda de Casino.</p>
            </div>
          </div>
          <div className="class-card reveal active">
            <div className="class-content">
              <h3 className="class-title">Bachata Fusion</h3>
              <p className="class-level">Intermediate to Advanced</p>
              <p className="class-description">Combine traditional Dominican Bachata with modern Sensual and Urban elements.</p>
            </div>
          </div>
          <div className="class-card reveal active">
            <div className="class-content">
              <h3 className="class-title">Ladies &amp; Men&apos;s Styling</h3>
              <p className="class-level">Open Level</p>
              <p className="class-description">Perfect your individual style, body movement, and confidence in Salsa, Bachata, and Kizomba.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
