import React, { useState } from 'react';
import './community.css';

export default function CommunitySection() {
  const [showPopup, setShowPopup] = useState(false);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('overlay')) {
      setShowPopup(false);
    }
  };

  return (
    <>
      <section className="section" id="community">
        <h3>OUR COMMUNITY</h3>
        <h1>
          Join a <span className="highlight">community</span> with a strong drive to excel
        </h1>

        <div className="stats">
          <div className="card" style={{ borderTop: '4px solid #ff416c' }}>
            <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="Active Developers Icon" />
            <p>Active Students</p>
          </div>
          <div className="card" style={{ borderTop: '4px solid #4caf50' }}>
            <img src="https://cdn-icons-png.flaticon.com/512/906/906175.png" alt="Hackathons Icon" />
            <p>Hackathons</p>
          </div>
          <div className="card" style={{ borderTop: '4px solid #ffcc00' }}>
            <img src="https://cdn-icons-png.flaticon.com/512/4149/4149643.png" alt="Companies Participated Icon" />
            <p>Connected Startups</p>
          </div>
          <div className="card" style={{ borderTop: '4px solid #2196f3' }}>
            <img src="https://cdn-icons-png.flaticon.com/512/484/484167.png" alt="Countries Icon" />
            <p>Top Contributors</p>
          </div>
        </div>

        <p className="desc">
          Join the community which has a strive to excel - Be a part of our community and learn about various upcoming initiatives and opportunities.
        </p>

        <button className="btn" onClick={() => setShowPopup(true)}>
          Join Our Community
        </button>
      </section>

      {showPopup && (
        <>
          <div className="overlay" onClick={handleOverlayClick}></div>
          <div className="popup">
            <p>Thanks for showing interest <br />More features are coming soon,Register now.</p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </>
      )}
    </>
  );
}

