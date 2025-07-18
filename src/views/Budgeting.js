import React, { useState } from 'react';
import FloatingDoodles from './FloatingDoodle';
import './Budgeting.css';

const categories = ['Scholarship', 'Travel', 'Rent', 'College fees','Food' ,'Other'];

const Budgeting = () => {
    const [entries, setEntries] = useState([]);
    const [label, setLabel] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('income');
    const [category, setCategory] = useState('Other');
    const [budgetLimit, setBudgetLimit] = useState(5000); // Default ₹5000 budget cap

    const addEntry = (e) => {
        e.preventDefault();

        if (label.trim() === '' || isNaN(parseFloat(amount))) {
            alert('Please enter valid details.');
            return;
        }

        const newEntry = {
            id: Date.now(),
            label,
            amount: type === 'expense' ? -parseFloat(amount) : parseFloat(amount),
            category
        };

        setEntries([...entries, newEntry]);
        setLabel('');
        setAmount('');
    };

    const deleteEntry = (id) => {
        setEntries(entries.filter(entry => entry.id !== id));
    };

    const totalIncome = entries
        .filter(e => e.amount > 0)
        .reduce((sum, e) => sum + e.amount, 0);

    const totalExpenses = entries
        .filter(e => e.amount < 0)
        .reduce((sum, e) => sum + Math.abs(e.amount), 0);

    const remaining = budgetLimit - totalExpenses;

    const spendingPercent = Math.min((totalExpenses / budgetLimit) * 100, 100).toFixed(0);

    return (
        <div className="budgeting-page">
            <FloatingDoodles />

            <div className="hero">
                <h1>Student Budget Planner</h1>
                <p>Track, Save & Stay in Control</p>
            </div>

            <div className="budget-summary">
                <h3>Monthly Budget: ₹{budgetLimit}</h3>
                <div className="progress-bar">
                    <div
                        className="progress"
                        style={{ width: `${spendingPercent}%` }}
                    ></div>
                </div>
                <p>Income: ₹{totalIncome} | Expenses: ₹{totalExpenses}</p>
                <p className={remaining < 0 ? 'warning' : 'success'}>
                    {remaining >= 0 ? `Savings: ₹${remaining}` : `Overspending by ₹${Math.abs(remaining)}`}
                </p>
            </div>

            <div className="budget-form">
                <form onSubmit={addEntry}>
                    <input
                        type="text"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        placeholder="Enter label (e.g., Tution, Travel, etc.)"
                    />
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                    />
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        {categories.map((cat, idx) => (
                            <option key={idx} value={cat}>{cat}</option>
                        ))}
                    </select>
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
                {entries.map(entry => (
                    <div className="budget-item" key={entry.id}>
                        <span className="label">{entry.label} ({entry.category})</span>
                        <span>
                            ₹{Math.abs(entry.amount).toFixed(2)}
                            <span className="delete" onClick={() => deleteEntry(entry.id)}>✖</span>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Budgeting;
