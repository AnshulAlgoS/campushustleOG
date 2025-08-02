import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import {
  CalendarDays, User, Briefcase, MapPin, Layers, Clock, Send, Mail, Tag, DollarSign, BookOpen
} from "lucide-react";

import logo from '../assets/images/CL1.png';
import UserMenu from "./UserMenu";
import "./GigDetailsPage.css";

export default function GigDetailsPage({ user, handleLogout, openAuthModal, onProfileClick }) {
  const { id } = useParams();
  const [gig, setGig] = useState(null);
  const [posterName, setPosterName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchGigAndUser = async () => {
      try {
        const gigRef = doc(db, 'gigs', id);
        const gigSnap = await getDoc(gigRef);

        if (gigSnap.exists()) {
          const gigData = gigSnap.data();

          const userRef = doc(db, 'users', gigData.createdBy);
          const userSnap = await getDoc(userRef);

          let fullName = 'Unknown User';
          if (userSnap.exists()) {
            const userData = userSnap.data();
            fullName = `${userData.firstName} ${userData.lastName}`;
          }

          setGig({ id: gigSnap.id, ...gigData });
          setPosterName(fullName);
        }
      } catch (error) {
        console.error("Error fetching gig or user:", error);
      }
    };

    fetchGigAndUser();
  }, [id]);

  if (!gig) return <div>Loading gig details...</div>;

  return (
    <>
      {/* Top Navigation Strip */}
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
            <li><Link to="/hackathon">Hackathons</Link></li>
            <li>
              <Link to="/" state={{ scrollTo: 'community' }}>Community</Link>
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
                <button className="signup" onClick={openAuthModal}>Get Started</button>
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
                  <button className="signup" onClick={() => {
                    setMenuOpen(false);
                    openAuthModal();
                  }}>
                    Get Started
                  </button>
                )}
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Gig Details Section */}
      <div className="gig-details-container">
        <h1>{gig.title}</h1>
        <p><User size={18} /> <strong>Posted By:</strong> {posterName}</p>
        <p><DollarSign size={18} /> <strong>Budget:</strong> ₹{gig.payment}</p>
        <p><CalendarDays size={18} /> <strong>Deadline:</strong> {gig.deadline || 'Not specified'}</p>
        <p><Tag size={18} /> <strong>Category:</strong> {gig.category}</p>
        <p><MapPin size={18} /> <strong>Location:</strong> {gig.location || 'Remote'}</p>
        <p><Briefcase size={18} /> <strong>Mode:</strong> {gig.mode || 'Not specified'}</p>
        <p><Layers size={18} /> <strong>Experience:</strong> {gig.experience || 'Any'}</p>
        <p><Clock size={18} /> <strong>Duration:</strong> {gig.duration || 'Not mentioned'}</p>
        <p><CalendarDays size={18} /> <strong>Start Date:</strong> {gig.startDate}</p>
        <p><CalendarDays size={18} /> <strong>End Date:</strong> {gig.endDate}</p>
        <p><Send size={18} /> <strong>Skills:</strong> {gig.skills || 'Not listed'}</p>
        <p><BookOpen size={18} /> <strong>Description:</strong> {gig.description}</p>
        <p><Mail size={18} /> <strong>Contact Email:</strong> {gig.contactEmail || 'N/A'}</p>
      </div>
    </>
  );
}
