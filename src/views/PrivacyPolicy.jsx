import React, { useEffect } from 'react';

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = 'Privacy Policy | Campus Hustle';
  }, []);

  return (
    <div className="legal-page-container">
      <h1 className="legal-title">Privacy Policy</h1>
      <p className="legal-paragraph">
         Campus Hustle – Privacy Policy

Effective Date: July 2025

At Campus Hustle, we respect your privacy and are committed to protecting it. This Privacy Policy explains how we collect, use, and protect your information when you use our platform.

1. Information We Collect:
- Name, email, college, profile photo, skills, and preferences
- Login credentials via email or OAuth (Google)
- Usage data such as page visits, clicks, and interactions
- Uploaded documents (resumes, certificates, etc.)

2. How We Use Your Data:
- Match users with relevant opportunities (scholarships, gigs, teams)
- Provide personalized dashboards and community feeds
- Notify you of updates via email or in-app notifications
- Improve UX by analyzing user interactions

3. Data Sharing:
- We never sell your data.
- We may share anonymized usage data with partners for research.
- Third-party services (e.g., Lottie animations, analytics tools) may process data as per their own policies.

4. Cookies & Tracking:
- We use essential cookies to enable login and save session data.
- Analytics tools may use cookies to gather performance metrics.

5. Data Retention:
- Your data is stored securely and retained for as long as your account is active.
- You may request deletion by contacting support.

6. Children’s Privacy:
- Campus Hustle is intended for users 13+ years old.
- If you are under 13, please do not register or submit personal information.

7. Changes to This Policy:
- You will be notified of changes via the website or email.

Contact Us:
support@campushustle.in

      </p>
      <p className="legal-paragraph">
        Your data is never sold or shared with third parties. You’re always in control.
      </p>
    </div>
  );
};

export default PrivacyPolicy;

