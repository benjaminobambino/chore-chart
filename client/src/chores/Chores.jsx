import React from "react";
import MyChores from "./MyChores";
import UnclaimedChores from "./UnclaimedChores";
import AllChores from "./AllChores";
import ChoreCreateForm from "./ChoreCreateForm";

const Chores = (props) => {
  return (
    <div>
      <h2>{props.household.name} Chores</h2>
      <MyChores chores={props.chores} user={props.user} />
      <UnclaimedChores chores={props.chores} user={props.user} />
      <AllChores householdName={props.household.name} chores={props.chores} user={props.user} />
      <ChoreCreateForm chores={props.chores} user={props.user} />
    </div>
  )
}

export default Chores