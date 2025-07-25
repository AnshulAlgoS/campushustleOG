import React from 'react';
import './AllScholarshipPage.css';
import ScholarshipSection from './scholarship'; 

const AllScholarshipsPage = () => {
  return (
    <div className="all-scholarships-page">
      <ScholarshipSection showAll={true} isFullPage={true} />
    </div>
  );
};

export default AllScholarshipsPage;
