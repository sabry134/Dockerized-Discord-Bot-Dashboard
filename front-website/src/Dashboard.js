import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [botIsRunning, setBotIsRunning] = useState(false);

  useEffect(() => {
    const savedBotIsRunning = localStorage.getItem('botIsRunning');
    if (savedBotIsRunning) {
      setBotIsRunning(savedBotIsRunning === 'true'); // Corrected the condition
    }
  }, []);

  const toggleBot = async () => {
    try {
      const response = await fetch(`http://localhost:3000/${botIsRunning ? 'stop' : 'start'}`, {
        method: 'POST',
      });

      if (response.ok) {
        const newBotState = !botIsRunning;
        setBotIsRunning(newBotState);
        localStorage.setItem('botIsRunning', newBotState.toString());
      } else {
        console.error('Failed to toggle the bot. Server returned:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.discordThemed}>
        <h1>Welcome to the Dashboard</h1>
        <p>This is your dashboard content. You can customize it as needed.</p>
        <button
          onClick={toggleBot}
          style={botIsRunning ? { ...styles.discordButton, ...styles.discordButtonHover } : styles.discordButton}
        >
          {botIsRunning ? 'Stop Discord Bot' : 'Start Discord Bot'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#36393F',
  },
  discordThemed: {
    backgroundColor: '#2C2F33',
    color: '#FFFFFF',
    padding: '20px',
    borderRadius: '5px',
    textAlign: 'center',
  },
  discordButton: {
    backgroundColor: '#7289DA',
    color: '#FFFFFF',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
  discordButtonHover: {
    backgroundColor: '#677BC4',
  },
};

export default Dashboard;
