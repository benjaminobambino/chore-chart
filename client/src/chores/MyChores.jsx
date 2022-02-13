import React from "react";
import ChoreCard from "./ChoreCard";

const MyChores = (props) => {
  const myChores = props.chores.filter(chore => chore.doer_id === props.user.id)

  return (
    <div>
      { myChores.length ?
        myChores.map((chore) => {
          return (
            <div key={chore.id}>
              <ChoreCard chore={chore} user={props.user} getHousehold={props.getHousehold} household={props.household} />
            </div>
          )
        })
      :
        <p>You have no chores!</p>
      }
    </div>
  )
}

export default MyChores