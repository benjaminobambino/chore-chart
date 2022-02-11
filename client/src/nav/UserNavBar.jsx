import React from 'react'
import { NavLink } from 'react-router-dom'

const UserNavBar = ({ handleLogout }) => {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/chores">Chores</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink onClick={handleLogout} to="/">Log Out</NavLink>
    </nav>
  )
}

export default UserNavBar