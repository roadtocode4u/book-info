import React, {useState, useEffect} from 'react'
import axios from "axios";

import { useNavigate, useParams } from 'react-router-dom';

import "./UpdateBook.css"

function UpdateBook() {
  const {isbn} = useParams();

  let navigate = useNavigate();

  const [book, setBook] = useState({
    isbn: "",
    title: "",
    author: "",
    price: "",
  });

  useEffect(()=>{
    async function getBook(){
      const response = await axios.get(`https://book-info-icp.herokuapp.com/book/${isbn}`);
      setBook(response.data.book);
    }
    getBook();
  }, [])

 

  async function updateBook(){
    const response  = await axios.post(`https://book-info-icp.herokuapp.com/update/book/${isbn}`, book);
    if(response.data.status === "success")
    {
      alert(response.data.message);
      navigate("/");
    }
  }

  return (
    <div className="container">
      <h1 className="text-center m-3 p-3">Update Book for ISBN {isbn}</h1>
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <form className="addbook-form">
              <div class="mb-3">
                <label for="isbn" class="form-label">Enter ISBN Number</label>
                <input type="text" class="form-control" id="isbn" value={book.isbn} onChange={(e)=>{setBook({...book, isbn: e.target.value})}} disabled />
              </div>
              <div class="mb-3">
                <label for="title" class="form-label">Enter Book Title</label>
                <input type="text" class="form-control" id="title" value={book.title} onChange={(e)=>{setBook({...book, title: e.target.value})}} />
              </div>
              <div class="mb-3">
                <label for="author" class="form-label">Enter Author Name</label>
                <input type="text" class="form-control" id="author" value={book.author} onChange={(e)=>{setBook({...book, author: e.target.value})}} />
              </div>
              <div class="mb-3">
                <label for="price" class="form-label">Enter Price</label>
                <input type="text" class="form-control" id="price" value={book.price} onChange={(e)=>{setBook({...book, price: e.target.value})}} />
              </div>

              <button type="button" className="btn btn-primary w-100 mt-3" onClick={updateBook}>Update Book</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateBook