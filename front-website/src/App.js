import React, { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import Webhook from './Webhook';
import Settings from './Settings';

function App() {
  const [currentPage, setCurrentPage] = useState('login');

  const redirectToDashboard = () => {
    setCurrentPage('dashboard');
  };
  const redirectToCommands = () => {
    setCurrentPage('webhook');
  };
  const redirectToSettings = () => {
    setCurrentPage('settings');
  };

  return (
    <div>
      {currentPage === 'login' && (
        <Login loginButtonToDashboard={redirectToDashboard} />
      )}
      {currentPage === 'dashboard' && (
        <Dashboard handleWebhookManager={redirectToCommands} handleSettings={redirectToSettings}/>
      )}
      {currentPage === 'webhook' && (
        <Webhook goBackToDashboard={redirectToDashboard}/>
      )}
      {currentPage === 'settings' && (
        <Settings goBackToDashboard={redirectToDashboard}/>
      )}
    </div>
  );
}

export default App;