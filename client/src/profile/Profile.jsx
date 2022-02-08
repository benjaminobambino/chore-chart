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
      <h3>{user.username}&rsquo;s Profile</h3>
      { editing ?
        <ProfileCard toggleEditing={toggleEditing} />
        :
        <ProfileEditCard toggleEditing={toggleEditing} />
      }
    </div>
  )
}

export default Profile