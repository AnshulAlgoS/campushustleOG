// src/views/HackathonPage.js
import React from 'react';
import './HackathonPage.css';
import logo from '../assets/images/CL1.png'; 

const HackathonPage = () => {
  return (
    <div className="hackathon-page">
      {/* Top Navigation Bar */}
      <div className="translucent-strip">
        <img src={logo} alt="Campus Link Logo" className="strip-logo" />
        <ul className="strip-nav">
          <li><a href="/">Home</a></li>
          <li><a href="#">Freelance</a></li>
          <li><a href="#">Hackathons</a></li>
          <li><a href="#">Mentorship</a></li>
          <li><a href="#">Events</a></li>
          <li><a href="#">Dashboard</a></li>
          <li><a href="#">Log In</a></li>
          <li><a href="#" className="signup">Sign Up</a></li>
        </ul>
      </div>

      {/* Hackathon Buttons */}
      <div className="hackathon-buttons">
        <button className="hack-btn">Organise a Hackathon</button>
        <button className="hack-btn">Participate as a Hacker</button>
        <button className="hack-btn">Explore Hackathons</button>
      </div>
    </div>
  );
};

export default HackathonPage;
