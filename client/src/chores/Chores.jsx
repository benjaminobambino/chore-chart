import React, { useState, useEffect } from "react";
import MyChores from "./MyChores";
import UnclaimedChores from "./UnclaimedChores";
import AllChores from "./AllChores";
import ChoreCreateForm from "./ChoreCreateForm";

const Chores = (props) => {
  const [show, setShow] = useState({
    mine: false,
    unclaimed: false,
    all: false,
    new: false
  })

  const showMine = () => {
    setShow({ ...show, mine: !show.mine })
  }

  const showUnclaimed = () => {
    setShow({ ...show, unclaimed: !show.unclaimed })
  }

  const showAll = () => {
    setShow({ ...show, all: !show.all})
  }

  // const showNew = () => {
  //   setShow({ ...show, new: !show.new})
  // }

  useEffect(() => {
    if (props.user) {
      if (props.user.household_id === null) {
        props.history.push("/household")
      }
    }
  })

  return (
    <div>
      <h2>{props.household.name} Chores</h2>
      <div className="accordion-header" onClick={showMine}>
        <h3 className="accordion-sign">{show.mine ? '-' : '+' }</h3>
        <h3 className="accordion-title">My Chores</h3>
      </div>
      {show.mine && (
        <div className="accordion-body">
          <MyChores show={show.mine} chores={props.chores} user={props.user} getHousehold={props.getHousehold} household={props.household} />
        </div>
      )}
      <div className="accordion-header" onClick={showUnclaimed}>
        <h3 className="accordion-sign">{show.unclaimed ? '-' : '+' }</h3>
        <h3 className="accordion-title">Unclaimed Chores</h3>
      </div>
      {show.unclaimed && (
        <div className="accordion-body">
          <UnclaimedChores show={show.unclaimed} chores={props.chores} user={props.user} getHousehold={props.getHousehold} household={props.household} />
        </div>
      )}
      <div className="accordion-header" onClick={showAll}>
        <h3 className="accordion-sign">{show.all ? '-' : '+' }</h3>
        <h3 className="accordion-title">All {props.household.name} Chores</h3>
      </div>
      {show.all && (
        <div className="accordion-body">
          <AllChores show={show} household={props.household} chores={props.chores} user={props.user} getHousehold={props.getHousehold} />
        </div>
      )}
      {/* <div className="accordion-header" onClick={showNew}>
        <h3 className="accordion-sign">{show.new ? '-' : '+' }</h3>
        <h3 className="accordion-title">Add a New Chore</h3>
      </div>
      {show.new && (
        <div className="accordion-body"> */}
          <ChoreCreateForm chores={props.chores} user={props.user} getHousehold={props.getHousehold} household={props.household} />
        {/* </div>
      )} */}
    </div>
  )
}

export default Chores