import React, { useState } from 'react';
import './HackathonPage.css';
import { Link } from 'react-router-dom';

// Hackathon images
import img1 from '../assets/images/h1.jpeg';
import img2 from '../assets/images/h2.jpeg';
import img3 from '../assets/images/h3.jpeg';
import img4 from '../assets/images/h4.jpeg';
import img5 from '../assets/images/h5.jpeg';
import img6 from '../assets/images/h6.jpeg';
import img7 from '../assets/images/h7.jpeg';
import img8 from '../assets/images/h2.jpeg';

const fakeHackathons = [
  {
    name: 'Codex Hackathon',
    image: img1,
    start: '2025-07-12',
    end: '2025-08-15',
    status: 'open'
  },
  {
    name: 'Innovatrix',
    image: img2,
    start: '2025-06-30',
    end: '2025-07-17',
    status: 'open'
  },
  {
    name: 'Hackathon India',
    image: img7,
    start: '2025-05-14',
    end: '2025-07-02',
    status: 'open'
  },
  {
    name: 'AgriTech Hack',
    image: img4,
    start: '2025-05-05',
    end: '2025-05-20',
    status: 'closed'
  },
  {
    name: 'Code',
    image: img5,
    start: '2025-05-01',
    end: '2025-05-18',
    status: 'closed'
  },
  {
    name: 'SSoC 2025',
    image: img6,
    start: '2025-04-29',
    end: '2025-06-10',
    status: 'closed'
  },
  {
    name: 'HACK ARYA VERSE',
    image: img3,
    start: '2025-04-24',
    end: '2025-04-27',
    status: 'closed'
  },
  {
    name: 'IMPACTECH–2K25',
    image: img1,
    start: '2025-03-28',
    end: '2025-04-04',
    status: 'closed'
  },
  {
    name: 'Hackathon India',
    image: img3,
    start: '2025-05-14',
    end: '2025-07-02',
    status: 'open',
  },
  {
    name: 'AgriTech Hack',
    image: img4,
    start: '2025-05-05',
    end: '2025-05-20',
    status: 'closed',
  },
  {
    name: 'HACKMANIA',
    image: img5,
    start: '2025-05-01',
    end: '2025-05-18',
    status: 'closed',
  },
  {
    name: 'SSoC 2025',
    image: img8,
    start: '2025-04-29',
    end: '2025-06-10',
    status: 'closed',
  }
];

const ExploreHackathonsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHackathons = fakeHackathons.filter(hack =>
    hack.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="hackathon-list-page">

      {/*  Background Hero Section (gradient + shapes) */}
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
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Hackathon Cards */}
      <div className="hackathon-grid">
        {filteredHackathons.map((hack, index) => (
          <div className="hackathon-card" key={index}>
            <img src={hack.image} alt={hack.name} className="card-image" />
            <h3>{hack.name}</h3>
            <p className="start-label">Registration Start:</p>
            <p>{hack.start}</p>
            <p className="end-label">Registration End:</p>
            <p>{hack.end}</p>
            <p>
              {hack.status === 'open' ? (
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
