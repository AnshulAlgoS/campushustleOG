import React from "react";
import "./OrganiseHackathon.css";

const OrganiseHackathon = () => {
  return (
    <div className="organise-page">
      <h1 className="organise-heading">Organise Hackathon</h1>
      <div className="single-box">
        <h2 className="box-section-title">Details</h2>

        <div className="form-row">
          <label htmlFor="title">Add Title</label>
          <input type="text" id="title" name="title" placeholder="Enter hackathon title" />
        </div>

        <div className="form-row">
          <label htmlFor="startDate">Start Date</label>
          <input type="date" id="startDate" name="startDate" />
        </div>

        <div className="form-row">
          <label htmlFor="endDate">End Date</label>
          <input type="date" id="endDate" name="endDate" />
        </div>

        <div className="form-row">
          <label htmlFor="regStart">Registration Start</label>
          <input type="date" id="regStart" name="regStart" />
        </div>

        <div className="form-row">
          <label htmlFor="regEnd">Registration End</label>
          <input type="date" id="regEnd" name="regEnd" />
        </div>

        <div className="form-row">
          <label htmlFor="mode">Mode</label>
          <select id="mode" name="mode">
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </div>

        <div className="form-row">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" rows="4" placeholder="Describe your hackathon"></textarea>
        </div>

        <div className="form-row">
          <label htmlFor="rules">Rules</label>
          <textarea id="rules" name="rules" rows="3" placeholder="Enter rules and guidelines"></textarea>
        </div>

        <div className="form-row">
          <label htmlFor="teamSize">Team Size</label>
          <input type="number" id="teamSize" name="teamSize" min="1" placeholder="e.g. 4" />
        </div>

        <div className="form-row">
          <label htmlFor="prize">Prize Info</label>
          <input type="text" id="prize" name="prize" placeholder="e.g. ₹50,000 cash + goodies" />
        </div>

        <div className="form-row">
         <label htmlFor="teamSize">Team Size</label>
         <input
          type="number"
          id="teamSize"
          name="teamSize"
          min="2"
          max="6"
          placeholder="Choose between 2 to 6"
         />
        </div>

        <div className="form-row">
         <button type="submit" className="submit-btn">Submit</button>
        </div>


      </div>
    </div>
  );
};

export default OrganiseHackathon;
