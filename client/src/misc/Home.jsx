import React from "react"

const Home = ({ profile }) => {
  return(
    <div>
      <h2>{!profile ? 'Welcome to Chore Chart!' : `Welcome back, ${profile.username}`}</h2>
    </div>
  )
}

export default Home