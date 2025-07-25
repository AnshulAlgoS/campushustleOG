// src/views/ScholarshipCard.js
import React from 'react';
import './ScholarshipCard.css';

const ScholarshipCard = ({ item, openModal }) => {
  const title = item.Name || item.Title || 'Scholarship';
  const link = item.Link?.trim() || '#';
  const hasDesc = item.Description?.trim() !== '';
  const hasElig = item.Eligibility?.trim() !== '';
  const lastDateRaw = item['Last Date ']?.trim();
  const hasLastDate = !!lastDateRaw;

  const formattedDate = hasLastDate
    ? new Date(lastDateRaw).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    : '';

  return (
    <div className="scholarship-card">
      <h3 className="scholarship-title">{title}</h3>

      {hasDesc && (
        <p className="scholarship-text">
          <strong>Description: </strong>
          {item.Description.split(' ').slice(0, 7).join(' ')}...
          <span className="read-more" onClick={() => openModal(item)}> Read More</span>
        </p>
      )}

      {hasElig && (
        <p className="scholarship-text">
          <strong>Eligibility: </strong>
          {item.Eligibility.split(' ').slice(0, 7).join(' ')}...
          <span className="read-more" onClick={() => openModal(item)}> Read More</span>
        </p>
      )}

      <div className="scholarship-actions">
        {hasLastDate && (
          <p className="scholarship-date">
            <strong>Last Date:</strong> {formattedDate}
          </p>
        )}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="scholarship-apply"
          >
            Apply Now
          </a>
        )}
      </div>
    </div>
  );
};

export default ScholarshipCard;
