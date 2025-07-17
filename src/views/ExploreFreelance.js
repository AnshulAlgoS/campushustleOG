import React from 'react';
import './ExploreFreelance.css';
import { useNavigate, Link } from 'react-router-dom';
import FloatingDoodles from './FloatingDoodle';
import logo from '../assets/images/CL1.png';

const ExploreFreelance = () => {
  const navigate = useNavigate();

  return (
    <div className="explore-container">
      <FloatingDoodles />
      
      <div className="gradient-navbar">
        <div className="nav-left">
          <img src={logo} alt="Campus Hustle Logo" className="nav-logo" />
          <span className="brand-name">CampusHustle</span>
        </div>
        <div className="nav-right">
          <Link to="/">Home</Link>
          <Link to="/freelance">Freelance</Link>
          <Link to="/mentorship">Mentorship</Link>
          <Link to="/hackathon">Hackathons</Link>
          <Link to="/events">Events</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/login">Log In</Link>
          <Link to="/signup" className="signup-btn">Sign Up</Link>
        </div>
      </div>

      <div className="freelance-content">
        <h1>Explore Freelancing Opportunities</h1>
        <div className="cards-container">

          <div
            className="service-card"
            onClick={() => navigate('/freelance/webdev')}
            style={{ background: 'linear-gradient(135deg, #6A0DAD, #8A2BE2)' }}
          >
            <h2>Web Development</h2>
            <p>Take on freelance web dev projects and grow your skills.</p>
          </div>

          <div
            className="service-card"
            onClick={() => navigate('/freelance/graphic-design')}
            style={{ background: 'linear-gradient(135deg, #FF69B4, #FF85C1)' }}
          >
            <h2>Graphic Design</h2>
            <p>Work on creative gigs and build your portfolio.</p>
          </div>

          <div
            className="service-card"
            onClick={() => navigate('/freelance/content-writing')}
            style={{ background: 'linear-gradient(135deg, #00BFFF, #87CEFA)' }}
          >
            <h2>Content Writing</h2>
            <p>Write blogs, articles, and web content for clients.</p>
          </div>

          <div
            className="service-card"
            onClick={() => navigate('/freelance/marketing')}
            style={{ background: 'linear-gradient(135deg, #32CD32, #7CFC00)' }}
          >
            <h2>Marketing</h2>
            <p>Support digital marketing and social media campaigns.</p>
          </div>

          <div
            className="service-card"
            onClick={() => navigate('/freelance/video-editing')}
            style={{ background: 'linear-gradient(135deg, #FF8C00, #FFA500)' }}
          >
            <h2>Video Editing</h2>
            <p>Edit short videos, reels, and YouTube content for creators.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ExploreFreelance;

