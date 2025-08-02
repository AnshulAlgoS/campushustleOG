import React, { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './ProfilePage.css';
import PromoteModal from 'components/PromoteModal';
import { deductCoins } from '../walletUtils';

export default function ProfilePage({ user, userProfile }) {
    const [formData, setFormData] = useState({
        firstName: userProfile?.firstName || '',
        lastName: userProfile?.lastName || '',
        college: userProfile?.college || '',
        phone: userProfile?.phone || '',
        skills: userProfile?.skills || '',
        about: userProfile?.about || '',
        tags: userProfile?.tags || [],
        email: user?.email || '',
        freelancerProfile: userProfile?.freelancerProfile || {
            name: '',
            photo: '',
            portfolio: '',
            experience: '',
            category: ''
        },
        eventOrganizerProfile: userProfile?.eventOrganizerProfile || {
            organizationName: '', website: '', pastEvents: ''
        },
        mentorProfile: userProfile?.mentorProfile || {
            expertise: '', years: '', availability: ''
        }
    });

    const tagOptions = ['Freelancer', 'Gig Seeker', 'Mentor', 'Student', 'Hackathon Organizer'];

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

    const [promoteType, setPromoteType] = useState(null);
    const openPromoteModal = (type) => setPromoteType(type);
    const closeModal = () => setPromoteType(null);

    const handleSubProfileChange = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handlePromoteClick = async (type) => {
        if (!user?.uid) return alert("You must be logged in.");

        const costMap = {
            freelancer: 1000,
            mentorship: 2000,
            hackathon: 3000
        };

        const cost = costMap[type];
        if (!cost) return alert("Invalid promotion type");

        try {
            await deductCoins(user.uid, cost);
            openPromoteModal(type);
        } catch (error) {
            alert(error.message);
        }
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

            {/* Basic Info */}
            <div className="form-group"><label>First Name</label><input name="firstName" value={formData.firstName} onChange={handleChange} required /></div>
            <div className="form-group"><label>Last Name</label><input name="lastName" value={formData.lastName} onChange={handleChange} required /></div>
            <div className="form-group"><label>Email (readonly)</label><input value={formData.email || user?.email || ''} readOnly /></div>
            <div className="form-group"><label>Phone</label><input name="phone" value={formData.phone} onChange={handleChange} /></div>
            <div className="form-group"><label>College</label><input name="college" value={formData.college} onChange={handleChange} /></div>
            <div className="form-group"><label>Skills</label><input name="skills" value={formData.skills} onChange={handleChange} /></div>
            <div className="form-group"><label>About You</label><textarea name="about" value={formData.about} onChange={handleChange} /></div>

            {/* Tags */}
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

            {/* Freelancer Section */}
            {formData.tags.includes('Freelancer') && (
                <div className="subprofile-section">
                    <h3>Freelancer Profile</h3>

                    {/* Freelancer Name */}
                    <input
                        placeholder="Your Name"
                        value={formData.freelancerProfile.name}
                        onChange={(e) => handleSubProfileChange('freelancerProfile', 'name', e.target.value)}
                    />

                    {/* Upload Photo */}
                    <div className="form-group">
                        <label>Upload Your Photo</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        handleSubProfileChange('freelancerProfile', 'photo', reader.result);
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                    </div>

                    {/* Photo Preview */}
                    {formData.freelancerProfile.photo && (
                        <img
                            src={formData.freelancerProfile.photo}
                            alt="Freelancer Preview"
                            style={{
                                width: '100px',
                                height: '100px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                marginBottom: '10px',
                            }}
                        />
                    )}

                    <input
                        placeholder="Portfolio Link"
                        value={formData.freelancerProfile.portfolio}
                        onChange={(e) => handleSubProfileChange('freelancerProfile', 'portfolio', e.target.value)}
                    />
                    <input
                        placeholder="Years of Experience"
                        value={formData.freelancerProfile.experience}
                        onChange={(e) => handleSubProfileChange('freelancerProfile', 'experience', e.target.value)}
                    />
                    <input
                        placeholder="Gig Category (e.g., Design, Editing)"
                        value={formData.freelancerProfile.category}
                        onChange={(e) => handleSubProfileChange('freelancerProfile', 'category', e.target.value)}
                    />
                    <button className="promote-btn" onClick={() => handlePromoteClick('freelancer')}>
                        Promote My Services
                    </button>
                </div>
            )}

            {/* Hackathon Organizer */}
            {formData.tags.includes('Hackathon Organizer') && (
                <div className="subprofile-section">
                    <h3>Hackathon Organizer Profile</h3>
                    <input
                        placeholder="Organization Name"
                        value={formData.eventOrganizerProfile.organizationName}
                        onChange={(e) => handleSubProfileChange('eventOrganizerProfile', 'organizationName', e.target.value)}
                    />
                    <input
                        placeholder="Website"
                        value={formData.eventOrganizerProfile.website}
                        onChange={(e) => handleSubProfileChange('eventOrganizerProfile', 'website', e.target.value)}
                    />
                    <input
                        placeholder="Past Events"
                        value={formData.eventOrganizerProfile.pastEvents}
                        onChange={(e) => handleSubProfileChange('eventOrganizerProfile', 'pastEvents', e.target.value)}
                    />
                    <button className="promote-btn" onClick={() => handlePromoteClick('hackathon')}>
                        Promote My Hackathon
                    </button>
                </div>
            )}

            {/* Mentor Section */}
            {formData.tags.includes('Mentor') && (
                <div className="subprofile-section">
                    <h3>Mentor Profile</h3>
                    <input
                        placeholder="Area of Expertise"
                        value={formData.mentorProfile.expertise}
                        onChange={(e) => handleSubProfileChange('mentorProfile', 'expertise', e.target.value)}
                    />
                    <input
                        placeholder="Years of Mentoring"
                        value={formData.mentorProfile.years}
                        onChange={(e) => handleSubProfileChange('mentorProfile', 'years', e.target.value)}
                    />
                    <input
                        placeholder="Availability (e.g., weekends, evenings)"
                        value={formData.mentorProfile.availability}
                        onChange={(e) => handleSubProfileChange('mentorProfile', 'availability', e.target.value)}
                    />
                    <button className="promote-btn" onClick={() => handlePromoteClick('mentorship')}>
                        Promote My Services
                    </button>
                </div>
            )}

            {/* Save Button */}
            <div className="form-actions">
                <button onClick={saveProfile} className="save-btn">💾 Save Profile</button>
            </div>

            {promoteType && (
                <PromoteModal user={user} type={promoteType} closeModal={closeModal} />
            )}
        </div>
    );
}
