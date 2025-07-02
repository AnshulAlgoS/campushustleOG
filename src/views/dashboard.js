import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './dashboard.css';

export default function DashboardPage({ user }) {
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user?.uid) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserProfile(docSnap.data());
        }
      }
    };
    fetchUserProfile();
  }, [user]);

  return (
    <div className="dashboard-content">
      <h2>📊 Welcome to Your Dashboard</h2>
      <div className="dashboard-widgets">
        <div className="widget-card">🔥 Freelance Gigs Applied: 0</div>
        <div className="widget-card">💡 Hackathons Enrolled: 0</div>
        <div className="widget-card">🎯 Mentorships: 0 Active</div>
      </div>
    </div>
  );
}
