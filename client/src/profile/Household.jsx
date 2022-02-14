import React, { useEffect } from "react";
import ProfileCard from "./ProfileCard";

const Household = (props) => {
  // useEffect(() => {
    let adminFirst
    if (!localStorage.getItem('token')) {
      props.history.push('/login')
    } else {
      adminFirst = props.users.sort((a, b) => {
        return b.admin - a.admin
      })          
    }
  // })


  

  return (
    <div>
      <h2>{props.name} Team Members</h2>
      {props.users &&
      adminFirst.map((user) => {
        return(
          <div key={props.user.id}>
            <ProfileCard user={props.user} />
          </div>
        )
      })}
    </div>
  )
}

export default Household