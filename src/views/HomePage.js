import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './HomePage.css';
import slide1 from '../assets/images/img1.jpg';
import slide2 from '../assets/images/img2.jpg';
import slide3 from '../assets/images/img3.jpg';
import slide4 from '../assets/images/img4.jpg';
import slide5 from '../assets/images/img5.jpg';
import FloatingDoodles from './FloatingDoodle';
import Doodle6Anim from '../assets/images/Blob.json';
import HackathonAnim from '../assets/images/Champion.json';
import ScholarshipAnim from '../assets/images/Developer.json';
import BudgetingAnim from '../assets/images/Event Budgeting Breakdown - Hero.json';
import Doodle2Anim from '../assets/images/Knowledge, Idea, Power, Books, Creativity, Learning Animation icon..json';
import Doodle5Anim from '../assets/images/Loading 40-Paperplane.json';
import FreelanceAnim from '../assets/images/Man work from home with laptops.json';
import Doodle3Anim from '../assets/images/Rocket startup Animation.json';
import DoodleAnim from '../assets/images/Run cycle recreated in Lottie Creator.json';
import MentorshipAnim from '../assets/images/Teacher.json';
import Doodle1Anim from '../assets/images/Welcome-2.json';
import CommunityAnim from '../assets/images/Welcome.json';
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
import Scholarship from './scholarship';

const slides = [slide1, slide2, slide3, slide4, slide5];

const HomePage = ({ navigateTo, openAuthModal, user, handleLogout }) => {
  const navigate = useNavigate();

  const onProfileClick = (tab = 'dashboard') => {
    navigate('/profile-hub', { state: { tab } });
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const communityRef = useRef(null);
  const scholarshipRef = useRef(null);
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
    } else if (title === 'Mentorship') {
      navigate('/mentorship');
    } else if (title === 'Community') {
      communityRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    else if (title === 'Scholarship') {
      scholarshipRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  };
  const testimonials = [
    {
      name: 'Mahira',
      image: mahiraImg,
      text: `I can't speak highly enough about CampusHustle! The platform is intuitive and easy to navigate, and the content quality is exceptional. From the very first interaction, I felt like this was built with students in mind. The structured layout, quick access to resources, and constant improvements make it stand out from the rest.`
    },
    {
      name: 'Avanya',
      image: avanyaImg,
      text: `This platform truly elevated my learning experience. Highly recommend to all students. I was able to connect with peers, take part in events, and track my progress smoothly. The gamified experience and mentor support give it an edge over traditional platforms. Absolutely loved the interactive design.`
    },
    {
      name: 'Gourika',
      image: gourikaImg,
      text: `Great peer group, experienced mentors, hackathons — everything in one place. What I admire the most is the vibrant and active community that keeps you motivated. It's not just a platform, it's a movement for every hustling student who dreams big and works harder.`
    },
    {
      name: 'Anshul',
      image: anshulImg,
      text: `The UI is clean and responsive. Great work by the CampusHustle team! Every section is thoughtfully crafted, whether it's the dashboard, resource hub, or the career roadmap. I’ve genuinely enjoyed using it — the consistent updates and attention to user feedback really show how dedicated the team is.`
    }
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
    <div className="home-page-wrapper">
      <FloatingDoodles />
      <div className="home-page">
        <div classname="home-gradient-bg">
        {/* Top Strip */}
        <div className="top-strip">
          <div className="logo-combo">
            <img src={logo} alt="Campus Hustle Logo" className="strip-logo" />
            <span className="logo-text">CampusHustle</span>
          </div>

          {/*  Desktop Nav */}
          <nav className="navbar-desktop">
            <ul className="strip-nav">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/freelance">Freelance</Link></li>
              <li><Link to="/hackathon">Hackathons</Link></li>
              <li>
                <Link
                  to="/"
                  state={{ scrollTo: 'community' }}
                  onClick={() => { }}
                  className="desktop-link-btn"
                >
                  Community
                </Link>
              </li>

              <li><Link to="/about">About Us</Link></li>
              <li>
                {user ? (
                  <UserMenu
                    user={user}
                    onLogout={handleLogout}
                    onProfileClick={onProfileClick}
                  />
                ) : (
                  <button
                    className="signup"
                    onClick={() => openAuthModal()}
                  >
                    Get Started
                  </button>
                )}
              </li>
            </ul>
          </nav>


          {/* Mobile Nav */}
          <div className="navbar-mobile">
            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</button>

            {menuOpen && (
              <ul className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
                <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
                <li><Link to="/freelance" onClick={() => setMenuOpen(false)}>Freelance</Link></li>
                <li><Link to="/hackathon" onClick={() => setMenuOpen(false)}>Hackathons</Link></li>
                <li><Link to="/" state={{ scrollTo: 'community' }} onClick={() => setMenuOpen(false)}>Community</Link></li>
                <li><Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
                </li>
                <li>
                  {user ? (
                    <UserMenu
                      user={user}
                      onLogout={() => {
                        setMenuOpen(false);
                        handleLogout();
                      }}
                      onProfileClick={() => {
                        setMenuOpen(false);
                        onProfileClick();
                      }}
                    />
                  ) : (
                    <button
                      className="signup"
                      onClick={() => {
                        setMenuOpen(false);
                        openAuthModal();
                      }}
                    >
                      Get Started
                    </button>
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



          <div className="video-overlay-text" data-aos="fade-up">
            <h1>Campus Hustle – Where<br />Hustlers Hangout</h1>
          </div>

          <div className="search-bar-wrapper" data-aos="zoom-in" data-aos-delay="200">
            <form>
              <input type="search" placeholder="Search our services ..." />
              <i className="fa fa-search"></i>
            </form>
          </div>
          <div className="tag-buttons-below" data-aos="fade-up" data-aos-delay="400">
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
            {[
              { animation: FreelanceAnim, title: 'Freelance' },
              { animation: MentorshipAnim, title: 'Mentorship' },
              { animation: CommunityAnim, title: 'Community' },
              { animation: BudgetingAnim, title: 'Budgeting' },
              { animation: HackathonAnim, title: 'Hackathons' },
              { animation: ScholarshipAnim, title: 'Scholarship' }
            ].map((item, index) => (
              <div
                key={index}
                className="category-box"
                onClick={() => handleCategoryClick(item.title)}
                style={{ cursor: 'pointer', zIndex: 1 }}
                data-aos="flip-left"
                data-aos-delay={`${index * 100}`}
              >
                <div className="category-inner-box">
                  <Player
                    autoplay
                    loop
                    src={item.animation}
                    style={{ height: '165px', width: '165px' }}
                  />
                </div>
                <span className="category-title">{item.title}</span>
              </div>
            ))
            }
          </div>
        </section>

        <div ref={communityRef} data-aos="fade-up">
          <CommunitySection />
        </div>

        <div ref={scholarshipRef} data-aos="fade-up">
          <Scholarship />
        </div>




        {/* Testimonials Section */}
        <section className="testimonials-section" data-aos="fade-up">
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
            {/* Logo & Title */}
            <span className="footer-logo">
              <img src={footerLogo} alt="Campus Hustle Logo" />
              <h2>CampusHustle</h2>
            </span>

            {/* Company Section */}
            <span className="footer-column" data-aos="fade-up" data-aos-delay="100">
              <h4>Company</h4>

              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Press</a></li>
              </ul>
            </span>

            {/* Quick Links */}
            <span className="footer-column">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/freelance">Freelance</Link></li>
                <Link to="/" state={{ scrollTo: 'community' }}>Community</Link>
                <li><Link to="/hackathon">Hackathon</Link></li>
                <li><Link to="/contact">Contact</Link></li> {/* If route exists */}
              </ul>
            </span>

            {/* Support */}
            <span className="footer-column">
              <h4>Support</h4>
              <ul>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms & Conditions</a></li>
              </ul>
            </span>
          </span>
        </footer>


      </div>
      </div>
      </div>
    </>
  );
};

export default HomePage;
