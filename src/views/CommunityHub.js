import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
import { db } from "../firebase";
import { realtimeDb } from "../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  addDoc,
  getDoc,
  updateDoc,
  doc,
  onSnapshot,
  increment,
  setDoc,
  deleteDoc
} from "firebase/firestore";
import "./CommunityHub.css";
import { getAuth } from "firebase/auth";

export default function CommunityHub() {
  const [activeSection, setActiveSection] = useState("");
  const [streak, setStreak] = useState(0);
  const [dailyChallenges, setDailyChallenges] = useState([]);
  const [posts, setPosts] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [selectedChallengeFiles, setSelectedChallengeFiles] = useState({});
  const [solvedChallenges, setSolvedChallenges] = useState([]);
const viewSubmittedFile = async (challengeId) => {
  try {
    const docRef = doc(db, "leetcodeSubmissions", challengeId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const fileUrl = docSnap.data().fileUrl;
      window.open(fileUrl, "_blank");
    } else {
      alert("No submission found!");
    }
  } catch (error) {
    console.error("Error viewing solution:", error);
  }
};



  const DEVELOPER_UIDS = [
    "y4uwXwguMtS0SoMQEufZiXRdhEG2", // avanya
    "7gFs4XSxQGNF8odXcjZ1C2TEIwl2",//gourika
    "UgLHv8rtIsTWEuuG3PcGbwZDdMl1",//mahira
    "92mJyu5IhTcXoyMbQCzUyl8PbC12",//anshul
  ];
  const auth = getAuth();
  const user = auth.currentUser;

  const currentUser = {
    name: user?.displayName || "Unknown",
    uid: user?.uid,
    email: user?.email
  };

  const currentUserIsDeveloper = DEVELOPER_UIDS.includes(currentUser.uid);
  const currentUserIsTop3 = leaderboard
    .slice(0, 3)
    .some((u) => u.name === currentUser.name);

  const currentUserIsModerator = currentUserIsDeveloper;

  // --- Post creation state ---
  const [postText, setPostText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };
  const handleChallengeFileChange = (e, challengeId) => {
    setSelectedChallengeFiles(prev => ({
      ...prev,
      [challengeId]: e.target.files[0]
    }));
  };

  const handleChallengeSubmission = async (challenge, file = null) => {
    if (!user) return alert("You need to be logged in.");

    if (solvedChallengeIds[challenge.id]) {
      alert("You've already solved this challenge.");
      return;
    }

    const points =
      challenge.DIFFICULTY === "Easy" ? 10 :
        challenge.DIFFICULTY === "Medium" ? 20 :
          challenge.DIFFICULTY === "Hard" ? 30 : 0;

    try {
      const submissionRef = await addDoc(collection(db, "challengeSubmissions"), {
        userId: user.uid,
        userName: currentUser.name,
        challengeId: challenge.id,
        title: challenge.TITLE,
        difficulty: challenge.DIFFICULTY,
        topic: challenge.TOPIC,
        link: challenge.LINK,
        submittedAt: new Date().toISOString(),
        pointsAwarded: points,
      });

      if (file) {
        await updateDoc(submissionRef, {
          fileName: file.name,
        });
      }

      await addPoints(currentUser.name, points);
      alert("Challenge submitted and points added!");
    } catch (err) {
      console.error(err);
      alert("Something went wrong during submission.");
    }
  };

  const handleSubmitPost = () => {
    handleNewPost(postText, selectedImage);
    setPostText("");
    setSelectedImage(null);
  };
  const [solvedChallengeIds, setSolvedChallengeIds] = useState({});

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "challengeSubmissions"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const solved = {};
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        solved[data.challengeId] = doc.id;
      });
      setSolvedChallengeIds(solved);
    });

    return () => unsubscribe();
  }, [user]);

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

  useEffect(() => {
    const challengesRef = ref(realtimeDb, 'challenges');

    const unsubscribe = onValue(challengesRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Fetched challenges data:", data);

      if (data) {
        const challengesArray = Object.entries(data).map(([id, value]) => ({
          id,
          ...value
        }));
        setDailyChallenges(challengesArray);
      } else {
        setDailyChallenges([]);
      }
    });

    return () => unsubscribe();
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


  const handleDeletePost = async (postId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      const postRef = doc(db, "communityPosts", postId);
      await deleteDoc(postRef);
      console.log("Post deleted:", postId);
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete the post.");
    }
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
              {currentUserIsModerator && (
                <button
                  className="delete-post-btn"
                  onClick={() => handleDeletePost(post.id)}
                  title="Delete Post"
                >
                  🗑️
                </button>
              )}
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
                    <span className="name">
                      {user.name}
                      {index === 0 && " 🥇"}
                      {index === 1 && " 🥈"}
                      {index === 2 && " 🥉"}
                      {DEVELOPER_UIDS.includes(user.id) && " 🛠️"}
                    </span>
                  </div>
                  <div className="score">{user.score}</div>
                </div>
              ))}

            </div>
          </div>
        );



      case "Daily LeetCode Tasks":
        return (
          <div className="leetcode-container">
            <h2 className="leetcode-title">Daily Coding Challenges</h2>
            <div className="leetcode-list">
              {dailyChallenges.map((q, index) => {
                const getGradient = () => {
                  if (q.difficulty === "Easy") return "easy-gradient";
                  if (q.difficulty === "Medium") return "medium-gradient";
                  if (q.difficulty === "Hard") return "hard-gradient";
                  return "";
                };

                return (
                  <div key={index} className={`leetcode-card ${getGradient()}`}>
                    <h3>{q.TITLE}</h3>
                    <p>
                      <strong>Difficulty:</strong> {q.DIFFICULTY} |{" "}
                      <strong>Topic:</strong> {q.TOPIC}
                    </p>

                    {solvedChallenges.includes(q.id) ? (
                      <>
                        <p className="solved-label">✅ Challenge Solved</p>
                        <button className="view-solution-btn" onClick={() => viewSubmittedFile(q.id)}>
                          View Your Solution
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="solve-btn"
                          onClick={() => window.open(q.LINK, "_blank")}
                        >
                          Solve Challenge
                        </button>

                        <input
                          type="file"
                          accept=".pdf,.zip,.txt,.js,.py"
                          onChange={(e) => handleChallengeFileChange(e, q.id)}
                          className="file-input"
                        />

                        <button
                          className="submit-btn"
                          onClick={() => handleChallengeSubmission(q, selectedChallengeFiles[q.id])}
                          disabled={!selectedChallengeFiles[q.id]}
                        >
                          Submit Solution
                        </button>
                      </>
                    )}
                  </div>

                );
              })}
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
