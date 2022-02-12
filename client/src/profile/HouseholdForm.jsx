import React, { useState, useEffect } from "react";
import Client from "../services/api";
import axios from "axios";

const HouseholdForm = (props) => {
  const [inputValue, setInputValue] = useState({
    name: ''
  })
  const [addNew, setAddNew] = useState(null)
  const [householdOptions, setHouseholdOptions] = useState([])

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const assignHousehold = async (householdId) => {
    console.log(householdId)
    await Client.patch(`/users/${props.profile.id}`, { ...props.profile, household_id: householdId}, {
    }).then(() => {
      props.getProfile(props.profile.id)
      props.history.push('/chores')
    })
  }

  const addHousehold = async () => {
    await Client.post(`/households/`, {name: inputValue.name}, {}).then((res) => {
      assignHousehold(res.data.id)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addHousehold()
  } 

  const getHouseholds = async () => {
    await Client.get(`/households/`).then((res) => {
      setHouseholdOptions(res.data)
    })
  }

  useEffect(() => {
    getHouseholds()
  }, [])

  return(
    <div className="household-form">
      <h2>Welcome to Chore Chart!</h2>
      <p>Every Chore Chart user must be part of a household. Would you like to join an existing household or create a new one?</p>
      <form className="new-or-existing-household">
        <label htmlFor="new">Make a New Household</label>
        <input type="radio" id="new" name="new-or-existing" onChange={() => setAddNew(true)} />
        <label htmlFor="existing">Join an Existing Household</label>
        <input type="radio" id="existing" name="new-or-existing" onChange={() => setAddNew(false)} />
      </form>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" onChange={handleChange} />
        <button type="submit">Add Household</button>
      </form>
      {/* <section>
            <select name="household_id" onChange={handleChange}>
              {householdOptions.map((house) => {
                return(
                  <option key={house.id} value={house.id}>{house.name}</option>
                )
              })}
            </select>
          </section> */}
    </div>
  )
}

export default HouseholdForm