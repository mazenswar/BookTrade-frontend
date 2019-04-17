import React from 'react'

const ShowBook = (props) => {
 return (
   <div className="book-card" >
      <img src={props.book.imageURL} alt="" />
     <p> {props.book.title} </p>
      <span>by {props.book.authors} </span>
      <span>Condition {props.book.book_condition} </span>
      {props.book.address !== null  && props.book.address !== undefined ?
      props.book.address.length > 1 ? <span> <h3>Book has been ordered! Please ship to address: </h3><p>{props.book.address} </p> </span>: <h3>No one has ordered this yet</h3>
      : "" }
      {props.cart ? <button onClick={() => props.removeBook(props.book.id)}>Remove From Cart</button> : null}
   </div>
 )
}

export default ShowBook;
