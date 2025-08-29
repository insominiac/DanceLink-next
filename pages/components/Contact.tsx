export default function Contact() {
  return (
    <section 
      className="contact" 
      id="contact" 
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Decorative background pattern */}
      <div 
        style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: '600px', 
          height: '600px', 
          opacity: 0.03 
        }}
      >
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <pattern id="contactPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="2" fill="white" opacity="0.5"></circle>
            <path d="M 5,5 L 15,15 M 15,5 L 5,15" stroke="white" strokeWidth="0.5" opacity="0.3"></path>
          </pattern>
          <rect width="100" height="100" fill="url(#contactPattern)"></rect>
        </svg>
      </div>
      <div className="container">
        <div className="section-header reveal active">
          <h2 className="section-title">Begin Your Journey</h2>
          <p>Take the first step towards mastering the art of dance</p>
        </div>
        <div className="contact-content">
          <form className="contact-form reveal">
            <div className="form-group">
              <input type="text" className="form-input" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" className="form-input" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <input type="tel" className="form-input" placeholder="Phone Number" />
            </div>
            <div className="form-group">
              <textarea className="form-input form-textarea" placeholder="Tell us about your dance goals..."></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ color: '#fff' }}>Send Message</button>
          </form>
          <div className="contact-info reveal">
            <div className="info-item">
              <div className="info-icon">⚐</div>
              <div>
                <h4>Visit Our Studio</h4>
                <p>123 Dance Avenue, Arts District<br />New York, NY 10001</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">✉</div>
              <div>
                <h4>Get in Touch</h4>
                <p>hello@eleganceinmotion.com<br />+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">◷</div>
              <div>
                <h4>Studio Hours</h4>
                <p>Monday - Friday: 9am - 9pm<br />Saturday - Sunday: 10am - 6pm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
