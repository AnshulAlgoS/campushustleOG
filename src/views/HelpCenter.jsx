import React, { useEffect } from 'react';

const HelpCenter = () => {
  useEffect(() => {
    document.title = 'Help Center | Campus Hustle';
  }, []);

  return (
    <div className="legal-gradient">
      <div className="legal-page-container">
        <h1 className="legal-title">Help Center</h1>

        <p className="legal-paragraph">
          Welcome to the Campus Hustle Help Center – your one-stop destination for all queries, troubleshooting,
          and guidance related to our platform.
        </p>

        <h2 className="legal-subtitle">Getting Started with Campus Hustle</h2>
        <p className="legal-paragraph">
          Campus Hustle is a platform built by students, for students. Whether you want to apply for internships,
          participate in hackathons, explore scholarships, or connect with mentors – we’ve got you covered.
        </p>
        <ul className="legal-list">
          <li>Create an account using your email or college ID.</li>
          <li>Complete your profile with interests, skills, and goals.</li>
          <li>Explore the dashboard to find hackathons, gigs, and community events.</li>
        </ul>

        <h2 className="legal-subtitle">Profile Setup & Dashboard</h2>
        <p className="legal-paragraph">
          Your profile helps us connect you with the right opportunities. A complete profile boosts your chances
          of selection for scholarships or hackathons.
        </p>
        <ul className="legal-list">
          <li>Add a professional photo.</li>
          <li>Mention your tech stack or academic interests.</li>
          <li>Join communities based on your college or state.</li>
        </ul>

        <h2 className="legal-subtitle">Hackathons</h2>
        <p className="legal-paragraph">We host both our own and partner hackathons.</p>
        <ul className="legal-list">
          <li>Go to the “Hackathon” section.</li>
          <li>Choose from ongoing/upcoming events.</li>
          <li>Register solo or with a team.</li>
          <li>Submit your project before the deadline.</li>
        </ul>
        <p className="legal-paragraph"><strong>Pro Tip:</strong> Use our Budget Planner to estimate team costs or hardware needs.</p>

        <h2 className="legal-subtitle">Freelance Marketplace</h2>
        <ul className="legal-list">
          <li>Visit the “Freelance” tab.</li>
          <li>Browse gigs (Design, Web Dev, Marketing, etc.).</li>
          <li>Submit your proposal.</li>
          <li>Use Campus Hustle Chat to interact with clients.</li>
        </ul>

        <h2 className="legal-subtitle">Mentorship</h2>
        <ul className="legal-list">
          <li>Choose mentors based on your domain: coding, design, product, etc.</li>
          <li>Book 1-on-1 slots or attend webinars.</li>
          <li>Share your goals and get career advice.</li>
        </ul>

        <h2 className="legal-subtitle">Scholarships</h2>
        <ul className="legal-list">
          <li>Browse both local and international scholarships curated for Indian students.</li>
          <li>Apply filters by category, country, deadline, and amount.</li>
        </ul>

        <h2 className="legal-subtitle">Events & Team Finder</h2>
        <ul className="legal-list">
          <li>Use “Team Finder” to connect with collaborators.</li>
          <li>Post your event and invite members.</li>
          <li>Collaborate using built-in tools.</li>
        </ul>

        <h2 className="legal-subtitle">Community & Discussions</h2>
        <ul className="legal-list">
          <li>Join your college’s Campus Hustle group.</li>
          <li>Ask doubts, share resources, and get peer support.</li>
          <li>Follow moderators for curated content.</li>
        </ul>

        <h2 className="legal-subtitle">Security & Reporting</h2>
        <ul className="legal-list">
          <li>Use the “Report” button for any suspicious user or post.</li>
          <li>Block users if you experience harassment.</li>
          <li>Reports are reviewed within 24–48 hours.</li>
        </ul>

        <h2 className="legal-subtitle">Account Settings</h2>
        <ul className="legal-list">
          <li>Edit your name, college, or bio anytime.</li>
          <li>Set privacy preferences for profile sections.</li>
          <li>Enable two-step login under settings.</li>
        </ul>

        <h2 className="legal-subtitle">Still Need Help?</h2>
        <p className="legal-paragraph">
          If your issue is unresolved, feel free to reach out:
          <br />
          <strong>Email:</strong> support@campushustle.in
          <br />
          <strong>Phone:</strong> +91-98765-43210
          <br />
          <strong>Discord:</strong> discord.gg/campushustle
        </p>
      </div>
    </div>
  );
};

export default HelpCenter;
