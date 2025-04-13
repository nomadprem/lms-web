import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <h2>LMS Dashboard</h2>
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/courses">Courses</Link>
        </li>
        <li>
          <Link to="/progress">Progress</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
