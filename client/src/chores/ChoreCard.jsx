import React, { useState } from "react";
import ChoreEditForm from './ChoreEditForm'
import Client from "../services/api";

const ChoreCard = ({ chore, user, getHousehold, household }) => {
  const [editing, setEditing] = useState(false)

  // const BASE_URL = process.env.REACT_APP_BASE_URL
  // change creds once auth is implemented
  // const authUser = process.env.REACT_APP_USERNAME
  // const authPassword = process.env.REACT_APP_PASSWORD

  const claimed = chore.doer === null ? false : true
  const mine = chore.doer_id === user.id ? true : false
  const complete = chore.done ? true : false  
  
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
      await Client
        .patch(`/chores/${choreId}`,
          { 
            // ...chore, 
            doer_id: user.id }
          // ,
          // {
          //   auth: {
          //     username: authUser,
          //     password: authPassword
          //   }
          // }
          )
        .then(() => {
          getHousehold(household.id)
        })
    } else {
      await Client
        .put(`/chores/${choreId}`,
          { ...chore, doer_id: null }
          // ,
          // {
          //   auth: {
          //     username: authUser,
          //     password: authPassword
          //   }
          // }
          )
          .then(() => {
            getHousehold(household.id)
        })
    }
  }

  const markComplete = async (choreId) => {
    if (!complete) {
      await Client
        .patch(`/chores/${choreId}`,
          { 
            // ...chore, 
            done: true }
          // ,
          // {
          //   auth: {
          //     username: authUser,
          //     password: authPassword
          //   }
          // }
          )
        .then(() => {
          getHousehold(household.id)
        })
    } else {
      await Client
        .patch(`/chores/${choreId}`,
          { ...chore, done: false }
          // ,
          // {
          //   auth: {
          //     username: authUser,
          //     password: authPassword
          //   }
          // }
          )
          .then(() => {
            getHousehold(household.id)
        })
    }
  }

  const deleteChore = async (choreId) => {
    if (user.admin) {
      const confirm = window.confirm(`Are you sure you want to delete the chore ${chore.name}?`)
      if(confirm) {
        await Client
          .delete(`/chores/${choreId}`
          // ,
          //   {
          //     auth: {
          //       username: authUser,
          //       password: authPassword
          //     }
          //   }
          )
          .then(() => {
            getHousehold(household.id)
          })
        }
    }
  }

  if (!editing) {

    return (
      <div className="chore-card">
        <section className="chore-card-header">
          {/* checkbox version */ mine ? <input type="checkbox" checked={complete ? true : false} onChange={()=> {markComplete(chore.id)}} /> : null }
          {/* button version { mine ? <button className="checkbox" onClick={()=> {markComplete(chore.id)}}>{complete ? <h4>&#10003;</h4> : null }</button> : null } */}
          <h4>{chore.name}</h4>
        </section>
        <p>{chore.notes}</p>
        <h5>{priorityMessage}</h5>
        <h5>{ claimed ? `Claimed by: ${chore.doer.username}` : 'Unclaimed'}</h5>
        <section className="chore-card-buttons">
          {!chore.done ? <button onClick={() => {claimChore(chore.id)}}>{ !claimed ? 'Claim' : 'Unclaim' } </button> : null }
          {user.admin || mine ? <button onClick={() => {setEditing(true)}}>Edit</button> : null }
          {user.admin ? <button onClick={() => {deleteChore(chore.id)}}>Delete</button> : null }
        </section>
      </div>
    )
  } else {
    return (
      <div className="chore-edit">
        <ChoreEditForm chore={chore} user={user} getHousehold={getHousehold} household={household} editing={editing} setEditing={setEditing} />
      </div>
    )
  }
}

export default ChoreCard