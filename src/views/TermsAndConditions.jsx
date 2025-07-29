import React, { useEffect } from 'react';
import './TermsAndConditions.css';

const TermsAndConditions = () => {
  useEffect(() => {
    document.title = 'Terms & Conditions | Campus Hustle';
  }, []);

  return (
    <div className="terms-gradient">
      <div className="terms-container">
        <h1 className="terms-title">Terms & Conditions</h1>

        <p className="terms-paragraph">
          Welcome to Campus Hustle! These Terms and Conditions govern your use of our platform, services, and applications...
        </p>

        <h2 className="terms-subtitle">1. Acceptance of Terms</h2>
        <p className="terms-paragraph">
          When you create an account, browse content, register for events, or use any part of Campus Hustle...
        </p>

        <h2 className="terms-subtitle">2. Eligibility</h2>
        <p className="terms-paragraph">
          To use Campus Hustle, you must be at least 13 years of age and a student enrolled in a recognized academic institution...
        </p>

        <h2 className="terms-subtitle">3. Account Creation & Responsibility</h2>
        <ul className="terms-list">
          <li>Users must provide accurate information when creating an account.</li>
          <li>Impersonation, fake names, or duplicate accounts are not allowed.</li>
          <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
          <li>You agree to notify us immediately of any unauthorized use of your account.</li>
        </ul>

        <h2 className="terms-subtitle">4. Use of Services</h2>
        <p className="terms-paragraph">You agree to use the platform for lawful purposes only. You must not:</p>
        <ul className="terms-list">
          <li>Post misleading, fraudulent, or harmful content.</li>
          <li>Violate intellectual property or privacy rights of others.</li>
          <li>Use Campus Hustle for unsolicited promotions or spam.</li>
          <li>Exploit hackathon prizes or scholarships unfairly.</li>
          <li>Post or share content that is abusive, defamatory, or violent.</li>
        </ul>

        <h2 className="terms-subtitle">5. Community Guidelines</h2>
        <ul className="terms-list">
          <li>Respect all users regardless of their background, gender, religion, or academic level.</li>
          <li>Maintain professionalism while collaborating in freelance or mentorship.</li>
          <li>Disagreements should be handled respectfully; harassment or bullying is not tolerated.</li>
        </ul>

        <h2 className="terms-subtitle">6. Hackathons & Events</h2>
        <ul className="terms-list">
          <li>Users must register with accurate details.</li>
          <li>Plagiarized or duplicate submissions will be disqualified.</li>
          <li>Judging decisions are final and cannot be contested.</li>
          <li>Participants are expected to maintain integrity throughout the event.</li>
        </ul>

        <h2 className="terms-subtitle">7. Scholarships</h2>
        <ul className="terms-list">
          <li>Campus Hustle curates scholarships but does not guarantee selection or funding.</li>
          <li>All applications must be truthful; false claims can lead to permanent bans.</li>
          <li>We are not liable for decisions taken by third-party scholarship providers.</li>
        </ul>

        <h2 className="terms-subtitle">8. Freelance Marketplace</h2>
        <ul className="terms-list">
          <li>Clients and freelancers must agree on terms clearly before project initiation.</li>
          <li>Campus Hustle is not liable for payment disputes between users.</li>
          <li>Disputes can be escalated to our support team but will be resolved on a case-by-case basis.</li>
        </ul>

        <h2 className="terms-subtitle">9. Mentorship</h2>
        <ul className="terms-list">
          <li>Mentors are screened before being onboarded to ensure quality.</li>
          <li>Session recordings may be stored for quality and dispute resolution.</li>
          <li>Users are expected to behave courteously with mentors and peers.</li>
        </ul>

        <h2 className="terms-subtitle">10. Intellectual Property</h2>
        <p className="terms-paragraph">
          Campus Hustle and all its features (logos, design, illustrations, code) are the intellectual property of Campus Hustle...
        </p>

        <h2 className="terms-subtitle">11. Termination</h2>
        <p className="terms-paragraph">
          We reserve the right to terminate or suspend access to your account...
        </p>

        <h2 className="terms-subtitle">12. Liability Disclaimer</h2>
        <p className="terms-paragraph">
          Campus Hustle is not responsible for any loss, damage, or dissatisfaction arising...
        </p>

        <h2 className="terms-subtitle">13. Updates to Terms</h2>
        <p className="terms-paragraph">
          We may update these Terms from time to time. When we do, we will notify users...
        </p>

        <h2 className="terms-subtitle">14. Governing Law</h2>
        <p className="terms-paragraph">
          These Terms are governed by the laws of India. Any legal disputes will be resolved in the courts of Delhi...
        </p>

        <h2 className="terms-subtitle">15. Contact</h2>
        <p className="terms-paragraph">
          <strong>Email:</strong> legal@campushustle.in<br />
          <strong>Phone:</strong> +91-98765-43210<br />
          <strong>Address:</strong> Campus Hustle HQ, New Delhi, India
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
