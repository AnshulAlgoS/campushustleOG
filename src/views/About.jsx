// src/views/About.jsx
import React from 'react';
import './About.css';

import bg from '../assets/images/background.jpg'; 
import anshul from '../assets/images/anshulsaxena.png';
import gourika from '../assets/images/gourika1.png';
import avanya from '../assets/images/avanya.png';
import mahira from '../assets/images/mahiraa.png';

import innovation from '../assets/images/innovation.png';
import community from '../assets/images/community.png';
import hackathons from '../assets/images/hackathons.png';
import scholarship from '../assets/images/scholarship.png';

const developers = [
  { name: 'Anshul Saxena', role: 'Full Stack Developer', img: anshul },
  { name: 'Gourika', role: 'Frontend & UI/UX Designer', img: gourika },
  { name: 'Avanya', role: 'Creative Director', img: avanya },
  { name: 'Mahira Khan', role: 'Content & Strategy', img: mahira }
];

const About = () => {
  return (
    <div>

      <section className="hero-section">
  <div className="hero-left">
    <h1 className="hero-heading">Campus Hustle</h1>
    <p className="hero-tagline">where hustlers hangout</p>
  </div>
  <div className="hero-right">
    <img src="/assets/images/your-image.png" alt="Campus Illustration" className="hero-image" />
  </div>
</section>



      {/* Features Section */}
      <section className="features-section">
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#222' }}> Our Features</h2>
        <div className="features-wrapper">
          <div className="feature-card">
            <img src={innovation} alt="Innovation" />
            <h3>Innovation First</h3>
            <p>Empowering students to build, break, and innovate with freedom and fire.</p>
          </div>
          <div className="feature-card">
            <img src={community} alt="Community" />
            <h3>Strong Community</h3>
            <p>Connect with like-minded hustlers across disciplines and campuses.</p>
          </div>
        </div>
        <div className="features-wrapper">
          <div className="feature-card">
            <img src={hackathons} alt="Hackathons" />
            <h3>Hackathons & More</h3>
            <p>Access the latest hackathons, coding challenges, and innovation events.</p>
          </div>
          <div className="feature-card">
            <img src={scholarship} alt="Scholarship" />
            <h3>Scholarships</h3>
            <p>Explore and apply to exclusive scholarships for student leaders.</p>
          </div>
        </div>
      </section>

      {/* Intro Paragraph */}
      <section className="intro">
        <p>
          From college desks to dorm room dreams, <br />
          Campus Hustle is more than it seems. <br />
          A space where passion meets the grind, <br />
          Innovation and teamwork, beautifully aligned.
        </p>
      </section>

      {/* Developer Section */}
      <section className="dev-section">
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Meet the Developers</h2>
        <div className="dev-grid">
          {developers.map((dev, index) => (
            <div className="dev-card" key={index}>
              <img src={dev.img} alt={dev.name} className="dev-img" />
              <h3 className="dev-name">{dev.name}</h3>
              <p className="dev-role">{dev.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission">
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Our Mission</h2>
        <p>
          We’re passionate about building something bigger than ourselves.
          Campus Hustle isn’t just a platform — it’s our shared dream to create a space where
          students, developers, and creatives connect, grow, and hustle together.
          With every line of code and every idea shared, we move one step closer
          to a more empowered campus culture.
        </p>
      </section>

    </div>
  );
};

export default About;
