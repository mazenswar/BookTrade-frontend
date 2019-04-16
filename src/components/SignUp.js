import React from 'react'


export default class Signup extends React.Component {
  state = {
    username: '',
    email: '',
    password: ''
  }

  handleChange = (event) => {
     console.log(this.state)
     this.setState({
       [event.target.name]: event.target.value
     })
   }

  render() {
    return (
      <React.Fragment>
        <h1> Signup Form </h1>
        <form onSubmit={(e) => this.props.handleSignup(e, this.state)}>
          <input name="username" type="text" value={this.state.username} onChange={this.handleChange} placeholder="Username"/>
          <input name="email" type="email" value={this.state.email} onChange={this.handleChange} placeholder="Email"/>
          <input name="password" type="password" value={this.state.password} onChange={this.handleChange} placeholder="Password"/>
          <input type='submit' />
        </form>
      </ React.Fragment>
    )
  }
}
