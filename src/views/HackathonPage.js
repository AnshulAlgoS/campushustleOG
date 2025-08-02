import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FloatingDoodles from './FloatingDoodle';
import logo from '../assets/images/CL1.png';
import './HackathonPage.css';
import UserMenu from '../components/UserMenu';

const HackathonPage = ({user, handleLogout, onProfileClick, openAuthModal}) => {
      const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <div className="hackathon-page">
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
