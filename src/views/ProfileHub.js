import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import ProfilePage from './ProfilePage';
import DashboardPage from './dashboard';
import './ProfileHub.css';

export default function ProfileHub({ user, onLogout, navigateToHome }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userProfile, setUserProfile] = useState({});

  // 🔁 Fetch user profile from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserProfile(docSnap.data());
        }
      }
    };
    fetchUserData();
  }, [user]);

  return (
    <div className="profile-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="profile-pic">
          {userProfile.firstName?.[0]?.toUpperCase() || user?.displayName?.[0] || 'U'}
        </div>
        <h3>
          {userProfile.firstName || user?.displayName || 'User'}{' '}
          {userProfile.lastName || ''}
        </h3>
        <p>{user?.email}</p>
        <ul>
          <li>
            <button onClick={() => setActiveTab('dashboard')} className="sidebar-btn">
              🏠 Dashboard
            </button>
          </li>
          <li>
            <button onClick={() => setActiveTab('profile')} className="sidebar-btn">
              📝 My Profile
            </button>
          </li>
          <li>
            <button onClick={navigateToHome} className="sidebar-btn">
              ← Back to Home
            </button>
          </li>
          <li>
            <button onClick={onLogout} className="sidebar-btn logout-btn">
              Log Out
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Panel */}
      <main className="dashboard-content">
        {activeTab === 'dashboard' ? (
          <DashboardPage user={user} />
        ) : (
         <ProfilePage user={user} userProfile={userProfile} />
        )}
      </main>
    </div>
  );
}
