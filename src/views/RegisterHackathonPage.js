// src/views/RegisterHackathonPage.jsx
import React, { useEffect, useState } from 'react';
import { Timestamp, doc, setDoc } from 'firebase/firestore';
import { useLocation, useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
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
      console.log("🔐 Auth user:", currentUser);
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      alert("Please log in to register.");
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!hackathon) {
      alert("⚠️ Hackathon data not found. Please try again from the hackathon list.");
      navigate('/explore-hackathons');
    }
  }, [hackathon, navigate]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!user || !hackathon) {
      console.log("🚫 Missing user or hackathon:", { user, hackathon });
      return alert("Missing data. Please try again.");
    }

    const safeHackathonId = hackathon.name?.replace(/[^a-zA-Z0-9_-]/g, '_') || `hackathon_${Date.now()}`;
    const docRef = doc(db, 'registrations', `${user.uid}_${safeHackathonId}`);

    const registrationData = {
      hackathonName: hackathon.name || 'Unnamed Hackathon',
      hackathonImage: hackathon.image || '',
      userEmail: user.email,
      userId: user.uid,
      teamName: formData.teamName,
      memberCount: formData.memberCount,
      additionalNotes: formData.additionalNotes,
      submittedAt: Timestamp.now()
    };

    console.log("📄 Writing to:", docRef.path);
    console.log("📦 Data:", registrationData);

    try {
      await setDoc(docRef, registrationData);
      alert('✅ Registered successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error('❌ Firestore setDoc error:', err);
      alert(`Registration failed: ${err.message}`);
    }
  };

  if (loading) return <p style={{ textAlign: 'center' }}>Checking authentication...</p>;
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
