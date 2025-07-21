// src/views/About.jsx
import React from 'react';
import './About.css';
import { motion } from 'framer-motion';

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
  { name: 'Mahira Khan', role: 'Frontend Engineering Lead', img: mahira, zoom: true },
  { name: 'Gourika', role: 'Content Strategist & Frontend Developer', img: gourika },
  { name: 'Avanya', role: 'Frontend Developer & Creative Assistant', img: avanya },
  { name: 'Anshul Saxena', role: 'Tech Lead & Product Architect', img: anshul, zoom: true },
];


const features = [
  { img: innovation, title: 'Student Freelancing', desc: 'Find or post real freelance gigs to gain experience and earnings.' },
  { img: community, title: 'Peer Collaboration', desc: 'Connect with student hustlers across colleges and build real teams.' },
  { img: hackathons, title: 'Hackathons & Events', desc: 'Explore, register, and track top-tier student hackathons.' },
  { img: scholarship, title: 'Scholarships & Budgeting', desc: 'Discover scholarships and plan finances with smart tools.' },
];


const About = () => {
  return (
    <div className="about-container">

      {/* Hero */}
      <section className="hero">
        <div className="gradient-overlay" />
        <motion.div className="hero-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <h1>Campus Hustle</h1>
          <p className="tagline">where hustlers hangout</p>
        </motion.div>
      </section>

      {/* Features */}
      <section className="features">
        <h2>Our Features</h2>
        <div className="features-grid">
          {features.map((f, i) => (
            <motion.div
              className="feature-card"
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <img src={f.img} alt={f.title} />
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
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
            <motion.div
              className="dev-card"
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="image-wrapper">
                <img
                  src={dev.img}
                  alt={dev.name}
                  className="dev-img zoom-static"
                />
              </div>





              <h3>{dev.name}</h3>
              <p>{dev.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          Campus Hustle isn’t just a platform it’s a shared dream to create a space where
          students, developers, and creatives connect, grow, and hustle together.
          Every line of code brings us closer to an empowered campus culture.
        </p>
      </section>
    </div>
  );
};

export default About;
