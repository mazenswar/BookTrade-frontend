import React from 'react'
import Book from '../components/Book'

class BookContainer extends React.Component {

  allBooks = () => this.props.books.map(book => {
    return <Book key={book.id} book={book} getBook={this.props.getBook}/>
  })
 render(){

   return (
     <React.Fragment>
       <div id="book-container-header"><h2>Available Books</h2></div>
       <div className="book-container">
       {this.allBooks()}
       </div>
     </React.Fragment>
   )
 }
}

export default BookContainer;
