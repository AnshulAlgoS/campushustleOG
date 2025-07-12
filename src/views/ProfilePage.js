import React, { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './ProfilePage.css';
export default function ProfilePage({ user, userProfile }) {

    const [formData, setFormData] = useState({
        firstName: userProfile?.firstName || '',
        lastName: userProfile?.lastName || '',
        college: userProfile?.college || '',
        phone: userProfile?.phone || '',
        skills: userProfile?.skills || '',
        about: userProfile?.about || '',
        tags: userProfile?.tags || [],
        email: user?.email || ''
    });


    const tagOptions = [
        'Freelancer', 'Gig Seeker', 'Mentor', 'Student', 'Hackathon Participant'
    ];
    useEffect(() => {
        const fetchProfile = async () => {
            if (user) {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setFormData(prev => ({
                        ...prev,
                        ...docSnap.data()
                    }));
                } else {
                    setFormData(prev => ({
                        ...prev,
                        email: user.email
                    }));
                }
            }
        };
        fetchProfile();
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const toggleTag = (tag) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.includes(tag)
                ? prev.tags.filter(t => t !== tag)
                : [...prev.tags, tag]
        }));
    };

    const saveProfile = async () => {
        if (user) {
            await setDoc(doc(db, 'users', user.uid), {
                ...formData,
                email: user.email
            });
            alert('✅ Profile saved successfully!');
        }
    };

    return (
        <div className="profile-content-wrapper">
            <h2>Edit Profile</h2>

            <div className="form-group">
                <label>First Name</label>
                <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Last Name</label>
                <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Email (readonly)</label>
                <input
                    value={formData.email || user?.email || ''}
                    readOnly
                />
            </div>

            <div className="form-group">
                <label>Phone</label>
                <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>College</label>
                <input
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Skills</label>
                <input
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>About You</label>
                <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Tags (Choose how you use CampusHustle)</label>
                <div className="tag-container">
                    {tagOptions.map(tag => (
                        <button
                            key={tag}
                            className={`tag ${formData.tags.includes(tag) ? 'selected' : ''}`}
                            onClick={() => toggleTag(tag)}
                            type="button"
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            <div className="form-actions">
                <button onClick={saveProfile} className="save-btn">💾 Save Profile</button>
            </div>
        </div>
    );
}
