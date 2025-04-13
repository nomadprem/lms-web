import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const handleLogout = () => {
    // Logic for logging out
    localStorage.removeItem('token');
    window.location.href = '/login';  // Redirect to login
  };

  return (
    <header className="header">
      <nav>
        <ul>
          {/* <li><Link to="/dashboard">Home</Link></li>
          <li><Link to="/courses">Courses</Link></li> {/* Link to CourseList */}
          {/* <li><Link to="/progress">Progress</Link></li> */} 
        </ul>
      </nav>
    </header>
  );
};

export default Header;
