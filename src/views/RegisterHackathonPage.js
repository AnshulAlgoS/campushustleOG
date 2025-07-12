import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import './RegisterHackathonPage.css';

const RegisterHackathonPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { hackathon } = location.state || {};

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [formData, setFormData] = useState({
    teamName: '',
    memberCount: '',
    additionalNotes: '',
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        setUser(currentUser);
      }
      setLoading(false); 
    });
    return () => unsubscribe();
  }, []);

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!user || !hackathon) return;

    const docRef = doc(db, 'registrations', `${user.uid}_${hackathon.name}`);

    await setDoc(docRef, {
      hackathonName: hackathon.name,
      userEmail: user.email,
      userId: user.uid,
      teamName: formData.teamName,
      memberCount: formData.memberCount,
      additionalNotes: formData.additionalNotes,
      submittedAt: new Date(),
    });

    alert('Registered successfully!');
    navigate('/dashboard');
  };

  // Handle loading or redirect
  if (loading) return <p style={{ textAlign: 'center' }}>Checking authentication...</p>;

  if (!user) {
    navigate('/login');
    return null;
  }

  if (!hackathon) return <p style={{ textAlign: 'center' }}>Hackathon info missing.</p>;

  return (
    <div className="register-container">
      <h2 className="register-title">Register for {hackathon.name}</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="teamName"
          placeholder="Team Name"
          value={formData.teamName}
          onChange={handleChange}
          required
          className="register-input"
        />
        <input
          type="number"
          name="memberCount"
          placeholder="Number of Team Members"
          value={formData.memberCount}
          onChange={handleChange}
          required
          className="register-input"
        />
        <textarea
          name="additionalNotes"
          placeholder="Additional Notes (optional)"
          value={formData.additionalNotes}
          onChange={handleChange}
          className="register-textarea"
        />
        <button type="submit" className="register-button">
          Submit Registration
        </button>
      </form>
    </div>
  );
};

export default RegisterHackathonPage;
