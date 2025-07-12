// src/components/Scholarship.js
import React from 'react';
import './Scholarship.css';

const scholarships = [
  {
    name: "TechStars Excellence Scholarship",
    amount: "₹50,000 + Internship",
    deadline: "31 July 2025",
    details: "Open for final-year tech students with leadership experience and a GPA above 8.0. Includes a summer internship with stipend and mentorship."
  },
  {
    name: "CodeForIndia Challenge Grant",
    amount: "₹1,00,000 + Mentorship",
    deadline: "10 August 2025",
    details: "Awarded to 10 outstanding coders who demonstrate social impact through technology. Includes funding for personal projects and startup ideas."
  },
  {
    name: "Women in STEM Fellowship",
    amount: "₹75,000",
    deadline: "25 July 2025",
    details: "For women pursuing CS/IT/Engineering, this fellowship supports career growth and education-related expenses."
  },
  {
    name: "HackBright Future Fund",
    amount: "₹60,000 + Bootcamp Access",
    deadline: "15 August 2025",
    details: "Meant for students who have participated in at least one national hackathon. Covers bootcamp registration, travel, and lodging."
  }
];

const Scholarship = () => {
  return (
    <section className="scholarship-flag-section">
      <h2 className="scholarship-heading">Featured Scholarships</h2>

      <p className="scholarship-subtext">
        Explore exclusive scholarships designed to support your academic dreams and tech journey. Whether you're looking for internships, mentorship, or financial support — we've got you covered. These scholarships are curated for passionate learners, innovators, and future leaders. Apply now and take one step closer to your goals!
      </p>

      <div className="scholarship-flag-wrapper">
        {scholarships.map((sch, index) => (
          <div className="scholarship-flag-card" key={index}>
            <h3 className="sch-name">{sch.name}</h3>
            <p className="sch-amount">{sch.amount}</p>
            <p className="sch-description">{sch.details}</p>
            <div className="sch-bottom">
              <span className="sch-deadline">⏳ {sch.deadline}</span>
              <a href="#" className="sch-apply-btn">Apply Now</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Scholarship;



