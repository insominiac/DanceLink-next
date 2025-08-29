export default function About() {
  return (
    <section 
      className="about" 
      id="about" 
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Background decoration */}
      <div 
        style={{ 
          position: 'absolute', 
          top: 0, 
          right: 0, 
          width: '300px', 
          height: '300px', 
          opacity: 0.1, 
          background: "url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=500&auto=format&fit=crop') center/cover", 
          borderRadius: '50%', 
          transform: 'translate(50%, -50%)' 
        }}
      ></div>
      <div 
        style={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          width: '250px', 
          height: '250px', 
          opacity: 0.1, 
          background: "url('https://images.unsplash.com/photo-1495791185843-c73f2269f669?q=80&w=500&auto=format&fit=crop') center/cover", 
          borderRadius: '50%', 
          transform: 'translate(-50%, 50%)' 
        }}
      ></div>
      
      <div className="container">
        <div className="section-header reveal active">
          <h2 className="section-title">Our Philosophy</h2>
          <p>Dance is not just movement, it&apos;s a language of the soul</p>
        </div>
        <div className="about-grid">
          <div className="about-card reveal active" style={{ position: 'relative', overflow: 'hidden' }}>
            <div 
              style={{ 
                position: 'absolute', 
                top: 0, 
                right: 0, 
                width: '80px', 
                height: '80px', 
                opacity: 0.05, 
                background: "url('https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?q=80&w=300&auto=format&fit=crop') center/cover", 
                borderRadius: '0 10px 0 50%' 
              }}
            ></div>
            <div className="about-icon">◈</div>
            <h3 className="about-title">Professional Excellence</h3>
            <p>Learn from internationally acclaimed instructors with decades of experience in their craft.</p>
          </div>
          <div className="about-card reveal active" style={{ position: 'relative', overflow: 'hidden' }}>
            <div 
              style={{ 
                position: 'absolute', 
                top: 0, 
                right: 0, 
                width: '80px', 
                height: '80px', 
                opacity: 0.05, 
                background: "url('https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=300&auto=format&fit=crop') center/cover", 
                borderRadius: '0 10px 0 50%' 
              }}
            ></div>
            <div className="about-icon">◆</div>
            <h3 className="about-title">Personalized Journey</h3>
            <p>Every dancer is unique. We tailor our approach to match your goals and abilities.</p>
          </div>
          <div className="about-card reveal active" style={{ position: 'relative', overflow: 'hidden' }}>
            <div 
              style={{ 
                position: 'absolute', 
                top: 0, 
                right: 0, 
                width: '80px', 
                height: '80px', 
                opacity: 0.05, 
                background: "url('https://images.unsplash.com/photo-1524863479829-916d8e77f114?q=80&w=300&auto=format&fit=crop') center/cover", 
                borderRadius: '0 10px 0 50%' 
              }}
            ></div>
            <div className="about-icon">◇</div>
            <h3 className="about-title">Holistic Development</h3>
            <p>Beyond technique, we nurture creativity, confidence, and artistic expression.</p>
          </div>
          <div className="about-card reveal active" style={{ position: 'relative', overflow: 'hidden' }}>
            <div 
              style={{ 
                position: 'absolute', 
                top: 0, 
                right: 0, 
                width: '80px', 
                height: '80px', 
                opacity: 0.05, 
                background: "url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=300&auto=format&fit=crop') center/cover", 
                borderRadius: '0 10px 0 50%' 
              }}
            ></div>
            <div className="about-icon">◊</div>
            <h3 className="about-title">Community Spirit</h3>
            <p>Join a supportive community of passionate dancers who inspire and grow together.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
