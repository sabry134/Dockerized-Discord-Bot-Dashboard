import React, { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('login');

  const redirectToDashboard = () => {
    setCurrentPage('dashboard');
  };

  return (
    <div>
      {currentPage === 'login' && (
        <Login loginButtonToDashboard={redirectToDashboard} />
      )}
      {currentPage === 'dashboard' && (
        <Dashboard/>
      )}
    </div>
  );
}

export default App;