import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HackathonPage.css';
import logo from '../assets/images/CL1.png';
import FloatingDoodles from './FloatingDoodle';
import UserMenu from '../components/UserMenu';

const HackathonPage = ({ user, handleLogout, onProfileClick, openAuthModal }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="hackathon-container">
      <FloatingDoodles />

      {/* Top Nav Strip */}
      <div className="top-strip">
        <div className="logo-combo">
          <img src={logo} alt="Campus Hustle Logo" className="strip-logo" />
          <span className="logo-text">CampusHustle</span>
        </div>

        {/* Desktop Nav */}
        <nav className="navbar-desktop">
          <ul className="strip-nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/freelance">Freelance</Link></li>
            <li><Link to="/mentorship">Mentorship</Link></li>
            <li><Link to="/community">Community</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li>
              {user ? (
                <UserMenu
                  user={user}
                  onLogout={handleLogout}
                  onProfileClick={onProfileClick}
                />
              ) : (
                <button className="signup" onClick={openAuthModal}>
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
              <li><Link to="/mentorship" onClick={() => setMenuOpen(false)}>Mentorship</Link></li>
              <li><Link to="/community" onClick={() => setMenuOpen(false)}>Community</Link></li>
              <li><Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link></li>
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

      {/* Hackathon Main Buttons Section */}
      <div className="hackathon-content">
        <Link to="/organise-hackathon" className="hackathon-btn">
          Organise a Hackathon
        </Link>
        <Link to="/participation-guidelines" className="hackathon-btn">
          Participation Guidelines
        </Link>
        <Link to="/explore-hackathons" className="hackathon-btn">
          Explore Hackathons
        </Link>
      </div>
    </div>
  );
};

export default HackathonPage;
