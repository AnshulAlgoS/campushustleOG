import React from 'react';
import { Link } from 'react-router-dom';
import './community.css';

// Import images (make sure file names match exactly)
import collaborationImg from '../assets/images/collaboration.jpeg';
import neonCapImg from '../assets/images/neon cap.jpeg';
import bulbImg from '../assets/images/bulb.jpeg';
import globeImg from '../assets/images/globe.jpeg';

export default function CommunitySection() {
  return (
    <section className="section" id="community">
      <h3>OUR COMMUNITY</h3>
      <h1>
        Join a <span className="highlight">community</span> with a strong drive to excel
      </h1>

      <div className="stats">
        <div className="card" style={{ borderTop: '4px solid #bf2247ff' }}>
          <img src={collaborationImg} alt="Driven Innovators" />
          <p>Driven Innovators</p>
        </div>
        <div className="card" style={{ borderTop: '4px solid #6628a9ff' }}>
          <img src={neonCapImg} alt="Hackathons & Challenges" />
          <p>Hackathons & Challenges</p>
        </div>
        <div className="card" style={{ borderTop: '4px solid #efc829ff' }}>
          <img src={bulbImg} alt="Collaborations & Startups" />
          <p>Collaborations & Startups</p>
        </div>
        <div className="card" style={{ borderTop: '4px solid #15d21eff' }}>
          <img src={globeImg} alt="Community Leaders" />
          <p>Community Leaders</p>
        </div>
      </div>

      <p className="desc">
        Join the community which has a strive to excel - Be a part of our community and learn about various upcoming initiatives and opportunities.
      </p>

      <Link to="/CommunityHub" className="btn">
        Join Our Community
      </Link>
    </section>
  );
}
