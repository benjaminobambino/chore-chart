import React from "react";
import UserNavBar from "../nav/UserNavBar";
import PublicNavBar from "../nav/PublicNavBar";

const Header = ({ authenticated, user, handleLogOut }) => {
  return (
    <div>
      <h1>Chore Chart</h1>
      { authenticated ? 
        <UserNavBar handleLogOut={handleLogOut} />
        :
        <PublicNavBar />
      }
    </div>
  )
}

export default Header
