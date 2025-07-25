import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-wrapper">
      <h1 className="main-title">Campus Hustle</h1>
      <p className="tagline">where hustlers hangout</p>

      {/* Features Section */}
      <section className="features">
        <h2>🚀 Campus Hustle Features</h2>
        <p className="section-subtext">
          Explore our mission to empower student hustlers with powerful opportunities and tools.
        </p>
        <div className="feature-grid">
          <div className="feature-box">
            <img src="/images/freelance.png" alt="Student Freelancing" />
            <h3>👨‍💻 <strong>Student Freelancing</strong></h3>
            <p>Find or post freelance gigs to gain experience and earnings.</p>
          </div>
          <div className="feature-box">
            <img src="/images/community.png" alt="Peer Collaboration" />
            <h3>🤝 <strong>Peer Collaboration</strong></h3>
            <p>Connect with hustlers across colleges and build real teams.</p>
          </div>
          <div className="feature-box">
            <img src="/images/hackathons.png" alt="Hackathons & Events" />
            <h3>🏆 <strong>Hackathons & Events</strong></h3>
            <p>Explore, register, and track top-tier student hackathons.</p>
          </div>
          <div className="feature-box">
            <img src="/images/innovation.png" alt="Scholarships & Budgeting" />
            <h3>🎓 <strong>Scholarships & Budgeting</strong></h3>
            <p>Discover scholarships and plan your finances smartly.</p>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="core">
        <h2>🛠️ Core Platform Features</h2>
        <ul>
          <li><strong>Smart Matching:</strong> Personalized suggestions for events and scholarships.</li>
          <li><strong>Verified Gigs:</strong> Safe freelance listings from trusted students & orgs.</li>
          <li><strong>Collaboration Tools:</strong> Chat, file-sharing, and team creation.</li>
          <li><strong>Finance Planning:</strong> Budget tracker and scholarship reminders.</li>
        </ul>
      </section>

      {/* Applications */}
      <section className="applications">
        <h2>🎯 Real-World Applications</h2>
        <p>
          Campus Hustle boosts student productivity, builds real-world portfolios, and connects you to opportunities that shape your future — all in one place.
        </p>
      </section>

      {/* Quote Section */}
      <p className="bottom-quote">
        From college desks to dorm room dreams,<br />
        Campus Hustle is more than it seems.<br />
        A space where passion meets the grind,<br />
        Innovation and teamwork, beautifully aligned.
      </p>

      {/* Developers Section */}
      <section className="devs">
        <h2>💻 Meet the Developers</h2>
        <div className="dev-grid">
          <div className="dev-card">
            <img src="/images/anshulsaxena.png" alt="Anshul Saxena" />
            <p>Anshul Saxena</p>
          </div>
          <div className="dev-card">
            <img src="/images/gourika.png" alt="Gourika" />
            <p>Gourika</p>
          </div>
          <div className="dev-card">
            <img src="/images/avanya.png" alt="Avanya" />
            <p>Avanya</p>
          </div>
          <div className="dev-card">
            <img src="/images/mahiraa.png" alt="Mahira Khan" />
            <p>Mahira Khan</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
