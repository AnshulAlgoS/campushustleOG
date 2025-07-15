import React, { useState } from 'react';
import './ContentWritingGigsPage.css';

const gigs = [
  {
    title: 'Blog Writing',
    description: 'Write SEO-friendly blog posts for tech, education, and lifestyle.',
    price: '₹1000 - ₹3000',
  },
  {
    title: 'Social Media Captions',
    description: 'Craft engaging captions for Instagram, Twitter, and LinkedIn.',
    price: '₹500 - ₹1500',
  },
  {
    title: 'Product Descriptions',
    description: 'Write clear and persuasive product descriptions for e-commerce sites.',
    price: '₹800 - ₹2000',
  },
  {
    title: 'Website Copy',
    description: 'Develop home, about, and service page content for startups.',
    price: '₹1500 - ₹3500',
  },
];

const ContentWritingGigsPage = () => {
  const [selectedGig, setSelectedGig] = useState(null);

  return (
    <div className="contentwriting-gigs-container">
      <h1>Content Writing Gigs</h1>
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

export default ContentWritingGigsPage;
