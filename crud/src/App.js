// src/App.js
import React from 'react';
import BookList from './components/BookList';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 className='mt-5'>CRUD </h1>
      <BookList />
    </div>
  );
}

export default App;
