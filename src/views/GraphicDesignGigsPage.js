import React, { useState, useEffect } from 'react';
import './GraphicDesignGigsPage.css';
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

const GraphicDesignGigsPage = () => {
  const [gigs, setGigs] = useState([]);
  const [selectedGig, setSelectedGig] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [appliedGigs, setAppliedGigs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGigsAndApplications = async () => {
      try {
        const gigQuery = query(collection(db, 'gigs'), where('category', '==', 'Graphic Design'));
        const gigSnapshot = await getDocs(gigQuery);
        const gigData = gigSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setGigs(gigData);
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

      // Clear modal + form
      setSelectedGig(null);
      setAppliedGigs(prev => [...prev, selectedGig.id]);
      setName('');
      setEmail('');
      setReason('');

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Application submission failed:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <div className="designs-header">
        <h1 className="design-title">Graphic Design Gigs</h1>
        <p className="design-subtitle">
          Discover student-friendly design gigs to grow your skills and build a creative portfolio.
        </p>
      </div>
      <div className="graphicdesign-gigs-container">

        <div className="gigs-wrapper">
          {gigs.map((gig) => {
            const alreadyApplied = appliedGigs.includes(gig.id);
            return (
              <div key={gig.id} className="gig-card">
                <div className="card-header">
                  <h2>{gig.title}</h2>
                </div>
                <div className="card-body">
                  <p>{gig.description}</p>
                  <p><strong>Deadline:</strong> {gig.endDate}</p>
                  <div className="card-footer">
                    <span className="gig-price">{gig.payment}</span>
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
              <p><strong>Start:</strong> {selectedGig.startDate}</p>
              <p><strong>Deadline:</strong> {selectedGig.endDate}</p>
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
              />
              <button className="submit-btn" onClick={handleSubmit}>Submit Application</button>
              <button className="close-btn" onClick={() => setSelectedGig(null)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GraphicDesignGigsPage;
