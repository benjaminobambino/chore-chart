import React from "react";

const ProfileCard = (props) => {
  return (
    <div>
      <h3>ProfileCard</h3>
      <button onClick={props.toggleEditing}>Edit Profile</button>
    </div>
  )
}

export default ProfileCard