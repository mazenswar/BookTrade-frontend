import React from 'react'


export default class Login extends React.Component {
  state = {
    username: '',
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
        <h1>Login</h1>
        <form onSubmit={(e) => this.props.handleLogin(e, this.state)}>
          <input name="username" type="text" value={this.state.username} onChange={this.handleChange} placeholder="Username"/>
          <input name="password" type="password" value={this.state.password} onChange={this.handleChange} placeholder="Password"/>
          <input type='submit' />
        </form>
      </ React.Fragment>
    )
  }
}
