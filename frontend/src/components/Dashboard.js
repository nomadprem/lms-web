import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Route, Routes } from 'react-router-dom';
import CourseList from './CourseList';  // Displays list of courses
import ProgressTracker from './ProgressTracker';  // Tracks course progress
import '../styles/DashboardStyles.css'; // Import the styles

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="dashboard-header">
          <h1>Welcome to Your Dashboard</h1>
          <p>Manage your account and view your progress here.</p>
        </div>
        <div className="dashboard-content">
          <div className="card">
            <h3>Profile</h3>
            <p>Update your personal information and settings.</p>
          </div>
          <div className="card">
            <h3>Courses</h3>
            <p>View and manage your enrolled courses.</p>
          </div>
          <div className="card">
            <h3>Reports</h3>
            <p>Track your progress and performance.</p>
          </div>
        </div>
        <Routes>
          <Route path="/dashboard" element={<h2>Welcome to your Dashboard!</h2>} />
          <Route path="/dashboard" element={<p>Here you can view your courses, progress, and more!</p>} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/progress" element={<ProgressTracker />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
