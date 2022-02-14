import React from "react";
import Client from "../services/api";

const ProfileCard = ({ user, currentUser, getHousehold, household }) => {
  const makeAdmin = async (userId) => {
    await Client.patch(`/users/${userId}`, {admin: true}).then(() => {
      getHousehold(household.id)
    })
  }

  const confirmAdmin = () => {
    const confirm = window.confirm(`Are you sure you want to make ${user.name} a household admin?`)
    if (confirm) {
      makeAdmin(user.id)
    }
  }

  return (
    <div className="profile-card">
      {user.admin ? <div className="spacer"><img src="checklist-icon.png" alt="admin" className="admin-icon"/></div> : <div className="spacer"></div>}
      <h3>{user.username}</h3>
      {currentUser.admin && currentUser.id !== user.id && !user.admin ? <button onClick={confirmAdmin}>Make Admin</button> : <div></div>}
    </div>
  )
}

export default ProfileCard