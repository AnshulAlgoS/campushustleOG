// src/views/OfferWorkForm.js
import React from 'react';
import './OfferWorkForm.css';

const OfferWorkForm = () => {
  return (
    <div className="form-wrapper">
      <h2>Hire Hustlers</h2>
      <form className="offer-form">
        <label>Project Title</label>
        <input type="text" placeholder="Enter project title" />

        <label>Work Type</label>
        <select>
          <option>Web Development</option>
          <option>Design</option>
          <option>Content Writing</option>
          <option>Marketing</option>
        </select>

        <label>Start Date</label>
        <input type="date" />

        <label>End Date</label>
        <input type="date" />

        <label>Payment Details</label>
        <input type="text" placeholder="e.g., ₹2000 for full project" />

        <label>Description</label>
        <textarea placeholder="Describe your requirement..." rows={4}></textarea>

        <button type="submit">Post Work</button>
      </form>
    </div>
  );
};



export default OfferWorkForm;
