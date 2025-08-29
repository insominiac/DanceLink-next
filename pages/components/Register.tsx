export default function Register() {
  return (
    <section 
      id="register" 
      style={{ 
        padding: '80px 0', 
        background: 'linear-gradient(135deg, var(--primary-dark), rgba(26, 15, 31, 0.95))' 
      }}
    >
      <div className="container">
        <div className="section-header reveal active">
          <h2 className="section-title" style={{ color: 'var(--white)' }}>
            Join DanceLink Today
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)' }}>
            Create your profile and connect with dancers worldwide
          </p>
        </div>
        <div 
          style={{ maxWidth: '500px', margin: '0 auto' }} 
          className="reveal active"
        >
          <form 
            style={{ 
              background: 'rgba(255,255,255,0.1)', 
              backdropFilter: 'blur(10px)', 
              padding: '2rem', 
              borderRadius: '20px', 
              border: '1px solid rgba(255,255,255,0.2)' 
            }}
          >
            <div style={{ marginBottom: '1.5rem' }}>
              <input 
                type="text" 
                placeholder="Full Name" 
                style={{ 
                  width: '100%', 
                  padding: '15px', 
                  background: 'rgba(255,255,255,0.1)', 
                  border: '1px solid rgba(255,255,255,0.3)', 
                  borderRadius: '10px', 
                  color: 'white' 
                }} 
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <input 
                type="email" 
                placeholder="Email Address" 
                style={{ 
                  width: '100%', 
                  padding: '15px', 
                  background: 'rgba(255,255,255,0.1)', 
                  border: '1px solid rgba(255,255,255,0.3)', 
                  borderRadius: '10px', 
                  color: 'white' 
                }} 
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <input 
                type="password" 
                placeholder="Create Password" 
                style={{ 
                  width: '100%', 
                  padding: '15px', 
                  background: 'rgba(255,255,255,0.1)', 
                  border: '1px solid rgba(255,255,255,0.3)', 
                  borderRadius: '10px', 
                  color: 'white' 
                }} 
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <select 
                style={{ 
                  width: '100%', 
                  padding: '15px', 
                  background: 'rgba(255,255,255,0.1)', 
                  border: '1px solid rgba(255,255,255,0.3)', 
                  borderRadius: '10px', 
                  color: 'white' 
                }}
              >
                <option value="" style={{ background: 'var(--primary-dark)' }}>
                  Select Your Main Dance Style
                </option>
                <option value="ballet" style={{ background: 'var(--primary-dark)' }}>
                  Ballet
                </option>
                <option value="contemporary" style={{ background: 'var(--primary-dark)' }}>
                  Contemporary
                </option>
                <option value="latin" style={{ background: 'var(--primary-dark)' }}>
                  Latin &amp; Ballroom
                </option>
                <option value="hiphop" style={{ background: 'var(--primary-dark)' }}>
                  Hip Hop
                </option>
                <option value="jazz" style={{ background: 'var(--primary-dark)' }}>
                  Jazz
                </option>
              </select>
            </div>
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ 
                width: '100%', 
                padding: '15px', 
                color: 'var(--white)' 
              }}
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
