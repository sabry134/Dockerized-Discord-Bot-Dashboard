import React, { useState } from 'react';

const Login = ({ loginButtonToDashboard }) => {
  const [username, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 200) {
        loginButtonToDashboard();
      } else {
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
    justifyContent: 'center',
    minHeight: '100vh',
    background: '#36393F',
    color: '#FFFFFF',
  };

  const formContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  };

  const inputStyle = {
    margin: '5px',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    background: '#2C2F33',
    color: '#FFFFFF',
  };

  const buttonStyle = {
    margin: '10px',
    padding: '10px 20px',
    borderRadius: '5px',
    background: '#7289DA',
    color: '#FFFFFF',
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
