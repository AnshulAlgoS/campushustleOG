// src/views/DashboardPage.js
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import './dashboard.css';

import img1 from '../assets/images/h1.jpeg';
import img2 from '../assets/images/h2.jpeg';
import img3 from '../assets/images/h3.jpeg';
import img4 from '../assets/images/h4.jpeg';
import img5 from '../assets/images/h5.jpeg';
import img6 from '../assets/images/h6.jpeg';
import img7 from '../assets/images/h7.jpeg';
import img8 from '../assets/images/h2.jpeg';
import img9 from '../assets/images/w1.jpeg';
import img10 from '../assets/images/w2.jpeg';
import img11 from '../assets/images/w3.jpeg';
import img12 from '../assets/images/w4.jpeg';
import img13 from '../assets/images/w5.jpeg';
import img14 from '../assets/images/w6.jpeg';
import img15 from '../assets/images/w7.jpeg';
import img16 from '../assets/images/w8.jpeg';

const fallbackImages = [img1, img2, img3, img4, img5, img6, img7, img8];
const fallbackImages2 = [img9, img10, img11, img12, img13, img14, img15, img16];

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [createdGigs, setCreatedGigs] = useState([]);
  const [appliedGigs, setAppliedGigs] = useState([]);
  const [enrolledHackathons, setEnrolledHackathons] = useState([]);
  const [organizedHackathons, setOrganizedHackathons] = useState([]);
  const [mentorshipsActive, setMentorshipsActive] = useState(0);
  const [promotions, setPromotions] = useState([]);


  useEffect(() => {
    const unsub = auth.onAuthStateChanged(u => {
      setUser(u || null);
      setLoading(false);
    });
    return () => unsub();
  }, []);
  useEffect(() => {
    const fetchUserPromotions = async () => {
      if (!user) return;
      const ref = collection(db, 'users', user.uid, 'promotions');
      const snapshot = await getDocs(ref);
      setPromotions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchUserPromotions();
  }, [user]);

  useEffect(() => {
    if (!user?.uid) return;

    const fetchAll = async () => {
      try {
        const [
          gigsSnap,
          appsSnap,
          regSnap,
          mentSnap,
          orgSnap
        ] = await Promise.all([
          getDocs(query(collection(db, 'gigs'), where('createdBy', '==', user.uid))),
          getDocs(query(collection(db, 'applications'), where('applicantId', '==', user.uid))),
          getDocs(query(collection(db, 'registrations'), where('userId', '==', user.uid))),
          getDocs(query(collection(db, 'mentorships'), where('userId', '==', user.uid), where('isActive', '==', true))),
          getDocs(query(collection(db, 'hackathons'), where('userId', '==', user.uid)))
        ]);

        setCreatedGigs(gigsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        setAppliedGigs(appsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        setEnrolledHackathons(regSnap.docs.map(d => d.data()));
        setOrganizedHackathons(orgSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        setMentorshipsActive(mentSnap.size);
      } catch (err) {
        console.error('Dashboard fetch error', err);
      }
    };
    fetchAll();
  }, [user]);

  if (loading) return <p style={{ textAlign: 'center' }}>🔄 Loading your dashboard...</p>;
  if (!user) return <p style={{ textAlign: 'center' }}>⚠️ Please login to view dashboard.</p>;

  return (
    <div className="dashboard-content">
      <h2>Your Dashboard</h2>
      <p>Quick overview of your activity on CampusHustle</p>

      {/* summary widgets */}
      <div className="dashboard-widgets">
        <div className="widget-card"><h3>Gigs Posted</h3><p>{createdGigs.length}</p></div>
        <div className="widget-card"><h3>Gigs Applied</h3><p>{appliedGigs.length}</p></div>
        <div className="widget-card"><h3>Hackathons Registered</h3><p>{enrolledHackathons.length}</p></div>
        <div className="widget-card"><h3>Hackathons Organized</h3><p>{organizedHackathons.length}</p></div>
        <div className="widget-card"><h3>Mentorships Active</h3><p>{mentorshipsActive}</p></div>
      </div>

      {/* registered hackathons */}
      {enrolledHackathons.length > 0 && (
        <>
          <h3 className="section-heading">Your Registered Hackathons</h3>
          <div className="registered-hackathon-cards">
            {enrolledHackathons.map((h, idx) => (
              <div className="registered-card" key={idx}>
                <img src={h.hackathonImage || fallbackImages[idx % fallbackImages.length]} alt={h.hackathonName} className="registered-image" />
                <div className="registered-info">
                  <h4>{h.hackathonName}</h4>
                  <p><strong>Team:</strong> {h.teamName || '—'}</p>
                  <p><strong>Members:</strong> {h.memberCount || '—'}</p>
                  <p><strong>Registered:</strong> {h.submittedAt?.seconds ? new Date(h.submittedAt.seconds * 1000).toLocaleDateString() : 'N/A'}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* organised hackathons */}
      {organizedHackathons.length > 0 && (
        <>
          <h3 className="section-heading">Hackathons You Organized</h3>
          <div className="registered-hackathon-cards">
            {organizedHackathons.map((h, idx) => (
              <div className="registered-card" key={h.id}>
                <img src={fallbackImages[idx % fallbackImages.length]} alt={h.title} className="registered-image" />
                <div className="registered-info">
                  <h4>{h.title}</h4>
                  <p><strong>Mode:</strong> {h.mode}</p>
                  <p><strong>Start:</strong> {h.startDate}</p>
                  <p><strong>End:</strong> {h.endDate}</p>
                  <p><strong>Team Size:</strong> {h.teamSize}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* gigs posted */}
      {createdGigs.length > 0 && (
        <>
          <h3 className="section-heading">Gigs You've Posted</h3>
          <div className="registered-hackathon-cards">
            {createdGigs.map((g, idx) => (
              <div className="registered-card" key={g.id}>
                <img src={fallbackImages2[idx % fallbackImages2.length]} alt={g.title} className="registered-image" />
                <div className="registered-info">
                  <h4>{g.title}</h4>
                  <p><strong>Category:</strong> {g.category}</p>
                  <p><strong>Budget:</strong> {g.payment}</p>
                  <p><strong>Deadline:</strong> {g.endDate}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* gigs applied */}
      {appliedGigs.length > 0 && (
        <>
          <h3 className="section-heading">Gigs You've Applied To</h3>
          <div className="registered-hackathon-cards">
            {appliedGigs.map((a, idx) => (
              <div className="registered-card" key={a.id}>
                <img src={fallbackImages2[(idx + 3) % fallbackImages2.length]} alt="Applied Gig" className="registered-image" />
                <div className="registered-info">
                  <p><strong>Gig ID:</strong> {a.gigId}</p>
                  <p><strong>Message:</strong> {a.reason || '—'}</p>
                  <p><strong>Applied On:</strong> {a.appliedAt?.seconds ? new Date(a.appliedAt.seconds * 1000).toLocaleDateString() : 'N/A'}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {/* promotions created by user */}
      {promotions.length > 0 && (
        <>
          <h3 className="section-headings">Your Active Promotions</h3>
          <div className="registered-hackathons-cards">
            {promotions.map((promo, idx) => (
              <div className="registered-cards" key={promo.id}>
                <img
                  src={fallbackImages[(idx + 5) % fallbackImages.length]}
                  alt={promo.title}
                  className="registered-images"
                />
                <div className="registered-infos">
                  <h4>{promo.title}</h4>
                  <p><strong>Description:</strong> {promo.description}</p>
                  <p><strong>Status:</strong> {promo.status}</p>
                  <a href={promo.linkTo} target="_blank" rel="noreferrer" style={{ color: '#3366cc' }}>
                    🔗 View Promotion
                  </a>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

    </div>
  );
}
