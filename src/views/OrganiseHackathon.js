import React, { useState } from "react";
import "./OrganiseHackathon.css";
import {auth} from "../firebase";
import { db } from "../firebase"; 
import { collection, addDoc } from "firebase/firestore";
const initialState = {
  title: "",
  startDate: "",
  endDate: "",
  regStart: "",
  regEnd: "",
  mode: "online",
  description: "",
  rules: "",
  teamSize: "",
  prize: "",
};


const OrganiseHackathon = () => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to organise a hackathon.");
      return;
    }

    const formWithUser = {
      ...formData,
      userId: user.uid,
      createdAt: new Date(),
    };

    await addDoc(collection(db, "hackathons"), formWithUser);
    alert("✅ Hackathon submitted successfully!");
    setFormData({ ...initialState });
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("❌ Failed to submit. Please try again.");
  }
};


  return (
    <div className="organise-page">
      <h1 className="organise-heading">Organise Hackathon</h1>
      <div className="single-box">
        <h2 className="box-section-title">Details</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="title">Add Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter hackathon title"
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="regStart">Registration Start</label>
            <input
              type="date"
              id="regStart"
              name="regStart"
              value={formData.regStart}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="regEnd">Registration End</label>
            <input
              type="date"
              id="regEnd"
              name="regEnd"
              value={formData.regEnd}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="mode">Mode</label>
            <select
              id="mode"
              name="mode"
              value={formData.mode}
              onChange={handleChange}
              required
            >
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </div>

          <div className="form-row">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your hackathon"
              required
            ></textarea>
          </div>

          <div className="form-row">
            <label htmlFor="rules">Rules</label>
            <textarea
              id="rules"
              name="rules"
              rows="3"
              value={formData.rules}
              onChange={handleChange}
              placeholder="Enter rules and guidelines"
              required
            ></textarea>
          </div>

          <div className="form-row">
            <label htmlFor="prize">Prize Info</label>
            <input
              type="text"
              id="prize"
              name="prize"
              value={formData.prize}
              onChange={handleChange}
              placeholder="e.g. ₹50,000 cash + goodies"
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="teamSize">Team Size</label>
            <input
              type="number"
              id="teamSize"
              name="teamSize"
              min="2"
              max="6"
              value={formData.teamSize}
              onChange={handleChange}
              placeholder="Choose between 2 to 6"
              required
            />
          </div>

          <div className="form-row">
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrganiseHackathon;
