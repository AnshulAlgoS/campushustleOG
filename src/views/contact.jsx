mport React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thanks for contacting Campus Hustle! We'll get back to you soon.");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-page">
      <h1>Get in Touch</h1>
      <p>
        Whether you're a student, mentor, company, or community builder — we’d love to hear from you.
        Campus Hustle is all about collaboration, guidance, and growth. Drop us a message!
      </p>

      <div className="contact-content">
        {/* Left Column: Contact Info */}
        <div className="contact-info">
          <h3>Contact Information</h3>
          <p><strong>Email:</strong> support@campushustle.com</p>
          <p><strong>Instagram:</strong> @campushustle</p>
          <p><strong>Address:</strong> Delhi Technological University, Delhi, India</p>
        </div>

        {/* Right Column: Contact Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Your Message"
            required
            rows="5"
            value={formData.message}
            onChange={handleChange}
          ></textarea>

          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
