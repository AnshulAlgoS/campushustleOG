// src/views/About.jsx
import React from 'react';
import './About.css'; // ✅ Import CSS

import bg from '../assets/images/background.jpg'; // Just to ensure Webpack tracks it
import anshul from '../assets/images/anshulsaxena.png';
import gourika from '../assets/images/gourika1.png';
import avanya from '../assets/images/avanya.png';
import mahira from '../assets/images/mahiraa.png';

const developers = [
  { name: 'Anshul Saxena', role: 'Full Stack Developer', img: anshul },
  { name: 'Gourika', role: 'Frontend & UI/UX Designer', img: gourika },
  { name: 'Avanya', role: 'Creative Director', img: avanya },
  { name: 'Mahira Khan', role: 'Content & Strategy', img: mahira }
];

const About = () => {
  return (
    <div>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-title">Campus Hustle</h1>
          <p className="hero-tagline">where hustlers hangout</p>
        </div>
      </div>

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
