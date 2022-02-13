import React from "react";
import ProfileCard from "./ProfileCard";

const Household = ({ users, name }) => {
  const adminFirst = users.sort((a, b) => {
    return b.admin - a.admin
  })

  return (
    <div>
      <h2>{name} Team Members</h2>
      {users &&
      adminFirst.map((user) => {
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