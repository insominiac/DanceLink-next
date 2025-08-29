export default function Instructors() {
  return (
    <section className="instructors" id="instructors">
      <div className="container">
        <div className="section-header reveal active">
          <h2 className="section-title">Instructors</h2>
          <p>World-class talent dedicated to your growth</p>
        </div>
        <div className="instructor-grid">
          <div className="instructor-card reveal active">
            <div 
              className="instructor-image" 
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=1887&auto=format&fit=crop')" 
              }}
            ></div>
            <h3 className="instructor-name">Alexandra Rose</h3>
            <p className="instructor-specialty">Ballet Master</p>
          </div>
          <div className="instructor-card reveal active">
            <div 
              className="instructor-image" 
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop')" 
              }}
            ></div>
            <h3 className="instructor-name">Marcus Chen</h3>
            <p className="instructor-specialty">Contemporary</p>
          </div>
          <div className="instructor-card reveal active">
            <div 
              className="instructor-image" 
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop')" 
              }}
            ></div>
            <h3 className="instructor-name">Sofia Martinez</h3>
            <p className="instructor-specialty">Latin &amp; Ballroom</p>
          </div>
          <div className="instructor-card reveal active">
            <div 
              className="instructor-image" 
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop')" 
              }}
            ></div>
            <h3 className="instructor-name">James Williams</h3>
            <p className="instructor-specialty">Jazz &amp; Hip Hop</p>
          </div>
        </div>
      </div>
    </section>
  );
}
