import React, { useEffect } from 'react';
import './HelpCenter.css';

const HelpCenter = () => {
  useEffect(() => {
    document.title = 'Help Center | Campus Hustle';
  }, []);

  return (
    <div className="help-gradient">
      <div className="help-container">
        <h1 className="help-title">Help Center</h1>

        <p className="help-paragraph">
          Welcome to the Campus Hustle Help Center – your one-stop destination for all queries, troubleshooting,
          and guidance related to our platform.
        </p>

        <h2 className="help-subtitle">Getting Started with Campus Hustle</h2>
        <p className="help-paragraph">
          Campus Hustle is a platform built by students, for students...
        </p>
        <ul className="help-list">
          <li>Create an account using your email or college ID.</li>
          <li>Complete your profile with interests, skills, and goals.</li>
          <li>Explore the dashboard to find hackathons, gigs, and community events.</li>
        </ul>

        <h2 className="help-subtitle">Profile Setup & Dashboard</h2>
        <p className="help-paragraph">
          Your profile helps us connect you with the right opportunities...
        </p>
        <ul className="help-list">
          <li>Add a professional photo.</li>
          <li>Mention your tech stack or academic interests.</li>
          <li>Join communities based on your college or state.</li>
        </ul>

        <h2 className="help-subtitle">Hackathons</h2>
        <p className="help-paragraph">We host both our own and partner hackathons.</p>
        <ul className="help-list">
          <li>Go to the “Hackathon” section.</li>
          <li>Choose from ongoing/upcoming events.</li>
          <li>Register solo or with a team.</li>
          <li>Submit your project before the deadline.</li>
        </ul>
        <p className="help-paragraph"><strong>Pro Tip:</strong> Use our Budget Planner to estimate team costs or hardware needs.</p>

        <h2 className="help-subtitle">Freelance Marketplace</h2>
        <ul className="help-list">
          <li>Visit the “Freelance” tab.</li>
          <li>Browse gigs (Design, Web Dev, Marketing, etc.).</li>
          <li>Submit your proposal.</li>
          <li>Use Campus Hustle Chat to interact with clients.</li>
        </ul>

        <h2 className="help-subtitle">Mentorship</h2>
        <ul className="help-list">
          <li>Choose mentors based on your domain: coding, design, product, etc.</li>
          <li>Book 1-on-1 slots or attend webinars.</li>
          <li>Share your goals and get career advice.</li>
        </ul>

        <h2 className="help-subtitle">Scholarships</h2>
        <ul className="help-list">
          <li>Browse both local and international scholarships curated for Indian students.</li>
          <li>Apply filters by category, country, deadline, and amount.</li>
        </ul>

        <h2 className="help-subtitle">Events & Team Finder</h2>
        <ul className="help-list">
          <li>Use “Team Finder” to connect with collaborators.</li>
          <li>Post your event and invite members.</li>
          <li>Collaborate using built-in tools.</li>
        </ul>

        <h2 className="help-subtitle">Community & Discussions</h2>
        <ul className="help-list">
          <li>Join your college’s Campus Hustle group.</li>
          <li>Ask doubts, share resources, and get peer support.</li>
          <li>Follow moderators for curated content.</li>
        </ul>

        <h2 className="help-subtitle">Security & Reporting</h2>
        <ul className="help-list">
          <li>Use the “Report” button for any suspicious user or post.</li>
          <li>Block users if you experience harassment.</li>
          <li>Reports are reviewed within 24–48 hours.</li>
        </ul>

        <h2 className="help-subtitle">Account Settings</h2>
        <ul className="help-list">
          <li>Edit your name, college, or bio anytime.</li>
          <li>Set privacy preferences for profile sections.</li>
          <li>Enable two-step login under settings.</li>
        </ul>

        <h2 className="help-subtitle">Still Need Help?</h2>
        <p className="help-paragraph">
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
