import React, { useState } from 'react';
import './Assistant.css'; // optional for styling

const Assistant = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const getAssistantResponse = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();
      setResponse(data.reply);
    } catch (err) {
      setResponse('⚠️ Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="assistant-box">
      <h3>🤖 Ask Campus Assistant</h3>
      <textarea
        placeholder="e.g., Suggest gigs for 2nd-year BTech"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={getAssistantResponse} disabled={loading}>
        {loading ? 'Thinking...' : 'Ask'}
      </button>
      {response && (
        <div className="assistant-response">
          <strong>Assistant:</strong> {response}
        </div>
      )}
    </div>
  );
};

export default Assistant;
