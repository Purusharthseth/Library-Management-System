import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleEdit = (book) => {
    navigate(`/edit-book/${book.id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/books/${id}`);
      setBooks(books.filter(book => book.id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <>
    <Link to="/bookform" style={{marginLeft:850, fontSize:22, color:"#FFD700"}}><i class="fa-solid fa-book"></i> Add Book Details</Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Publication</th>
            <th>Year</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.name}</td>
              <td>{book.author}</td>
              <td>{book.publication}</td>
              <td>{book.year}</td>
              <td>
                <i 
                  className="fa-solid fa-pen-to-square" 
                  onClick={() => handleEdit(book)} 
                  style={{ color: 'blue',fontSize:25,marginRight:10 }}
                ></i>
              </td>
              <td>
                <i 
                  className="fa-solid fa-trash" 
                  onClick={() => handleDelete(book.id)} 
                  style={{ color: '#ff0000', fontSize:25 }}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    
    </>
  );
};

export default BookList;
