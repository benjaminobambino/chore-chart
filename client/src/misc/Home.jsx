import React from "react"
import { useHistory } from 'react-router-dom'

const Home = ({ user, quote }) => {
  const history = useHistory()
  
  if (user) {
    return(
      <div className="home">
        <h2>Welcome back, {user.username}!</h2>
        <p className="quote-text">&ldquo;{quote.text}&rdquo;</p>
        <p className="quote-author">- {quote.author}</p>
      </div>
    )
  } else {
    return(
      <div className="home">
        <h2>Welcome to Chore Chart!</h2>
        <h4>Problem #1:</h4>
        <p>Whether you live with your family, with roommates, or by yourself, keeping track of household chores can be a nightmare. This causes strain on relationships and other areas of life.</p>
        <h4>Problem #2:</h4>
        <p>Too many productivity apps take away from productivity by keeping users in the setup phases for too long.</p>
        <h4>Solution:</h4>
        <p><span className="chore-chart">Chore Chart</span> lets you get your household&rsquo;s chores organized and up-to-date quickly and easily. So you can keep chore-expectations mutually understood, well delegated, and on target. <span className="chore-chart">Chore Chart</span> can&rsquo;t do your chores for you &hellip; but it&rsquo;s the next best thing.</p>
        <button onClick={() => history.push('/signup')}>Create an Account</button>
      </div>
    )
  }
}

export default Home