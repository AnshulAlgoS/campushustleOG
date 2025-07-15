import React, { useState } from 'react';
import './VideoEditingGigsPage.css';

const gigs = [
  {
    title: 'Reel Editing',
    description: 'Edit Instagram reels with trending music and transitions.',
    price: '₹1000 - ₹2500',
  },
  {
    title: 'YouTube Video Editing',
    description: 'Cut, trim, and enhance videos for YouTube content creators.',
    price: '₹3000 - ₹8000',
  },
  {
    title: 'Podcast Video Edits',
    description: 'Add visual effects, titles, and sync audio for video podcasts.',
    price: '₹2000 - ₹5000',
  },
  {
    title: 'Corporate Video Editing',
    description: 'Edit professional videos for business or internal presentations.',
    price: '₹4000 - ₹10000',
  },
];

const VideoEditingGigsPage = () => {
  const [selectedGig, setSelectedGig] = useState(null);

  return (
    <div className="video-gigs-container">
      <h1>Video Editing Gigs</h1>
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


export default VideoEditingGigsPage;
