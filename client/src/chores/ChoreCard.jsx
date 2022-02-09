import React from "react";

const ChoreCard = ({chore, user}) => {
  const unclaimed = chore.doer === null ? true : false
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

  return (
    <div>
      <h4>{chore.name}</h4>
      <p>{chore.notes}</p>
      <h5>{priorityMessage}</h5>
      { unclaimed ? <button>Claim</button> : null }
      { mine ? <button>Mark Complete</button> : null }
    </div>
  )
}

export default ChoreCard