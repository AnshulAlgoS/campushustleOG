import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-wrapper">
      <h1 className="main-title">Campus Hustle</h1>
      <p className="tagline">where hustlers hangout</p>

      {/* Features Section */}
      <section className="features">
        <h2>🌟 Our Core Features</h2>
        <div className="feature-grid">
          <div className="feature-box">
            <img src="/images/freelance.png" alt="Student Freelancing" />
            <h3>Student Freelancing</h3>
            <p>Find or post freelance gigs to gain experience and earnings.</p>
          </div>
          <div className="feature-box">
            <img src="/images/community.png" alt="Peer Collaboration" />
            <h3>Peer Collaboration</h3>
            <p>Connect with hustlers across colleges and build real teams.</p>
          </div>
          <div className="feature-box">
            <img src="/images/hackathons.png" alt="Hackathons & Events" />
            <h3>Hackathons & Events</h3>
            <p>Explore, register, and track top-tier student hackathons.</p>
          </div>
          <div className="feature-box">
            <img src="/images/innovation.png" alt="Scholarships & Budgeting" />
            <h3>Scholarships & Budgeting</h3>
            <p>Discover scholarships and plan your finances smartly.</p>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="core">
        <h2>🛠️ Core Features</h2>
        <ul>
          <li><strong>Smart Matching:</strong> Intelligent event and opportunity suggestions for each user.</li>
          <li><strong>Verified Gigs:</strong> Safe and real freelance listings by trusted users.</li>
          <li><strong>Collaboration Tools:</strong> Chat, group creation, and file sharing in one place.</li>
          <li><strong>Finance Planning:</strong> Built-in budget planner and scholarship reminders.</li>
        </ul>
      </section>

      {/* Applications Section */}
      <section className="applications">
        <h2>🎯 Applications</h2>
        <p>
          Campus Hustle boosts student productivity, helps manage finances, and connects students to real-world
          career-building tools — all in one student-first platform.
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
