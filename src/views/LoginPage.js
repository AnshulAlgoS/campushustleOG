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
      setMessage('Please fill all required fields.');
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
        setMessage('✅ Account created');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setMessage('✅ Logged in');
      }
      setTimeout(() => navigateTo('home'), 1500);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>{isSignUp ? 'Register' : 'Login'}</h2>

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
        placeholder="Email"
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

      <p onClick={() => setIsSignUp(!isSignUp)} style={{ cursor: 'pointer', marginTop: '1rem' }}>
        {isSignUp ? 'Already have an account? Login' : 'Don’t have an account? Sign up'}
      </p>

      {message && <div className="message">{message}</div>}
    </div>
  );
}
