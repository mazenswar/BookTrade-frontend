import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const About = () => {
  return (
    <React.Fragment>
    <section className="main-about">
    <h1>Welcome to BookTrade</h1>
    <p>
    BookTrade is an exchange portal for books! The mission is to encourage reuse of books that are not being used and to expand literary knowledge and enjoyment among users.
    </p>
    <p>
    If you have books that you wish to donate to other readers, for every book you add for donation on our site, you gain a credit that you can use to acquire a donated book from another user. Simply browse our library and look for books you wish to have. You will fill out your shipping information and the other user will ship you the book.
    </p>
    <p>
    Please note that all users handle their own shipping costs. You will be responsible for shipping any books that you are donating.
    </p>
    </section>

    <section className="main-links-container">

      <div className="main-links"><Link to='/books'>Books</Link></div>
      <div className="left main-links"><Link to='/donate'>Donate a Book</Link></div>


    </section>
    </React.Fragment>
  )
}

export default About
