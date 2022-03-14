import React from 'react';
import axios from "axios";

import  './BookCard.css'

function BookCard(props) {

  async function deleteBook(isbn){
    const response =await  axios.post(`http://localhost:5000/book/${isbn}`)
    alert(response.data.message);
    //document.getElementById(isbn).style.display = "none";
  }

  return (
    <div className="book-card" id={props.isbn} >
      <div className="row">
        <div className="col-md-8">
          <h2>ISBN: {props.isbn}</h2>
          <h2>TITLE: {props.title}</h2>
          <h2>AUTHOR: {props.author}</h2>
          <h2>PRICE: {props.price}</h2>
        </div>
        <div className="col-md-4">
          <button className="btn btn-danger w-100" onClick={()=>{deleteBook(props.isbn)}}>Delete</button>
          <button className="btn btn-primary w-100 mt-3">Update</button>
        </div>
      </div>
    </div>
  )
}

export default BookCard