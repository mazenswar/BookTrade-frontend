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
    return this.props.cart.map(book => <ShowBook cart={true} book={book} removeBook={this.props.removeBook}/> )
  }

  checkOutButton = () => {
    const componentsArray = this.generateBookComponents()
      if (this.props.user.user && componentsArray !== undefined) {
        return this.props.user.user.credits >= componentsArray.length ? <input className="submit" type="submit" value="Submit" /> : <h1>You do not have enough credit to checkout</h1>
      }
  }

  shippingFormChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render(){

    return (
      <React.Fragment>
        <div className="cart-header">
          <h2>You have {this.props.credits ? this.props.credits : '0'} credits remaining</h2>
        </div>
          <div className="cart book-container">
            {this.generateBookComponents()}
          </div>
          <h2>Please enter your shipping information</h2>
        <form onSubmit={(e) => this.props.checkout(e)}>
          <input type="text" name="name" placeholder="name" value={this.state.name} onChange={this.shippingFormChange}/>
          <input type="text" name="address" placeholder="address" value={this.state.address} onChange={this.shippingFormChange}/>
          <input type="text" name="city" placeholder="city" value={this.state.city} onChange={this.shippingFormChange}/>
          <input type="text" name="territory" placeholder="state/country" value={this.state.territory} onChange={this.shippingFormChange}/>
          <input type="text" name="zipcode" placeholder="zipcode" value={this.state.zipcode} onChange={this.shippingFormChange}/>
          <div className="checkout-button">
          {this.checkOutButton()}
          </div>
        </form>
      </React.Fragment>

    )
  }
}

export default Cart
