import React from "react";
import MyChores from "./MyChores";
import UnclaimedChores from "./UnclaimedChores";
import AllChores from "./AllChores";
import ChoreCreateForm from "./ChoreCreateForm";

const Chores = (props) => {
  return (
    <div>
      <h3>{props.household.name} Chores</h3>
      <MyChores />
      <UnclaimedChores />
      <AllChores householdName={props.household.name} />
      <ChoreCreateForm />
    </div>
  )
}

export default Chores