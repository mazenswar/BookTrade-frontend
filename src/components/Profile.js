import React from 'react'
import Book from './Book'
import '../stylesheets/profile.scss'

class Profile extends React.Component {

  generateBookCards = () => {
    return this.props.user.user.donated_books.map(book => <Book book={book}/>)
  }

  render(){
    return (
      <React.Fragment>
      <div className="profile-header">
        <h1>Name: {this.props.user.user === undefined ? '' : this.props.user.user.username}</h1>
        <h2>Credits: {this.props.user.user === undefined ? " " : this.props.user.user.credits}</h2>
        <h2>Donated Books</h2>
      </div>
      <div className="book-container">
        {this.props.user.user === undefined ? " " : this.generateBookCards()}
      </div>
      </React.Fragment>
    )
  }

}

export default Profile;
