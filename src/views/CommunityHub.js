import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  addDoc,
  updateDoc,
  doc,
  onSnapshot,
  increment,
  setDoc,
} from "firebase/firestore";
import "./CommunityHub.css";

export default function CommunityHub() {
  const [activeSection, setActiveSection] = useState("");
  const [streak, setStreak] = useState(0);

  const [posts, setPosts] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  const currentUser = { name: "Mahira", role: "developer" };
  const currentUserIsModerator = ["developer", "top3"].includes(currentUser.role);

  // --- Post creation state ---
  const [postText, setPostText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSubmitPost = () => {
    handleNewPost(postText, selectedImage);
    setPostText("");
    setSelectedImage(null);
  };

  // --- Firestore subscriptions ---
  useEffect(() => {
    if (!activeSection) return;

    const postsRef = collection(db, "communityPosts");
    const q = query(postsRef, where("section", "==", activeSection), orderBy("time", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(data);
    });

    return () => unsubscribe();
  }, [activeSection]);

  useEffect(() => {
    const q = query(collection(db, "leaderboard"), orderBy("score", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setLeaderboard(data);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const today = new Date().toDateString();
    const lastActiveDate = localStorage.getItem("lastActiveDate");
    let currentStreak = parseInt(localStorage.getItem("streakCount") || "0", 10);

    if (!lastActiveDate) {
      currentStreak = 1;
    } else if (lastActiveDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (lastActiveDate === yesterday.toDateString()) {
        currentStreak += 1;
      } else {
        currentStreak = 1;
      }
    }

    localStorage.setItem("lastActiveDate", today);
    localStorage.setItem("streakCount", currentStreak.toString());
    setStreak(currentStreak);
  }, []);

  const addPoints = async (username, points) => {
    const ref = doc(db, "leaderboard", username);
    await setDoc(ref, { name: username, score: increment(points) }, { merge: true });
  };

  const handleNewPost = async (text, imageFile = null) => {
    if (!activeSection || !text.trim()) return;

    const newPost = {
      section: activeSection,
      user: currentUser.name,
      text,
      imageUrl: imageFile ? URL.createObjectURL(imageFile) : "",
      time: new Date().toISOString(),
      replies: [],
    };
    await addDoc(collection(db, "communityPosts"), newPost);
    await addPoints(currentUser.name, 10);
  };

  const handleReply = async (postId, replyText) => {
    if (!replyText.trim()) return;

    const postRef = doc(db, "communityPosts", postId);
    const post = posts.find((p) => p.id === postId);

    const existingReplies = Array.isArray(post.replies) ? post.replies : [];
    const updatedReplies = [
      ...existingReplies,
      { user: currentUser.name, text: replyText },
    ];

    await updateDoc(postRef, { replies: updatedReplies });
    await addPoints(currentUser.name, 5);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hackathons", path: "/explore-hackathons" },
    { name: "Freelance", path: "/freelance" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Mentorship", path: "/mentorship" },
    { name: "About", path: "/about" },
  ];

  const sidebarButtons = [
    "Web Dev",
    "DSA",
    "Announcements",
    "Posts",
    "General Talks",
    "Leaderboard",
    "Daily LeetCode Tasks",
    "Guidelines",
  ];

  const renderDiscussionSection = (placeholderText) => {
    return (
      <div className="discussion-container">
        <div className="post-box">
          <textarea
            placeholder={placeholderText}
            rows="3"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
          <div className="post-box-actions">
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="imageUpload"
              onChange={handleFileChange}
            />
            <button
              className="attach-btn"
              onClick={() => document.getElementById("imageUpload").click()}
            >
              +
            </button>
            <button className="post-btn" onClick={handleSubmitPost}>
              Post
            </button>
          </div>
        </div>

        <div className="posts-feed">
          {posts.map((post) => (
            <div className="post-card" key={post.id}>
              <div className="post-header">
                <strong>{post.user}</strong>
                {post.time && (
                  <span className="time">
                    {new Date(post.time).toLocaleString()}
                  </span>
                )}
              </div>
              <p className="post-text">{post.text}</p>
              {post.imageUrl && (
                <img src={post.imageUrl} alt="post" className="post-image" />
              )}
              <div className="replies">
                {post.replies?.map((rep, index) => (
                  <div className="reply" key={index}>
                    <strong>{rep.user}:</strong> {rep.text}
                    <button
                      className="reply-btn"
                      onClick={() => addPoints(rep.user, 5)}
                    >
                      👍
                    </button>
                  </div>
                ))}
                <div style={{ marginTop: "8px" }}>
                  <input
                    placeholder="Write a reply..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleReply(post.id, e.target.value);
                        e.target.value = "";
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case "Web Dev":
      case "DSA":
      case "Announcements":
      case "Posts":
      case "General Talks":
        return renderDiscussionSection(`Share something in ${activeSection}...`);

      case "Leaderboard":
        return (
          <div className="leaderboard-container">
            <h2 className="leaderboard-title">Leaderboard</h2>
            <div className="leaderboard-list">
              {leaderboard.map((user, index) => (
                <div key={user.id} className="leaderboard-item">
                  <div className="leaderboard-left">
                    <span className="rank">#{index + 1}</span>
                    <span className="name">{user.name}</span>
                  </div>
                  <div className="score">{user.score}</div>
                </div>
              ))}
            </div>
          </div>
        );


      case "Daily LeetCode Tasks":
  const dailyChallenges = [
    { title: "Two Sum", difficulty: "Easy", topic: "Arrays", url: "https://leetcode.com/problems/two-sum/" },
    { title: "Longest Substring Without Repeating Characters", difficulty: "Medium", topic: "Strings", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
    { title: "Median of Two Sorted Arrays", difficulty: "Hard", topic: "Binary Search", url: "https://leetcode.com/problems/median-of-two-sorted-arrays/" },
  ];

  return (
    <div className="leetcode-container">
      <h2 className="leetcode-title">Daily Coding Challenges</h2>
      <div className="leetcode-list">
        {dailyChallenges.map((q, index) => (
          <div key={index} className="leetcode-card">
            <h3>{q.title}</h3>
            <p>
              <strong>Difficulty:</strong> {q.difficulty} |{" "}
              <strong>Topic:</strong> {q.topic}
            </p>
            <button
              className="solve-btn"
              onClick={() => {
                let points = 0;
                if (q.difficulty === "Easy") points = 10;
                else if (q.difficulty === "Medium") points = 20;
                else if (q.difficulty === "Hard") points = 30;

                addPoints(currentUser.name, points);
                window.open(q.url, "_blank");
              }}
            >
              Solve Challenge
            </button>
          </div>
        ))}
      </div>
    </div>
  );


      case "Guidelines":
        return (
          <div className="section-content guidelines">
            <h2>Community Guidelines</h2>
             <p>
            Welcome to the <strong>Campus Hustle Community Hub</strong>!  
            This platform is designed as a collaborative environment for students, developers,
            and professionals to learn, grow, and help each other.  
            To ensure a safe, productive, and enjoyable experience for everyone, please read 
            these guidelines carefully. By participating here, you agree to follow these rules.
          </p>

          <h3>1. Purpose of the Community</h3>
          <p>
            Our goal is to create a space where learners can:
          </p>
          <ul>
            <li>Discuss and share knowledge about <strong>Web Development</strong>, <strong>DSA</strong>, and modern technologies.</li>
            <li>Collaborate on coding challenges and projects.</li>
            <li>Get regular practice through <strong>daily LeetCode tasks</strong>.</li>
            <li>Grow their skills while earning recognition through points, badges, and streaks.</li>
            <li>Network with peers and experienced developers.</li>
          </ul>

          <h3>2. Categories</h3>
          <p>
            Each section of the Community Hub has a unique purpose. Use them as follows:
          </p>
          <ul>
            <li>
              <strong>Web Dev:</strong> Focused on frontend, backend, and full-stack development.  
              Share tutorials, ask questions about frameworks (React, Node, Django, etc.), 
              or showcase projects.
            </li>
            <li>
              <strong>DSA:</strong> Discuss Data Structures, Algorithms, and competitive programming.  
              Solve problems together, clarify concepts, and share learning resources.
            </li>
            <li>
              <strong>Announcements:</strong> Official Campus Hustle updates, hackathon news,
              feature launches, and important notices.
            </li>
            <li>
              <strong>Posts:</strong> A free space to ask for help, share experiences, achievements,
              or general ideas that don’t fit other sections.
            </li>
            <li>
              <strong>General Talks:</strong> Light-hearted, non-technical conversations,
              networking, career discussions, and casual chat.
            </li>
            <li>
              <strong>Leaderboard:</strong> Displays user rankings based on points earned.
            </li>
            <li>
              <strong>Daily LeetCode Tasks:</strong> A coding challenge section where one
              problem is posted daily. Users can attempt and share their solutions.
            </li>
          </ul>

          <h3>3. Badges & Recognition</h3>
          <p>
            Our badge system recognizes dedication and contribution:
          </p>
          <ul>
            <li>
              <strong>Top 3 Users:</strong> 🥇🥈🥉 – Earned by those with the highest scores.
              Top 3 users receive <em>moderation privileges</em> such as flagging and
              hiding inappropriate posts.
            </li>
            <li>
              <strong>Developer Team:</strong> 🛠️ – Official Campus Hustle developers with
              full administrative control and community management responsibilities.
            </li>
            <li>
              <strong>Streak:</strong> 🔥 – A streak count next to your profile tracks your
              consecutive days of activity in the hub. Daily engagement increases your streak.
            </li>
          </ul>

          <h3>4. Points & Leaderboard System</h3>
          <p>
            Participation is rewarded with points:
          </p>
          <ul>
            <li><strong>10 points</strong> for every new post you create.</li>
            <li><strong>5 points</strong> for each reply you make on someone’s post.</li>
            <li>Leaderboard ranks are updated in real-time and reset periodically.</li>
            <li>Top performers get visibility, badges, and moderation power.</li>
          </ul>

          <h3>5. Moderation & Roles</h3>
          <p>
            To maintain quality:
          </p>
          <ul>
            <li><strong>Top 3 users</strong> can flag, hide, or report inappropriate content.</li>
            <li><strong>Developer team</strong> has full control (edit, delete, ban, approve content).</li>
            <li>Community moderation ensures a respectful and valuable environment.</li>
          </ul>

          <h3>6. Rules of Conduct</h3>
          <ul>
            <li>Be respectful and supportive of others. No harassment or hate speech.</li>
            <li>Avoid spam, irrelevant self-promotion, and misleading content.</li>
            <li>Use each section for its intended purpose.</li>
            <li>Contribute meaningful discussions and avoid one-word/low-quality posts.</li>
            <li>Always credit sources if you share external resources or code.</li>
          </ul>

          <h3>7. Reporting Issues</h3>
          <p>
            If you encounter inappropriate content, you can:
          </p>
          <ul>
            <li>Flag the post (if you are a top 3 user).</li>
            <li>Or contact a developer/admin for assistance.</li>
          </ul>

          <h3>8. Final Note</h3>
          <p>
            This community grows with your contributions. Engage positively, share
            generously, and help others grow. Together, we can make Campus Hustle
            a vibrant space for skill-building and collaboration!
          </p>
          </div>
        );

      default:
        return <h1 className="welcome-text">Welcome to the Community Hub</h1>;
    }
  };

  return (
    <div className="hub-container">
      <nav className="hub-navbar">
        <div className="left-nav">
          <span className="logo">
            Campus Hustle <span className="streak">🔥{streak}</span>
          </span>
        </div>
        <div className="right-nav">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className="nav-link">
              {link.name}
            </Link>
          ))}
        </div>
      </nav>

      <div className="hub-main">
        <aside className="hub-sidebar">
          {sidebarButtons.map((btn) => (
            <button
              key={btn}
              className={`sidebar-btn ${activeSection === btn ? "active" : ""}`}
              onClick={() => setActiveSection(btn)}
            >
              {btn}
            </button>
          ))}
        </aside>

        <section className="hub-content">{renderContent()}</section>
      </div>
    </div>
  );
}
