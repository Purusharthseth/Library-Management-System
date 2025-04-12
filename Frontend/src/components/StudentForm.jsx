import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentForm = () => {
  const [name, setName] = useState('');
  const [class1, setClass1] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object with the form data
    const studentData = {
      name: name,
      class: class1,
    };

    try {
      // Send a POST request with the student data as JSON
      await axios.post('http://localhost:3001/students', studentData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setSuccessMessage('Student created successfully!');
      setErrorMessage('');
      navigate('/');
    } catch (error) {
      setErrorMessage('Error creating student: ' + error.message);
      setSuccessMessage('');
    }
  };

  const handleCancel = () => {
    setName('');
    setClass1('');
    setSuccessMessage('');
    setErrorMessage('');
    navigate('/');
  };

  return (
    <>
      <h2>Enter Student Details</h2>
      <form onSubmit={handleSubmit}>
        <table align="center" cellPadding={10} style={{ backgroundColor: "#f5f5f5", marginTop: 10, borderRadius: 20 }}>
          <tbody>
            <tr>
              <td><label htmlFor="name">Name:</label></td>
              <td><input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} /></td>
            </tr>
            <tr>
              <td><label htmlFor="class">Class:</label></td>
              <td><input type="text" id="class" value={class1} onChange={(e) => setClass1(e.target.value)} /></td>
            </tr>
            <tr>
              <td colSpan="2">
                {successMessage && <p className="success">{successMessage}</p>}
                {errorMessage && <p className="error">{errorMessage}</p>}
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <button type="submit" style={{ marginTop: 30 }}>Submit</button>
                <button type="button" style={{ marginTop: 30, marginLeft: 10 }} onClick={handleCancel}>Cancel</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  );
};

export default StudentForm;
