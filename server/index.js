const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const path = require('path'); 

let books =  [
  {
  "isbn": "BOOK1002",
  "title": "Wings of Fire",
  "author": "APJ Kalam",
  "price": "200"
  },
  {
    "isbn": "BOOK1003",
    "title": "C in Depth",
    "author": "Yashwant Kanetkar",
    "price": "300"
  },
  {
    "isbn": "BOOK1004",
    "title": "Introduction to Java",
    "author": "Balaguruswamy",
    "price": "300"
  },
  {
    "isbn": "BOOK1005",
    "title": "Introduction to Data Structures",
    "author": "Kamathane",
    "price": "300"
  }
];

const app = express();

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
})

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

//Create Book
app.post('/book', (req, res) => {
  const newBook = req.body;
  books.push(newBook);

  res.send({
    status: 'success',
    message: 'Book added successfully',
    data: newBook
  });
});

//Get book by isbn
app.get('/book/:isbn', (req, res) => {

  const isbn = req.params.isbn;
  let newBook;
  let isFound = false;
  
  for(let i=0; i<books.length; i++){
     if(books[i].isbn===isbn)
     {
        newBook = books[i];
        isFound = true;
        break;
     }
  }

  res.send({
    status: isFound ? 'success' : 'failure',
    message: isFound ? 'Book found' : 'Book not found',
    book: newBook
  })

});

//Delete book by isbn
app.post('/book/:isbn', (req, res) => {

  const isbn = req.params.isbn;

  
  function isMatches(book){
    if(book.isbn===isbn){
      return false;
    }
    else
    {
      return true;
    }
  }
  
  books = books.filter(isMatches);
  
  res.send({
    status: "success",
    message: `Book deleted successfully ${isbn}`
  })

});

//Get all books
app.get('/book', (req, res) => {
  res.send({
    status: 'success',
    data: books
  });
});

//Update book by isbn
app.post('/update/book/:isbn', (req, res)=>{
  const isbn = req.params.isbn;

  const newBook = {
    isbn: isbn,
    title: req.body.title,
    author: req.body.author,
    price: req.body.price
  }

  let isUpdated = false;

  for(let i=0; i<books.length; i++) {
    if(books[i].isbn===isbn){
      books[i] = newBook;
      isUpdated = true;
      break;
    }
  }

  res.send({
    status: 'success',
    message: isUpdated ? 'Book updated successfully' : 'Book not found',
  })

   
});

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});