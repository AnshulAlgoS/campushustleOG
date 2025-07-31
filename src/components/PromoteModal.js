import React, { useState } from 'react';
import { addDoc, collection, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import './PromoteModal.css';

export default function PromoteModal({ user, type, closeModal }) {
    const [form, setForm] = useState({
        title: '',
        description: '',
        linkTo: '',
        featuredImage: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const userRef = doc(db, 'users', user.uid);
    const promoRef = collection(userRef, 'promotions');
    const handleSubmit = async () => {
        console.log('Submitting promotion:', form);
        try {
            if (!user?.uid) {
                alert('User not found. Please login.');
                return;
            }
            const promotionData = {
                ...form,
                type,
                userId: user.uid,
                status: 'active',
                paymentStatus: 'paid',
                timestamp: serverTimestamp()
            };
            await addDoc(promoRef, promotionData);
            alert('✅ Promotion submitted!');
            closeModal();
        } catch (err) {
            console.error('Promotion submit error:', err);
            alert('Failed to submit promotion');
        }
    };


    return (
        
        <div className="modal-overlay">
                        <div className="promote-modal">
                <h3>🚀 Promote Your {type === 'mentor' ? 'Mentorship' : type === 'freelancer' ? 'Gig' : 'Event'}</h3>
                <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
                <textarea name="description" placeholder="Short Description" value={form.description} onChange={handleChange} />
                <input name="linkTo" placeholder="Link to your gig/event/profile" value={form.linkTo} onChange={handleChange} />
                <input name="featuredImage" placeholder="Image URL (optional)" value={form.featuredImage} onChange={handleChange} />
                <button type="button" className="save-btn" onClick={handleSubmit}>
                    Submit
                </button>
                <button onClick={() => console.log('🧪 Test button clicked')}>Test</button>


                <button className="cancel-btn" onClick={closeModal}>Cancel</button>
            </div>
        </div>
    );
}