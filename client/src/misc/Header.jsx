import React from "react";
import UserNavBar from "../nav/UserNavBar";
import GuestNavBar from "../nav/GuestNavBar";

const Header = ({ authenticated, user, handleLogout }) => {
  return (
    <div>
      <h1>Chore Chart</h1>
      { authenticated && user ? 
        <UserNavBar handleLogout={handleLogout} />
        :
        <GuestNavBar />
      }
    </div>
  )
}

export default Header
