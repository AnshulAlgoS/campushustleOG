import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {db} from '../firebase';
import {collection, query, where, getDocs} from 'firebase/firestore';
import './categorylisting.css';

const categoryMap = {
  'webdev': 'Web Development',
  'graphic-design': 'Graphic Design',
  'content-writing': 'Content Writing',
  'marketing': 'Marketing',
  'video-editing': 'Video Editing'
};

const CategoryListingPage = () => {
  const {categorySlug} = useParams(); 
  const [gigs, setGigs] = useState([]);

  const category = categoryMap[categorySlug];

  useEffect(() => {
    if (!category) return;

    const fetchGigs = async () => {
      const gigsRef = collection(db, 'gigs');
      const q = query(gigsRef, where('category', '==', category));
      const querySnapshot = await getDocs(q);
      const gigsData = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
      setGigs(gigsData);
    };

    fetchGigs();
  }, [category]);

  if (!category) {
    return <h2>Invalid category.</h2>;
  }

  return (
    <div className="category-listing-wrapper">
      <h1>{category} Gigs</h1>
      {gigs.length === 0 ? (
        <p>No gigs posted yet in this category.</p>
      ) : (
        <div className="gig-grid">
          {gigs.map(gig => (
            <div key={gig.id} className="gig-card">
              <h3>{gig.title}</h3>
              <p>{gig.description.length > 100 ? gig.description.slice(0, 100) + '...' : gig.description}</p>
              <p><strong>Payment:</strong> {gig.payment}</p>
              <p><strong>Timeline:</strong> {gig.startDate} - {gig.endDate}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryListingPage;
