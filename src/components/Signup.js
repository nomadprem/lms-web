import React from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <div className="form-container">
      <div className="form-content">
        <h2>Signup</h2>
        <form>
          <div className="input-group">
            <label>Name</label>
            <input type="text" placeholder="Enter your name" required />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required />
          </div>
          <div className="input-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm your password" required />
          </div>
          <button type="submit" className="btn">Signup</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

export default Signup;
