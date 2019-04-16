import React from 'react'

const ShowBook = (props) => {

 return (
   <div className="book-card" >
      <img src={props.book.imageURL} alt="" />
     <p> {props.book.title} </p>
      <span>by {props.book.authors} </span>
      {props.cart ? <button>Remove From Cart</button> : null}
   </div>
 )
}

export default ShowBook;
