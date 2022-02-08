import React from 'react'
import { NavLink } from 'react-router-dom'

const UserNavBar = () => {
  return (
    <nav>
      {/* <NavLink to="/">Home</NavLink> */}
      <NavLink to="/">Chores</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/about">About</NavLink>
    </nav>
  )
}

export default UserNavBar