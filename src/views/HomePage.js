import React from 'react';
import './HomePage.css';
// Video and Logo
import videoSrc from '../assets/images/CL.mp4';
import logo from '../assets/images/CL1.png';
import footerLogo from '../assets/images/CL2.png';

// GIFs
import freelanceGif from '../assets/images/freelance.gif';
import mentorshipGif from '../assets/images/mentorship.gif';
import communityGif from '../assets/images/community.gif';
import budgetingGif from '../assets/images/budgeting.gif';
import webinarsGif from '../assets/images/webinars.gif';
import scholarshipGif from '../assets/images/scholarship.gif';

// Team Images
import anshulImg from '../assets/images/anshulsaxena.png';
import avanyaImg from '../assets/images/avanya.png';
import mahiraImg from '../assets/images/mahiraa.png';
import gourikaImg from '../assets/images/gourika1.png';

const HomePage = () => {
  return (
    <>
      {/* Top Strip */}
      <div className="top-strip">
        <img src={logo} alt="Campus Link Logo" className="strip-logo" />
        <ul className="strip-nav">
          <li><a href="#">Home</a></li>
          <li><a href="#">Freelance</a></li>
          <li><a href="#">Hackathons</a></li>
          <li><a href="#">Mentorship</a></li>
          <li><a href="#">Events</a></li>
          <li><a href="#">Dashboard</a></li>
          <li><a href="#">Log In</a></li>
          <li><a href="#" className="signup">Sign Up</a></li>
        </ul>
      </div>

      {/* Header Section */}
      <header>
        <div className="video-container">
          <video autoPlay muted loop playsInline>
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        </div>

        <div className="video-overlay-text">
          <h1>Campus Link – Where<br />Hustlers Hangout</h1>
        </div>

        <div className="search-bar-wrapper">
          <form>
            <input type="search" placeholder="Search our services ..." />
            <i className="fa fa-search"></i>
          </form>
        </div>

        <div className="tag-buttons-below">
          <button className="tag-button">Freelance</button>
          <button className="tag-button">Budget Planner</button>
          <button className="tag-button">Scholarships</button>
          <button className="tag-button">Team Finder</button>
        </div>
      </header>

      {/* Categories Section */}
      <section className="category-section">
        <h2 className="section-title">
          <span className="light-text">Explore By </span>
          <span className="dark-text">Category</span>
        </h2>

        <div className="category-container">
          {[
            { src: freelanceGif, title: 'Freelance' },
            { src: mentorshipGif, title: 'Mentorship' },
            { src: communityGif, title: 'Community' },
            { src: budgetingGif, title: 'Budgeting' },
            { src: webinarsGif, title: 'Webinars' },
            { src: scholarshipGif, title: 'Scholarship' }
          ].map((item, index) => (
            <a href="#" className="category-box" key={index}>
              <div className="category-inner-box">
                <img src={item.src} alt={item.title} />
              </div>
              <span className="category-title">{item.title}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="team-members">
        <h2>Our Team Members</h2>
        <div className="team-boxes">
          {[
            { src: anshulImg, name: 'ANSHUL SAXENA', circle: 'photo-circle1' },
            { src: avanyaImg, name: 'AVANYA SHARMA', circle: 'photo-circle' },
            { src: mahiraImg, name: 'MAHIRA KHAN', circle: 'photo-circle2' },
            { src: gourikaImg, name: 'GOURIKA BUDHIRAJA', circle: 'photo-circle' }
          ].map((member, index) => (
            <div className="team-box" key={index}>
              <div className={member.circle}>
                <img src={member.src} alt={member.name} />
              </div>
              <h3>{member.name}</h3>
              <p>Dr Akhilesh Das Gupta Institute Of Professional Studies</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Info */}
      <section style={{ minHeight: '100vh', padding: '100px 20px', backgroundColor: '#fff' }}>
        <h2 style={{ textAlign: 'center', color: '#572E54' }}>Our Services</h2>
        <p style={{ textAlign: 'center' }}>
          Details about freelance, budget planning, scholarships, and more...
        </p>
      </section>

      {/* Footer */}
      <footer>
        <span className="footer-container">
          <span className="footer-logo">
            <img src={footerLogo} alt="Logo" />
            <h2>CampusHustle</h2>
          </span>
          {[
            {
              title: 'Company',
              links: ['About Us', 'Careers', 'Press']
            },
            {
              title: 'Quick Links',
              links: ['Home', 'Services', 'Contact']
            },
            {
              title: 'Support',
              links: ['Help Center', 'Privacy Policy', 'Terms & Conditions']
            }
          ].map((section, index) => (
            <span className="footer-column" key={index}>
              <h4>{section.title}</h4>
              <ul>
                {section.links.map((link, i) => (
                  <li key={i}><a href="#">{link}</a></li>
                ))}
              </ul>
            </span>
          ))}
        </span>
      </footer>
    </>
  );
};

export default HomePage;
