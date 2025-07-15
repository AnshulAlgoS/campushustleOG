import React, { useState } from 'react';
import './LoginPage.css';
import { auth, db } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default function LoginPage({ navigateTo, onClose }) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleAuth = async () => {
    if (!email || !password || (isSignUp && (!fullName || !repeatPassword))) {
      setMessage('Please fill all fields.');
      return;
    }
    if (isSignUp && password !== repeatPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      if (isSignUp) {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', res.user.uid), {
          fullName,
          email,
          provider: 'email',
          createdAt: new Date(),
        });
        setMessage('✅ Account created!');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setMessage('✅ Login successful!');
      }

      setTimeout(() => {
        setMessage('');
        navigateTo('dashboard');
      }, 1500);
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          fullName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          provider: 'google',
          createdAt: new Date(),
        });
      }

      setMessage('✅ Logged in with Google!');
      setTimeout(() => {
        setMessage('');
        navigateTo('dashboard');
      }, 1500);
    } catch (error) {
      console.error(error);
      setMessage(`❌ ${error.message}`);
    }
  };

  return (
    <div
      className="overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>{isSignUp ? 'Register' : 'Login'}</h2>
        <p className="switch-text">
          {isSignUp ? 'Already registered?' : "Don't have an account?"}{' '}
          <span onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Login here.' : 'Sign up here.'}
          </span>
        </p>

        {isSignUp && (
          <input
            type="text"
            placeholder="eg: Jone Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        )}

        <input
          type="email"
          placeholder="eg: abc@xyz.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {isSignUp && (
          <input
            type="password"
            placeholder="Enter your Password again"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        )}

        <button onClick={handleAuth}>
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>

        <div className="divider">or</div>

        <button onClick={handleGoogleLogin} className="google-btn">
          <img
            src="/assets/google-icon.svg"
            alt="Google"
            className="google-icon"
          />
          Continue with Google
        </button>

        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
}
