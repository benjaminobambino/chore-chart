import React, { useState } from "react";
import ChoreEditForm from './ChoreEditForm'
import Client from "../services/api";

const ChoreCard = ({ chore, user, getHousehold, household }) => {
  const [editing, setEditing] = useState(false)

  const claimed = chore.doer === null ? false : true
  const mine = chore.doer_id === user.id ? true : false
  const complete = chore.done ? true : false  
  
  const priority = chore.priority
  let priorityMessage
  let priorityClass
  if (priority === 1) {
    priorityMessage = 'High Priority'
    priorityClass = 'high'
  } else if (priority === 2) {
    priorityMessage = 'Medium Priority'
    priorityClass = 'medium'
  } else {
    priorityMessage = 'Low Priority'
    priorityClass = 'low'
  }

  const claimChore = async (choreId) => {
    if (!mine) {
      await Client
        .patch(`/chores/${choreId}`, { doer_id: user.id })
        .then(() => {
          getHousehold(household.id)
        })
    } else {
      await Client
        .put(`/chores/${choreId}`, { ...chore, doer_id: null })
        .then(() => {
          getHousehold(household.id)
        })
    }
  }

  const markComplete = async (choreId) => {
    if (!complete) {
      await Client
        .patch(`/chores/${choreId}`, { done: true })
        .then(() => {
          getHousehold(household.id)
        })
    } else {
      await Client
        .patch(`/chores/${choreId}`, { ...chore, done: false })
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
          .delete(`/chores/${choreId}`)
          .then(() => {
            getHousehold(household.id)
          })
      }
    }
  }

  if (!editing) {

    return (
      <div className="chore-card">
        <div className="chore-card-header">
          <section className="chore-card-header-main">
            {mine ? <button className="checkbox" onClick={()=> {markComplete(chore.id)}}>{complete ? <h1>&#10003;</h1> : null }</button> : null }
            <h3>{chore.name}</h3>
          </section>
          <h4 className={priorityClass}>{priorityMessage}</h4>
        </div>
        <h5>{claimed ? `Claimed by: ${chore.doer.username}` : 'Unclaimed'}</h5>
        <p>{chore.notes}</p>
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