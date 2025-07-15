// src/views/ExploreFreelance.js

import React from 'react';
import './ExploreFreelance.css';
import { useNavigate } from 'react-router-dom';

const ExploreFreelance = () => {
  const navigate = useNavigate();

  return (
    <div className="explore-container">
      <h1>Explore Freelancing Opportunities</h1>
      <div className="cards-container">

        <div
          className="service-card"
          onClick={() => navigate('/freelance/webdev')}
          style={{ background: 'linear-gradient(135deg, #6A0DAD, #8A2BE2)' }}
        >
          <h2>Web Development</h2>
          <p>Take on freelance web dev projects and grow your skills.</p>
        </div>

        <div
          className="service-card"
          onClick={() => navigate('/freelance/graphic-design')}
          style={{ background: 'linear-gradient(135deg, #FF69B4, #FF85C1)' }}
        >
          <h2>Graphic Design</h2>
          <p>Work on creative gigs and build your portfolio.</p>
        </div>

        <div
          className="service-card"
          onClick={() => navigate('/freelance/content-writing')}
          style={{ background: 'linear-gradient(135deg, #00BFFF, #87CEFA)' }}
        >
          <h2>Content Writing</h2>
          <p>Write blogs, articles, and web content for clients.</p>
        </div>

        <div
          className="service-card"
          onClick={() => navigate('/freelance/marketing')}
          style={{ background: 'linear-gradient(135deg, #32CD32, #7CFC00)' }}
        >
          <h2>Marketing</h2>
          <p>Support digital marketing and social media campaigns.</p>
        </div>

        <div
          className="service-card"
          onClick={() => navigate('/freelance/video-editing')}
          style={{ background: 'linear-gradient(135deg, #FF8C00, #FFA500)' }}
        >
          <h2>Video Editing</h2>
          <p>Edit short videos, reels, and YouTube content for creators.</p>
        </div>

      </div>
    </div>
  );
};

export default ExploreFreelance;
