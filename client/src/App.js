import './App.css';

import Home from './Home/Home';
import AddBook from './AddBook/AddBook';

import {BrowserRouter, Routes, Route, Link}  from 'react-router-dom';

function App() {
  return (
   <>

<BrowserRouter>

   <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Book Info</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/addbook">Add Book</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/searchbook">Search Book</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
    
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/addbook" element={<AddBook/>} />
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
