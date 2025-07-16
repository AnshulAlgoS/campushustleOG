import React from 'react';
import './Mentorship.css';
import anshulImg from '../assets/images/anshulsaxena.png';
import avanyaImg from '../assets/images/avanya.png';
import mahiraImg from '../assets/images/mahiraa.png';
import gourikaImg from '../assets/images/gourika1.png';

const mentors = [
  {
    name: 'Anshul Saxena',
    role: 'SDE Intern @ Microsoft',
    expertise: ['Web Dev', 'Public Speaking', 'Resume Review'],
    image: anshulImg
  },
  {
    name: 'Avanya Sharma',
    role: 'Product Manager @ Startup',
    expertise: ['Web Dev','Product Management', 'Career Planning'],
    image: avanyaImg
  },
  {
    name: 'Gourika',
    role: 'AI Research Intern',
    expertise: ['Web Dev','ML/AI', 'Open Source'],
    image: gourikaImg
  },
  {
    name: 'Mahira Khan',
    role: 'Software Development Engineer',
    expertise: ['Web Dev','DSA', 'Networking'],
    image: mahiraImg
  }
];

const Mentorship = () => {
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

      {/* How It Works Section */}
      <section className="how-it-works" data-aos="fade-up">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Browse Mentors</h3>
            <p>Choose mentors based on their skills & experience.</p>
          </div>

          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Book a Session</h3>
            <p>Pick a time slot that works for you.</p>
          </div>

          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Get Guidance</h3>
            <p>Join the session and get actionable advice.</p>
          </div>
        </div>
      </section>

      {/* Mentor Cards Section */}
      <section className="mentors-section" data-aos="fade-up">
        <h2>Meet Our Mentors</h2>
        <div className="mentors-container">
          {mentors.map((mentor, index) => (
            <div key={index} className="mentor-card">
              <img src={mentor.image} alt={mentor.name} />
              <h3>{mentor.name}</h3>
              <p className="mentor-role">{mentor.role}</p>
              <div className="mentor-tags">
                {mentor.expertise.map((tag, idx) => (
                  <span key={idx} className="mentor-tag">{tag}</span>
                ))}
              </div>
              <button className="book-btn">Book Now</button>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section" data-aos="fade-up">
        <h2>Why Join Mentorship?</h2>
        <ul className="benefits-list">
          <li> Real Career Insights from Industry Experts</li>
          <li> Mock Interviews & Feedback</li>
          <li> Personalized Resume & Portfolio Guidance</li>
          <li> Expand Your Network & Build Connections</li>
          <li> Get a Custom Growth Roadmap</li>
        </ul>
      </section>

      {/* CTA Footer Section */}
      <section className="mentorship-cta-footer" data-aos="fade-up">
        <h2>Ready to Level Up?</h2>
        <p>Join Campus Hustle Mentorship and get the guidance you need to succeed.</p>
        <button className="mentorship-cta-btn">Join Now</button>
      </section>

    </div>
  );
};

export default Mentorship;
