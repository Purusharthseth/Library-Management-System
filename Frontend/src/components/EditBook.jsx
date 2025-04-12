import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    name: '',
    author: '',
    publication: '',
    year: ''
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching the book:', error);
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/books/${id}`, book);
      navigate('/booklist');
    } catch (error) {
      console.error('Error updating the book:', error);
    }
  };

  return (
    <div>
      <h2>Edit Book</h2>
      <form onSubmit={handleSubmit}>
        <table style={{borderRadius: 20}}>
          <tbody>
            <tr>
              <td><label htmlFor="name">Name</label></td>
              <td>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={book.name}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td><label htmlFor="author">Author</label></td>
              <td>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={book.author}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td><label htmlFor="publication">Publication</label></td>
              <td>
                <input
                  type="text"
                  id="publication"
                  name="publication"
                  value={book.publication}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td><label htmlFor="year">Year</label></td>
              <td>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={book.year}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <button type="submit">Save</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default EditBook;
