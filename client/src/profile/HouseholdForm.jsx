import React from "react";
import Client from "../services/api";

const HouseholdForm = (props) => {
  const assignHousehold = async (householdId) => {
    console.log(householdId)
    await Client.put(`/users/${props.profile.id}`, { ...props.profile, household_id: householdId}, {})
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