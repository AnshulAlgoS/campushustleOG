import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-heading">🚀 Campus Hustle Features</h1>
      <p className="about-subheading">Explore our mission to empower student hustlers with powerful opportunities and tools.</p>

      <div className="feature-cards">
        <div className="feature-card">
          <img src="/images/freelance.jpg" alt="Student Freelancing" />
          <h3>Student Freelancing</h3>
          <p>Find or post freelance gigs to gain experience and earnings.</p>
        </div>
        <div className="feature-card">
          <img src="/images/peer.jpg" alt="Peer Collaboration" />
          <h3>Peer Collaboration</h3>
          <p>Connect with hustlers across colleges and build real teams.</p>
        </div>
        <div className="feature-card">
          <img src="/images/hackathon.jpg" alt="Hackathons & Events" />
          <h3>Hackathons & Events</h3>
          <p>Explore, register, and track top-tier student hackathons.</p>
        </div>
        <div className="feature-card">
          <img src="/images/scholarships.jpg" alt="Scholarships & Budgeting" />
          <h3>Scholarships & Budgeting</h3>
          <p>Discover scholarships and plan your finances smartly.</p>
        </div>
      </div>

      <p className="tagline">
        From college desks to dorm room dreams, Campus Hustle is more than it seems.<br />
        A space where passion meets the grind, innovation and teamwork, beautifully aligned.
      </p>

      <h2 className="dev-heading">💻 Meet the Developers</h2>
      <div className="dev-cards">
        {['Anshul Saxena', 'Gourika', 'Avanya', 'Mahira Khan'].map((name, index) => (
          <div className="dev-card" key={index}>
            <img src={`/images/dev${index + 1}.jpg`} alt={name} />
            <p>{name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;

