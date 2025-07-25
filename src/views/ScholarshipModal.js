// views/Modal.js
import React from 'react';
import './ScholarshipModal.css';

const ScholarshipModal = ({ isOpen, onClose, item }) => {
  if (!isOpen || !item) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
      <button className="close-button" onClick={onClose}>×</button>

        <h2>{item.Name || item.Title}</h2>
        {item['Last Date'] && (
          <p><strong>Last Date:</strong> {new Date(item['Last Date']).toLocaleDateString()}</p>
        )}
        {item.Eligibility && (
          <p><strong>Eligibility:</strong> {item.Eligibility}</p>
        )}
        {item.Description && (
          <p><strong>Description:</strong> {item.Description}</p>
        )}
        {item.Link && (
          <a href={item.Link} target="_blank" rel="noopener noreferrer" className="apply-link">
            Apply Now
          </a>
        )}
      </div>
    </div>
  );
};

export default ScholarshipModal;
