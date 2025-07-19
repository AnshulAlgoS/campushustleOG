// src/views/OfferWorkForm.js
import React, { useState } from 'react';
import './OfferWorkForm.css';
import { db, auth } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const OfferWorkForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    startDate: '',
    endDate: '',
    payment: '',
    description: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      alert('Please login to post work.');
      return;
    }

    try {
      await addDoc(collection(db, 'gigs'), {
        title: formData.title,
        category: formData.category,
        startDate: formData.startDate,
        endDate: formData.endDate,
        payment: formData.payment,
        description: formData.description,
        createdBy: user.uid,
        createdAt: Timestamp.now()
      });

      alert('Gig posted successfully!');
      setFormData({
        title: '',
        category: '',
        startDate: '',
        endDate: '',
        payment: '',
        description: ''
      });

      navigate('/dashboard');

    } catch (error) {
      console.error('Error posting gig:', error);
    }
  };

  return (
    <div className="form-wrapper">
      <h2>Hire Hustlers</h2>
      <form className="offer-form" onSubmit={handleSubmit}>
        <label>Project Title</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter project title" required />

        <label>Work Type</label>
        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select a category</option>
          <option value="Web Development">Web Development</option>
          <option value="Graphic Design">Graphic Design</option>
          <option value="Content Writing">Content Writing</option>
          <option value="Marketing">Marketing</option>
          <option value="Video Editing">Video Editing</option>
        </select>


        <label>Start Date</label>
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />

        <label>End Date</label>
        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />

        <label>Payment Details</label>
        <input type="text" name="payment" value={formData.payment} onChange={handleChange} placeholder="e.g., ₹2000 for full project" required />

        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Describe your requirement..." rows={4} required></textarea>

        <button type="submit">Post Work</button>
      </form>
    </div>
  );
};

export default OfferWorkForm;
