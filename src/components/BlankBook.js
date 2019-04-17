import React from 'react'

const BlankBook = (props) => {
 return (
   <div className="book-card" >
      <img src={props.book.imageURL} alt="" />
     <p> {props.book.title} </p>
      <span>by {props.book.authors} </span>
      <span>Condition {props.book.book_condition} </span>
   </div>
 )
}

export default BlankBook;
