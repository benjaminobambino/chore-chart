import React from "react";

const ProfileCard = ({ user }) => {
  return (
    <div>
      <h3>{user.username} {user.admin ? '(admin)' : null}</h3>
    </div>
  )
}

export default ProfileCard