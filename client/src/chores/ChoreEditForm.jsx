import React, { useState } from "react";
import Client from "../services/api";

const ChoreEditForm = (props) => {
  const [inputValue, setInputValue] = useState({ ...props.chore })
  const [displayedMessage, setDisplayedMessage] = useState('')

  const BASE_URL = process.env.REACT_APP_BASE_URL
  // change creds once auth is implemented
  const authUser = process.env.REACT_APP_USERNAME
  const authPassword = process.env.REACT_APP_PASSWORD

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    setDisplayedMessage('')
  };

  const updateChore = async (choreId) => {
    await Client.put(`/chores/${choreId}`,
      { ...inputValue, priority: parseInt(inputValue.priority) }
      // ,
      // {
      //   auth: {
      //     username: authUser,
      //     password: authPassword
      //   }
      // }
      )
      .then(() => {
        console.log(props.household)
        // props.getHousehold(props.household.id)
        // props.setEditing(false)

      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!inputValue.name.length) {
      setDisplayedMessage('Your chore needs a name.')
    } else if (!inputValue.priority) {
      setDisplayedMessage('Your chore needs a priority level.')
    } else {
      updateChore(props.chore.id)
    }
  }

  const clearForm = () => {
    setInputValue({
      name: '',
      notes: ''})
    setDisplayedMessage('')
  }

  return (
    <div className="chore-card">
      <form onSubmit={handleSubmit}>
        <section className="name">
          <label htmlFor="name">Chore:</label>
          <br />
          <input
            type="text"
            name="name"
            value={inputValue.name}
            placeholder={inputValue.name}
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
            placeholder={inputValue.notes}
            onChange={handleChange}
          />
        </section>
        <section className="priority dropdown-menu">
          <label htmlFor="priority">Priority:</label>
          <br />
          <select name="priority" onChange={handleChange} placeholder={toString(props.chore.priority)} >
            <option value=""></option>
            <option value="1" >High Priority</option>
            <option value="2">Medium Priority</option>
            <option value="3">Low Priority</option>
          </select>
        </section>
        <button onClick={() => props.setEditing(false)}>Cancel</button>
        <button type="reset" onClick={clearForm}>Clear</button>
        <button type="submit">Submit</button>
        <h5>{displayedMessage}</h5>
      </form>
    </div>
  )
}

export default ChoreEditForm