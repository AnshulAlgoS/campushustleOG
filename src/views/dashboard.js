import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './dashboard.css';

export default function DashboardPage({ user }) {
  const [counts, setCounts] = useState({
    gigsApplied: 0,
    hackathonsEnrolled: 0,
    hackathonsOrganized: 0,
    mentorshipsActive: 0
  });

  const [enrolledHackathons, setEnrolledHackathons] = useState([]);
  const [organizedHackathons, setOrganizedHackathons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.uid) return;

      const [gigsSnap, hackSnap, orgSnap, mentorSnap] = await Promise.all([
        getDocs(query(collection(db, 'freelanceGigs'), where('userId', '==', user.uid))),
        getDocs(query(collection(db, 'hackathonEnrolments'), where('userId', '==', user.uid))),
        getDocs(query(collection(db, 'hackathonsOrganized'), where('userId', '==', user.uid))),
        getDocs(query(collection(db, 'mentorships'), where('userId', '==', user.uid), where('isActive', '==', true)))
      ]);

      const enrolledList = hackSnap.docs.map(doc => doc.data());
      const organizedList = orgSnap.docs.map(doc => doc.data());

      setEnrolledHackathons(enrolledList);
      setOrganizedHackathons(organizedList);

      setCounts({
        gigsApplied: gigsSnap.size,
        hackathonsEnrolled: hackSnap.size,
        hackathonsOrganized: orgSnap.size,
        mentorshipsActive: mentorSnap.size
      });
    };

    fetchData();
  }, [user]);

  return (
    <div className="dashboard-content">
      <h2>📊 Your Dashboard</h2>
      <p>Quick overview of your activity on CampusHustle</p>

      <div className="dashboard-widgets">
        <div className="widget-card">
          <h3>🔥 Freelance Gigs</h3>
          <p>{counts.gigsApplied}</p>
        </div>
        <div className="widget-card">
          <h3>💡 Hackathons Registered</h3>
          <p>{counts.hackathonsEnrolled}</p>
        </div>
        <div className="widget-card">
          <h3>🛠️ Hackathons Organized</h3>
          <p>{counts.hackathonsOrganized}</p>
        </div>
        <div className="widget-card">
          <h3>🎯 Mentorships</h3>
          <p>{counts.mentorshipsActive}</p>
        </div>
      </div>

      {enrolledHackathons.length > 0 && (
        <>
          <h3 className="section-heading">Your Registered Hackathons</h3>
          <ul className="activity-list">
            {enrolledHackathons.map((item, idx) => (
              <li key={idx}>{item.hackathonName || 'Unnamed Hackathon'}</li>
            ))}
          </ul>
        </>
      )}

      {organizedHackathons.length > 0 && (
        <>
          <h3 className="section-heading">Your Organized Hackathons</h3>
          <ul className="activity-list">
            {organizedHackathons.map((item, idx) => (
              <li key={idx}>{item.title || 'Unnamed Hackathon'}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

