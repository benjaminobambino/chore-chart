import React from "react";
import ProfileCard from "./ProfileCard";

const Household = (props) => {
    let adminFirst
    if (!localStorage.getItem('token')) {
      props.history.push('/login')
    } else {
      adminFirst = props.users.sort((a, b) => {
        return b.admin - a.admin
      })          
    }

  return (
    <div className="household">
      <h2>{props.name} Team Members</h2>
      {props.users &&
        adminFirst.map((user) => {
          return(
            <div key={user.id}>
              <ProfileCard 
                user={user} 
                currentUser={props.currentUser} 
                getHousehold={props.getHousehold} 
                household={props.household} 
              />
            </div>
          )
        })
      }
    </div>
  )
}

export default Household