import React, { useState, useEffect } from 'react';
import backgroundImage from './discord-image.jpg';

const Dashboard = ( { handleWebhookManager, handleSettings }) => {
  const [botIsRunning, setBotIsRunning] = useState(false);

  useEffect(() => {
    const savedBotIsRunning = localStorage.getItem('botIsRunning');
    if (savedBotIsRunning) {
      setBotIsRunning(savedBotIsRunning === 'true');
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
        <div style={styles.buttonContainer}>
          <button
            onClick={toggleBot}
            style={botIsRunning ? { ...styles.discordButton, ...styles.discordButtonHover } : styles.discordButton}
          >
            {botIsRunning ? 'Stop Discord Bot' : 'Start Discord Bot'}
          </button>
          <button
            onClick={handleWebhookManager}
            style={styles.discordButton}
          >
            Webhook Manager
          </button>
          <button
            onClick={handleSettings}
            style={styles.discordButton}
          >
            Settings
          </button>
        </div>
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
    background: `url(${backgroundImage})`,
    backgroundSize: 'cover',
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
    margin: '5px', // Add margin here
    width: '50%'
  },
  discordButtonHover: {
    backgroundColor: '#677BC4',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },
};

export default Dashboard;
