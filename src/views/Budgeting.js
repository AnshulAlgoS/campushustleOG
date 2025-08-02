// src/views/BudgetingPage.js
import React, { useState, useEffect, useMemo, useRef} from 'react';
import './Budgeting.css';
import { db, auth } from '../firebase';
import {
  collection, addDoc, deleteDoc, doc,
  onSnapshot, query, where, serverTimestamp
} from 'firebase/firestore';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import logo from '../assets/images/CL1.png';
import { Link } from 'react-router-dom';
import UserMenu from '../components/UserMenu';


ChartJS.register(
  
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);
ChartJS.defaults.color = '#ffffff'; // sets all text to white by default


const BudgetingPage = ({user, handleLogout, onProfileClick, openAuthModal}) => {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({ title: '', amount: '', category: '', notes: '' });
  const [income, setIncome] = useState('');
  const [limit, setLimit]   = useState('');
  const [userId, setUserId] = useState(null);
  const challengesRef = useRef(null);
    const [menuOpen, setMenuOpen] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState({});
 
  
  useEffect(() => {
    const unsubAuth = auth.onAuthStateChanged(user => {
      if (user) {
        setUserId(user.uid);
        const q = query(collection(db, 'expenses'), where('userId', '==', user.uid));
        const unsubData = onSnapshot(q, snap => {
          const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          setExpenses(list);
        });
        return () => unsubData();
      }
    });
    return () => unsubAuth();
  }, []);
  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!userId) return;
    await addDoc(collection(db, 'expenses'), {
      ...formData,
      amount: parseFloat(formData.amount),
      userId,
      createdAt: serverTimestamp()
    });
    setFormData({ title: '', amount: '', category: '', notes: '' });
  };

  const deleteExpense = id => deleteDoc(doc(db, 'expenses', id));
  const resetBudget   = () => { setIncome(''); setLimit(''); };
  const totalSpent  = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
  const remaining   = limit ? (parseFloat(limit) - totalSpent).toFixed(2) : '-';
  const percentUsed = limit ? Math.min(100, ((totalSpent / limit) * 100).toFixed(0)) : 0;
  const categoryTotals = useMemo(() => {
    return expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + Number(e.amount || 0);
      return acc;
    }, {});
  }, [expenses]);

  const doughnutData = {
    labels: Object.keys(categoryTotals),
    datasets: [{
      label: '₹ Spent',
      data: Object.values(categoryTotals),
       backgroundColor: ['#B621FE', '#70b4c3ff', '#c5bb86ff', '#75be92ff', '#e17c7cff', '#FAD0C4'],
      borderColor: '#ffffff',
      borderWidth: 2,
      hoverOffset: 12
    }]
  };
   const doughnutOptions = {
    plugins: {
      legend: {
        labels: {
          color: '#ffffff',
          font: {
            size: 14,
            weight: 'bold'
          },
          padding: 15
        }
      }
    }
  };
  const barData = {
    labels: ['Limit', 'Spent'],
    datasets: [{
      label: '₹',
      data: [Number(limit || 0), totalSpent],
       backgroundColor: ['#7f3dc6ff', '#e49a65ff'],
      borderRadius: 8,
      barThickness: 30
    }]
  };
  const barOptions = { 
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        ticks: { color: '#ccc' }
      },
      y: {
        ticks: { color: '#ccc' }
      }
      
    }
  };
  const lineData = useMemo(() => {
    const sorted = [...expenses].sort((a, b) => (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0));
    return {
      labels: sorted.map(e => new Date((e.createdAt?.seconds || 0) * 1000).toLocaleDateString()),
      datasets: [{
        label: 'Expense Over Time',
        data: sorted.map(e => Number(e.amount)),
        borderColor: '#b67aeaff',
        backgroundColor: 'rgba(142,45,226,0.2)',
        tension: 0.4,
        fill: true
      }]
    };
  }, [expenses]);
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#cfcfcf',
          font: { size: 14 }
        }
      }
    },
     scales: {
      x: {
        ticks: { color: '#ccc' }
      },
      y: {
        ticks: { color: '#ccc' }
      
      }
    }
  };
  const toggleChallenge = (id) => {
    setCompletedChallenges(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

 const scrollToChallenges = () => {
  challengesRef.current?.scrollIntoView({ behavior: 'smooth' });
};


  const challenges = [
    { id: 1, text: "Spend less than ₹100 on snacks this week" },
    { id: 2, text: "Track all expenses for 3 days straight" },
    { id: 3, text: "No shopping for 7 days" },
    { id: 4, text: "Log 5 expenses in a week" },
    { id: 5, text: "Limit eating out to twice this week" }
  ];
  return (
     <div className="budgeting-page">
      <div className="top-strip">
                  <div className="logo-combo">
                    <img src={logo} alt="Campus Hustle Logo" className="strip-logo" />
                    <span className="logo-text">CampusHustle</span>
                  </div>
      
                  {/*  Desktop Nav */}
                  <nav className="navbar-desktop">
                    <ul className="strip-nav">
                      <li><Link to="/">Home</Link></li>
                      <li><Link to="/freelance">Freelance</Link></li>
                      <li><Link to="/hackathon">Hackathons</Link></li>
                      <li>
                        <Link
                          to="/"
                          state={{ scrollTo: 'community' }}
                          onClick={() => { }}
                          className="desktop-link-btn"
                        >
                          Community
                        </Link>
                      </li>
      
                      <li><Link to="/about">About Us</Link></li>
                      <li>
                        {user ? (
                          <UserMenu
                            user={user}
                            onLogout={handleLogout}
                            onProfileClick={onProfileClick}
                          />
                        ) : (
                          <button
                            className="signup"
                            onClick={() => openAuthModal()}
                          >
                            Get Started
                          </button>
                        )}
                      </li>
                    </ul>
                  </nav>
      
      
                  {/* Mobile Nav */}
                  <div className="navbar-mobile">
                    <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      
                    {menuOpen && (
                      <ul className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
                        <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
                        <li><Link to="/freelance" onClick={() => setMenuOpen(false)}>Freelance</Link></li>
                        <li><Link to="/hackathon" onClick={() => setMenuOpen(false)}>Hackathons</Link></li>
                        <li><Link to="/" state={{ scrollTo: 'community' }} onClick={() => setMenuOpen(false)}>Community</Link></li>
                        <li><Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
                        </li>
                        <li>
                          {user ? (
                            <UserMenu
                              user={user}
                              onLogout={() => {
                                setMenuOpen(false);
                                handleLogout();
                              }}
                              onProfileClick={() => {
                                setMenuOpen(false);
                                onProfileClick();
                              }}
                            />
                          ) : (
                            <button
                              className="signup"
                              onClick={() => {
                                setMenuOpen(false);
                                openAuthModal();
                              }}
                            >
                              Get Started
                            </button>
                          )}
                        </li>
                      </ul>
                    )}
                  </div>
      
      
                </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Budgeting Dashboard</h1>
        <button className="challenges-btn" onClick={() => challengesRef.current?.scrollIntoView({ behavior: 'smooth' })}>
          Show Challenges
        </button>
      </div>
      {/* Income / Limit */}
      <div className="income-limit-section">
        <div className="input-group">
          <label>Monthly Income</label>
          <input type="number" value={income} onChange={e => setIncome(e.target.value)} placeholder="Enter income" />
        </div>
        <div className="input-group">
          <label>Monthly Limit</label>
          <input type="number" value={limit} onChange={e => setLimit(e.target.value)} placeholder="Enter limit" />
        </div>
        <button className="reset-btn" onClick={resetBudget}>Reset Budget</button>
      </div>
      {limit && (
        <div className="progress-summary">
          <p><strong>Total Spent:</strong> ₹{totalSpent}</p>
          <p><strong>Remaining:</strong> ₹{remaining}</p>
          <div className="progress-bar"><div className="progress" style={{ width: `${percentUsed}%` }} /></div>
          <p className={remaining < 0 ? 'warning' : 'success'}>
            {remaining >= 0 ? 'You’re within budget.' : `Overspending by ₹${Math.abs(remaining)}`}
          </p>
        </div>
      )}
      <form className="budget-form" onSubmit={handleSubmit}>
        <input name="title"  value={formData.title}  onChange={handleChange} placeholder="Expense Title" required />
        <input name="amount" type="number" value={formData.amount} onChange={handleChange} placeholder="Amount" required />
        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          <option>Food</option><option>Travel</option><option>Bills</option>
          <option>Shopping</option><option>Other</option>
        </select>
        <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Additional Notes" rows="3" />
        <button type="submit">Add Expense</button>
      </form>
      <div className="charts-wrapper">
        <div className="chart-card">
          <h3>Spending by Category</h3>
          {expenses.length ? <Doughnut data={doughnutData} /> : <p>No data yet.</p>}
        </div>
        <div className="chart-card">
          <h3>Spent vs Limit</h3>
          {limit ? <Bar data={barData} options={barOptions} /> : <p>Set a limit first.</p>}
        </div>
        <div className="chart-card">
          <h3>Daily Expense Trend</h3>
          {expenses.length ? <Line data={lineData} /> : <p>No data yet.</p>}
        </div>
      </div>
      <div className="expense-list">
        <h2>Expenses</h2>
        {expenses.map(exp => (
          <div key={exp.id} className="expense-card">
            <div>
              <h4>{exp.title} - ₹{exp.amount}</h4>
              <p>{exp.category}</p>
              {exp.notes && <small>{exp.notes}</small>}
            </div>
            <button onClick={() => deleteExpense(exp.id)}>Delete</button>
          </div>
        ))}
      </div>
       <div ref={challengesRef} className="challenges-section">
        <h2>Budgeting Challenges</h2>
        <div className="challenge-list">
          {challenges.map(challenge => (
            <div
              key={challenge.id}
              className={`challenge-card ${completedChallenges[challenge.id] ? 'completed' : ''}`}
            >
              <p>{challenge.text}</p>
              <button onClick={() => toggleChallenge(challenge.id)}>
                {completedChallenges[challenge.id] ? '✔️ Completed' : '❌ Incomplete'}
              </button>
            </div>
          ))}
        </div>
        {Object.values(completedChallenges).filter(Boolean).length === challenges.length && (
          <div className="badge-earned">🏅 Challenge Master Badge Earned!</div>
        )}
      </div>
    </div>
  );
    
};

export default BudgetingPage;
