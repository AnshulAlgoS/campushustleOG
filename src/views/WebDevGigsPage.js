import React, { useState } from 'react';
import './WebDevGigsPage.css';
import logo from '../assets/images/CL1.png';

// Hackathon images
import img1 from '../assets/images/w1.jpeg';
import img2 from '../assets/images/w2.jpeg';
import img3 from '../assets/images/w3.jpeg';
import img4 from '../assets/images/w4.jpeg';
import img5 from '../assets/images/w5.jpeg';
import img6 from '../assets/images/w6.jpeg';
import img7 from '../assets/images/w7.jpeg';
import img8 from '../assets/images/w8.jpeg';




const gigs = [
  {
    id: 1,
    title: 'Provide 3 Hours Of Edits/Fixes/Updates To Your WordPress Website',
    tags: ['E-commerce website'],
    seller: { name: 'Mohammed I.', rating: 5.0, reviews: 556 },
    price: '$45',
    delivery: '1 day',
    featured: true,
    image : img1,
  },
  {
    id: 2,
    title: 'Design & Develop Responsive SEO Friendly Wordpress Website',
    tags: ['Custom website'],
    seller: { name: 'Wings Web Me...', rating: 5.0, reviews: 1710 },
    price: '$180',
    delivery: '7 days',
    featured: true,
    image : img2,
  },
  {
    id: 3,
    title: 'Design Responsive, SEO friendly & Fast Loading WordPress website',
    tags: ['Design', 'Logo design'],
    seller: { name: 'Vishal M.', rating: 5.0, reviews: 1277 },
    price: '$105',
    delivery: '3 days',
    featured: true,
    image : img3,
  },
  {
    id: 4,
    title: 'Fix WordPress Errors, Bugs, and Theme Issues Quickly',
    tags: ['Bug fixing', 'WordPress'],
    seller: { name: 'Ayesha K.', rating: 4.9, reviews: 890 },
    price: '$60',
    delivery: '2 days',
    featured: false,
    image : img4,
  },
  {
    id: 5,
    title: 'Develop a Custom WordPress Plugin Based on Your Needs',
    tags: ['Plugin development'],
    seller: { name: 'DevPro Team', rating: 5.0, reviews: 1440 },
    price: '$200',
    delivery: '5 days',
    featured: true,
    image : img5,
  },
  {
    id: 6,
    title: 'Speed Optimize Your WordPress Website for Better Performance',
    tags: ['Speed optimization'],
    seller: { name: 'Ravi S.', rating: 4.8, reviews: 620 },
    price: '$75',
    delivery: '1 day',
    featured: false,
    image : img6,
  },
    {
    id: 7,
    title: 'Build a Full-Stack MERN Website with Admin Panel',
    tags: ['MERN stack', 'Full-stack'],
    seller: { name: 'Simran K.', rating: 4.9, reviews: 980 },
    price: '$250',
    delivery: '6 days',
    featured: true,
    image : img7,
  },
  {
    id: 8,
    title: 'Create a Portfolio Website using HTML, CSS, and JavaScript',
    tags: ['Frontend', 'Portfolio'],
    seller: { name: 'Ankit T.', rating: 4.7, reviews: 450 },
    price: '$40',
    delivery: '2 days',
    featured: false,
    image : img8,
  },

];

// Dummy data/functions to avoid errors

const UserMenu = ({ user }) => <div>{user.name}</div>;
const handleLogout = () => {};
const onProfileClick = () => {};
const openAuthModal = () => {};
const navigateTo = (route) => console.log("Navigating to:", route);

const FreelancePage = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="freelance-page">
    
      {/* ✅ Gigs Content */}
      <div className="webdev-page">
        <h1>Web Development Gigs</h1>
        <div className="gig-grid">
          {gigs.map((gig) => (
            <div key={gig.id} className="gig-card">
            <img src={gig.image} alt={gig.title} classname="gig-image" />
              <h3>{gig.title}</h3>
              <div className="tags">
                {gig.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>
              <div className="gig-footer">
                <p>by {gig.seller.name}</p>
                <p>⭐ {gig.seller.rating} ({gig.seller.reviews})</p>
                <p className="price">{gig.price}</p>
              </div>
              <p className="delivery">Delivered in {gig.delivery}</p>
              {gig.featured && <span className="featured">Featured</span>}
            </div>
          ))}
          
        </div>
      </div>

    </div>
  );
};

export default FreelancePage;
