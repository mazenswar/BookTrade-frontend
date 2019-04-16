import React, { Component } from 'react';
import RouterComp from './components/RouterComp'
import './stylesheets/master.scss'

import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { withRouter } from "react-router-dom"

import NavBar from './components/NavBar'

class App extends Component {

  state = {
    currentUser: '',
    books: [],
    cart: []
  }

  componentDidMount() {

    let token = localStorage.getItem('token')
    if(token) {
      fetch('http://localhost:4000/current_user', { headers: { Authorization: `Bearer ${token}` } })
      .then( r => r.json() )
      .then( data => this.setState({ currentUser: data }, () => {
        fetch('http://localhost:4000/books')
        .then(res => res.json())
        .then(apiBooks => {
          this.setState({ books: apiBooks })
        })
      })
      )
      this.props.history.push('/home')
    } else {
      this.props.history.push('/')
    }

  }


  getBook = (book) => {
    if(!this.state.cart.includes(book)){
      let cart = [...this.state.cart, book]
      this.setState({ cart: cart})
    }
  }


  checkout = () => {
    let copyStateBooks = [...this.state.books]

    let cartBookIds = this.state.cart.map(book => {
      return book.id
    })

    let filteredBooks = copyStateBooks.filter(book => {
        if (!cartBookIds.includes(book.id)){
          return book
        }
    })
  }

  handleSignup = (event, userData) => {
    event.preventDefault()
    const configObj = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: JSON.stringify(userData)
    }

    fetch('http://localhost:4000/users', configObj)
    .then( r => r.json() )
    .then( data => {
      localStorage.setItem('token', data.jwt)
      this.setState({
        currentUser: data.user
      })
    } )

    this.props.history.push('/home')
  }

  handleLogin = (event, userData) => {
    event.preventDefault()
    const configObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(userData)
    }
    fetch('http://localhost:4000/auth', configObj)
    .then( r => r.json() )
    .then( data => {
      if(data.jwt) {
        this.setState({ currentUser: data.user})
        localStorage.setItem('token', data.jwt)
        this.props.history.push('./home')
      }
    })

  }


  render() {
    return (
      <React.Fragment>
        <NavBar />
        <RouterComp
        user={this.state.currentUser}
        books={this.state.books}
        handleLogin={this.handleLogin}
        handleSignup={this.handleSignup}
        cart={this.state.cart}
        getBook={this.getBook}
        checkout={this.checkout}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(App);
