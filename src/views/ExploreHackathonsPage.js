// src/views/ExploreHackathonsPage.js
import React from 'react';
import './HackathonPage.css'; // Reuse existing styles
import logo from '../assets/images/CL1.png';
import { Link } from 'react-router-dom';

const ExploreHackathonsPage = () => {
  return (
    <div className="hackathon-list-page">
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

      {/* Page Title */}
      <h2>All Hackathons</h2>

      {/* Cards */}
      <div className="hackathon-grid">
        {[...Array(12)].map((_, i) => (
          <div className="hackathon-card" key={i}>
            <h3>Hackathon #{i + 1}</h3>
            <p>Coming soon...</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreHackathonsPage;
