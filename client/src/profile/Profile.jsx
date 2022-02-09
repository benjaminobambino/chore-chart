import React, { useState } from "react";
import ProfileCard from "./ProfileCard";
import ProfileEditCard from "./ProfileEditForm";

const Profile = ({ user }) => {
  const [editing, setEditing] = useState(false)

  const toggleEditing = () => {
    editing ? setEditing(false) : setEditing(true)
  }

  return (
    <div>
      <h2>{user.username}&rsquo;s Profile</h2>
      { editing ?
        <ProfileCard toggleEditing={toggleEditing} />
        :
        <ProfileEditCard toggleEditing={toggleEditing} />
      }
    </div>
  )
}

export default Profile