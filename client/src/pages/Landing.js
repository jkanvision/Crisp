import React from 'react';
import { Link } from 'react-router-dom';

import './Landing.css';

const Landing = () => {
  return (
    <div className="landing-bg">
      <div className="landing-border">
        <h1>Crisp</h1>
        <div className="landing-bottom">
          <div className="landing-button">
            <Link to='/login' style={{ textDecoration: 'none' }}>
              <h2>Log In</h2>
            </Link>
          </div>
          <div className="landing-button">
            <Link to='/signup' style={{ textDecoration: 'none' }}>
              <h2>Sign Up</h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Landing;
