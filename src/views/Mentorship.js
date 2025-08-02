import React, { useState, useEffect } from "react";
import "./Mentorship.css";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // adjust path
import UserMenu from "../components/UserMenu"; // adjust path
import { getAuth } from "firebase/auth";

const Mentorship = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const handleLogout = () => {
    // Your logout logic here
  };

  const openAuthModal = () => {
    // Your auth modal logic here
  };

  const onProfileClick = () => {
    // Profile click logic here
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const [activeTab, setActiveTab] = useState("");
  const [domain, setDomain] = useState("");
  const [batch, setBatch] = useState("");
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [mentors, setMentors] = useState([]);

  // Added: selectedImage state (like community.js)
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const filteredMentors = mentors.filter(
    (m) => (!domain || m.domain === domain) && (!batch || m.batch === batch)
  );

  const handleMentorRegister = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value.trim();
    const age = form.age.value;
    const domain = form.domain.value;
    const batch = form.batch.value;

    if (!name || !age || !domain || !batch || !selectedImage) {
      alert("Please fill all required fields and upload a picture!");
      return;
    }

    try {
      const storage = getStorage();
      const fileName = `${Date.now()}_${selectedImage.name}`;
      const storageRef = ref(storage, `mentors/${fileName}`);

      await uploadBytes(storageRef, selectedImage);
      const downloadURL = await getDownloadURL(storageRef);

      const newMentor = {
        name,
        age,
        qualification: form.qualification.value,
        experience: form.experience.value,
        domain,
        batch,
        charges: form.charges.value,
        gender: form.gender.value,
        picture: downloadURL,
      };

      await addDoc(collection(db, "mentors"), newMentor);
      setMentors((prev) => [...prev, newMentor]);
      setActiveTab("mentee");
      form.reset();
      setSelectedImage(null);
      alert("Mentor registered successfully!");
    } catch (error) {
      console.error("Error uploading mentor:", error);
      alert("Error registering mentor.");
    }
  };

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "mentors"));
        const mentorsList = querySnapshot.docs.map((doc) => doc.data());
        setMentors(mentorsList);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };

    fetchMentors();
  }, []);

  return (
    <div className="mentorship-page">

      {/* Navbar */}
      <div className="top-strip">
        <div className="logo-combo">
          <img src={logo} alt="Campus Hustle Logo" className="strip-logo" />
          <span className="logo-text">CampusHustle</span>
        </div>

        {/* Desktop Nav */}
        <nav className="navbar-desktop">
          <ul className="strip-nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/freelance">Freelance</Link></li>
            <li><Link to="/hackathon">Hackathons</Link></li>
            <li>
              <Link
                to="/"
                state={{ scrollTo: 'community' }}
                onClick={() => { }}
                className="desktop-link-btn"
              >
                Community
              </Link>
            </li>

            <li><Link to="/about">About Us</Link></li>
            <li>
              {user ? (
                <UserMenu
                  user={user}
                  onLogout={handleLogout}
                  onProfileClick={onProfileClick}
                />
              ) : (
                <button
                  className="signup"
                  onClick={() => openAuthModal()}
                >
                  Get Started
                </button>
              )}
            </li>
          </ul>
        </nav>

        {/* Mobile Nav */}
        <div className="navbar-mobile">
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</button>

          {menuOpen && (
            <ul className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
              <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
              <li><Link to="/freelance" onClick={() => setMenuOpen(false)}>Freelance</Link></li>
              <li><Link to="/hackathon" onClick={() => setMenuOpen(false)}>Hackathons</Link></li>
              <li><Link to="/" state={{ scrollTo: 'community' }} onClick={() => setMenuOpen(false)}>Community</Link></li>
              <li><Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link></li>
              <li>
                {user ? (
                  <UserMenu
                    user={user}
                    onLogout={() => {
                      setMenuOpen(false);
                      handleLogout();
                    }}
                    onProfileClick={() => {
                      setMenuOpen(false);
                      onProfileClick();
                    }}
                  />
                ) : (
                  <button
                    className="signup"
                    onClick={() => {
                      setMenuOpen(false);
                      openAuthModal();
                    }}
                  >
                    Get Started
                  </button>
                )}
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Page Sections */}
      <section className="mentorship-hero">
        <h1>Mentorship Platform</h1>
        <p>Choose your path – Learn or Guide</p>

        <div className="mentorship-buttons-center">
          <button
            className={`btn-toggle big-glow-btn ${activeTab === "mentee" ? "active" : ""}`}
            onClick={() => setActiveTab("mentee")}
          >
            Join as a Mentee
          </button>
          <button
            className={`btn-toggle big-glow-btn ${activeTab === "mentor" ? "active" : ""}`}
            onClick={() => setActiveTab("mentor")}
          >
            Register as a Mentor
          </button>
        </div>
      </section>

      {activeTab === "mentee" && (
        <section className="mentee-section mentee-bg">
          <h2>Find a Mentor</h2>
          <form className="dropdown-form">
            <label>
              Domain:
              <select value={domain} onChange={(e) => setDomain(e.target.value)}>
                <option value="">-- Select --</option>
                <option>Web Development</option>
                <option>DSA / CP</option>
                <option>UI/UX Design</option>
                <option>Machine Learning</option>
              </select>
            </label>
            <label>
              Batch:
              <select value={batch} onChange={(e) => setBatch(e.target.value)}>
                <option value="">-- Select --</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </label>
          </form>

          <div className="mentor-cards">
            {filteredMentors.length > 0 ? (
              filteredMentors.map((mentor, idx) => (
                <div
                  className={`mentor-card ${
                    selectedMentor?.name === mentor.name ? "selected-mentor" : ""
                  }`}
                  key={idx}
                >
                  <span className="domain-badge">{mentor.domain}</span>
                  <img src={mentor.picture} alt={mentor.name} className="mentor-square" />
                  <h3>{mentor.name}</h3>
                  <p><strong>Qualification:</strong> {mentor.qualification || "N/A"}</p>
                  <p><strong>Experience:</strong> {mentor.experience || "N/A"}</p>
                  <p><strong>Batch:</strong> {mentor.batch}</p>
                  <p><strong>Charges:</strong> ₹{mentor.charges || "Free"}</p>
                  <p><strong>Gender:</strong> {mentor.gender}</p>
                  <button className="btn-book" onClick={() => setSelectedMentor(mentor)}>
                    Book Now
                  </button>
                </div>
              ))
            ) : (
              <p>No mentors found for selected domain/batch.</p>
            )}
          </div>
        </section>
      )}

      {activeTab === "mentor" && (
        <section className="mentor-register-section">
          <h2>Register as a Mentor</h2>
          <form className="mentor-form" onSubmit={handleMentorRegister}>
            <input name="name" type="text" placeholder="Full Name" required />
            <input name="age" type="number" placeholder="Age" required />
            <input name="qualification" type="text" placeholder="Qualification" />
            <input name="experience" type="text" placeholder="Experience" />
            <input name="charges" type="number" placeholder="Charges (₹)" />
            <select name="gender" required>
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <select name="domain" required>
              <option value="">Select Domain</option>
              <option>Web Development</option>
              <option>DSA / CP</option>
              <option>UI/UX Design</option>
              <option>Machine Learning</option>
            </select>
            <select name="batch" required>
              <option value="">Select Batch</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>

            {/* Hidden file input */}
            <input
              id="mentor-image-input"
              name="picture"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
              required
            />

            {/* Plus button */}
            <div
              onClick={() => document.getElementById("mentor-image-input").click()}
              style={{
                width: "80px",
                height: "80px",
                border: "2px dashed #aaa",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                marginBottom: "10px",
                fontSize: "2rem",
                color: "#666"
              }}
            >
              +
            </div>

            <button className="btn-submit">Submit</button>
          </form>
        </section>
      )}

      {selectedMentor && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Book Session with {selectedMentor.name}</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Session Booked Successfully!");
                setSelectedMentor(null);
              }}
            >
              <input type="text" placeholder="Your Full Name" required />
              <input type="email" placeholder="Email" required />
              <select required>
                <option value="">Select Suitable Time</option>
                <option>Morning (9–11 AM)</option>
                <option>Afternoon (12–2 PM)</option>
                <option>Evening (4–6 PM)</option>
                <option>Late Evening (7–9 PM)</option>
              </select>
              <button className="btn-submit">Confirm Booking</button>
              <button type="button" className="btn-cancel" onClick={() => setSelectedMentor(null)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mentorship;


export default Mentorship;




