import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import ProfilePage from './ProfilePage';
import DashboardPage from './dashboard';
import './ProfileHub.css';

export default function ProfileHub({ user, onLogout, navigateToHome }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userProfile, setUserProfile] = useState({});
  const location = useLocation();

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.key]);

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
    <div className="profile-hub">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="avatar">{userProfile.firstName?.[0]?.toUpperCase() || user?.displayName?.[0] || 'U'}</div>
          <div className="user-info">
            <h3>{userProfile.firstName || user?.displayName || 'User'}</h3>
            <p>{user?.email}</p>
          </div>
        </div>
        <ul className="menu-list">
          <li onClick={() => setActiveTab('dashboard')} className={activeTab === 'dashboard' ? 'active' : ''}>Dashboard</li>
          <li onClick={() => setActiveTab('profile')} className={activeTab === 'profile' ? 'active' : ''}>My Profile</li>
          <li onClick={navigateToHome}> Back to Home</li>
          <li onClick={onLogout} className="logout">Logout</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content" key={activeTab}>
        {activeTab === 'dashboard' ? (
          <DashboardPage user={user} />
        ) : (
          <ProfilePage user={user} userProfile={userProfile} />
        )}
      </main>
    </div>
  );
}

