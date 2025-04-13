import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Route, Routes } from 'react-router-dom';
import CourseList from './CourseList'; // Displays list of courses
import ProgressTracker from './ProgressTracker'; // Tracks course progress
import '../styles/DashboardStyles.css'; // Import the styles

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <header className="dashboard-header">
          <div className="welcome-message">
              <h1>Welcome back, User!</h1>
              <p>Manage your account, track your progress, and explore your courses.</p>
            </div>
            <button className="logout-button">Logout</button>
          </header>

        <section className="dashboard-content">
          <div className="card">
            <h3>Profile</h3>
            <p>Keep your personal information up-to-date and customize your settings.</p>
          </div>
          <div className="card">
            <h3>Courses</h3>
            <p>Browse and manage the courses you are enrolled in.</p>
          </div>
          <div className="card">
            <h3>Reports</h3>
            <p>Analyze your progress and performance with detailed reports.</p>
          </div>
        </section>
        <main>
          <Routes>
            <Route path="/dashboard/*" element={<Dashboard />} /> {/* Add the trailing * */}
            <Route path="/dashboard" element={<h2>Welcome to your Dashboard!</h2>} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/progress" element={<ProgressTracker />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
