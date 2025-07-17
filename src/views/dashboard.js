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
  const [createdGigs, setCreatedGigs] = useState([]);
  const [appliedGigs, setAppliedGigs] = useState([]);


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
        const [userGigsSnap, applicationsSnap, hackSnap, mentorSnap, orgSnap] = await Promise.all([
          getDocs(query(collection(db, 'gigs'), where('createdBy', '==', user.uid))),
          getDocs(query(collection(db, 'applications'), where('applicantId', '==', user.uid))),
          getDocs(query(collection(db, 'registrations'), where('userId', '==', user.uid))),
          getDocs(query(collection(db, 'mentorships'), where('userId', '==', user.uid), where('isActive', '==', true))),
          getDocs(query(collection(db, 'hackathons'), where('userId', '==', user.uid)))
        ]);

        setCreatedGigs(userGigsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setAppliedGigs(applicationsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const enrolledList = hackSnap.docs.map(doc => doc.data());
        const organizedList = orgSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        setEnrolledHackathons(enrolledList);
        setOrganizedHackathons(organizedList);

        setCounts({
          gigsPosted: userGigsSnap.size,
          gigsApplied: applicationsSnap.size,
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
      {createdGigs.length > 0 && (
        <>
          <h3 className="section-heading">Gigs You've Posted</h3>
          <div className="registered-hackathon-cards">
            {createdGigs.map((gig, idx) => (
              <div className="registered-card" key={gig.id}>
                <img src={fallbackImages[idx % fallbackImages.length]} alt={gig.title} className="registered-image" />
                <div className="registered-info">
                  <h4>{gig.title}</h4>
                  <p><strong>Category:</strong> {gig.category}</p>
                  <p><strong>Budget:</strong> {gig.payment}</p>
                  <p><strong>Deadline:</strong> {gig.endDate}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {appliedGigs.length > 0 && (
        <>
          <h3 className="section-heading">Gigs You've Applied To</h3>
          <div className="registered-hackathon-cards">
            {appliedGigs.map((app, idx) => (
              <div className="registered-card" key={app.id}>
                <img src={fallbackImages[(idx + 3) % fallbackImages.length]} alt="Applied Gig" className="registered-image" />
                <div className="registered-info">
                  <p><strong>Gig ID:</strong> {app.gigId}</p>
                  <p><strong>Message:</strong> {app.reason || 'N/A'}</p>
<p><strong>Applied On:</strong> {app.submittedAt?.seconds ? new Date(app.submittedAt.seconds * 1000).toLocaleDateString() : 'N/A'}</p>

                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

