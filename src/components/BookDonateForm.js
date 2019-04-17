import React from 'react'
import BlankBook from './BlankBook'
import { Route, Redirect } from 'react-router'
import { withRouter } from "react-router-dom"
import '../stylesheets/donate.scss'

class BookDonateForm extends React.Component {
 state = {
   book: {},
   isbn: '',
   isbnForm: false,
   nonIsbnForm: false,
   title: '',
   authors: '',
   publisher: '',
   publishDate: '',
   description: '',
   imageUrl: '',
   condition: 'Good (G)'
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
    let book_condition = e.target.condition.value
    let isbn = e.target.isbn.value
    fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
    .then(r => r.json()).then(res => {
      let bookObj = {}
      if (res.items !== undefined && res.items[0].volumeInfo.imageLinks !== undefined){
         bookObj = {
            title: res.items[0].volumeInfo.title,
            authors: res.items[0].volumeInfo.authors[0],
            publisher: res.items[0].volumeInfo.publisher,
            publishDate: res.items[0].volumeInfo.publishedDate,
            description: res.items[0].volumeInfo.description,
            imageURL: res.items[0].volumeInfo.imageLinks.thumbnail,
            isbn: isbn,
            book_condition: book_condition
           }
           this.setState({ book: bookObj}, () => console.log(this.state.book))
      }
      else {
        this.setState({nonIsbnForm: true})
      }
    })


 }

 confirmSubmission = (e, id) => {
   let book = this.state.book
   e.preventDefault()
   let configObj = {
     method: "POST",
     headers: {
       'Content-Type': 'application/json',
       'Accept': 'application/json'
     },
     body: JSON.stringify({
       user_id: id,
       book: {...this.state.book}
     })
   }

   fetch("http://localhost:4000/books", configObj)
   .then(res => res.json())
   .then(book => {
     this.props.handleDonation(book)
     alert("Thanks for you submission!")
     this.props.history.push('/books')
   })
 }

 bookConditionSelect = (e) => {
   return (
     <select name="condition">
      <option>Fine/Like New (F)</option>
      <option>Very Good (VG)</option>
      <option>Good (G)</option>
      <option>Fair (FR)</option>
      <option>Poor (P)</option>
     </select>
   )
 }

 render(){

   return (
     <div className="donation-container">
     <button onClick={this.donateClickHelper}>Donate A Book!</button>
       {this.state.donate ? <div>
       <h3>Do you have ISBN number for the book?</h3>
       <button onClick={this.yesClickHelper}>Yes</button>
       <button onClick={this.noClickHelper}>No, I will manually input book information</button>
       </div> : ''}
       {this.state.isbnForm ? <div><h3>Please enter the ISBN number without dashes</h3><form onSubmit={this.handleSubmit}>
         <input name="isbn" placeholder="isbn#" onChange={this.changeHandler} value={this.state.isbn.value}/>
         <label>Select Book Condition</label>{this.bookConditionSelect()}
         <input className="submit" type="submit" value="submit" />
       </form></div> : ''}

       {this.state.book.title !== undefined ? <div><h2>Is this the book you are donating?</h2><BlankBook book={this.state.book}/> <h2>Click yes to confirm donation</h2> <form onSubmit={(e) => this.confirmSubmission(e, this.props.user.user.id)}><input type='submit' value="Yes"/></form></div>: ""}



       {this.state.nonIsbnForm ?
         <div>
         <h3>We weren't able to find your edition of your book by ISBN number. Please enter information manually.</h3>
         <form id="custom-form" onSubmit={(e) => this.props.addingBookManually(e, this.state.condition)}>
           <input name="title" placeholder="title" onChange={this.changeHandler} value={this.state.title.value} required/>
           <input name="authors" placeholder="authors" onChange={this.changeHandler} value={this.state.authors.value} required/>
           <input name="publisher" placeholder="publisher" onChange={this.changeHandler} value={this.state.publisher.value} required/>
           <input name="publishDate" placeholder="publishDate" onChange={this.changeHandler} value={this.state.publishDate.value} required/>
           <input name="description" placeholder="description" onChange={this.changeHandler} value={this.state.description.value} required/>
           <input name="imageUrl" placeholder="imageUrl" onChange={this.changeHandler} value={this.state.imageUrl.value} required/>
           <input name="isbn" placeholder="isbn" onChange={this.changeHandler} value={this.state.isbn.value} required/>
           <input className="submit" type="submit" value="Confirm Book Submission"/>
           {this.bookConditionSelect()}
         </form>
         </div>: ""}

     </div>
   )
 }
}

export default withRouter(BookDonateForm)
