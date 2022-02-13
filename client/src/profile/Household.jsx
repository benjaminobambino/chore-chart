import React from "react";
import ProfileCard from "./ProfileCard";

const Household = ({ users, name }) => {
  return (
    <div>
      <h2>{name} Team Members</h2>
      {users &&
      users.map((user) => {
        return(
          <div key={user.id}>
            <ProfileCard user={user} />
          </div>
        )
      })}
    </div>
  )
}

export default Household