// src/views/ExploreHackathonsPage.js

import React, { useState } from 'react';
import './HackathonPage.css';
import logo from '../assets/images/CL1.png';
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
    name: 'Code;Without Barriers Hackathon',
    image: img1,
    start: '2025-07-15',
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
    image: img3,
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
    image: img2,
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
      image: img6,
      start: '2025-04-29',
      end: '2025-06-10',
      status: 'closed',
    },
    {
      name: 'HACK ARYA VERSE',
      image: img7,
      start: '2025-04-24',
      end: '2025-04-27',
      status: 'closed',
    },
    {
      name: 'IMPACTECH-2K25',
      image: img8,
      start: '2025-03-28',
      end: '2025-04-04',
      status: 'closed',
    },
];

const ExploreHackathonsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHackathons = fakeHackathons.filter(hack =>
    hack.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="hackathon-list-page">
      {/*original nav bar*/}
      <div className="top-strip translucent-strip">
        <img src={logo} alt="Campus Link Logo" className="strip-logo" />
        <ul className="strip-nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/freelance">Freelance</Link></li>
          <li><Link to="/hackathons">Hackathons</Link></li>
          <li><Link to="/mentorship">Mentorship</Link></li>
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/login">Log In</Link></li>
          <li><Link to="/signup" className="signup">Sign Up</Link></li>
        </ul>
      </div>

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
            <h3 style={{ color: '#5c3c6e' }}>{hack.name}</h3>
            <p style={{ color: '#008CFF', fontWeight: 'bold' }}>Registration Start:</p>
            <p>{hack.start}</p>
            <p style={{ color: '#008CFF', fontWeight: 'bold' }}>Registration End:</p>
            <p>{hack.end}</p>
            <p style={{ fontWeight: 'bold' }}>
              {hack.status === 'open' ? 'Register Now →' : 'Registration Closed ❌'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreHackathonsPage;
