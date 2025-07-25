import React, { useEffect, useState } from 'react';
import { get, ref } from 'firebase/database';
import { realtimeDb } from '../firebase';
import './scholarship.css';
import ScholarshipCard from './ScholarshipCard';
import Modal from './ScholarshipModal'; 
import { useNavigate } from 'react-router-dom';


const ScholarshipSection = ({ showAll, isFullPage }) => {
  const [scholarships, setScholarships] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  



  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(realtimeDb, 'scholarships');
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const data = Object.values(snapshot.val());
        console.log('📦 Scholarships from Firebase:', data);
        setScholarships(data);
      }
    };
    fetchData();
  }, []);

  const openModal = (item) => {
    setSelectedScholarship(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedScholarship(null);
    setShowModal(false);
  };

  const categories = [...new Set(scholarships.map(s => s.Category))];
  const filteredScholarships = selectedCategory === 'All'
    ? scholarships
    : scholarships.filter(s => s.Category?.toLowerCase() === selectedCategory.toLowerCase());

  const itemsToShow = showAll ? filteredScholarships : scholarships.slice(0, 4);

  return (
    <section className={`scholarship-container ${isFullPage ? 'fullpage' : 'homepage'}`}>
<div className="scholarship-wrapper">
  <h2 className="scholarship-heading">
    {showAll ? 'Explore Scholarships' : 'Featured Scholarships'}</h2>

    {showAll && (
      <div className="scholarship-filter-section">
        <select
          className="dropdownn"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
    )}

    <div className="card-grid">
      {itemsToShow.map((item, idx) => (
        <ScholarshipCard
          key={idx}
          item={item}
          idx={idx}
          openModal={openModal} 
        />
      ))}
    </div>

    {!showAll && (
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <button className="explore-btn" onClick={() => navigate('/scholarships')}>
          Explore More Scholarships
        </button>
      </div>
    )}
  </div>

  <Modal isOpen={showModal} item={selectedScholarship} onClose={closeModal} />
</section>

  );
};

export default ScholarshipSection;
