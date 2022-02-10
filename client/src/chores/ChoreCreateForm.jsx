import axios from "axios";
import React, { useState } from "react";

const ChoreCreateForm = (props) => {
  const [inputValue, setInputValue] = useState({
    name: '',
    notes: '',
    priority: 0
  })
  const [displayedMessage, setDisplayedMessage] = useState('')

  const BASE_URL = process.env.REACT_APP_BASE_URL
  // change creds once auth is implemented
  const authUser = process.env.REACT_APP_USERNAME
  const authPassword = process.env.REACT_APP_PASSWORD

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    setDisplayedMessage('')
  };

  const handleDropdown = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: parseInt(e.target.value) })
    setDisplayedMessage('')
  }

  const addChore = async () => {
    await axios.post(`${BASE_URL}/chores/`,
      { ...inputValue, 
        household_id: props.household.id, 
        priority: parseInt(inputValue.priority)
      },
      {
        auth: {
          username: authUser,
          password: authPassword
        }
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setInputValue({ ...inputValue, priority: parseInt(inputValue.priority)}) 
    console.log(inputValue)
    addChore()
    setInputValue({
      name: '',
      notes: ''
    })
  }

  return (
    <div>
      <h3>Add a New Chore</h3>
      <form onSubmit={handleSubmit}>
        <section className="name">
          <label htmlFor="name">New Chore:</label>
          <br />
          <input
            type="text"
            name="name"
            value={inputValue.name}
            onChange={handleChange}
          />
        </section>
        <section className="notes">
          <label htmlFor="notes">Notes (optional):</label>
          <br />
          <input
            type="text"
            name="notes"
            value={inputValue.notes}
            onChange={handleChange}
          />
        </section>
        <section className="priority dropdown-menu">
          <label htmlFor="priority">Priority:</label>
          <br />
          <select name="priority" onChange={handleDropdown} defaultValue="">
            <option value=""></option>
            <option value="1">High Priority</option>
            <option value="2">Medium Priority</option>
            <option value="3">Low Priority</option>
          </select>
        </section>
        <button type="reset">Clear</button>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default ChoreCreateForm