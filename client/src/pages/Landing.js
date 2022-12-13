import React from 'react';
import { Link } from 'react-router-dom';

import './Landing.css';

const Landing = () => {
  return (
    <div className="landing-bg">
      <div className="landing-border">
        <Link to='/signup' style={{ textDecoration: 'none' }}>
          <h1>Sign Up now</h1>
        </Link>
        <Link to='/login' style={{ textDecoration: 'none' }}>
          <h1>Login now</h1>
        </Link>
      </div>
    </div>
  )
};

export default Landing;
