const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');

let books = [];

const app = express();

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/book', (req, res) => {
  
  const newBook = req.body;
  books.push(newBook);

  res.send({
    status: 'success',
    message: 'Book added successfully',
    data: newBook
  });
});

app.get('/book', (req, res) => {
  res.send({
    status: 'success',
    data: books
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});