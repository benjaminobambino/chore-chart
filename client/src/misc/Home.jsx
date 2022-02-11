import React from "react"

const Home = (user) => {
  return(
    <div>
      <h2>{!user ? 'Welcome to Chore Chart!' : `Welcome back, ${user.username}`}</h2>
    </div>
  )
}

export default Home