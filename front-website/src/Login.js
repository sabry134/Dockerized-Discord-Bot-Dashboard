import React, { useState } from 'react';

const Login = ({ loginButtonToDashboard }) => {
  const [username, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      // Make a POST request to the login endpoint
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 200) {
        // Redirect to dashboard if status is 200
        loginButtonToDashboard();
      } else {
        // Handle login error and set error message
        setErrorMessage('Login or password is incorrect.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred during login.');
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', // Center both horizontally and vertically
    minHeight: '100vh', // Set the minimum height to fill the viewport
    backgroundColor: '#f0f0f0', // Grey background color
  };

  const formContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px', // Add margin to separate the input fields and button
  };

  const inputStyle = {
    margin: '5px',
    padding: '10px', // Increased padding to make the input fields larger vertically
    borderRadius: '5px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    margin: '10px',
    padding: '10px 20px',
    borderRadius: '5px',
    background: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  };

  const errorStyle = {
    color: 'red',
    textAlign: 'center',
    margin: '10px',
  };

  return (
    <div style={containerStyle}>
      <h1>Login Page</h1>
      <div className="login-form" style={formContainerStyle}>
        <input
          type="text"
          id="login"
          value={username}
          onChange={(e) => setLogin(e.target.value)}
          style={inputStyle}
          placeholder="Enter your login"
        />
        <br />
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
          placeholder="Enter your password"
        />
        <br />
        <button onClick={handleLogin} style={buttonStyle}>
          Login
        </button>
        {errorMessage && <div style={errorStyle}>{errorMessage}</div>}
      </div>
    </div>
  );
};

export default Login;
