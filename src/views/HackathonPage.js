import React from 'react';
import { Link } from 'react-router-dom';
import FloatingDoodles from './FloatingDoodle';
import logo from '../assets/images/CL1.png';
import './HackathonPage.css';

const HackathonPage = () => {
  return (
    <>

      <div className="hackathon-page">
        {/* Top Navigation Bar */}
        <div className="translucent-strip">
           <div class="logo-container">
          <img src={logo} alt="Campus Hustle Logo" className="strip-logo" />
          <span class="logo-text">CampusHustle</span>
  </div>
          <ul className="strip-nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/freelance">Freelance</Link></li>
            <li><Link to="/mentorship">Mentorship</Link></li>
            <li><Link to="/community">Community</Link></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </div>

        {/* Hackathon Buttons Section */}
        <div className="hackathon-buttons">
          <Link to="/organise-hackathon">
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
    </>
  );
};

export default HackathonPage;