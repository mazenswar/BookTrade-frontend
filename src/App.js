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
    cart: [],
    users: []
  }

  componentDidMount() {
    let token = localStorage.getItem('token')
    if(token) {
      fetch('http://localhost:4000/current_user', { headers: { Authorization: `Bearer ${token}` } })
      .then( r => r.json() )
      .then( data => this.setState({ currentUser: data, credits: data.user.credits }, () => {
        fetch('http://localhost:4000/books')
        .then(res => res.json())
        .then(apiBooks => {
          this.setState({ books: apiBooks }, () => {
            fetch('http://localhost:4000/users')
            .then(res => res.json())
            .then(users => {
              this.setState({users: users}, () => console.log(this.state.users))
            })
          })
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

  handleDonation = (book) => {
    let bookStateCopy = [book, ...this.state.books]
    let userCopy = {...this.state.currentUser}
    userCopy.user.donated_books.push(book)
    this.setState({currentUser: userCopy, books: bookStateCopy})
  }

  removeBook = (id) => {
    let stateCopy = [...this.state.cart]
    let filteredBooks = stateCopy.filter(book => book.id !== id)
    this.setState({
      cart: filteredBooks
    })
  }

  addingBookManually = (e, condition) => {
    e.preventDefault()
    let configObj = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        title: e.target.title.value,
        authors: e.target.authors.value,
        publisher: e.target.publisher.value,
        publishDate: e.target.publishDate.value,
        description: e.target.description.value,
        imageURL: e.target.imageUrl.value,
        condition: condition,
        user_id: this.state.currentUser.user.id
      })
    }
    fetch('http://localhost:4000/books', configObj)
    .then(res => res.json())
    .then(res => {
      this.handleDonation(res)
      this.props.history.push('/books')
    })
  }


  checkout = (e) => {
    e.preventDefault()
    let userID = this.state.currentUser.user.id
    let address = e.target.name.value + "\n" + e.target.address.value + '\n' + e.target.city.value + ', ' + e.target.territory.value + ' ' + e.target.zipcode.value

    let copyStateBooks = [...this.state.books]
    let cartBookIds = this.state.cart.map(book => {
      return book.id
    })

    let donatedMatches = this.state.cart.map(book => {
      let bookMatches = this.state.users.map(user => {
        let foundBook = user.donated_books.find(userBook => {

          return ((userBook.title === book.title) && (userBook.book_condition === book.book_condition)  && userBook.address === null)
        })
        console.log(foundBook, "foundBook?")
        return foundBook
        console.log(foundBook, "foundbook")
      })
      console.log(bookMatches, "bookmatches")
      let match = bookMatches.find(book => {
        return book !== undefined
      })
      console.log(match, "match")
      return match
    })
    // let donatedIds = donatedMatches.map(book => {
    //   return book.id
    // })

    let patchDonatedObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json',
         Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({address: address})
    }

    console.log(patchDonatedObj, "config for address")
    donatedMatches.forEach(donatedId => {
      fetch(`http://localhost:4000/users/${donatedId.user_id}/donated_books/${donatedId.id}`, patchDonatedObj)
    })



    let filteredBooks = copyStateBooks.filter(book => {
        if (!cartBookIds.includes(book.id)){
          return book
        }
    })

    let token = localStorage.getItem('token')

    let configObj = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json',
         Authorization: `Bearer ${token}`
      }
    }

    let patchConfigObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json',
         Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({credits: this.state.currentUser.user.credits - 1})
    }

    // this.setState({ books: filteredBooks })
    cartBookIds.forEach(id => {
      fetch(`http://localhost:4000/${id}`, configObj)
      .then( r => r.json() )
      .then( res => {
        this.setState({ books: filteredBooks, cart: [] }, () => {
          fetch(`http://localhost:4000/${userID}`, patchConfigObj)
          .then( r => r.json() )
          .then(updatedUser => {

              this.setState({credits: this.state.credits - 1})
          })
        })
      } )
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


  handleLogout = () => {
    this.setState({
      currentUser: ''
    })
    localStorage.clear()
    this.props.history.push('/')
  }

  render() {

    return (
      <React.Fragment>
        <NavBar handleLogout={this.handlLogout}/>
        <RouterComp
        user={this.state.currentUser}
        books={this.state.books}
        handleLogin={this.handleLogin}
        handleSignup={this.handleSignup}
        cart={this.state.cart}
        getBook={this.getBook}
        checkout={this.checkout}
        credits={this.state.credits}
        removeBook={this.removeBook}
        handleDonation={this.handleDonation}
        addingBookManually={this.addingBookManually}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(App);
