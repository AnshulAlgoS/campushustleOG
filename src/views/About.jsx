import React, { useEffect, useState } from 'react';
import "./About.css";
import TeamCarousel from "../components/teamCarousel";
import anshulImg from "../assets/images/anshulsaxena.png";
import avanyaImg from "../assets/images/avanya.png";
import gourikaImg from "../assets/images/gourika1.png";
import mahiraImg from "../assets/images/mahiraa.png";

// SVG Icon components
const Icons = {
  "bow-arrow": (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path d="M17 3h4v4" /><path d="M18.575 11.082a13 13 0 0 1 1.048 9.027 1.17 1.17 0 0 1-1.914.597L14 17" /><path d="M7 10 3.29 6.29a1.17 1.17 0 0 1 .6-1.91 13 13 0 0 1 9.03 1.05" /><path d="M7 14a1.7 1.7 0 0 0-1.207.5l-2.646 2.646A.5.5 0 0 0 3.5 18H5a1 1 0 0 1 1 1v1.5a.5.5 0 0 0 .854.354L9.5 18.207A1.7 1.7 0 0 0 10 17v-2a1 1 0 0 0-1-1z" /><path d="M9.707 14.293 21 3" /></svg>
  ),
  "crown": (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" /><path d="M5 21h14" /></svg>
  ),
  "star": (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg>
  ),
  "heart": (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
  ),
  "linkedin": (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
  ),
  "award": (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-award-icon lucide-award"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" /><circle cx="12" cy="8" r="6" /></svg>),
  "github": (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github-icon lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>)
};

const developers = [
  {
    name: "Anshul Saxena",
    role: "Team Leader",
    image: anshulImg,
    icon: "bow-arrow",
    linkedin: "https://www.linkedin.com/in/anshul-saxena-899771362/",
    github: "https://github.com/AnshulAlgoS",
    roleTagline: " Full-Stack Workflow & System Logic",
    description: "Leads development, architecture, and logic decisions",
    glowTagline: "Turning code into magic"
  },
  {
    name: "Mahira Khan",
    role: "Front-End & UI/UX Lead",
    image: mahiraImg,
    icon: "crown",
    linkedin: "https://www.linkedin.com/in/mahira-khan-678646286/",
    github: "https://github.com/Walker71619",
    roleTagline: "Transforming vision into intuitive digital experiences",
    description: "Solves problems through design-driven front-end development",
    glowTagline: "Turning code into beautiful journeys"
  }
  ,

  {
    name: "Gourika",
    role: "Frontend Dev and Ideation Lead",
    image: gourikaImg,
    icon: "award",
    linkedin: "https://www.linkedin.com/in/gourika-b53280348/",
    github: "https://github.com/Gourika55",
    roleTagline: "Designs with intent, pitches with confidence",
    description: "Owns the Pitch,polishes the UI",
    glowTagline: "Turning code to clarity. "
  },
  {
    name: "Avanya",
    role: "Frontend dev and UI Graphics specialist",
    image: avanyaImg,
    icon: "heart",
    linkedin: "https://www.linkedin.com/in/avanya-sharma-21794b310/",
    github: "https://github.com/avanya06",
    description: "Develops frontend features and crafts visuals",
    glowTagline: "Turning code into vision"
  }
];

const About = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 468);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="about-wrapper">
      <h1 className="campus-title">Campus Hustle</h1>
      <p className="campus-tagline">Empowering Students to Earn, Learn & Connect</p>

      <h2 className="section-heading">
        Meet The Hustlers With A Repo. <br />
        <span className="section-subline">— Pushing code. Pulling impact.</span>
      </h2>


      {isMobile ? (
        <TeamCarousel members={developers} />
      ) : (
        <div className="dev-carousel">
          {developers.map((dev, idx) => (
            <div className="dev-card" key={idx}>
              <div className="image-container">
                <img src={dev.image} alt={dev.name} className="dev-img" />
              </div>
              <div className="dev-info">
                <h3 className="name-icon">
                  <span className="icon">{Icons[dev.icon]}</span>
                  {dev.name}
                </h3>
                <p className="role">{dev.role}</p>
                <p className="role-tagline">{dev.roleTagline}</p>
                <p className="description">{dev.description}</p>
                <div className="glow-tagline">{dev.glowTagline}</div>
                <div className="icon-links">
  <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin-link">
    {Icons.linkedin}
  </a>
  <a href={dev.github} target="_blank" rel="noopener noreferrer" className="github-link">
    {Icons.github}
  </a>
</div>

              </div>

            </div>
          ))}
        </div>
      )}

      <div className="quote-section">
        <blockquote>
          "A campus where your hustle meets opportunity — we’re building the future for students, by students."
        </blockquote>
      </div>
    </div>
  );
};

export default About;
