// src/views/BudgetingPage.js
import React, { useState, useEffect, useMemo } from 'react';
import './Budgeting.css';
import { db, auth } from '../firebase';
import {
  collection, addDoc, deleteDoc, doc,
  onSnapshot, query, where, serverTimestamp
} from 'firebase/firestore';

/* ─── Chart.js setup ─── */
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

const BudgetingPage = () => {
  /* ─── State ─── */
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({ title: '', amount: '', category: '', notes: '' });
  const [income, setIncome] = useState('');
  const [limit, setLimit]   = useState('');
  const [userId, setUserId] = useState(null);

  /* ─── Firestore listener ─── */
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

  /* ─── Handlers ─── */
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

  /* ─── Calculations ─── */
  const totalSpent  = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
  const remaining   = limit ? (parseFloat(limit) - totalSpent).toFixed(2) : '-';
  const percentUsed = limit ? Math.min(100, ((totalSpent / limit) * 100).toFixed(0)) : 0;

  /* ─── Chart Data (memoized) ─── */

  /* Category totals for Doughnut / Pie */
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
      backgroundColor: ['#8e2de2','#4a00e0','#ff6384','#36a2eb','#ffcd56','#4bc0c0'],
      borderWidth: 1
    }]
  };

  /* Limit vs Spent (Bar) */
  const barData = {
    labels: ['Limit', 'Spent'],
    datasets: [{
      label: '₹',
      data: [Number(limit || 0), totalSpent],
      backgroundColor: ['#4a00e0', '#ff6384']
    }]
  };
  const barOptions = { indexAxis: 'y', responsive: true, plugins: { legend: { display: false } } };

  /* Expense timeline (Line) */
  const lineData = useMemo(() => {
    const sorted = [...expenses].sort((a, b) => (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0));
    return {
      labels: sorted.map(e => new Date((e.createdAt?.seconds || 0) * 1000).toLocaleDateString()),
      datasets: [{
        label: 'Expense Over Time',
        data: sorted.map(e => Number(e.amount)),
        borderColor: '#4a00e0',
        backgroundColor: 'rgba(142,45,226,0.18)',
        tension: 0.35,
        fill: true
      }]
    };
  }, [expenses]);

  /* ─── JSX ─── */
  return (
    <div className="budgeting-page">
      <h1>Budgeting Dashboard</h1>

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

      {/* Budget Summary */}
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

      {/* Expense Form */}
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

      {/* Charts */}
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

      {/* Expense List */}
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
    </div>
  );
};

export default BudgetingPage;
