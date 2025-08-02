import React, { useState } from 'react';
import './FreelancePage.css';
import logo from '../assets/images/CL1.png';
import { Link, useLocation } from 'react-router-dom';
import FloatingDoodles from './FloatingDoodle';
import UserMenu from '../components/UserMenu';

const FreelancePage = ({ user, handleLogout, onProfileClick, openAuthModal }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="freelance-container">
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
      {/* Freelance Page CTA */}
      <div className="freelancer-content">
        <h1>Unleash Your Talent</h1>
        <p>Join Campus Hustle’s freelance network – either work or hire students with amazing skills.</p>

        <Link to="/explore-freelance" className="freelancer-btn">
          Explore Freelancing Opportunities
        </Link>
        <Link to="/offer-work" className="freelancer-btn">
          Offer Work to Freelancers
        </Link>
      </div>
    </div>
  );
};

export default FreelancePage;
