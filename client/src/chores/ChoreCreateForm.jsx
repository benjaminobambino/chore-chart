import axios from "axios";
import React, { useState } from "react";

const ChoreCreateForm = (props) => {
  const [inputValue, setInputValue] = useState({
    name: '',
    notes: ''
  })
  const [displayedMessage, setDisplayedMessage] = useState('')
  const [show, setShow] = useState(false)

  const BASE_URL = process.env.REACT_APP_BASE_URL
  // change creds once auth is implemented
  const authUser = process.env.REACT_APP_USERNAME
  const authPassword = process.env.REACT_APP_PASSWORD

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    setDisplayedMessage('')
  };

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
      .then(() => {
        props.getHousehold(props.household.id)
        setShow(true)
        setDisplayedMessage(`\u201C${inputValue.name}\u201D has been added!`)
        setInputValue({
          name: '',
          notes: ''
        })
      })
  }

  const showNew = () => {
    setShow(!show)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!inputValue.name.length) {
      setDisplayedMessage('Your chore needs a name.')
    } else if (!inputValue.priority) {
      setDisplayedMessage('Your chore needs a priority level.')
    } else {
      addChore()
      e.target.reset()
    }
  }

  const clearForm = () => {
    setInputValue({
      name: '',
      notes: ''})
    setDisplayedMessage('')
  }

  return (
    <div>
    <div className="accordion-header" onClick={showNew}>
        <h3 className="accordion-sign">{show ? '-' : '+' }</h3>
        <h3 className="accordion-title">Add a New Chore</h3>
      </div>
      {show && (
        <div className="accordion-body">        
    <div className="chore-card">
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
          <select name="priority" onChange={handleChange}>
            <option value=""></option>
            <option value="1">High Priority</option>
            <option value="2">Medium Priority</option>
            <option value="3">Low Priority</option>
          </select>
        </section>
        <button type="reset" onClick={clearForm}>Clear</button>
        <button type="submit">Submit</button>
        <h5>{displayedMessage}</h5>
      </form>
    </div>
    </div>
      )}
    </div>
  )
}

export default ChoreCreateForm