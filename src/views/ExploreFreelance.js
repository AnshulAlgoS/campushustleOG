import React from 'react';
import './FreelancePage.css';
import logo from '../assets/images/CL1.png';
import { Link } from 'react-router-dom';

const FreelancePage = () => {
  return (
    <div className="freelance-container">
      <div className="navbar updated-navbar">
        <div className="nav-left">
          <img src={logo} alt="Campus Hustle Logo" className="logo" />
          <span className="brand-name">CampusHustle</span>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/freelance">Freelance</Link>
          <Link to="/hackathons">Hackathons</Link>
          <Link to="/community">Community</Link>
          <Link to="/about">About Us</Link>
        </div>
      </div>

      <div className="freelance-content">
        <Link to="/explore-freelance" className="freelance-btn">
          Explore Freelancing Opportunities
        </Link>
        <Link to="/offer-work" className="freelance-btn">
          Offer Work to Freelancers
        </Link>
      </div>
    </div>
  );
};

export default FreelancePage;


