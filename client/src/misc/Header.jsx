import React from "react";
import UserNavBar from "../nav/UserNavBar";
import PublicNavBar from "../nav/PublicNavBar";

const Header = ({ authenticated, user, handleLogout }) => {
  return (
    <div>
      <h1>Chore Chart</h1>
      { authenticated && user ? 
        <UserNavBar handleLogout={handleLogout} />
        :
        <PublicNavBar />
      }
    </div>
  )
}

export default Header
