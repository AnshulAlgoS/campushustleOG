import React, { useEffect } from 'react';

const TermsAndConditions = () => {
  useEffect(() => {
    document.title = 'Terms & Conditions | Campus Hustle';
  }, []);

  return (
    <div className="legal-gradient">
      <div className="legal-page-container">
        <h1 className="legal-title">Terms & Conditions</h1>

        <p className="legal-paragraph">
          Welcome to Campus Hustle! These Terms and Conditions govern your use of our platform, services, and applications.
          By accessing or using Campus Hustle, you agree to comply with and be bound by these terms. If you do not agree,
          you may not use the platform.
        </p>

        <h2 className="legal-subtitle">1. Acceptance of Terms</h2>
        <p className="legal-paragraph">
          When you create an account, browse content, register for events, or use any part of Campus Hustle, you agree
          that you are bound by these Terms & Conditions, our Privacy Policy, and any additional terms that apply.
        </p>

        <h2 className="legal-subtitle">2. Eligibility</h2>
        <p className="legal-paragraph">
          To use Campus Hustle, you must be at least 13 years of age and a student enrolled in a recognized academic
          institution. You may be asked to verify your student status through ID or institutional email.
        </p>

        <h2 className="legal-subtitle">3. Account Creation & Responsibility</h2>
        <ul className="legal-list">
          <li>Users must provide accurate information when creating an account.</li>
          <li>Impersonation, fake names, or duplicate accounts are not allowed.</li>
          <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
          <li>You agree to notify us immediately of any unauthorized use of your account.</li>
        </ul>

        <h2 className="legal-subtitle">4. Use of Services</h2>
        <p className="legal-paragraph">You agree to use the platform for lawful purposes only. You must not:</p>
        <ul className="legal-list">
          <li>Post misleading, fraudulent, or harmful content.</li>
          <li>Violate intellectual property or privacy rights of others.</li>
          <li>Use Campus Hustle for unsolicited promotions or spam.</li>
          <li>Exploit hackathon prizes or scholarships unfairly.</li>
          <li>Post or share content that is abusive, defamatory, or violent.</li>
        </ul>

        <h2 className="legal-subtitle">5. Community Guidelines</h2>
        <ul className="legal-list">
          <li>Respect all users regardless of their background, gender, religion, or academic level.</li>
          <li>Maintain professionalism while collaborating in freelance or mentorship.</li>
          <li>Disagreements should be handled respectfully; harassment or bullying is not tolerated.</li>
        </ul>

        <h2 className="legal-subtitle">6. Hackathons & Events</h2>
        <ul className="legal-list">
          <li>Users must register with accurate details.</li>
          <li>Plagiarized or duplicate submissions will be disqualified.</li>
          <li>Judging decisions are final and cannot be contested.</li>
          <li>Participants are expected to maintain integrity throughout the event.</li>
        </ul>

        <h2 className="legal-subtitle">7. Scholarships</h2>
        <ul className="legal-list">
          <li>Campus Hustle curates scholarships but does not guarantee selection or funding.</li>
          <li>All applications must be truthful; false claims can lead to permanent bans.</li>
          <li>We are not liable for decisions taken by third-party scholarship providers.</li>
        </ul>

        <h2 className="legal-subtitle">8. Freelance Marketplace</h2>
        <ul className="legal-list">
          <li>Clients and freelancers must agree on terms clearly before project initiation.</li>
          <li>Campus Hustle is not liable for payment disputes between users.</li>
          <li>Disputes can be escalated to our support team but will be resolved on a case-by-case basis.</li>
        </ul>

        <h2 className="legal-subtitle">9. Mentorship</h2>
        <ul className="legal-list">
          <li>Mentors are screened before being onboarded to ensure quality.</li>
          <li>Session recordings may be stored for quality and dispute resolution.</li>
          <li>Users are expected to behave courteously with mentors and peers.</li>
        </ul>

        <h2 className="legal-subtitle">10. Intellectual Property</h2>
        <p className="legal-paragraph">
          Campus Hustle and all its features (logos, design, illustrations, code) are the intellectual property of Campus
          Hustle. You may not copy, modify, reproduce, or distribute any part of the platform without written consent.
        </p>

        <h2 className="legal-subtitle">11. Termination</h2>
        <p className="legal-paragraph">
          We reserve the right to terminate or suspend access to your account at any time without notice if you breach
          these terms or engage in any conduct deemed harmful to the platform.
        </p>

        <h2 className="legal-subtitle">12. Liability Disclaimer</h2>
        <p className="legal-paragraph">
          Campus Hustle is not responsible for any loss, damage, or dissatisfaction arising from the use of our platform
          or services. We provide opportunities but cannot guarantee outcomes like scholarship selection or job placement.
        </p>

        <h2 className="legal-subtitle">13. Updates to Terms</h2>
        <p className="legal-paragraph">
          We may update these Terms from time to time. When we do, we will notify users through the platform or email.
          Continued use after updates indicates acceptance of the new Terms.
        </p>

        <h2 className="legal-subtitle">14. Governing Law</h2>
        <p className="legal-paragraph">
          These Terms are governed by the laws of India. Any legal disputes will be resolved in the courts of Delhi,
          India.
        </p>

        <h2 className="legal-subtitle">15. Contact</h2>
        <p className="legal-paragraph">
          If you have any questions regarding these Terms and Conditions, please contact us:
          <br />
          <strong>Email:</strong> legal@campushustle.in
          <br />
          <strong>Phone:</strong> +91-98765-43210
          <br />
          <strong>Address:</strong> Campus Hustle HQ, New Delhi, India
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
