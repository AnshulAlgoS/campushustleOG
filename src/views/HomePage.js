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
import HackathonAnim from '../assets/images/Champion.json';
import ScholarshipAnim from '../assets/images/Developer.json';
import BudgetingAnim from '../assets/images/Event Budgeting Breakdown - Hero.json';
import FreelanceAnim from '../assets/images/Man work from home with laptops.json';
import MentorshipAnim from '../assets/images/Teacher.json';
import CommunityAnim from '../assets/images/Welcome.json';
import logo from '../assets/images/CL1.png';
import footerLogo from '../assets/images/CL2.png';
import anshulImg from '../assets/images/anshulsaxena.jpg';
import avanyaImg from '../assets/images/avanya.png';
import mahiraImg from '../assets/images/mahiraa.png';
import gourikaImg from '../assets/images/gourika1.png';
import UserMenu from '../components/UserMenu';
import CommunitySection from './community';
import Scholarship from './scholarship';
import './chatbot.css';
import ChatbotButton from "./chatbot";
import { db } from '../firebase';
import { collectionGroup, getDocs, query, where } from "firebase/firestore";


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
  const [promotions] = useState([]); 
  const [promotions] = useState([]); 
  const searchKeywords = [
    { label: 'Freelance', path: '/freelance', keywords: ['freelance', 'gig', 'remote work'] },
    { label: 'Budgeting', path: '/budgeting', keywords: ['budget', 'expenses', 'planner'] },
    { label: 'Scholarship', path: 'scholarships', keywords: ['scholarship', 'funding', 'aid'] },
    { label: 'Hackathon', path: '/hackathon', keywords: ['hackathon', 'tech event', 'coding contest'] },
    { label: 'Mentorship', path: 'mentorship', keywords: ['mentor', 'guidance', 'mentorship'] },
    { label: 'Community', path: 'community1', keywords: ['community', 'forum', 'peer'] },
  ];


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
      navigateTo('mentorship');
    } else if (title === 'Community') {
      communityRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    else if (title === 'Scholarship') {
      scholarshipRef.current?.scrollIntoView({ behavior: 'smooth' })
    } else if (title === 'Budgeting') {
      navigateTo('budgeting');
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
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const handleInputChange = (e) => {
    const input = e.target.value;
    setSearchQuery(input);

    if (input.length > 0) {
      const filtered = searchKeywords.filter(({ label, keywords }) => {
        return (
          label.toLowerCase().includes(input.toLowerCase()) ||
          keywords.some(k => k.toLowerCase().includes(input.toLowerCase()))
        );
      });

      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };
  const handleSuggestionClick = (label, path) => {
    if (path === 'community') {
      communityRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(path);
    }
    setSearchQuery('');
    setShowSuggestions(false);
  };
const [featured, setFeatured] = useState([]);
const carouselRef = useRef(null);


useEffect(() => {
  const fetchPromotions = async () => {
    const q = query(
      collectionGroup(db, 'promotions'),
      where('status', '==', 'active'),
      where('paymentStatus', '==', 'paid')
    );
    const snapshot = await getDocs(q);
    const results = snapshot.docs.map(doc => doc.data());
    setFeatured(results);
  };
  fetchPromotions();
}, []);

const scrollCarousel = (dir) => {
  const container = carouselRef.current;
  if (!container) return;
  const scrollAmount = 300;
  container.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
};
const [featured, setFeatured] = useState([]);
const carouselRef = useRef(null);


useEffect(() => {
  const fetchPromotions = async () => {
    const q = query(
      collectionGroup(db, 'promotions'),
      where('status', '==', 'active'),
      where('paymentStatus', '==', 'paid')
    );
    const snapshot = await getDocs(q);
    const results = snapshot.docs.map(doc => doc.data());
    setFeatured(results);
  };
  fetchPromotions();
}, []);

const scrollCarousel = (dir) => {
  const container = carouselRef.current;
  if (!container) return;
  const scrollAmount = 300;
  container.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
};

  return (
    <>
      <FloatingDoodles />
      <div className="home-page">
        <div className="home-page-wrapper">
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
              <form onSubmit={(e) => {
                e.preventDefault();
                if (filteredSuggestions.length > 0) {
                  handleSuggestionClick(filteredSuggestions[0].label, filteredSuggestions[0].path);
                }
              }}>
                <input
                  type="search"
                  placeholder="Search our services ..."
                  value={searchQuery}
                  onChange={handleInputChange}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 150)} // for click to register
                />
                <i
                  className="fa fa-search"
                  onClick={() => {
                    if (filteredSuggestions.length > 0) {
                      handleSuggestionClick(filteredSuggestions[0].label, filteredSuggestions[0].path);
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                ></i>
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
        </div>

        <div ref={communityRef} data-aos="fade-up">
          <CommunitySection />
        </div>
        {featured.length > 0 && (
          <section className="featured-carousel-section" data-aos="fade-up">
            <h2 className="section-title">
              <span className="light-text">Promoted </span>
              <span className="dark-text">By Campus Hustlers</span>
            </h2>
            <div className="featured-carousel-container">
              <button onClick={() => scrollCarousel('left')} className="carousel-arrow left">‹</button>

              <div className="featured-carousel" ref={carouselRef}>
                {featured.map((item, index) => (
                  <div key={index} className="featured-card">
                    <img src={item.featuredImage || '/default.jpg'} alt="promotion" />
                    <div className="card-content">
                      <h3>{item.title}</h3>
                      <p>{item.description?.slice(0, 100)}...</p>
                      <a href={item.linkTo} target="_blank" rel="noopener noreferrer">View</a>
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={() => scrollCarousel('right')} className="carousel-arrow right">›</button>
            </div>
          </section>
        )}

        {featured.length > 0 && (
          <section className="featured-carousel-section" data-aos="fade-up">
            <h2 className="section-title">
              <span className="light-text">Promoted </span>
              <span className="dark-text">By Campus Hustlers</span>
            </h2>
            <div className="featured-carousel-container">
              <button onClick={() => scrollCarousel('left')} className="carousel-arrow left">‹</button>

              <div className="featured-carousel" ref={carouselRef}>
                {featured.map((item, index) => (
                  <div key={index} className="featured-card">
                    <img src={item.featuredImage || '/default.jpg'} alt="promotion" />
                    <div className="card-content">
                      <h3>{item.title}</h3>
                      <p>{item.description?.slice(0, 100)}...</p>
                      <a href={item.linkTo} target="_blank" rel="noopener noreferrer">View</a>
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={() => scrollCarousel('right')} className="carousel-arrow right">›</button>
            </div>
          </section>
        )}


        <Scholarship showAll={false} isFullPage={false} />
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


        <footer>
          <div className="home-page-wrapper">
            <span className="footer-container">
              <span className="footer-logo">
                <img src={footerLogo} alt="Campus Hustle Logo" />
                <h2>CampusHustle</h2>
              </span>

              {/* ✅ Support */}
              <span className="footer-column" data-aos="fade-up" data-aos-delay="100">
                <h4>Support</h4>
                <ul>
                  <li><Link to="/help-center">Help Center</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                </ul>
              </span>

              {/* ✅ Company */}
              <span className="footer-column" data-aos="fade-up" data-aos-delay="100">
                <h4>Company</h4>
                <ul>
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/hackathon">Hackathons</Link></li>
                  <li><Link to="/" state={{ scrollTo: 'community' }}>Community</Link></li>
                  <li><Link to="/freelance">Freelance</Link></li>
                </ul>
              </span>

              {/* ✅ Quick Links */}
              <span className="footer-column" data-aos="fade-up" data-aos-delay="100">
                <h4>Quick Links</h4>
                <ul>
                  <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                  <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
                </ul>
              </span>
            </span>
          </div>
        </footer>

      <ChatbotButton />


      
      </div>
    </>
  );
};

export default HomePage;
