import React, { useState } from 'react';
import backgroundImage from './discord-image.jpg';

const Webhook = ({ goBackToDashboard }) => {
    const [webhookUrl, setWebhookUrl] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isMessageSent, setIsMessageSent] = useState(false);

    const isValidWebhookUrl = (url) => {
        // Regular expression to match a valid Discord Webhook URL
        const regex = /https:\/\/discord\.com\/api\/webhooks\/\d+\/[A-Za-z0-9_-]+/;
        return regex.test(url);
    };

    const executeCommand = () => {
        if (!isValidWebhookUrl(webhookUrl)) {
            setErrorMessage('Invalid mentioned URL');
            setTimeout(() => setErrorMessage(''), 3000);
            return;
        }

        fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: message }),
        })
            .then(() => {
                setIsMessageSent(true);
                setTimeout(() => setIsMessageSent(false), 3000);
            })
            .catch((error) => {
                setErrorMessage('Error: ' + error);
                setTimeout(() => setErrorMessage(''), 3000);
                setMessage('');
            });
    };

    return (
        <div style={styles.body}>
            <div style={styles.backButtonContainer}>
                <button onClick={goBackToDashboard} style={styles.backButton}>
                    Back
                </button>
            </div>
            <div style={styles.container}>
                <h1 style={styles.header}>Command Execution</h1>
                {errorMessage && (
                    <div style={styles.errorMessage}>{errorMessage}</div>
                )}
                {isMessageSent && (
                    <div style={styles.successMessage}>Message Sent!</div>
                )}
                <div style={styles.inputContainer}>
                    <input
                        type="text"
                        placeholder="Discord Webhook URL"
                        value={webhookUrl}
                        onChange={(e) => setWebhookUrl(e.target.value)}
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        style={styles.input}
                    />
                    <button onClick={executeCommand} style={styles.button}>
                        Send Message
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
    header: {
        fontSize: '24px',
    },
    errorMessage: {
        backgroundColor: 'red',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '10px',
    },
    successMessage: {
        backgroundColor: 'green',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '10px',
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    input: {
        margin: '5px',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #7289DA',
    },
    button: {
        backgroundColor: '#7289DA',
        color: '#FFFFFF',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        marginTop: '20px',
    },
};

export default Webhook;
