import React from "react";

const ProfileEditCard = (props) => {
  return (
    <div>
      <h3>ProfileEditCard</h3>
      <button onClick={props.toggleEditing}>Submit</button>
      <button onClick={props.toggleEditing}>Cancel</button>
    </div>
  )
}

export default ProfileEditCard