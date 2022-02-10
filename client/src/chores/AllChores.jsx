import React from "react";
import ChoreCard from "./ChoreCard";

const AllChores = (props) => {
  return (
    <div>
      <h3>All {props.householdName} Chores</h3>
      { props.chores.length ?
        props.chores.map((chore) => {
          return (
            <div key={chore.id}>
              <ChoreCard chore={chore} user={props.user} getHousehold={props.getHousehold} />
            </div>
          )
        })
      :
        <p>{props.householdName} has no chores!</p>
      }
    </div>
  )
}

export default AllChores