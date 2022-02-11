import React from 'react'
import { NavLink } from 'react-router-dom'

const UserNavBar = () => {
  return (
    <nav>
      {/* <NavLink to="/">Home</NavLink> */}
      <NavLink to="/chores">Chores</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/about">About</NavLink>
    </nav>
  )
}

export default UserNavBar