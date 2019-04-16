import React from 'react'
import Book from './Book'
import '../stylesheets/cart.scss'

const Cart = (props) => {

  const generateBookComponents = () => {
    return props.cart.map(book => <Book book={book} /> )
  }

  const checkOutButton = () => {
    const componentsArray = generateBookComponents()
      if (props.user.user && componentsArray !== undefined) {
        return props.user.user.credits >= componentsArray.length ? <button onClick={props.checkout}>Checkout</button> : <h1>You do not have enough credit to checkout</h1>
      }
  }

  return (
    <React.Fragment>
      <div className="cart-header">
        <h2>You have {props.user.user ? props.user.user.credits : ''} credits remaining</h2>
      </div>
      <div className="cart book-container">
        {generateBookComponents()}
      </div>
      <div className="checkout-button">
      {checkOutButton()}
      </div>
    </React.Fragment>

  )
}

export default Cart
