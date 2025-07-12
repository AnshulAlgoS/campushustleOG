// src/components/scholarship.js
import React from 'react';
import './scholarship.css';

const scholarships = [
  {
    name: "TechStars Excellence Scholarship",
    amount: "₹50,000 + Internship",
    deadline: "31 July 2025",
    eligibility: "Students in 2nd/3rd year of B.Tech",
    details: "Offered to top performers in tech domains with leadership experience.",
    link: "#"
  },
  {
    name: "CodeForIndia Challenge Grant",
    amount: "₹1,00,000 + Mentorship",
    deadline: "10 August 2025",
    eligibility: "Open to all coding enthusiasts",
    details: "Participate in an open-source hackathon and submit a project.",
    link: "#"
  },
  {
    name: "Women in STEM Fellowship",
    amount: "₹75,000",
    deadline: "25 July 2025",
    eligibility: "Female students in STEM fields",
    details: "Awarded to top-performing female students in engineering & sciences.",
    link: "#"
  },
  {
    name: "HackBright Future Fund",
    amount: "₹60,000 + Bootcamp Access",
    deadline: "15 August 2025",
    eligibility: "Final year B.Tech students",
    details: "Best suited for students pursuing careers in AI/ML and startups.",
    link: "#"
  }
];

const Scholarship = () => {
  return (
    <section className="scholarship-flag-section">
      <h2 className="scholarship-heading">Featured Scholarships</h2>
      
      <p className="scholarship-subtext">
        Explore exclusive scholarships designed to support your academic dreams and tech journey. 
        Whether you're looking for internships, mentorship, or financial support — we've got you covered.
        These scholarships are curated for passionate learners, innovators, and future leaders.
        Apply now and take one step closer to your goals!
      </p>

      <div className="scholarship-flag-wrapper">
        {scholarships.map((sch, index) => (
          <div className="scholarship-flag-card" key={index}>
            <h3 className="sch-name">{sch.name}</h3>
            <p className="sch-amount">{sch.amount}</p>
            <p className="sch-eligibility"><strong>Eligibility:</strong> {sch.eligibility}</p>
            <p className="sch-details">{sch.details}</p>
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


