import React from 'react'
import { BrowserRouter as Link, NavLink, Router } from 'react-router-dom'

const NavBar = (props) => {

  return (
    <nav>
      <NavLink to='/home'>Home</NavLink>
      <NavLink to='/books'>Books</NavLink>
      <NavLink to='/donate'>Donate</NavLink>
      <NavLink to='/cart'>Cart</NavLink>
      <NavLink to='/' onClick={props.handlLogout}>Logout</NavLink>
      <NavLink to='/profile' className="nav-no-hover"><img className="profile-icon" src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" alt="" /></NavLink>
    </nav>

  )

}

export default NavBar
