import axios from "axios";
import React from "react";

const ChoreCard = ({ chore, user, getHousehold }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL
  // change auth creds once auth is implemented
  const authUser = process.env.REACT_APP_USERNAME
  const authPassword = process.env.REACT_APP_PASSWORD

  const claimed = chore.doer === null ? false : true
  const mine = chore.doer_id === user.id ? true : false  
  
  const priority = chore.priority
  let priorityMessage
  if (priority === 1) {
    priorityMessage = 'High Priority'
  } else if (priority === 2) {
    priorityMessage = 'Medium Priority'
  } else {
    priorityMessage = 'Low Priority'
  }

  const claimChore = async (choreId) => {
    if (!mine) {
      await axios
        .put(`${BASE_URL}/chores/${choreId}`,
          { ...chore, doer_id: user.id },
          {
            auth: {
              username: authUser,
              password: authPassword
            }
          })
        .then(() => {
          getHousehold()
        })
    } else {
      await axios
        .put(`${BASE_URL}/chores/${choreId}`,
          { ...chore, doer_id: null },
          {
            auth: {
              username: authUser,
              password: authPassword
            }
          })
          .then(() => {
            getHousehold()
        })
    }
  }

  return (
    <div>
      <h4>{chore.name}</h4>
      <p>{chore.notes}</p>
      <h5>{priorityMessage}</h5>
      <button onClick={() => {claimChore(chore.id)}}>{ !claimed ? 'Claim' : 'Unclaim' } </button>
      { mine ? <button>Mark Complete</button> : null }
    </div>
  )
}

export default ChoreCard