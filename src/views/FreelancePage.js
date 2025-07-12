import React, { useState } from 'react';
import './FreelancePage.css';
import logo from '../assets/images/CL1.png';
import UserMenu from '../components/UserMenu';

const FreelancePage = ({ user, navigateTo, handleLogout, openAuthModal, onProfileClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [designMsgVisible, setDesignMsgVisible] = useState(false); 

  return (
    <div className="freelance-page">
      {/* Page Content */}
      <h1 className="freelance-title">Freelance Opportunities</h1>

      <div className="freelance-cards">
        <div
          className="freelance-card webdev"
          onClick={() => navigateTo('freelance/webdev')}
          style={{ cursor: 'pointer' }}
        >
          <h2>Web Development</h2>
          <p>Take on freelance web development projects and grow your skills.</p>
        </div>

        <div
          className="freelance-card design"
          onClick={() => setDesignMsgVisible(true)} // add click
          style={{ cursor: 'pointer' }}
        >
          <h2>Designing</h2>
          <p>Work on creative design gigs and expand your portfolio.</p>
        </div>
      </div>

      {/* Show message on clicking Designing */}
      {designMsgVisible && (
        <div className="design-message">
          <p>🚧 We're currently working on this section. Stay tuned!</p>
        </div>
      )}
    </div>
  );
};

export default FreelancePage;
