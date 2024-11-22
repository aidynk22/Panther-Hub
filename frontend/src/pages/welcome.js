import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/welcome.css';

function Welcome() {
  const navigate = useNavigate();
  return (
    <div className="welcome-page">
      <div className="welcome-bar top-bar"></div>
      <header className="welcome-header">
        <div className="welcome-header-bg">
          <h1>Welcome to Panther Hub!</h1>
          <p>Your one-stop platform for GSU Campus Events</p>
        </div>
      </header>
      <div className="welcome-buttons">
        <div className="welcome-button">
          <div className="welcome-button-bg">
            <p>Already registered?</p>
            <button onClick={() => navigate('/login')}>Login</button>
          </div>
        </div>
        <div className="welcome-button">
          <div className="welcome-button-bg">
            <p>New to Panther Hub?</p>
            <button onClick={() => navigate('/register')}>Register</button>
          </div>
        </div>
      </div>
      <div className="welcome-bar bottom-bar"></div>
    </div>
  );
}

export default Welcome;