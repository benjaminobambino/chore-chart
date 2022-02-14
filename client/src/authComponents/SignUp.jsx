import React, { useState } from 'react';
import Client from '../services/api';

const iState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const SignUp = (props) => {
  const [inputValue, setInputValue] = useState(iState);
  const [displayedMessage, setDisplayedMessage] = useState('')

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    setDisplayedMessage('')
  };

  const registerUser = async (data) => {
    try {
      const res = await Client.post('/api/user/signup/', data);
      return res.data;
    } catch (error) {
      setDisplayedMessage('Name and/or email already taken.');
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.username.length) {
      setDisplayedMessage('You must enter a name.')
    } else if (!inputValue.email.length) {
      setDisplayedMessage('You must enter an email.')
    } else if (inputValue.password.length < 8) {
      setDisplayedMessage('Your password must be at least 8 characters long.')
    } else if (inputValue.password !== inputValue.confirmPassword) {
      setDisplayedMessage('Your passwords do not match.')
    } else {
      await registerUser({
        username: inputValue.username,
        email: inputValue.email,
        password: inputValue.password
      });
      setInputValue(iState);
      alert('Thank you for signing up!')
      props.history.push('/login');
    }
  };

  return (
    <div className="signin col">
      <div className="card-overlay centered">
        <form className="col" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Name</label>
            <br />
            <input
              onChange={handleChange}
              name="username"
              type="text"
              placeholder="My Name"
              value={inputValue.username}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <br />
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="me@something.com"
              value={inputValue.email}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <br />
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="somethingsecret"
              value={inputValue.password}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <br />
            <input
              onChange={handleChange}
              type="password"
              name="confirmPassword"
              placeholder="somethingsecret"
              value={inputValue.confirmPassword}
            />
          </div>
          <button type="submit">Sign In</button>
          <p>{displayedMessage}</p>
        </form>
      </div>
    </div>
  );
}

export default SignUp