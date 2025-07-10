import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './dashboard.css';

export default function DashboardPage({ user }) {
  const [counts, setCounts] = useState({
    gigsApplied: 0,
    hackathonsEnrolled: 0,
    mentorshipsActive: 0
  });

  useEffect(() => {
    const fetchCounts = async () => {
      if (!user?.uid) return;

      const gigsQuery = query(
        collection(db, 'freelanceGigs'),
        where('userId', '==', user.uid)
      );
      const gigsSnap = await getDocs(gigsQuery);

      const hackQuery = query(
        collection(db, 'hackathonEnrolments'),
        where('userId', '==', user.uid)
      );
      const hackSnap = await getDocs(hackQuery);

      const mentorQuery = query(
        collection(db, 'mentorships'),
        where('userId', '==', user.uid),
        where('isActive', '==', true)
      );
      const mentorSnap = await getDocs(mentorQuery);

      setCounts({
        gigsApplied: gigsSnap.size,
        hackathonsEnrolled: hackSnap.size,
        mentorshipsActive: mentorSnap.size
      });
    };

    fetchCounts();
  }, [user]);

  return (
    <div className="dashboard-content">
      <h2>📊 Welcome to Your Dashboard</h2>
      <p>Here's a quick snapshot of your CampusHustle activity:</p>

      <div className="dashboard-widgets">
        <div className="widget-card">
          <h3>🔥 Freelance Gigs</h3>
          <p>{counts.gigsApplied} Applied</p>
        </div>
        <div className="widget-card">
          <h3>💡 Hackathons</h3>
          <p>{counts.hackathonsEnrolled} Enrolled</p>
        </div>
        <div className="widget-card">
          <h3>🎯 Mentorships</h3>
          <p>{counts.mentorshipsActive} Active</p>
        </div>
      </div>
    </div>
  );
}
