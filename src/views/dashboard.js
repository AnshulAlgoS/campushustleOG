import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './dashboard.css';

import img1 from '../assets/images/h1.jpeg';
import img2 from '../assets/images/h2.jpeg';
import img3 from '../assets/images/h3.jpeg';
import img4 from '../assets/images/h4.jpeg';
import img5 from '../assets/images/h5.jpeg';
import img6 from '../assets/images/h6.jpeg';
import img7 from '../assets/images/h7.jpeg';
import img8 from '../assets/images/h2.jpeg';

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

  const fallbackImages = [img1, img2, img3, img4, img5, img6, img7, img8];


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      if (currentUser) setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

useEffect(() => {
  const fetchData = async () => {
    if (!user?.uid) return;

    try {
      const [gigsSnap, hackSnap, mentorSnap] = await Promise.all([
        getDocs(query(collection(db, 'freelanceGigs'), where('userId', '==', user.uid))),
        getDocs(query(collection(db, 'registrations'), where('userId', '==', user.uid))),
        getDocs(query(collection(db, 'mentorships'), where('userId', '==', user.uid), where('isActive', '==', true)))
      ]);

      const orgSnap = await getDocs(
        query(collection(db, 'hackathons'), where('userId', '==', user.uid)) // 🔁 Updated collection
      );

      const enrolledList = hackSnap.docs.map(doc => doc.data());
      const organizedList = orgSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

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

  if (user) fetchData();
}, [user]);


  if (loading) return <p style={{ textAlign: 'center' }}>🔄 Loading your dashboard...</p>;
  if (!user) return <p style={{ textAlign: 'center' }}>⚠️ Please login to view dashboard.</p>;

  return (
    <div className="dashboard-content">
      <h2>Your Dashboard</h2>
      <p>Quick overview of your activity on CampusHustle</p>

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

      {enrolledHackathons.length > 0 && (
        <>
          <h3 className="section-heading">Your Registered Hackathons</h3>
          <div className="registered-hackathon-cards">
            {enrolledHackathons.map((item, idx) => (
              <div className="registered-card" key={idx}>
                <img
                  src={item.hackathonImage || fallbackImages[idx % fallbackImages.length]}
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
      {organizedHackathons.length > 0 && (
  <>
    <h3 className="section-heading">Hackathons You Organized</h3>
    <div className="registered-hackathon-cards">
      {organizedHackathons.map((item, idx) => (
        <div className="registered-card" key={item.id}>
          <img
            src={fallbackImages[idx % fallbackImages.length]}
            alt={item.title}
            className="registered-image"
          />
          <div className="registered-info">
            <h4>{item.title}</h4>
            <p><strong>Mode:</strong> {item.mode}</p>
            <p><strong>Start:</strong> {item.startDate}</p>
            <p><strong>End:</strong> {item.endDate}</p>
            <p><strong>Teamsize:</strong> {item.teamSize}</p>
          </div>
        </div>
      ))}
    </div>
  </>
)}

    </div>
  );
}

