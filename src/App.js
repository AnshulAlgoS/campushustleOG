// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';

import HomePage from './views/HomePage';
import HackathonPage from './views/HackathonPage';
import AuthModal from './components/AuthModal';
import ProfilePage from './views/ProfilePage';
import DashboardPage from './views/dashboard';
import ProfileHub from './views/Profilehub';

// ✅ Actual logic inside component that is inside <Router>
function InnerApp() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const openAuthModal = () => setShowAuthModal(true);
  const closeAuthModal = () => setShowAuthModal(false);

  const handleAuthSuccess = (user) => {
    setUser(user);
    closeAuthModal();
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        navigate('/');
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              openAuthModal={openAuthModal}
              user={user}
              handleLogout={handleLogout}
              navigateTo={(page) => navigate(`/${page}`)}
              onProfileClick={() => navigate('/profile-hub')}
            />
          }
        />

        <Route path="/hackathon" element={<HackathonPage navigateTo={(page) => navigate(`/${page}`)} />} />

        <Route path="/profile" element={<ProfilePage user={user} navigateTo={(page) => navigate(`/${page}`)} handleLogout={handleLogout} />} />

        <Route path="/dashboard" element={<DashboardPage user={user} onNavigate={(page) => navigate(`/${page}`)} />} />

        <Route
          path="/profile-hub"
          element={
            <ProfileHub
              user={user}
              onLogout={handleLogout}
              navigateToHome={() => navigate('/')}
            />
          }
        />
      </Routes>

      {showAuthModal && (
        <AuthModal
          onClose={closeAuthModal}
          onAuthSuccess={handleAuthSuccess}
        />
      )}
    </>
  );
}

// ✅ Wrap everything inside <Router>
export default function App() {
  return (
    <Router>
      <InnerApp />
    </Router>
  );
}

