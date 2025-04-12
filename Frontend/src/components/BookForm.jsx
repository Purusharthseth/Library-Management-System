import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';

const BookForm = () => {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [publication, setPublication] = useState('');
  const [year, setYear] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedYear = year ? year.getFullYear() : '';
    try {
      await axios.post('http://localhost:3001/books', { name, author, publication, year: selectedYear });
      setSuccessMessage('Book created successfully!');
      setErrorMessage('');
      navigate('/booklist');
    } catch (error) {
      setErrorMessage('Error creating book: ' + error.message);
      setSuccessMessage('');
    }
  };

  const handleCancel = () => {
    setName('');
    setAuthor('');
    setPublication('');
    setYear(null);
    setSuccessMessage('');
    setErrorMessage('');
    navigate('/booklist');
  };

  return (
    <>
    <h2>Enter Book Details</h2>
      <form onSubmit={handleSubmit}>
        <table align="center" cellPadding={10} style={{ backgroundColor: "#f5f5f5",marginTop:10, borderRadius: 20 }}>
          <tbody>
            <tr>
              <td><label htmlFor="name">Name:</label></td>
              <td><input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required /></td>
            </tr>
            <tr>
              <td><label htmlFor="author">Author:</label></td>
              <td><input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} required /></td>
            </tr>
            <tr>
              <td><label htmlFor="publication">Publication:</label></td>
              <td><input type="text" id="publication" value={publication} onChange={(e) => setPublication(e.target.value)} required /></td>
            </tr>
            <tr>
              <td><label htmlFor="year">Year:</label></td>
              <td>
                <DatePicker
                  selected={year}
                  onChange={(date) => setYear(date)}
                  showYearPicker
                  dateFormat="yyyy"
                  placeholderText="Select year"
                  required
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                {successMessage && <p className="success">{successMessage}</p>}
                {errorMessage && <p className="error">{errorMessage}</p>}
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <button type="submit" style={{marginTop:30}}>Save</button>
                <button type="button" style={{marginTop:30, marginLeft:10}} onClick={handleCancel}>Cancel</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  );
};

export default BookForm;
