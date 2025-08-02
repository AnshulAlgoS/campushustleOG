// src/views/OfferWorkForm.js
import React, { useState } from 'react';
import './OfferWorkForm.css';
import { db, auth } from '../firebase';
import { collection, addDoc, Timestamp, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const OfferWorkForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    category: '',
    location: '',
    mode: '',
    experience: '',
    duration: '',
    startDate: '',
    endDate: '',
    deadline: '',
    skills: '',
    payment: '',
    contactEmail: '',
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
        title: formData.title.trim(),
        company: formData.company.trim(),
        category: formData.category.trim(),
        location: formData.location.trim(),
        mode: formData.mode,
        experience: formData.experience.trim(),
        duration: formData.duration.trim(),
        startDate: formData.startDate,
        endDate: formData.endDate,
        deadline: formData.deadline,
        skills: formData.skills.trim(),
        payment: formData.payment.trim(),
        contactEmail: formData.contactEmail.trim(),
        description: formData.description.trim(),
        createdBy: user.uid,
        createdAt: Timestamp.now(),
        status: 'open',
        applicants: [],
        tags: formData.tags || []
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

        <label>Company / Recruiter Name</label>
        <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company or individual name" required />

        <label>Work Type / Category</label>
        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select a category</option>
          <option value="Web Development">Web Development</option>
          <option value="Graphic Design">Graphic Design</option>
          <option value="Content Writing">Content Writing</option>
          <option value="Marketing">Marketing</option>
          <option value="Video Editing">Video Editing</option>
        </select>

        <label>Location</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g., Remote, Delhi, Bengaluru, etc." />

        <label>Work Mode</label>
        <select name="mode" value={formData.mode} onChange={handleChange}>
          <option value="">Select mode</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
          <option value="On-site">On-site</option>
        </select>

        <label>Experience Required</label>
        <input type="text" name="experience" value={formData.experience} onChange={handleChange} placeholder="e.g., 0-1 years, 1+ year, beginner friendly" />

        <label>Duration</label>
        <input type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="e.g., 2 weeks, 1 month, ongoing" />

        <label>Start Date</label>
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />

        <label>End Date</label>
        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />

        <label>Deadline to Apply</label>
        <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} />

        <label>Required Skills</label>
        <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="e.g., React, Firebase, Canva, Figma, SEO" />

        <label>Payment Details</label>
        <input type="text" name="payment" value={formData.payment} onChange={handleChange} placeholder="e.g., ₹2000 per task, ₹5000/month" required />

        <label>Contact Email (Optional)</label>
        <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} placeholder="e.g., you@example.com" />

        <label>Project Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Describe what you expect from the student" rows={5} required></textarea>

        <button type="submit">Post Work</button>
      </form>
    </div>
  );

};

export default OfferWorkForm;
