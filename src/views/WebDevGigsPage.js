import React, { useState, useEffect } from 'react';
import './WebDevGigsPage.css';
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
import { Link } from 'react-router-dom';
import logo from '../assets/images/CL1.png';
import UserMenu from '../components/UserMenu';


const WebDevGigsPage = () => {
  const [gigs, setGigs] = useState([]);
  const [appliedGigs, setAppliedGigs] = useState([]);
  const [selectedGig, setSelectedGig] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGigsAndApplications = async () => {
      try {
        const gigQuery = query(collection(db, 'gigs'), where('category', '==', 'Web Development'));
        const gigSnapshot = await getDocs(gigQuery);

        const gigsData = gigSnapshot.docs.map(doc => {
          const gig = { id: doc.id, ...doc.data() };

          // 💡 Extract platforms from the gig description or title
          const text = `${gig.title} ${gig.description}`.toLowerCase();

          const platforms = [];
          if (text.includes('figma')) platforms.push('figma');
          if (text.includes('github')) platforms.push('github');
          if (text.includes('firebase')) platforms.push('firebase');
          if (text.includes('react')) platforms.push('react');
          if (text.includes('nextjs')) platforms.push('nextjs');
          if (text.includes('nodejs')) platforms.push('nodejs');
          if (text.includes('python')) platforms.push('python');

          gig.platforms = platforms;

          return gig;
        });

        setGigs(gigsData);

        const user = auth.currentUser;
        if (user) {
          const appQuery = query(collection(db, 'applications'), where('applicantId', '==', user.uid));
          const appSnapshot = await getDocs(appQuery);
          const appliedIds = appSnapshot.docs.map(doc => doc.data().gigId);
          setAppliedGigs(appliedIds);
        }
      } catch (error) {
        console.error('Error fetching gigs or applications:', error);
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

      // Clear modal + form
      setSelectedGig(null);
      setName('');
      setEmail('');
      setReason('');

      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <>
    <div className="webdev-header">
      {/* Top Strip */}
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
              <Link to="/" state={{ scrollTo: 'community' }} className="desktop-link-btn">Community</Link>
            </li>
            <li><Link to="/about">About Us</Link></li>
            <li>
              {user ? (
                <UserMenu
                  user={user}
                  onLogout={() => auth.signOut()}
                  onProfileClick={() => navigate('/profile')}
                />
              ) : (
                <button className="signup" onClick={() => navigate('/auth')}>Get Started</button>
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
                      auth.signOut();
                    }}
                    onProfileClick={() => {
                      setMenuOpen(false);
                      navigate('/profile');
                    }}
                  />
                ) : (
                  <button
                    className="signup"
                    onClick={() => {
                      setMenuOpen(false);
                      navigate('/auth');
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
        <h1 className="webdev-title">Web Development Gigs</h1>
        <p className="webdev-subtitle">
          Explore freelance gigs tailored for students to build real-world web development experience.
        </p>
      </div>

      <div className="webdev-gigs-container">
        <div className="webdev-cards-wrapper">
          {gigs.map((gig) => {
            const alreadyApplied = appliedGigs.includes(gig.id);
            return (
              <div key={gig.id} className="webdev-card">
                <div className="card-header">
                  <h2>{gig.title}</h2>
                  {gig.location && <p className="gig-location">{gig.location}</p>}
                </div>
                <div className="card-body">
                  <p>{gig.description.length > 100 ? gig.description.slice(0, 100) + '...' : gig.description}</p>
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
              placeholder="Why are you fit for this gig?"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            ></textarea>
            <button className="submit-btn" onClick={handleSubmit}>Submit Application</button>
            <button className="close-btn" onClick={() => setSelectedGig(null)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default WebDevGigsPage;
