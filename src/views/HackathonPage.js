import React from 'react';
import './HackathonPage.css';
import logo from '../assets/images/CL1.png';
import { Link } from 'react-router-dom';

const HackathonPage = () => {
  return (
    <div className="hackathon-page">
      {/* Top Navigation Bar */}
      <div className="translucent-strip">
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

      {/* Hackathon Buttons */}
      <div className="hackathon-buttons">
        <Link to="/organise">
          <button className="hack-btn">Organise a Hackathon</button>
        </Link>
        <Link to="/participation-guidelines">
          <button className="hack-btn">Participation Guidelines</button>
        </Link>
        <Link to="/explore-hackathons">
          <button className="hack-btn">Explore Hackathons</button>
        </Link>
      </div>
    </div>
  );
};

export default HackathonPage;

