import React, {useState, useEffect} from 'react';
import FloatingDoodles from './FloatingDoodle';
import './Budgeting.css';
import {db, auth} from '../firebase';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  setDoc,
  getDoc,
  serverTimestamp
} from 'firebase/firestore';
import {onAuthStateChanged} from 'firebase/auth';

const categories = ['Food','Travel','Rent','Shopping','Other'];

const Budgeting = () => {
  const today = new Date();
  const defaultMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
  
  const [entries, setEntries] = useState([]);
  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');
  const [category, setCategory] = useState('Other');
  const [note, setNote] = useState('');
  const [budgetLimit, setBudgetLimit] = useState(5000);
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const q = query(
      collection(db, 'budget', userId, 'entries'),
      where('month', '==', selectedMonth)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
      setEntries(data);
    });

    return () => unsub();
  }, [userId, selectedMonth]);

  useEffect(() => {
    if (!userId) return;

    const ref = doc(db, 'budget', userId, 'meta');
    getDoc(ref).then(snapshot => {
      if (snapshot.exists()) {
        setBudgetLimit(snapshot.data().limit || 5000);
      }
    });
  }, [userId]);

  useEffect(() => {
    if (userId) {
      const ref = doc(db, 'budget', userId, 'meta');
      setDoc(ref, {limit: budgetLimit}, {merge: true});
    }
  }, [budgetLimit, userId]);

  const addEntry = async (e) => {
    e.preventDefault();

    if (label.trim() === '' || isNaN(parseFloat(amount))) {
      alert('Please enter valid details.');
      return;
    }

    const newEntry = {
      label,
      amount: type === 'expense' ? -parseFloat(amount) : parseFloat(amount),
      category,
      note,
      month: selectedMonth,
      createdAt: serverTimestamp()
    };

    try {
      await addDoc(collection(db, 'budget', userId, 'entries'), newEntry);
      setLabel('');
      setAmount('');
      setNote('');
    } catch (err) {
      console.error('Error adding entry:', err);
    }
  };

  const deleteEntry = async (id) => {
    try {
      await deleteDoc(doc(db, 'budget', userId, 'entries', id));
    } catch (err) {
      console.error('Error deleting entry:', err);
    }
  };

  const resetBudget = async () => {
    const monthDocs = entries;
    for (let entry of monthDocs) {
      await deleteDoc(doc(db, 'budget', userId, 'entries', entry.id));
    }
  };

  const monthEntries = entries.filter(e => e.month === selectedMonth);

  const totalIncome = monthEntries
    .filter(e => e.amount > 0)
    .reduce((sum, e) => sum + e.amount, 0);

  const totalExpenses = monthEntries
    .filter(e => e.amount < 0)
    .reduce((sum, e) => sum + Math.abs(e.amount), 0);

  const remaining = budgetLimit - totalExpenses;
  const spendingPercent = Math.min((totalExpenses / budgetLimit) * 100, 100).toFixed(0);
  const recentTransactions = monthEntries.slice(-3).reverse();

  return (
    <div className="budgeting-page">
      <FloatingDoodles />

      <div className="calendar-picker">
        <label>Month: </label>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        />
      </div>

      <div className="hero">
        <h1>Student Budget Planner</h1>
        <p>Track your monthly budget</p>
        <p className="selected-month">Budgeting for: {selectedMonth}</p>
      </div>

      <div className="budget-summary">
        <h3>Monthly Budget: ₹{budgetLimit}</h3>
        <div className="progress-bar">
          <div className="progress" style={{width: `${spendingPercent}%`}}></div>
        </div>
        <p>Income: ₹{totalIncome} | Expenses: ₹{totalExpenses}</p>
        <p className={remaining < 0 ? 'warning' : 'success'}>
          {remaining >= 0 ? `Savings: ₹${remaining}` : `Overspending by ₹${Math.abs(remaining)}`}
        </p>
      </div>

      <div className="recent-transactions">
        <h4>Recent Transactions</h4>
        {recentTransactions.length === 0 ? (
          <p>No recent entries.</p>
        ) : (
          recentTransactions.map(entry => (
            <div key={entry.id} className="recent-item">
              <span>{entry.label} ({entry.category})</span>
              <span>₹{Math.abs(entry.amount)} - {entry.note || 'No note'}</span>
            </div>
          ))
        )}
      </div>

      <div className="budget-form">
        <form onSubmit={addEntry}>
          <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Label" />
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((cat, idx) => <option key={idx} value={cat}>{cat}</option>)}
          </select>
          <input type="text" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Optional Note" />
          <button type="submit">Add Entry</button>
        </form>
      </div>

      <div className="set-budget">
        <h4>Set Monthly Limit</h4>
        <input
          type="number"
          value={budgetLimit}
          onChange={(e) => setBudgetLimit(parseFloat(e.target.value) || 0)}
          placeholder="Set monthly limit"
        />
      </div>

      <div className="budget-list">
        <h4>All Entries for {selectedMonth}</h4>
        {monthEntries.length === 0 ? <p>No entries yet.</p> : null}
        {monthEntries.map(entry => (
          <div className="budget-item" key={entry.id}>
            <span className="label">{entry.label} ({entry.category})</span>
            <span>
              ₹{Math.abs(entry.amount).toFixed(2)}
              {entry.note && <span className="note"> - {entry.note}</span>}
              <span className="delete" onClick={() => deleteEntry(entry.id)}>✖</span>
            </span>
          </div>
        ))}
      </div>

      <div className="reset-section">
        <button onClick={resetBudget}>Reset Budget</button>
      </div>

      <div className="tips">
        <h4>Budgeting Tips:</h4>
        <ul>
          <li>Track your expenses daily</li>
          <li>Avoid impulse purchases</li>
          <li>Set aside savings first</li>
        </ul>
      </div>
    </div>
  );
};

export default Budgeting;
