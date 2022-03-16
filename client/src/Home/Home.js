import axios from "axios"
import {useState, useEffect} from "react";

import "./Home.css"

import BookCard from './../BookCard/BookCard';

function Home() {
  
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchData(){
      const response =await axios.get(`${process.env.BASE_URL}/book`)
      setBooks(response.data.data)
     // console.log(response.data.data)
    }
    fetchData()
  })

  return (
    <>
      <h1 className="text-center">Book Info</h1>
      <div className="container">
        {
          books.map(book => <BookCard key={book.isbn} isbn={book.isbn}  title={book.title} author={book.author} price={book.price} />)
        }
      </div>
    </>
  )
}

export default Home