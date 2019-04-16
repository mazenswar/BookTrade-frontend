import React from 'react'
import Book from './Book'

class BookDonateForm extends React.Component {
 state = {
   book: {},
 }

 changeHandler = (e) => {
   this.setState({
     [e.target.name]: e.target.value
   })
 }

 donateClickHelper = () => {
   this.setState({
     donate: true
   })
 }

 yesClickHelper = () => {
   this.setState({
     isbnForm: true,
     nonIsbnForm: false
   })
 }

 noClickHelper = () => {
   this.setState({
     nonIsbnForm: true,
     isbnForm: false
   })
 }

 handleSubmit = (e) => {
    e.preventDefault()
    let isbn = e.target.isbn.value
    fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
    .then(r => r.json()).then(res => {
        let bookObj = {
            title: res.items[0].volumeInfo.title,
            authors: res.items[0].volumeInfo.authors[0],
            publisher: res.items[0].volumeInfo.publisher,
            publishDate: res.items[0].volumeInfo.publishedDate,
            description: res.items[0].volumeInfo.description,
            imageURL: res.items[0].volumeInfo.imageLinks.thumbnail,
            isbn: isbn
           }
           this.setState({ book: bookObj}, () => console.log(this.state.book))
        })
 }

 confirmSubmission = (id) => {
   let configObj = {
     method: "POST",
     headers: {
       'Content-Type': 'application/json',
       'Accept': 'application/json'
     },
     body: JSON.stringify({
       book: this.state.book,
       user_id: id
     })
   }

   fetch("http://localhost:4000/books", configObj)
   .then(res => res.json())
   .then(book => {
     console.log(book)
   })
 }

 render(){

   return (
     <div>
     <button onClick={this.donateClickHelper}>Donate A Book!</button>
       {this.state.donate ? <div>
       <h3>Do you have ISBN number for the book?</h3>
       <button onClick={this.yesClickHelper}>Yes</button>
       <button onClick={this.noClickHelper}>No</button>
       </div> : ''}
       {this.state.isbnForm ? <form onSubmit={this.handleSubmit}>
         <input name="isbn" placeholder="isbn#" onChange={this.changeHandler} value={this.state.isbn.value}/>
         <input type="submit" value="submit" />
       </form> : ''}

       {this.state.book.title !== undefined ? <div><h2>Is this the book you are donating?</h2><Book book={this.state.book}/> <h2>Click yes to confirm donation</h2> <button onClick={() => this.confirmSubmission(this.props.user.user.id)}>Yes</button></div>: ""}



       {this.state.nonIsbnForm ? <form>
           <input name="title" placeholder="title" onChange={this.changeHandler} value={this.state.title.value}/>
           <input name="authors" placeholder="authors" onChange={this.changeHandler} value={this.state.authors.value}/>
           <input name="publisher" placeholder="publisher" onChange={this.changeHandler} value={this.state.publisher.value}/>
           <input name="publishDate" placeholder="publishDate" onChange={this.changeHandler} value={this.state.publishDate.value}/>
           <input name="description" placeholder="description" onChange={this.changeHandler} value={this.state.description.value}/>
           <input name="imageUrl" placeholder="imageUrl" onChange={this.changeHandler} value={this.state.imageUrl.value}/>
           <input type="submit" value="Donate Book"/>
         </form> : ""}
     </div>
   )
 }
}

export default BookDonateForm
