import React, { useState } from 'react';
import './Mentorship.css';
import HitenImg from '../assets/images/Hiten.png';
import ShradhaImg from '../assets/images/shradha.png';
import NeerajImg from '../assets/images/Neeraj.png';
import TharunImg from '../assets/images/Tharun.png';

const mentors = [
  { name: 'Neeraj Walia', role: 'Technical lead/project manager', image: NeerajImg },
  { name: 'Shradha Khapra', role: 'Co-Founder, Apna College, Ex-SDE Microsoft', image: ShradhaImg },
  { name: 'Hiten Lulla', role: '2x TEDx Speaker | Software Engineer', image: HitenImg },
  { name: 'Tharun Naik', role: '3X TEDx Speaker | IIT KGP 23', image: TharunImg }
];

const Mentorship = () => {
  const [showForm, setShowForm] = useState(false);

  const handleFormOpen = () => setShowForm(true);
  const handleFormClose = () => setShowForm(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here (API or console)
    alert("Application submitted successfully!");
    setShowForm(false);
  };

  return (
    <div className="mentorship-page">

      {/* Hero Section */}
      <section className="mentorship-hero">
        <div className="mentorship-hero-content" data-aos="fade-up">
          <h1>Unlock Your Potential with Mentorship</h1>
          <p>Connect with experienced mentors for personalized guidance on careers, skills, and student life.</p>
          <button className="mentorship-cta-btn">Find a Mentor</button>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works" data-aos="fade-up">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step-card"><div className="step-number">1</div><h3>Browse Mentors</h3><p>Choose mentors based on their skills & experience.</p></div>
          <div className="step-card"><div className="step-number">2</div><h3>Book a Session</h3><p>Pick a time slot that works for you.</p></div>
          <div className="step-card"><div className="step-number">3</div><h3>Get Guidance</h3><p>Join the session and get actionable advice.</p></div>
        </div>
      </section>

      {/* Mentor Cards */}
      <section className="mentors-section" data-aos="fade-up">
        <h2>Meet Our Mentors</h2>
        <div className="mentors-container">
          {mentors.map((mentor, index) => (
            <div key={index} className="mentor-card">
              <img src={mentor.image} alt={mentor.name} />
              <h3>{mentor.name}</h3>
              <p className="mentor-role">{mentor.role}</p>
              <button className="book-btn">Book Now</button>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="benefits-section" data-aos="fade-up">
        <h2>Why Join Mentorship?</h2>
        <ul className="benefits-list">
          <li>Real Career Insights from Industry Experts</li>
          <li>Mock Interviews & Feedback</li>
          <li>Personalized Resume & Portfolio Guidance</li>
          <li>Expand Your Network & Build Connections</li>
          <li>Get a Custom Growth Roadmap</li>
        </ul>
      </section>

      {/* Footer CTA */}
      <section className="mentorship-cta-footer" data-aos="fade-up">
        <h2>Ready to Level Up?</h2>
        <p>Join Campus Hustle Mentorship and get the guidance you need to succeed.</p>
        <button className="mentorship-cta-btn" onClick={handleFormOpen}>Join Now</button>
      </section>

      {/* Student Join Form (Modal) */}
      {showForm && (
        <div className="modal-overlay">
          <div className="form-modal">
            <h2>Join as a Mentee</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Full Name" required />
              <input type="email" name="email" placeholder="Email" required />
              <input type="text" name="year" placeholder="Your Year (e.g. 1st, 2nd)" required />
              <textarea name="help" placeholder="What do you want guidance on?" required />
              <div className="form-buttons">
                <button type="submit" className="submit-btn">Submit</button>
                <button type="button" className="cancel-btn" onClick={handleFormClose}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mentorship;

  
            
       
