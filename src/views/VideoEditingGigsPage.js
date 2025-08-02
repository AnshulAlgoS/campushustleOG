import React, { useState, useEffect } from 'react';
import './VideoEditingGigsPage.css';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const VideoEditingGigsPage = () => {
  const [gigs, setGigs] = useState([]);
  const [appliedGigs, setAppliedGigs] = useState([]);
  const [selectedGig, setSelectedGig] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGigsAndApplications = async () => {
      try {
        const q = query(collection(db, 'gigs'), where('category', '==', 'Video Editing'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setGigs(data);

        const user = auth.currentUser;
        if (user) {
          const appQuery = query(collection(db, 'applications'), where('applicantId', '==', user.uid));
          const appSnapshot = await getDocs(appQuery);
          const appliedIds = appSnapshot.docs.map(doc => doc.data().gigId);
          setAppliedGigs(appliedIds);
        }
      } catch (err) {
        console.error('Error fetching gigs or applications:', err);
      }
    };

    fetchGigsAndApplications();
  }, []);

  const handleSubmit = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert('Please log in to apply.');
      return;
    }

    if (!name.trim() || !email.trim() || !reason.trim()) {
      alert('All fields are required.');
      return;
    }

    try {
      await addDoc(collection(db, 'applications'), {
        applicantId: user.uid,
        applicantEmail: email,
        applicantName: name,
        gigId: selectedGig.id,
        gigTitle: selectedGig.title,
        gigDescription: selectedGig.description,
        reason,
        submittedAt: serverTimestamp()
      });

      setAppliedGigs(prev => [...prev, selectedGig.id]);

      setSelectedGig(null);
      setName('');
      setEmail('');
      setReason('');

      navigate('/dashboard');
    } catch (error) {
      console.error('Application submission failed:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <div className="video-header">
        <h1 className="video-title">Video Editing Gigs</h1>
        <p className="video-subtitle">
          Cut, trim, animate, and bring stories to life through exciting video projects.
        </p>
      </div>

      <div className="video-gigs-container">
        <div className="gigs-wrapper">
          {gigs.map((gig) => {
            const alreadyApplied = appliedGigs.includes(gig.id);
            return (
              <div key={gig.id} className="gig-card">
                <div className="card-header">
                  <h2>{gig.title}</h2>
                </div>
                <div className="card-body">
                  <p className="description">
                    {gig.description?.split(' ').slice(0, 15).join(' ')}...
                    <span className="read-more" onClick={() => navigate(`/gig/${gig.id}`)}> Read more</span>
                  </p>
                  <div className="meta-info">
                    <p><strong>Payment:</strong> {gig.payment}</p>
                    <p><strong>Deadline:</strong> {gig.deadline || 'Not mentioned'}</p>
                  </div>
                  <div className="card-buttons">
                    <button onClick={() => navigate(`/gig/${gig.id}`)}>Details</button>
                    {alreadyApplied ? (
                      <button disabled className="applied-btn">Applied</button>
                    ) : (
                      <button onClick={() => setSelectedGig(gig)}>Apply Now</button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {selectedGig && (
          <div className="modal-overlay" onClick={() => setSelectedGig(null)}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
              <h2>{selectedGig.title}</h2>
              <p>{selectedGig.description}</p>
              <p><strong>Budget:</strong> {selectedGig.payment}</p>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <textarea
                placeholder="Why are you suitable for this gig?"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              ></textarea>
              <button className="submit-btn" onClick={handleSubmit}>Submit Application</button>
              <button className="close-btn" onClick={() => setSelectedGig(null)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default VideoEditingGigsPage;
