import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from './Home'
import Landing from './Landing'
import BookContainer from '../containers/BookContainer'
import BookDonateForm from './BookDonateForm'
import Profile from './Profile'
import Cart from './Cart'

const RouterComp = (props) => {
  return(
    <Switch>
      <Route path='/cart' render={(renderProps) => <Cart credits={props.credits} books={props.books} cart={props.cart} user={props.user} checkout={props.checkout} removeBook={props.removeBook}/> } />
      <Route path='/books' render={(renderProps) => {
          return < BookContainer books={props.books} getBook={props.getBook}/>
      }} />
      <Route path='/donate' render={(renderProps) => <BookDonateForm user={ {...props.user} }/> }/>
      <Route path='/home' component={Home} />
      <Route path='/profile' render={(renderProps) => <Profile user={props.user}/>}/>
      <Route path='/' render={(renderProps) => {
        return <Landing handleLogin={props.handleLogin} handleSignup={props.handleSignup} />
      }} />
    </Switch>
  )
}

export default RouterComp
