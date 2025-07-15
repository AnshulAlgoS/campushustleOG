import React, { useEffect, useState } from 'react';
import './HackathonPage.css';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

import img1 from '../assets/images/h1.jpeg';
import img2 from '../assets/images/h2.jpeg';
import img3 from '../assets/images/h3.jpeg';
import img4 from '../assets/images/h4.jpeg';
import img5 from '../assets/images/h5.jpeg';
import img6 from '../assets/images/h6.jpeg';
import img7 from '../assets/images/h7.jpeg';
import img8 from '../assets/images/h2.jpeg';

const fallbackImages = [img1, img2, img3, img4, img5, img6, img7, img8];

const ExploreHackathonsPage = () => {
  const [hackathons, setHackathons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'hackathons'));
        const all = snapshot.docs.map((doc, idx) => ({
          id: doc.id,
          ...doc.data(),
          image: fallbackImages[idx % fallbackImages.length], // use fallback images
        }));
        setHackathons(all);
      } catch (err) {
        console.error('❌ Error fetching hackathons:', err);
      }
    };

    fetchHackathons();
  }, []);

  const filteredHackathons = hackathons.filter((hack) =>
    hack.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="hackathon-list-page">
      {/* Hero Section */}
      <div className="background-effect">
        <div className="hero-shape shape1"></div>
        <div className="hero-shape shape2"></div>
        <h1>Hackathons</h1>
        <p>Harnessing creativity of tech enthusiasts to build a futuristic funnel of innovative India.</p>
      </div>

      {/* Search + Heading */}
      <div className="search-header">
        <h2>All Hackathons</h2>
        <input
          type="text"
          placeholder="Search hackathons..."
          className="search-input-inline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Hackathon Cards */}
      <div className="hackathon-grid">
        {filteredHackathons.map((hack) => (
          <div className="hackathon-card" key={hack.id}>
            <img src={hack.image} alt={hack.title} className="card-image" />
            <h3>{hack.title}</h3>
            <p className="start-label">Start:</p>
            <p>{hack.startDate}</p>
            <p className="end-label">End:</p>
            <p>{hack.endDate}</p>
            <p>
              {new Date(hack.regEnd) > new Date() ? (
                <Link
                  to="/register"
                  state={{ hackathon: hack }}
                  style={{ color: '#008CFF', fontWeight: 'bold' }}
                >
                  Register Now →
                </Link>
              ) : (
                <span style={{ color: 'black', fontWeight: 'bold' }}>Registration Closed</span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreHackathonsPage;
