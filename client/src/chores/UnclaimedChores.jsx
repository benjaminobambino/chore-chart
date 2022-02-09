import React from "react";
import ChoreCard from './ChoreCard'

const UnclaimedChores = (props) => {
  const unclaimedChores = props.chores.filter(chore => chore.doer === null)

  return (
    <div>
      <h3>Unclaimed Chores</h3>
      {unclaimedChores.map((chore) => {
        return (
          <div key={chore.id}>
            <ChoreCard chore={chore} />
          </div>
        )
      })}
    </div>
  )
}

export default UnclaimedChores