// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Pages
import AllScholarshipsPage from './views/AllScholarshipsPage';
import HomePage from './views/HomePage';
import HackathonPage from './views/HackathonPage';
import ExploreHackathonsPage from './views/ExploreHackathonsPage';
import RegisterHackathonPage from './views/RegisterHackathonPage';
import OrganiseHackathon from "./views/OrganiseHackathon";
import Guidelines from './views/Guidelines';
import ProfilePage from './views/ProfilePage';
import DashboardPage from './views/dashboard';
import ProfileHub from './views/ProfileHub';
import About from './views/About';
import AuthModal from './components/AuthModal';
import FreelancePage from './views/FreelancePage';
import WebDevGigsPage from './views/WebDevGigsPage';
import CommunitySection from './views/community';
import Mentorship from './views/Mentorship';
import ExploreFreelance from './views/ExploreFreelance';
import OfferWorkForm from './views/OfferWorkForm';
import ContentWritingGigsPage from './views/ContentWritingGigsPage';
import GraphicDesignGigsPage from './views/GraphicDesignGigsPage';
import MarketingGigsPage from './views/MarketingGigsPage';
import VideoEditingGigsPage from './views/VideoEditingGigsPage';
import CategoryListingPage from './views/categoryListing';
import Budgeting from './views/Budgeting';
import CommunityHub from './views/CommunityHub';
import GigDetailsPage from 'components/GigDetailsPage';
import HelpCenter from './views/HelpCenter';
import PrivacyPolicy from './views/PrivacyPolicy';
import TermsAndConditions from './views/TermsAndConditions';
import Contact from './views/Contact';




function InnerApp() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

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
        <Route path="/community" element={<CommunitySection />} />
        <Route path="/hackathon" element={<HackathonPage navigateTo={(page) => navigate(`/${page}`)} />} />
        <Route path="/explore-hackathons" element={<ExploreHackathonsPage />} />
        <Route path="/participation-guidelines" element={<Guidelines />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<ProfilePage user={user} navigateTo={(page) => navigate(`/${page}`)} handleLogout={handleLogout} />} />
        <Route path="/dashboard" element={<DashboardPage user={user} onNavigate={(page) => navigate(`/${page}`)} />} />
        <Route path="/organise-hackathon" element={<OrganiseHackathon />} />
        <Route path="/register" element={<RegisterHackathonPage />} />
        <Route path="/mentorship" element={<Mentorship />} />
        <Route path="/freelance/:categorySlug" element={<CategoryListingPage />} />
        <Route path="/budgeting" element={<Budgeting navigateTo={(page) => navigate(`/${page}`)} />} />
        <Route path="/scholarships" element={<AllScholarshipsPage />} />
        <Route path="/community1" element={<CommunityHub />} />
        <Route path="/gig/:id" element={<GigDetailsPage />} />

        


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
        <Route
          path="/freelance"
          element={
            <FreelancePage
              user={user}
              navigateTo={(page) => navigate(`/${page}`)}
              handleLogout={handleLogout}
              openAuthModal={openAuthModal}
              onProfileClick={() => navigate('/profile-hub')}
            />
          }
        />

        <Route path="/explore-freelance" element={<ExploreFreelance />} />
        <Route path="/offer-work" element={<OfferWorkForm />} />
        <Route path="/freelance/webdev" element={<WebDevGigsPage />} />
        <Route path="/freelance/content-writing" element={<ContentWritingGigsPage />} />
        <Route path="/freelance/graphic-design" element={<GraphicDesignGigsPage />} />
        <Route path="/freelance/marketing" element={<MarketingGigsPage />} />
        <Route path="/freelance/video-editing" element={<VideoEditingGigsPage />} />

        {/* ✅ Legal Routes */}
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/contact" element={<Contact />} />

      

      </Routes>

      {showAuthModal && (
        <AuthModal onClose={closeAuthModal} onAuthSuccess={handleAuthSuccess} />
      )}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <InnerApp />
    </Router>
  );
}
