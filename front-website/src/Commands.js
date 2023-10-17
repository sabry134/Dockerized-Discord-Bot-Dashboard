import React from 'react';

const Commands = ({ goBackToDasboard }) => {
    const executeCommand = () => {
        alert('Command executed!');
    };


    return (
        <div style={styles.body}>
            <div style={styles.backButtonContainer}>
                <button onClick={goBackToDasboard} style={styles.backButton}>
                    Back
                </button>
            </div>
            <div style={styles.container}>
                <h1 style={styles.header}>Command Execution</h1>
                <p style={styles.description}>This is a basic React component for executing a command.</p>
                <button onClick={executeCommand} style={styles.button}>
                    Execute Command
                </button>
            </div>
        </div>
    );
};

const styles = {
    body: {
        backgroundColor: '#36393F', // Discord background color
        margin: '0',
        padding: '0',
        fontFamily: 'sans-serif',
        color: '#FFFFFF', // Text color for the entire page
        height: '100vh', // Make the page fill the whole viewport height
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: '#2C2F33', // Container background color
        color: '#FFFFFF', // Text color for the container
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
        backgroundColor: '#7289DA', // Discord's blue color
        color: '#FFFFFF',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
    },
    header: {
        fontSize: '24px',
    },
    description: {
        fontSize: '16px',
    },
    button: {
        backgroundColor: '#7289DA', // Discord's blue color
        color: '#FFFFFF',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        marginTop: '20px',
    },
    buttonHover: {
        backgroundColor: '#677BC4', // Slightly darker blue on hover
    },
};

export default Commands;
