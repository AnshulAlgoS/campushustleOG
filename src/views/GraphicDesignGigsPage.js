import React, { useState } from 'react';
import './GraphicDesignGigsPage.css';

const gigs = [
  {
    title: 'Logo Design',
    description: 'Design unique and brand-consistent logos for clients.',
    price: '₹1500 - ₹4000',
  },
  {
    title: 'Social Media Graphics',
    description: 'Create eye-catching posts and banners for Instagram, LinkedIn, and more.',
    price: '₹800 - ₹2500',
  },
  {
    title: 'Poster & Flyer Design',
    description: 'Design promotional posters and event flyers.',
    price: '₹1000 - ₹3000',
  },
  {
    title: 'UI/UX Design',
    description: 'Create clean UI layouts and wireframes for web/mobile apps.',
    price: '₹2500 - ₹6000',
  },
];

const GraphicDesignGigsPage = () => {
  const [selectedGig, setSelectedGig] = useState(null);

  return (
    <div className="graphicdesign-gigs-container">
      <h1>Graphic Design Gigs</h1>
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

export default GraphicDesignGigsPage;
