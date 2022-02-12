import React, { useState } from "react";
import Client from "../services/api";
import axios from "axios";

const HouseholdForm = (props) => {
  const [inputValue, setInputValue] = useState({
    name: ''
  })

  const authEmail = process.env.REACT_APP_EMAIL;
  const authPassword = process.env.REACT_APP_PASSWORD2;
  const BASE_URL = process.env.REACT_APP_BASE_URL;


  const assignHousehold = async (householdId) => {
    console.log(props.profile.password)
    await axios.put(`${BASE_URL}/users/${props.profile.id}`, { ...props.profile, password: props.profile.password, household_id: householdId}, {
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
    </div>
  )
}

export default HouseholdForm