import React from 'react';
import './FreelancePage.css';
import logo from '../assets/images/CL1.png';
import { Link } from 'react-router-dom';

const FreelancePage = () => {
  return (
    <div className="freelance-container">
      <div className="navbar">
        <img src={logo} alt="Campus Hustle Logo" className="logo" />
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/freelance">Freelance</Link>
          <Link to="/hackathons">Hackathons</Link>
          <Link to="/mentorship">Mentorship</Link>
          <Link to="/events">Events</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/login">Log In</Link>
          <Link to="/signup" className="signup-btn">Sign Up</Link>
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

        
