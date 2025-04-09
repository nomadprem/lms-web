import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import './styles/FormStyles.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1 className="title">Learning Management System (LMS)</h1>
        <div className="button-container">
          
          <Link to="/login">
            <button className="btn">Login</button>
          </Link>
          <Link to="/signup">
            <button className="btn">Signup</button>
          </Link>
        </div>

        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
