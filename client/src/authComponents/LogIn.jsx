import React, { useState } from 'react';
import Client from '../services/api';

const LogIn = (props) => {
  const [inputValue, setInputValue] = useState({ email: '', password: '' });
  const [displayedMessage, setDisplayedMessage] = useState('')

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const logInUser = async (data) => {
    try {
      const res = await Client.post('/api/token/', data);
      localStorage.setItem('refresh', res.data.refresh);
      localStorage.setItem('token', res.data.access);
      return res.data;
    } catch (error) {
      setDisplayedMessage('Invalid username/password.')
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.email.length) {
      setDisplayedMessage('You must enter your email.')
    } else if (!inputValue.password.length) {
      setDisplayedMessage('You must enter your password.')
    } else {
      await logInUser(inputValue)
      .then(() => {
        setInputValue({ email: '', password: '' });
        props.getUserInfo()
        props.history.push('/')
      })
    }
  };

  return (
    <div className="signin col">
      <div className="card-overlay centered">
        <form className="col" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="example@example.com"
              value={inputValue.email}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              value={inputValue.password}
            />
          </div>
          <button type="submit">Sign In</button>
          <p>{displayedMessage}</p>
        </form>
      </div>
    </div>
  );
}

export default LogIn