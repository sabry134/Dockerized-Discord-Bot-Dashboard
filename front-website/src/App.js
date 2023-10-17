import React, { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import Commands from './Commands';

function App() {
  const [currentPage, setCurrentPage] = useState('login');

  const redirectToDashboard = () => {
    setCurrentPage('dashboard');
  };
  const redirectToCommands = () => {
    setCurrentPage('commands');
  };

  return (
    <div>
      {currentPage === 'login' && (
        <Login loginButtonToDashboard={redirectToDashboard} />
      )}
      {currentPage === 'dashboard' && (
        <Dashboard handleCommandList={redirectToCommands} />
      )}
      {currentPage === 'commands' && (
        <Commands goBackToDasboard={redirectToDashboard}/>
      )}
    </div>
  );
}

export default App;