// src/views/HackathonPage.js

import React from 'react';
import { Link } from 'react-router-dom';
import './HackathonPage.css';
import logo from '../assets/images/CL1.png';

const HackathonPage = () => {
  return (
    <div className="hackathon-page">
      {/* Translucent Nav Bar */}
      <div className="top-strip translucent-strip">
        <img src={logo} alt="Campus Link Logo" className="strip-logo" />
        <ul className="strip-nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/freelance">Freelance</Link></li>
          <li><Link to="/hackathons">Hackathons</Link></li>
          <li><Link to="/mentorship">Mentorship</Link></li>
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/login">Log In</Link></li>
          <li><Link to="/signup" className="signup">Sign Up</Link></li>
        </ul>
      </div>

      {/* Button Section */}
      <div className="hackathon-content">
        <button className="hackathon-btn">Organise a Hackathon</button>
        <button className="hackathon-btn">Participate as a Hacker</button>
        <Link to="/explore-hackathons" className="hackathon-btn">
          Explore Hackathons
        </Link>
      </div>
    </div>
  );
};

export default HackathonPage;

