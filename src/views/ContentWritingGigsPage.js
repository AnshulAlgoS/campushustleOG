import React, { useState, useEffect } from 'react';
import './ContentWritingGigsPage.css';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/CL1.png';
import GigDetailsPage from 'components/GigDetailsPage';
import { Link } from 'react-router-dom';
import UserMenu from 'components/UserMenu';

const ContentWritingGigsPage = ({ user, handleLogout, onProfileClick, openAuthModal }) => {

  const [gigs, setGigs] = useState([]);
  const [appliedGigs, setAppliedGigs] = useState([]);
  const [selectedGig, setSelectedGig] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGigsAndApplications = async () => {
      try {
        const gigQuery = query(collection(db, 'gigs'), where('category', '==', 'Content Writing'));
        const gigSnapshot = await getDocs(gigQuery);
        const gigData = gigSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setGigs(gigData);

        const user = auth.currentUser;
        if (user) {
          const appQuery = query(collection(db, 'applications'), where('applicantId', '==', user.uid));
          const appSnapshot = await getDocs(appQuery);
          const appliedIds = appSnapshot.docs.map(doc => doc.data().gigId);
          setAppliedGigs(appliedIds);
        }
      } catch (err) {
        console.error('Error fetching gigs/applications:', err);
      }
    };

    fetchGigsAndApplications();
  }, []);

  const handleSubmit = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert('Please log in to apply.');
      return;
    }

    if (!name.trim() || !email.trim() || !reason.trim()) {
      alert('All fields are required.');
      return;
    }

    try {
      await addDoc(collection(db, 'applications'), {
        applicantId: user.uid,
        applicantEmail: email,
        applicantName: name,
        gigId: selectedGig.id,
        gigTitle: selectedGig.title,
        gigDescription: selectedGig.description,
        reason,
        submittedAt: serverTimestamp()
      });

      setAppliedGigs(prev => [...prev, selectedGig.id]);

      setSelectedGig(null);
      setName('');
      setEmail('');
      setReason('');

      navigate('/dashboard');
    } catch (error) {
      console.error('Application submission failed:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <> 
     <div className="content-header">
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
        <h1 className="content-title">Content Writing Gigs</h1>
        <p className="content-subtitle">
          Find exciting writing gigs to sharpen your storytelling and build your writing portfolio.
        </p>
      </div>

      <div className="contentwriting-gigs-container">
        <div className="gigs-wrapper">
          {gigs.map((gig) => {
            const alreadyApplied = appliedGigs.includes(gig.id);
            return (
              <div key={gig.id} className="gig-card">
                <div className="card-header">
                  <h2>{gig.title}</h2>
                </div>
                <div className="card-body">
                  <p>{gig.description}</p>
                  <div className="card-footer">
                    <span className="gig-price">{gig.payment}</span>
                    <div className="btn-group">
                      <button
                        className="details-btn"
                        onClick={() => navigate(`/gig/${gig.id}`)}
                      >
                        Details
                      </button>
                      {alreadyApplied ? (
                        <button disabled className="applied-btn">Applied</button>
                      ) : (
                        <button
                          className="apply-btn"
                          onClick={() => setSelectedGig(gig)}
                        >
                          Apply Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        </div>

        {selectedGig && (
          <div className="modal-overlay" onClick={() => setSelectedGig(null)}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
              <h2>{selectedGig.title}</h2>
              <p>{selectedGig.description}</p>
              <p><strong>Budget:</strong> {selectedGig.payment}</p>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <textarea
                placeholder="Why are you suitable for this gig?"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              ></textarea>
              <button className="submit-btn" onClick={handleSubmit}>Submit Application</button>
              <button className="close-btn" onClick={() => setSelectedGig(null)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ContentWritingGigsPage;
