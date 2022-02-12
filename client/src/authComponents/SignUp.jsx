import React, { useState, useEffect } from 'react';
import { RegisterUser } from '../services/Auth';
import axios from 'axios';
import Client from '../services/api';

const iState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  household_id: 1
};

const SignUp = (props) => {
  const [formValues, setFormValues] = useState(iState);
  // const [householdOptions, setHouseholdOptions] = useState([])

  // const BASE_URL = process.env.REACT_APP_BASE_URL

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(parseInt(formValues.household_id))
    await RegisterUser({
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
      household_id: parseInt(formValues.household_id)
    });
    setFormValues(iState);
    props.history.push('/login');
  };

  // const getHouseholds = async () => {
  //   await Client.get(`/households/`).then((res) => {
  //     setHouseholdOptions(res.data)
  //   })
  // }

  // useEffect(() => {
  //   getHouseholds()
  // }, [])

  return (
    <div className="signin col">
      <div className="card-overlay centered">
        <form className="col" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              onChange={handleChange}
              name="username"
              type="text"
              placeholder="John Smith"
              value={formValues.username}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="example@example.com"
              value={formValues.email}
              required
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              value={formValues.password}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="confirmPassword"
              value={formValues.confirmPassword}
              required
            />
          </div>
          <button
            disabled={
              !formValues.email ||
              (!formValues.password &&
                formValues.confirmPassword === formValues.password)
            }
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp