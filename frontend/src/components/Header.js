import React from 'react';

const Header = () => {
  const handleLogout = () => {
    // Logic for logging out
    localStorage.removeItem('token');
    window.location.href = '/login';  // Redirect to login
  };

  return (
    <header className="header">
      <div className="user-info">
        <h3>Welcome, User</h3>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;
