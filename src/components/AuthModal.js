import React, { useState, useEffect } from 'react';
import './AuthModal.css';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export default function AuthModal({ onClose, onAuthSuccess }) {
    console.log('AuthModal rendered');

    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        document.body.classList.add('modal-open');
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, []);

    const handleAuth = async (e) => {
        e.preventDefault();
        if (!email || !password || (isSignUp && (!fName || !lName))) {
            setMessage('Please fill all required fields.');
            return;
        }
        try {
            if (isSignUp) {
                const res = await createUserWithEmailAndPassword(auth, email, password);
                await setDoc(doc(db, 'users', res.user.uid), {
                    email,
                    firstName: fName,
                    lastName: lName
                });
                onAuthSuccess(res.user);
            } else {
                const res = await signInWithEmailAndPassword(auth, email, password);
                onAuthSuccess(res.user);
            }
            onClose();
        } catch (err) {
            setMessage(err.message);
        }
    };

    const toggleMode = () => {
        setIsSignUp(!isSignUp);
        setMessage('');
        setEmail('');
        setPassword('');
        setFName('');
        setLName('');
    };

    return (
        <div className="auth-modal-overlay">
            <form className="auth-modal" onSubmit={handleAuth}>
                <span className="close-btn" onClick={onClose}>×</span>

                <h2>{isSignUp ? 'Register' : 'Login'}</h2>

                {isSignUp ? (
                    <>
                        <input
                            type="text"
                            placeholder="First Name"
                            value={fName}
                            onChange={(e) => setFName(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lName}
                            onChange={(e) => setLName(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </>
                ) : (
                    <>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </>
                )}

                <button type="submit">
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </button>

                <p onClick={toggleMode} style={{ cursor: 'pointer', marginTop: '1rem' }}>
                    {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign up"}
                </p>

                {message && <div className="message">{message}</div>}
            </form>
        </div>
    );
}
