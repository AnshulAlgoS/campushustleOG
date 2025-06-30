import React, { useState } from 'react';
import './App.css';
import HomePage from './views/HomePage';
import HackathonPage from './views/HackathonPage';
import LoginPage from './views/LoginPage';


function App() {
  const [page, setPage] = useState('home');

  return (
    <div className="App">
      {page === 'home' && <HomePage navigateTo={setPage} />}
      {page === 'hackathon' && <HackathonPage />}
      {page === 'login' && <LoginPage navigateTo={setPage} />}
    </div>
  );
}


export default App;

