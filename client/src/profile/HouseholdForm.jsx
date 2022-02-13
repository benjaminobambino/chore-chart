import React, { useState, useEffect } from "react";
import Client from "../services/api";

const HouseholdForm = (props) => {
  const [householdOptions, setHouseholdOptions] = useState([])
  const [inputValue, setInputValue] = useState({
    name: '',
    household_id: null,
    admin: false
  })
  const [addNew, setAddNew] = useState(null)
  const [displayedMessage, setDisplayedMessage] = useState('')

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const assignHousehold = async (householdId) => {
    await Client.patch(`/users/${props.user.id}`, { ...props.user, household_id: householdId, admin: inputValue.admin}, {
    }).then(() => {
      props.getUser(props.user.id)
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
    if (addNew) {
      if (!inputValue.name.length) {
        setDisplayedMessage('Your household must have a name.')
      } else {
        addHousehold()
      }
    } else if (addNew === false) {
      assignHousehold(inputValue.household_id)
    }
  } 

  const getHouseholds = async () => {
    await Client.get(`/households/`).then((res) => {
      const sortById = res.data.sort((a, b) => {
        return a.id - b.id
      })
      setHouseholdOptions(sortById)
    })
  }

  const handleNewOption = () => {
    setAddNew(true)
    setInputValue({ ...inputValue, admin: true, household_id: null })
  }

  const handleExistingOption = () => {
    setAddNew(false)
    setInputValue({ ...inputValue, admin: false, household_id: 1})
    getHouseholds()
  }

  useEffect(() => {
    if (props.user.household_id) {
      props.history.push('/')
    }
    getHouseholds()
  }, [])

  return(
    <div className="household-form">
      <h2>Welcome to Chore Chart!</h2>
      <p>Every Chore Chart user must be part of a household. Would you like to join an existing household or create a new one?</p>
      <form className="new-or-existing-household">
        <label htmlFor="new">Make a New Household</label>
        <input type="radio" id="new" name="new-or-existing" onChange={handleNewOption} />
        <label htmlFor="existing">Join an Existing Household</label>
        <input type="radio" id="existing" name="new-or-existing" onChange={handleExistingOption} />
      </form>
      {addNew ?
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" onChange={handleChange} />
        <button type="submit">Add Household</button>
        <p>{displayedMessage}</p>
      </form>
        : null}
      {addNew === false ?
        <form onSubmit={handleSubmit}>
        <section>
            <select name="household_id" onChange={handleChange}>
              {householdOptions.map((house) => {
                return(
                  <option key={house.id} value={house.id}>{house.name}</option>
                )
              })}
            </select>
          </section>
          <button type="submit">Join Household</button>
        </form> : null}
    </div>
  )
}

export default HouseholdForm