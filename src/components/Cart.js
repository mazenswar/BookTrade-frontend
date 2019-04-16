import React from 'react'
import ShowBook from './ShowBook'
import '../stylesheets/cart.scss'

class Cart extends React.Component {
  state = {
    name: '',
    address: '',
    city: '',
    territory: '',
    zipcode: ''
  }

  generateBookComponents = () => {
    return this.props.cart.map(book => <ShowBook cart={true} book={book} /> )
  }

  checkOutButton = () => {
    const componentsArray = this.generateBookComponents()
      if (this.props.user.user && componentsArray !== undefined) {
        return this.props.user.user.credits >= componentsArray.length ? <button type="submit" onClick={this.props.checkout}>Checkout</button> : <h1>You do not have enough credit to checkout</h1>
      }
  }

  render(){
    return (
      <React.Fragment>
        <div className="cart-header">
          <h2>You have {this.props.credits ? this.props.credits : '0'} credits remaining</h2>
        </div>
        <form>
          <div className="cart book-container">
            {this.generateBookComponents()}
          </div>
          <input name="name" placeholder="name" />
          <input name="address" placeholder="address" />
          <input name="city" placeholder="city" />
          <input name="territory" placeholder="territory" />
          <input name="country" placeholder="country" />
          <div className="checkout-button">
          {this.checkOutButton()}
          </div>
        </form>
      </React.Fragment>

    )
  }
}

export default Cart
