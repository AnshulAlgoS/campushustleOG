import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './HomePage.css';
import slide1 from '../assets/images/img1.jpg';
import slide2 from '../assets/images/img2.jpg';
import slide3 from '../assets/images/img3.jpg';
import slide4 from '../assets/images/img4.jpg';
import slide5 from '../assets/images/img5.jpg';
import logo from '../assets/images/CL1.png';
import footerLogo from '../assets/images/CL2.png';
import freelanceGif from '../assets/images/freelance.gif';
import mentorshipGif from '../assets/images/mentorship.gif';
import communityGif from '../assets/images/community.gif';
import budgetingGif from '../assets/images/budgeting.gif';
import webinarsGif from '../assets/images/webinars.gif';
import scholarshipGif from '../assets/images/scholarship.gif';
import anshulImg from '../assets/images/anshulsaxena.png';
import avanyaImg from '../assets/images/avanya.png';
import mahiraImg from '../assets/images/mahiraa.png';
import gourikaImg from '../assets/images/gourika1.png';
import UserMenu from '../components/UserMenu';
import CommunitySection from './community';

const slides = [slide1, slide2, slide3, slide4, slide5];

const HomePage = ({ navigateTo, openAuthModal, user, handleLogout, onProfileClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const communityRef = useRef(null);
  const testimonialRef = useRef(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonialInterval = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    testimonialInterval.current = setInterval(() => {
      handleTestimonialScroll('right');
    }, 5000);
    return () => clearInterval(testimonialInterval.current);
  }, [activeTestimonial]);


  const handleCategoryClick = (title) => {
   if (title === 'Hackathons') {
  navigateTo('hackathon');
} else if (title === 'Freelance') {
  navigateTo('freelance');
} else if (title === 'Community') {
  communityRef.current?.scrollIntoView({ behavior: 'smooth' });
}
  };
  const testimonials = [
    { name: 'Mahira', image: mahiraImg, text: `I can't speak highly enough about CampusHustle! The platform is intuitive and easy to navigate, and the content quality is exceptional.` },
    { name: 'Avanya', image: avanyaImg, text: `This platform truly elevated my learning experience. Highly recommend to all students.` },
    { name: 'Gourika', image: gourikaImg, text: `great peer group, experienced mentors, hackathons — everything in one place.` },
    { name: 'Anshul', image: anshulImg, text: `The UI is clean and responsive. Great work by the CampusHustle team!` },
  ];

  const scrollToTestimonial = (index) => {
    const container = testimonialRef.current;
    const cardWidth = container.children[0].offsetWidth + 24;
    container.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
    setActiveTestimonial(index);
  };

  const handleTestimonialScroll = (dir) => {
    let newIndex = activeTestimonial + (dir === 'right' ? 1 : -1);
    if (newIndex >= testimonials.length) newIndex = 0;
    if (newIndex < 0) newIndex = testimonials.length - 1;
    scrollToTestimonial(newIndex);
  };

  const handleManualClick = (dir) => {
    clearInterval(testimonialInterval.current);
    handleTestimonialScroll(dir);
  };


  return (
    <>
      {/* Top Strip */}
      <div className="top-strip">
  <img src={logo} alt="Campus Link Logo" className="strip-logo" />

  {/* ✅ Desktop Nav */}
  <nav className="navbar-desktop">
    <ul className="strip-nav">
      <li><a href="#">Home</a></li>
      <li><a href="#">Freelance</a></li>
      <li><a href="#">Hackathons</a></li>
      <li><a href="#">Community</a></li>
      <li><a href="#">About Us</a></li>
      <li>
        {user ? (
          <UserMenu user={user} onLogout={handleLogout} onProfileClick={onProfileClick} />
        ) : (
          <a href="#" className="signup" onClick={(e) => { e.preventDefault(); openAuthModal(); }}>
            Get Started
          </a>
        )}
      </li>
    </ul>
  </nav>

  {/* ✅ Mobile Nav */}
  <div className="navbar-mobile">
    <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
    {menuOpen && (
      <ul className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
      <li><a href="#">Home</a></li>
      <li><a href="#">Freelance</a></li>
      <li><a href="#">Hackathons</a></li>
      <li><a href="#">Community</a></li>
      <li><a href="#">About Us</a></li>
        <li>
          {user ? (
            <UserMenu user={user} onLogout={handleLogout} onProfileClick={onProfileClick} />
          ) : (
            <a href="#" className="signup" onClick={(e) => { e.preventDefault(); openAuthModal(); }}>
              Get Started
            </a>
          )}
        </li>
      </ul>
    )}
  </div>
</div>




      {/* Hero Section */}
      <header>
        <div className="slideshow-container">
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide}
              alt={`Slide ${index + 1}`}
              className={`slide-image ${index === currentSlide ? 'active' : ''}`}
            />
          ))}
        </div>



        <div className="video-overlay-text">
          <h1>Campus Hustle – Where<br />Hustlers Hangout</h1>
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

      {/* Category Section */}
      <section className="category-section">
        <h2 className="section-title">
          <span className="light-text">Explore By </span>
          <span className="dark-text">Category</span>
        </h2>
        <div className="category-container">
          {[{ src: freelanceGif, title: 'Freelance' }, { src: mentorshipGif, title: 'Mentorship' }, { src: communityGif, title: 'Community' }, { src: budgetingGif, title: 'Budgeting' }, { src: webinarsGif, title: 'Hackathons' }, { src: scholarshipGif, title: 'Scholarship' }].map((item, index) => (
            <div
              key={index}
              className="category-box"
              onClick={() => handleCategoryClick(item.title)}
              style={{ cursor: 'pointer' }}
            >
              <div className="category-inner-box">
                <img src={item.src} alt={item.title} />
              </div>
              <span className="category-title">{item.title}</span>
            </div>
          ))}
        </div>
      </section>
munitySection />
      </div>
      {/* === Scholarships Section === */}
<section className="scholarship-home-section" ref={scholarshipRef}>
  <h2 className="scholarship-heading-home">
    <span className="light-text">Apply for </span>
    <span className="bold-highlight">Best Scholarships 🎓</span>
  </h2>

  <p className="scholarship-intro-home">
    Unlock your true potential with exclusive scholarships tailored for <strong>young innovators, leaders, and coders</strong>.<br />
    <span className="bold-apply">Apply now</span> and give your dreams the wings they deserve. Don’t let financial constraints hold you back!
  </p>

  <div className="scholarship-cards-home">
    <div className="scholarship-card-home">
      <h4>💡 Tech Spark Award</h4>
      <p>For students excelling in open-source & innovation challenges.</p>
      <button className="apply-btn">Apply</button>
    </div>
    <div className="scholarship-card-home">
      <h4>🚀 HackStar Scholarship</h4>
      <p>Recognizing top performers in student-led hackathons.</p>
      <button className="apply-btn">Apply</button>
    </div>
    <div className="scholarship-card-home">
      <h4>👩‍💻 Women in Tech Grant</h4>
      <p>Empowering girls in tech to lead and innovate fearlessly.</p>
      <button className="apply-btn">Apply</button>
    </div>
    <div className="scholarship-card-home">
      <h4>🌟 Future Leaders Fund</h4>
      <p>For students showing leadership in tech communities.</p>
      <button className="apply-btn">Apply</button>
    </div>
  </div>
</section>

      {/* Community Section */}
      <div ref={communityRef}>
        <CommunitySection />
      </div>

      {/* Testimonials Section */}
      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What Our Users Say</h2>

        <div className="testimonial-carousel">
          <button
            onClick={() => handleManualClick('left')}
            className="arrow-btn left"
          >
            <ChevronLeft size={24} />
          </button>

          <div
            ref={testimonialRef}
            className="testimonial-scroll-container"
          >
            {testimonials.map((t, index) => (
              <div key={index} className="testimonial-card">
                <p>“{t.text}”</p>
                <div className="testimonial-user">
                  <img src={t.image} alt={t.name} />
                  <span>{t.name}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => handleManualClick('right')}
            className="arrow-btn right"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="testimonial-dots">
          {testimonials.map((_, i) => (
            <span
              key={i}
              className={i === activeTestimonial ? 'active' : ''}
            />
          ))}
        </div>
      </section>


      {/* Footer */}
      <footer>
        <span className="footer-container">
          <span className="footer-logo">
            <img src={footerLogo} alt="Logo" />
            <h2>CampusHustle</h2>
          </span>
          {[{ title: 'Company', links: ['About Us', 'Careers', 'Press'] }, { title: 'Quick Links', links: ['Home', 'Services', 'Contact'] }, { title: 'Support', links: ['Help Center', 'Privacy Policy', 'Terms & Conditions'] }].map((section, index) => (
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
