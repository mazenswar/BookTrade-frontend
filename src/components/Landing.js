import React from 'react'
import Login from './Login'
import SignUp from './SignUp'

const Landing = (props) => {
  return(
    <React.Fragment>
      <div className="landing-container">
        <SignUp handleSignup={props.handleSignup} />
        <Login handleLogin={props.handleLogin} />
      </div>
    </ React.Fragment>
  )
}

export default Landing
