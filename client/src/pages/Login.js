import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

import './Login.css';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  /// HANDLE CHANGE ///
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  /// FORM SUBMISSION ///
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token, data.login.user._id);
    } catch (error) {
      console.log(error);
    }

    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main>
      {data ? (
        <p>Successfully logged in! You may now head{' '}<Link to='/'>back to the hompage.</Link></p>
      ) : (
        <div className="login-bg">
          <form onSubmit={handleFormSubmit}>
            <div>
              <h2>Email</h2>
              <input
                placeholder=''
                name='email'
                type='email'
                value={formState.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <h2>Password</h2>
              <input
                placeholde=''
                name='password'
                type='password'
                value={formState.password}
                onChange={handleChange}
              />
            </div>
            <button type='submit'>Log in</button>
          </form>
        </div>
      )}
      {error && (
        <div>{error.message}</div>
      )}
    </main>
  );
};

export default Login;
