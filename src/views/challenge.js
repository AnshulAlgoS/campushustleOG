import React, { useState } from 'react';
import './Challenges.css'; // Create this for custom styles

const defaultChallenges = [
  { id: 1, text: 'Spend less than ₹2000 this week', completed: false },
  { id: 2, text: 'Log your expenses for 5 days straight', completed: false },
  { id: 3, text: 'Avoid spending on fast food for 3 days', completed: false }
];

const Challenges = () => {
  const [challenges, setChallenges] = useState(defaultChallenges);

  const toggleChallenge = (id) => {
    setChallenges((prev) =>
      prev.map((challenge) =>
        challenge.id === id ? { ...challenge, completed: !challenge.completed } : challenge
      )
    );
  };

  return (
    <div className="challenges-container">
      <h2>🎯 Budgeting Challenges</h2>
      <div className="challenge-list">
        {challenges.map((challenge) => (
          <div key={challenge.id} className={`challenge-card ${challenge.completed ? 'completed' : ''}`}>
            <p>{challenge.text}</p>
            <button onClick={() => toggleChallenge(challenge.id)}>
              {challenge.completed ? '✅ Completed' : '❌ Not Done'}
            </button>
            {challenge.completed && <div className="badge">🏅 Badge Earned!</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Challenges;
