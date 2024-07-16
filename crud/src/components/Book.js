import React from 'react';


const Book = ({ book, onDelete, onEdit }) => (
  <div>
    <h3>{book.name}</h3>
    <img src={book.img} alt={book.name} />
    <p>{book.summary}</p>
    <button onClick={() => onEdit(book._id)}>Edit</button>
    <button onClick={() => onDelete(book._id)}>Delete</button>
  </div>
);

export default Book;
