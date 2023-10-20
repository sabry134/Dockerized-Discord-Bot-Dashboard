import React, { useState, useEffect } from 'react';
import backgroundImage from './discord-image.jpg';

const Settings = ({ goBackToDashboard }) => {
  const [webhookURL, setWebhookURL] = useState('');
  const [showURL, setShowURL] = useState(false);
  const [message, setMessage] = useState('');

  // Load the saved Webhook URL from local storage on component mount
  useEffect(() => {
    const savedURL = localStorage.getItem('webhookURL');
    if (savedURL) {
      setWebhookURL(savedURL);
    }
  }, []);

  const handleURLChange = (event) => {
    const newURL = event.target.value;
    setWebhookURL(newURL);
  };

  const handleSaveURL = () => {
    // Save the Webhook URL to local storage
    localStorage.setItem('webhookURL', webhookURL);
    setMessage('Settings updated');

    // Clear the message after 3 seconds
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  return (
    <div style={styles.body}>
      <div style={styles.backButtonContainer}>
        <button onClick={goBackToDashboard} style={styles.backButton}>
          Back
        </button>
      </div>
      <div style={styles.container}>
        <h1>Settings</h1>
        {message && (
          <div style={styles.message} className="message-green">
            {message}
          </div>
        )}
        <div style={styles.formContainer}>
          <div style={styles.urlInputContainer}>
            <input
              type={showURL ? 'text' : 'password'}
              value={webhookURL}
              onChange={handleURLChange}
              style={styles.inputField}
              placeholder="Webhook URL"
            />
            <button onClick={() => setShowURL(!showURL)} style={styles.toggleButton}>
              {showURL ? 'Hide URL' : 'Show URL'}
            </button>
          </div>
          <button onClick={handleSaveURL} style={styles.discordButton}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  body: {
    background: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    margin: '0',
    padding: '0',
    fontFamily: 'sans-serif',
    color: '#FFFFFF',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#2C2F33',
    color: '#FFFFFF',
    padding: '20px',
    borderRadius: '5px',
    textAlign: 'center',
    position: 'relative',
    width: '20%',
  },
  backButtonContainer: {
    position: 'absolute',
    top: '10px',
    left: '10px',
  },
  backButton: {
    backgroundColor: '#7289DA',
    color: '#FFFFFF',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
  discordButton: {
    backgroundColor: '#7289DA',
    color: '#FFFFFF',
    padding: '15px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    margin: '10px',
    width: '200px',
  },
  toggleButton: {
    backgroundColor: '#7289DA',
    color: '#FFFFFF',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    margin: '10px',
  },
  inputField: {
    width: '70%', // Reduce the text field width
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  },
  urlInputContainer: {
    display: 'flex',
    flexDirection: 'row', // Change to row
    alignItems: 'center',
  },
  message: {
    backgroundColor: 'green',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
  },
};

export default Settings;