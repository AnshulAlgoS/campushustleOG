// src/views/BudgetingPage.js
import React, {useState, useEffect} from 'react';
import './Budgeting.css';
import {db, auth} from '../firebase';
import {
  collection, addDoc, deleteDoc, doc,
  onSnapshot, query, where, serverTimestamp
} from 'firebase/firestore';

const BudgetingPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({title: '', amount: '', category: '', notes: ''});
  const [income, setIncome] = useState('');
  const [limit, setLimit] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserId(user.uid);
        const q = query(collection(db, 'expenses'), where('userId', '==', user.uid));
        const unsub = onSnapshot(q, snapshot => {
          const data = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
          setExpenses(data);
        });
        return () => unsub();
      }
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || !formData.title || !formData.amount || !formData.category) return;
    await addDoc(collection(db, 'expenses'), {
      ...formData,
      amount: parseFloat(formData.amount),
      userId,
      createdAt: serverTimestamp()
    });
    setFormData({title: '', amount: '', category: '', notes: ''});
  };

  const deleteExpense = async (id) => {
    await deleteDoc(doc(db, 'expenses', id));
  };

  const resetBudget = () => {
    setIncome('');
    setLimit('');
  };

  const totalSpent = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);
  const remaining = limit ? (parseFloat(limit) - totalSpent).toFixed(2) : '-';
  const percentUsed = limit ? Math.min(100, ((totalSpent / limit) * 100).toFixed(0)) : 0;

  return (
    <div className="budgeting-page">
      <h1>Budgeting Dashboard</h1>

      <div className="income-limit-section">
        <div className="input-group">
          <label>Monthly Income</label>
          <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} placeholder="Enter income" />
        </div>
        <div className="input-group">
          <label>Monthly Limit</label>
          <input type="number" value={limit} onChange={(e) => setLimit(e.target.value)} placeholder="Enter limit" />
        </div>
        <button className="reset-btn" onClick={resetBudget}>Reset Budget</button>
      </div>

      {limit && (
        <div className="progress-summary">
          <p><strong>Total Spent:</strong> ₹{totalSpent}</p>
          <p><strong>Remaining:</strong> ₹{remaining}</p>
          <div className="progress-bar">
            <div className="progress" style={{width: `${percentUsed}%`}}></div>
          </div>
          <p className={remaining < 0 ? 'warning' : 'success'}>
            {remaining >= 0 ? `You're within budget.` : `Overspending by ₹${Math.abs(remaining)}`}
          </p>
        </div>
      )}

      <form className="budget-form" onSubmit={handleSubmit}>
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Expense Title" required />
        <input name="amount" type="number" value={formData.amount} onChange={handleChange} placeholder="Amount" required />
        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Bills">Bills</option>
          <option value="Shopping">Shopping</option>
          <option value="Other">Other</option>
        </select>
        <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Additional Notes" rows="3" />
        <button type="submit">Add Expense</button>
      </form>

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
