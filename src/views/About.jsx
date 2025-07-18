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
  { name: 'Anshul Saxena', role: 'Tech Lead & Product Architect', img: anshul },
  { name: 'Gourika', role: 'Content Strategist & Frontend Developer', img: gourika },
  { name: 'Avanya', role: 'Frontend Developer & Creative Assistant', img: avanya },
  { name: 'Mahira Khan', role: 'Product Design Engineer', img: mahira },
];

const features = [
  { img: innovation, title: 'Innovation First', desc: 'Empowering students to build, break, and innovate with fire.' },
  { img: community, title: 'Strong Community', desc: 'Connect with like-minded hustlers across disciplines and campuses.' },
  { img: hackathons, title: 'Hackathons & More', desc: 'Access the latest hackathons, challenges, and events.' },
  { img: scholarship, title: 'Scholarships', desc: 'Apply to exclusive scholarships for student leaders.' },
];

const About = () => {
  return (
    <div className="about-container">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg-glow"></div>
        <div className="hero-content">
          <h1>Campus Hustle</h1>
          <p className="tagline">where hustlers hangout</p>
        </div>
      </section>



      {/* Features */}
      <section className="features">
        <h2>Our Features</h2>
        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <img src={f.img} alt={f.title} />
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Intro */}
      <section className="intro">
        <p>
          From college desks to dorm room dreams, <br />
          Campus Hustle is more than it seems. <br />
          A space where passion meets the grind, <br />
          Innovation and teamwork, beautifully aligned.
        </p>
      </section>

      {/* Developers */}
      <section className="developers">
        <h2>Meet the Developers</h2>
        <div className="dev-grid">
          {developers.map((dev, idx) => (
            <div className="dev-card" key={idx}>
              <img src={dev.img} alt={dev.name} />
              <h3>{dev.name}</h3>
              <p>{dev.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          Campus Hustle isn’t just a platform ,it’s a shared dream to create a space where
          students, developers, and creatives connect, grow, and hustle together.
          Every line of code brings us closer to an empowered campus culture.
        </p>
      </section>
    </div>
  );
};

export default About;
