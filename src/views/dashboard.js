import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './dashboard.css';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [counts, setCounts] = useState({
    gigsApplied: 0,
    hackathonsEnrolled: 0,
    hackathonsOrganized: 0,
    mentorshipsActive: 0
  });
  const [enrolledHackathons, setEnrolledHackathons] = useState([]);
  const [organizedHackathons, setOrganizedHackathons] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1️⃣ Fetch the user from Firebase Auth
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        setUser(currentUser);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2️⃣ When user is ready, fetch dashboard data
  useEffect(() => {
    const fetchData = async () => {
      if (!user?.uid) return;

      try {
        const [gigsSnap, hackSnap, orgSnap, mentorSnap] = await Promise.all([
  getDocs(query(collection(db, 'freelanceGigs'), where('userId', '==', user.uid))),
  getDocs(query(collection(db, 'registrations'), where('userId', '==', user.uid))), // ← FIXED
  getDocs(query(collection(db, 'hackathonsOrganized'), where('userId', '==', user.uid))),
  getDocs(query(collection(db, 'mentorships'), where('userId', '==', user.uid), where('isActive', '==', true)))
]);


        const enrolledList = hackSnap.docs.map(doc => doc.data());
        const organizedList = orgSnap.docs.map(doc => doc.data());

        console.log('📦 Hackathon Enrolments:', enrolledList);
        console.log('👤 UID:', user.uid);

        setEnrolledHackathons(enrolledList);
        setOrganizedHackathons(organizedList);

        setCounts({
          gigsApplied: gigsSnap.size,
          hackathonsEnrolled: hackSnap.size,
          hackathonsOrganized: orgSnap.size,
          mentorshipsActive: mentorSnap.size
        });
      } catch (err) {
        console.error('⚠️ Error fetching dashboard data:', err);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]); // trigger when user is set

  // 3️⃣ Handle loading state
  if (loading) return <p style={{ textAlign: 'center' }}>🔄 Loading your dashboard...</p>;

  if (!user) return <p style={{ textAlign: 'center' }}>⚠️ Please login to view dashboard.</p>;

  return (
    <div className="dashboard-content">
      <h2>Your Dashboard</h2>
      <p>Quick overview of your activity on CampusHustle</p>

      {/* Stats Cards */}
      <div className="dashboard-widgets">
        <div className="widget-card">
          <h3>Freelance Gigs</h3>
          <p>{counts.gigsApplied}</p>
        </div>
        <div className="widget-card">
          <h3>Hackathons Registered</h3>
          <p>{counts.hackathonsEnrolled}</p>
        </div>
        <div className="widget-card">
          <h3>Hackathons Organized</h3>
          <p>{counts.hackathonsOrganized}</p>
        </div>
        <div className="widget-card">
          <h3>Mentorships</h3>
          <p>{counts.mentorshipsActive}</p>
        </div>
      </div>

      {/* Registered Hackathons Section */}
      {enrolledHackathons.length > 0 && (
        <>
          <h3 className="section-heading">Your Registered Hackathons</h3>
          <div className="registered-hackathon-cards">
            {enrolledHackathons.map((item, idx) => (
              <div className="registered-card" key={idx}>
                <img
                  src={item.hackathonImage || 'https://via.placeholder.com/300x200?text=Hackathon'}
                  alt={item.hackathonName}
                  className="registered-image"
                />
                <div className="registered-info">
                  <h4>{item.hackathonName}</h4>
                  <p><strong>Team:</strong> {item.teamName}</p>
                  <p><strong>Members:</strong> {item.memberCount}</p>
                  <p><strong>On:</strong> {item.submittedAt?.seconds ? new Date(item.submittedAt.seconds * 1000).toLocaleDateString() : 'N/A'}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
