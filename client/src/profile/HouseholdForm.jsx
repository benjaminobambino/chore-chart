import React, { useState } from "react";
import Client from "../services/api";
import axios from "axios";

const HouseholdForm = (props) => {
  const [inputValue, setInputValue] = useState({
    name: ''
  })

  const BASE_URL = process.env.REACT_APP_BASE_URL;


  const assignHousehold = async (householdId) => {
    console.log(householdId)
    await Client.patch(`/users/${props.profile.id}`, { ...props.profile, household_id: householdId}, {
    }).then(() => {
      props.getProfile(props.profile.id)
      props.history.push('/chores')
    })
  }

  const addHousehold = async () => {
    await Client.post(`/households/`, {name: 'test 2'}, {}).then((res) => {
      assignHousehold(res.data.id)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addHousehold()
  } 

  return(
    <div>
      <h2>Household Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" />
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