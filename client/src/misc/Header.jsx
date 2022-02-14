import React from "react";
import UserNavBar from "../nav/UserNavBar";
import PublicNavBar from "../nav/PublicNavBar";

const Header = ({ authenticated, user, handleLogOut }) => {
  return (
    <div className="header">
      <section className="title">
        <img src="./checklist-icon.png" alt="chore chart" className="icon"/>
        <h1 className="header">Chore Chart</h1>
      </section>
      { authenticated && user ? 
        <UserNavBar handleLogOut={handleLogOut} />
        :
        <PublicNavBar />
      }
    </div>
  )
}

export default Header
