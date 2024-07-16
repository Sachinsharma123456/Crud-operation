import React, { useState, useEffect } from 'react';
import { createBook, updateBook, getBook } from '../api';
import './Style.css';

const BookForm = ({ bookId, fetchBooks, setEditing }) => {
  const [book, setBook] = useState({ name: '', img: '', summary: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (bookId) {
      getBook(bookId)
        .then((response) => setBook(response.data))
        .catch((error) => {
          setError(error);
          console.error('Error fetching book:', error);
        });
    }
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (bookId) {
        await updateBook(bookId, book);
      } else {
        await createBook(book);
      }
      fetchBooks();
      setEditing(false);
    } catch (error) {
      setError(error);
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className='container'>
      {error && <div style={{ color: 'red' }}>Error: {error.message}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={book.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="img">Image URL</label>
          <input
            type="text"
            id="img"
            name="img"
            value={book.img}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="summary">Summary</label>
          <textarea
            id="summary"
            name="summary"
            value={book.summary}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default BookForm;
