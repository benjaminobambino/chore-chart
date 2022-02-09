import React from "react";
import MyChores from "./MyChores";
import UnclaimedChores from "./UnclaimedChores";
import AllChores from "./AllChores";
import ChoreCreateForm from "./ChoreCreateForm";

const Chores = (props) => {
  return (
    <div>
      <h2>{props.household.name} Chores</h2>
      <MyChores chores={props.chores} user={props.user} getHousehold={props.getHousehold} />
      <UnclaimedChores chores={props.chores} user={props.user} getHousehold={props.getHousehold} />
      <AllChores householdName={props.household.name} chores={props.chores} user={props.user} getHousehold={props.getHousehold} />
      <ChoreCreateForm chores={props.chores} user={props.user} getHousehold={props.getHousehold} />
    </div>
  )
}

export default Chores