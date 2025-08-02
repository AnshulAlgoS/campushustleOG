import React, { useState } from 'react';
import './ExploreFreelance.css';
import { useNavigate, Link } from 'react-router-dom';
import FloatingDoodles from './FloatingDoodle';
import logo from '../assets/images/CL1.png';
import UserMenu from '../components/UserMenu';
const ExploreFreelance = ({ user, handleLogout, onProfileClick, openAuthModal }) => {
const navigate = useNavigate();
const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="explore-container">
      {/* Top Strip */}
          <div className="top-strip">
            <div className="logo-combo">
              <img src={logo} alt="Campus Hustle Logo" className="strip-logo" />
              <span className="logo-text">CampusHustle</span>
            </div>

            {/*  Desktop Nav */}
            <nav className="navbar-desktop">
              <ul className="strip-nav">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/freelance">Freelance</Link></li>
                <li><Link to="/hackathon">Hackathons</Link></li>
                <li>
                  <Link
                    to="/"
                    state={{ scrollTo: 'community' }}
                    onClick={() => { }}
                    className="desktop-link-btn"
                  >
                    Community
                  </Link>
                </li>

                <li><Link to="/about">About Us</Link></li>
                <li>
                  {user ? (
                    <UserMenu
                      user={user}
                      onLogout={handleLogout}
                      onProfileClick={onProfileClick}
                    />
                  ) : (
                    <button
                      className="signup"
                      onClick={() => openAuthModal()}
                    >
                      Get Started
                    </button>
                  )}
                </li>
              </ul>
            </nav>


            {/* Mobile Nav */}
            <div className="navbar-mobile">
              <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</button>

              {menuOpen && (
                <ul className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
                  <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
                  <li><Link to="/freelance" onClick={() => setMenuOpen(false)}>Freelance</Link></li>
                  <li><Link to="/hackathon" onClick={() => setMenuOpen(false)}>Hackathons</Link></li>
                  <li><Link to="/" state={{ scrollTo: 'community' }} onClick={() => setMenuOpen(false)}>Community</Link></li>
                  <li><Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
                  </li>
                  <li>
                    {user ? (
                      <UserMenu
                        user={user}
                        onLogout={() => {
                          setMenuOpen(false);
                          handleLogout();
                        }}
                        onProfileClick={() => {
                          setMenuOpen(false);
                          onProfileClick();
                        }}
                      />
                    ) : (
                      <button
                        className="signup"
                        onClick={() => {
                          setMenuOpen(false);
                          openAuthModal();
                        }}
                      >
                        Get Started
                      </button>
                    )}
                  </li>
                </ul>
              )}
            </div>


          </div>
      <div className="freelance-content">
        <h1>Explore Freelancing Opportunities</h1>
        <div className="cards-container">

          <div
            className="service-card"
            onClick={() => navigate('/freelance/WebDev')}
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


