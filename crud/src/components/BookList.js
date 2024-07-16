import React, { useState, useEffect } from 'react';
import { getBooks, deleteBook } from '../api';
import Book from './Book';
import BookForm from './BookForm';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentBookId, setCurrentBookId] = useState(null);

  const fetchBooks = () => {
    getBooks().then((response) => setBooks(response.data)).catch((error) => {
      console.error('Error fetching books:', error);
    });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = (id) => {
    deleteBook(id).then(() => fetchBooks()).catch((error) => {
      console.error('Error deleting book:', error);
    });
  };

  const handleEdit = (id) => {
    setCurrentBookId(id);
    setEditing(true);
  };

  return (
    <div className="container d-flex flex-column align-items-center mt-2">
      {editing ? (
        <BookForm bookId={currentBookId} fetchBooks={fetchBooks} setEditing={setEditing} />
      ) : (
        <div className="w-100">
          
          
          <table className="table table-bordered text-center">
            <thead className="bg-success text-white bg-success">
              <tr>
                <th className="bg-secondary text-align-center">Name</th>
                <th className="bg-secondary">Image</th>
                <th className="bg-secondary">Summary</th>
                <th className="bg-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td>{book.name}</td>
                  <td>
                    <img
                      src={book.img}
                      alt={book.name}
                      style={{ width: '50px', height: '50px' }}
                    />
                  </td>
                  <td>{book.summary}</td>
                  <td>
                    <button className="btn btn-success m-1" onClick={() => handleEdit(book._id)}>
                      Edit
                    </button>
                    <button className="btn btn-danger m-1" onClick={() => handleDelete(book._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-primary" onClick={() => setEditing(true)}>Add Book</button>
        </div>
      )}
    </div>
  );
};

export default BookList;
