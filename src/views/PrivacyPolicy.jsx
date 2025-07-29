import React, { useEffect } from 'react';
import './PrivacyPolicy.css'; // separate CSS, no clashes

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = 'Privacy Policy | Campus Hustle';
  }, []);

  return (
    <div className="privacy-gradient">
      <div className="privacy-container">
        <h1 className="privacy-title">Privacy Policy</h1>
        
        <p className="privacy-paragraph">
          <strong>Campus Hustle – Privacy Policy</strong><br />
          <em>Effective Date: July 2025</em>
        </p>

        <p className="privacy-paragraph">
          At Campus Hustle, we respect your privacy and are committed to protecting it. This Privacy Policy explains how we collect, use, and protect your information when you use our platform.
        </p>

        <h2 className="privacy-subtitle">1. Information We Collect</h2>
        <ul className="privacy-list">
          <li>Name, email, college, profile photo, skills, and preferences</li>
          <li>Login credentials via email or OAuth (Google)</li>
          <li>Usage data such as page visits, clicks, and interactions</li>
          <li>Uploaded documents (resumes, certificates, etc.)</li>
        </ul>

        <h2 className="privacy-subtitle">2. How We Use Your Data</h2>
        <ul className="privacy-list">
          <li>Match users with relevant opportunities (scholarships, gigs, teams)</li>
          <li>Provide personalized dashboards and community feeds</li>
          <li>Notify you of updates via email or in-app notifications</li>
          <li>Improve UX by analyzing user interactions</li>
        </ul>

        <h2 className="privacy-subtitle">3. Data Sharing</h2>
        <ul className="privacy-list">
          <li>We never sell your data.</li>
          <li>We may share anonymized usage data with partners for research.</li>
          <li>Third-party services (e.g., Lottie animations, analytics tools) may process data as per their own policies.</li>
        </ul>

        <h2 className="privacy-subtitle">4. Cookies & Tracking</h2>
        <ul className="privacy-list">
          <li>We use essential cookies to enable login and save session data.</li>
          <li>Analytics tools may use cookies to gather performance metrics.</li>
        </ul>

        <h2 className="privacy-subtitle">5. Data Retention</h2>
        <ul className="privacy-list">
          <li>Your data is stored securely and retained for as long as your account is active.</li>
          <li>You may request deletion by contacting support.</li>
        </ul>

        <h2 className="privacy-subtitle">6. Children’s Privacy</h2>
        <ul className="privacy-list">
          <li>Campus Hustle is intended for users 13+ years old.</li>
          <li>If you are under 13, please do not register or submit personal information.</li>
        </ul>

        <h2 className="privacy-subtitle">7. Changes to This Policy</h2>
        <ul className="privacy-list">
          <li>You will be notified of changes via the website or email.</li>
        </ul>

        <p className="privacy-paragraph">
          Contact Us: <a href="mailto:support@campushustle.in">support@campushustle.in</a>
        </p>

        <p className="privacy-paragraph">
          Your data is never sold or shared with third parties. You’re always in control.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
