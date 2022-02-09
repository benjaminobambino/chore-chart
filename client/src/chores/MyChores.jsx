import React from "react";
import ChoreCard from "./ChoreCard";

const MyChores = (props) => {
  const myChores = props.chores.filter(chore => chore.doer_id === props.user.id)

  return (
    <div>
      <h3>My Chores</h3>
      { myChores.length ?
        myChores.map((chore) => {
          return (
            <div key={chore.id}>
              <ChoreCard chore={chore} />
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