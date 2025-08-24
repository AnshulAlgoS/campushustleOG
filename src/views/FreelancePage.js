import React, { useState } from "react";
import "./FreelancePage.css";

const FreelancePage = () => {
  const [activeTab, setActiveTab] = useState("browse");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [showApplyModal, setShowApplyModal] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [jobs, setJobs] = useState([
    {
      title: "Build a React E-commerce Website",
      desc: "Looking for a skilled React developer to build a modern e-commerce platform with payment integration and admin dashboard.",
      budget: "$800-1200",
      time: "2-3 weeks",
      location: "Remote",
      proposals: 12,
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      category: "Web Development",
      company: "TechStartup Inc.",
      rating: "⭐ 4.8",
      posted: "2 hours ago",
      urgent: false,
      isNew: false,
    },
    {
      title: "Mobile App UI/UX Design",
      desc: "Need a creative designer to create wireframes and high-fidelity designs for a fitness tracking mobile application.",
      budget: "$500-800",
      time: "1-2 weeks",
      location: "Remote",
      proposals: 8,
      tags: ["Figma", "Adobe XD", "Prototyping", "Mobile Design"],
      category: "Design",
      company: "FitLife Solutions",
      rating: "⭐ 4.9",
      posted: "4 hours ago",
      urgent: true,
      isNew: false,
    },
  ]);

  const categories = [...new Set(jobs.map((job) => job.category))];

  const handleApply = (job) => {
    setAppliedJobs([...appliedJobs, job]);
    setShowApplyModal(null);
  };

  const handlePostJob = (e) => {
    e.preventDefault();
    const form = e.target;
    const newJob = {
      title: form.title.value,
      desc: form.desc.value,
      budget: form.budget.value,
      time: form.time.value,
      location: form.location.value,
      tags: form.tags.value.split(",").map((t) => t.trim()),
      category: form.category.value,
      company: "You",
      rating: "⭐ New",
      proposals: 0,
      posted: "Just now",
      urgent: false,
      isNew: true,
    };
    setJobs([newJob, ...jobs]);
    setShowPostModal(false);
    form.reset();
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterCategory ? job.category === filterCategory : true)
  );

  return (
    <div className="freelance-container">
      {/* Header */}
      <div className="freelance-hero-wrapper">
        <div className="freelance-hero-left">
          <h1>
            Freelancing <span className="accent">Hub</span>
          </h1>
          <p className="freelance-tagline">
            Find gigs, hire talent, and build your freelance career 🚀
          </p>
        </div>
        <div className="freelance-hero-right">
          <button
            className="gradient-btn"
            onClick={() => setShowPostModal(true)}
          >
            + Post a Job
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="button-container">
        <button
          className={`tab-btn ${activeTab === "browse" ? "active-tab" : ""}`}
          onClick={() => setActiveTab("browse")}
        >
          Browse Jobs
        </button>
        <button
          className={`tab-btn ${activeTab === "talent" ? "active-tab" : ""}`}
          onClick={() => setActiveTab("talent")}
        >
          Find Talent
        </button>
        <button
          className={`tab-btn ${activeTab === "myjobs" ? "active-tab" : ""}`}
          onClick={() => setActiveTab("myjobs")}
        >
          My Jobs
        </button>
      </div>

      {/* Search */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for jobs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Content */}
      <div className="tab-content">
        {activeTab === "browse" && (
          <div className="jobs-list">
            {filteredJobs.length === 0 ? (
              <p>No jobs found</p>
            ) : (
              filteredJobs.map((job, idx) => (
                <div className="job-card" key={idx}>
                  <div className="job-left">
                    <h3 className="job-title">
                      {job.title}{" "}
                      {job.urgent && (
                        <span className="urgent-badge">Urgent</span>
                      )}
                    </h3>
                    <p className="job-desc">{job.desc}</p>
                    <div className="job-tags">
                      {job.tags.map((tag, i) => (
                        <span key={i} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="job-meta">
                      <span>💲 {job.budget}</span>
                      <span>⏳ {job.time}</span>
                      <span>📍 {job.location}</span>
                      <span>💬 {job.proposals} proposals</span>
                    </div>
                  </div>
                  <div className="job-right">
                    <p className="posted">Posted {job.posted}</p>
                    <p className="company">{job.company}</p>
                    <span className="rating">{job.rating}</span>
                    <button
                      className="apply-btn"
                      onClick={() => setShowApplyModal(job)}
                    >
                      Apply Now →
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        {activeTab === "talent" && <div>Talent content here...</div>}
        {activeTab === "myjobs" && (
          <div className="jobs-list">
            {appliedJobs.length === 0 ? (
              <p>You haven’t applied to any jobs yet.</p>
            ) : (
              appliedJobs.map((job, idx) => (
                <div className="job-card" key={idx}>
                  <div className="job-left">
                    <h3 className="job-title highlight-title">{job.title}</h3>
                    <p className="job-desc">{job.desc}</p>
                  </div>
                  <div className="job-right">
                    <span className="rating">⭐ Applied</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

     {/* Apply Modal */}
{showApplyModal && (
  <div className="modal">
    <div className="modal-content improved-modal">
      <h2 className="modal-title">Apply for {showApplyModal.title}</h2>
      <textarea
        className="modal-textarea"
        placeholder="Write your proposal..."
      ></textarea>
      <div className="modal-actions">
        <button
          className="submit-btn"
          onClick={() => handleApply(showApplyModal)}
        >
          🚀 Submit Application
        </button>
        <button
          className="cancel-btn"
          onClick={() => setShowApplyModal(null)}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}


      {/* Post Job Modal */}
      {showPostModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Post a New Job</h2>
            <form onSubmit={handlePostJob}>
              <input name="title" placeholder="Job Title" required />
              <textarea name="desc" placeholder="Job Description" required />
              <input name="budget" placeholder="Budget" required />
              <input name="time" placeholder="Time (e.g. 2 weeks)" required />
              <input name="location" placeholder="Location" required />
              <input
                name="tags"
                placeholder="Tags (comma separated)"
                required
              />
              <input name="category" placeholder="Category" required />
              <div className="modal-actions">
                <button type="submit" className="post-btn">
                  Post Job
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowPostModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreelancePage;

