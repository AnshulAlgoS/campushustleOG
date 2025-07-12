// src/components/Scholarship.js
import React from 'react';
import './Scholarship.css';

const scholarships = [
  {
    name: "TechStars Excellence Scholarship",
    amount: "₹50,000 + Internship",
    deadline: "31 July 2025",
    link: "#"
  },
  {
    name: "CodeForIndia Challenge Grant",
    amount: "₹1,00,000 + Mentorship",
    deadline: "10 August 2025",
    link: "#"
  },
  {
    name: "Women in STEM Fellowship",
    amount: "₹75,000",
    deadline: "25 July 2025",
    link: "#"
  },
  {
    name: "HackBright Future Fund",
    amount: "₹60,000 + Bootcamp Access",
    deadline: "15 August 2025",
    link: "#"
  }
];

const Scholarship = () => {
  return (
    <section className="scholarship-flag-section">
      <h2 className="scholarship-heading">Featured Scholarships</h2>
      <div className="scholarship-flag-wrapper">
        {scholarships.map((sch, index) => (
          <div className="scholarship-flag-card" key={index}>
            <h3 className="sch-name">{sch.name}</h3>
            <p className="sch-amount">{sch.amount}</p>
            <div className="sch-bottom">
              <span className="sch-deadline">⏳ {sch.deadline}</span>
              <a href={sch.link} className="sch-apply-btn">Apply Now</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Scholarship;

