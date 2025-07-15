import React, { useState } from 'react';
import './MarketingGigsPage.css';

const gigs = [
  {
    title: 'Social Media Management',
    description: 'Manage Instagram, Twitter, LinkedIn handles and boost reach.',
    price: '₹2000 - ₹5000',
  },
  {
    title: 'SEO Optimization',
    description: 'Improve website SEO rankings using keyword research & on-page tactics.',
    price: '₹3000 - ₹7000',
  },
  {
    title: 'Email Marketing',
    description: 'Create email campaigns and analyze click-throughs.',
    price: '₹1500 - ₹4000',
  },
  {
    title: 'Influencer Outreach',
    description: 'Find and engage influencers for marketing partnerships.',
    price: '₹1000 - ₹3000',
  },
];

const MarketingGigsPage = () => {
  const [selectedGig, setSelectedGig] = useState(null);

  return (
    <div className="marketing-gigs-container">
      <h1>Marketing Gigs</h1>
      <div className="gigs-wrapper">
        {gigs.map((gig, index) => (
          <div key={index} className="gig-card">
            <div className="card-header">
              <h2>{gig.title}</h2>
            </div>
            <div className="card-body">
              <p>{gig.description}</p>
              <div className="card-footer">
                <span className="gig-price">{gig.price}</span>
                <button onClick={() => setSelectedGig(gig)}>Apply Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedGig && (
        <div className="modal-overlay" onClick={() => setSelectedGig(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedGig.title}</h2>
            <p>{selectedGig.description}</p>
            <p><strong>Budget:</strong> {selectedGig.price}</p>
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <textarea placeholder="Why are you suitable for this gig?"></textarea>
            <button className="submit-btn">Submit Application</button>
            <button className="close-btn" onClick={() => setSelectedGig(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketingGigsPage;
