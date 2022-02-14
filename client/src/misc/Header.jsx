import React from "react";
import UserNavBar from "../nav/UserNavBar";
import PublicNavBar from "../nav/PublicNavBar";

const Header = ({ authenticated, user, handleLogOut }) => {
  return (
    <div className="header">
      <section className="title-container">
        <img src="./checklist-icon.png" alt="chore chart" className="icon"/>
        <section className="title">
          <h1>Chore</h1>
          <h1>Chart</h1>
        </section>
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
