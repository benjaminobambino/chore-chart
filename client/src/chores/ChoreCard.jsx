import React from "react";

const ChoreCard = (props) => {
  return (
    <div>
      <h4>{props.chore.name}</h4>
      <p>{props.chore.notes}</p>
    </div>
  )
}

export default ChoreCard