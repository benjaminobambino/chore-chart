import React from "react";
import ChoreCard from './ChoreCard'

const UnclaimedChores = (props) => {
  const unclaimedChores = props.chores.filter(chore => chore.doer === null)

  return (
    <div>
      { unclaimedChores.length ?
        unclaimedChores.map((chore) => {
          return (
            <div key={chore.id}>
              <ChoreCard chore={chore} user={props.user} getHousehold={props.getHousehold} />
            </div>
          )
        })
        :
        <p>No unclaimed chores. Great teamwork!</p>
      }
    </div>
  )
}

export default UnclaimedChores