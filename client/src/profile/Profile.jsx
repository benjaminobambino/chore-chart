import React from "react";
import ProfileCard from "./ProfileCard";

const Profile = ({ user }) => {
  return (
    <div>
      <h3>{user.username}'s Profile</h3>
      <ProfileCard />
    </div>
  )
}

export default Profile