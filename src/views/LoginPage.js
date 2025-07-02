import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import './LoginPage.css';

export default function LoginPage({ navigateTo }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [message, setMessage] = useState('');

  const handleAuth = async () => {
    if (!email || !password || (isSignUp && (!fName || !lName))) {
      setMessage(' Please fill all required fields.');
      return;
    }

    try {
      if (isSignUp) {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', res.user.uid), {
          firstName: fName,
          lastName: lName,
          email,
        });
        setMessage('✅ Account created successfully!');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setMessage('✅ Login successful!');
      }

      setTimeout(() => {
        setMessage('');
        navigateTo('dashboard');
      }, 1500);
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') setMessage('❌ Email already in use');
      else if (err.code === 'auth/invalid-email') setMessage('❌ Invalid email');
      else if (err.code === 'auth/user-not-found') setMessage('❌ User not found');
      else if (err.code === 'auth/wrong-password') setMessage('❌ Incorrect password');
      else setMessage(`❌ ${err.message}`);
    }
  };

  return (
    <div className="login-container">
      <h2>{isSignUp ? 'Create Account' : 'Login'}</h2>

      {isSignUp && (
        <>
          <input
            type="text"
            placeholder="First Name"
            value={fName}
            onChange={(e) => setFName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lName}
            onChange={(e) => setLName(e.target.value)}
          />
        </>
      )}

      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleAuth}>
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </button>

      <p className="toggle" onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp
          ? 'Already have an account? Sign In'
          : 'New here? Create an account'}
      </p>

      {message && <div className="message">{message}</div>}
    </div>
  );
}
