import React, { useState, useEffect, useRef } from 'react';
import './AuthModal.css';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export default function AuthModal({ onClose, onAuthSuccess }) {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        document.body.classList.add('modal-open');
        return () => document.body.classList.remove('modal-open');
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

  return (
  <div
    className="auth-modal-overlay"
    onPointerDown={(e) => {
      if (e.target === e.currentTarget) {
        e.preventDefault();
        onClose();
      }
    }}
  >
    <form
      className="auth-modal"
      onPointerDown={(e) => e.stopPropagation()}
      onSubmit={handleAuth}
    >
      <span className="close-btn" onClick={onClose}>×</span>

      <h2>{isSignUp ? 'Register' : 'Login'}</h2>

      {isSignUp && (
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
        </>
      )}

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

      <button type="submit">
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </button>

      <p className="switch-mode" onPointerUp={() => setIsSignUp(prev => !prev)}>
        {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign up"}
      </p>

      {message && <div className="message">{message}</div>}
    </form>
  </div>
);
}