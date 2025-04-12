import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard'; // Dashboard layout
import Login from './components/Login';
import Signup from './components/Signup';
import './styles/FormStyles.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1 className="title">Learning Management System (LMS)</h1>

        <div className="button-container">
          {/* Link to Login page */}
          <Link to="/login">
            <button className="btn">Login</button>
          </Link>

          {/* Link to Signup page */}
          <Link to="/signup">
            <button className="btn">Signup</button>
          </Link>
        </div>

        <Routes>
          {/* Routing for Login */}
          <Route path="/login" element={<Login />} />
          
          {/* Routing for Signup */}
          <Route path="/signup" element={<Signup />} />
          
          {/* Dashboard route */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
