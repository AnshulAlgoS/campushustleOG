import React, { useState } from 'react';
import './WebDevGigsPage.css';

const gigs = [
  {
    title: 'Portfolio Website',
    description: 'Design and build a modern responsive portfolio for clients or students.',
    price: '₹1500 - ₹3000'
  },
  {
    title: 'E-commerce Site',
    description: 'Create a small e-commerce site with cart and checkout functionality.',
    price: '₹3000 - ₹8000'
  },
  {
    title: 'Landing Page',
    description: 'Build a stunning landing page for startups or events.',
    price: '₹1000 - ₹2500'
  },
  {
    title: 'Blog Website',
    description: 'Develop a blog with categories, post pages, and CMS integration.',
    price: '₹2000 - ₹5000'
  },
  {
    title: 'Fix Bugs / Improve UI',
    description: 'Freelancers can help debug or redesign existing websites.',
    price: '₹500 - ₹2000'
  },
];

const WebDevGigsPage = () => {
  const [selectedGig, setSelectedGig] = useState(null);

  return (
    <div className="webdev-gigs-container">
      <h1>Web Development Gigs</h1>
      <div className="webdev-cards-wrapper">
        {gigs.map((gig, index) => (
          <div key={index} className="webdev-card">
            <div className="card-header">
              <h2>{gig.title}</h2>
            </div>
            <div className="card-body">
              <p>{gig.description}</p>
              <div className="card-footer">
                <span className="gig-price">{gig.price}</span>
                <button className="apply-btn" onClick={() => setSelectedGig(gig)}>Apply Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedGig && (
        <div className="modal-overlay" onClick={() => setSelectedGig(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedGig.title}</h2>
            <p>{selectedGig.description}</p>
            <p><strong>Budget:</strong> {selectedGig.price}</p>
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <textarea placeholder="Why are you fit for this gig?"></textarea>
            <button className="submit-btn">Submit Application</button>
            <button className="close-btn" onClick={() => setSelectedGig(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebDevGigsPage;

 
   
  
   
          
        
