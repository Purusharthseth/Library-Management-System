import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const LibraryList = () => {
  const [libraryRecords, setLibraryRecords] = useState([]);
  const navigate = useNavigate();

  const fetchLibraryRecords = async () => {
    try {
      const response = await axios.get('http://localhost:3001/library');
      setLibraryRecords(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLibraryRecords();
  }, []);

  const handleEdit = (record) => {
    navigate('/editlibrary', { state: { record } });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/library/${id}`);
      setLibraryRecords(libraryRecords.filter(record => record.id !== id));
    } catch (error) {
      console.error('Failed to delete record:', error);
    }
  };

  return (
    <>
      <Link to="/libraryform" style={{marginLeft:810, fontSize:22, color:"#FFD700"}}><i class="fa-solid fa-book-open-reader"></i> Add Library Records</Link>
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Book Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {libraryRecords.map(record => (
            <tr key={record.id}>
              <td>{record.student.name}</td>
              <td>{record.book.name}</td>
              <td>{new Date(record.startDate).toLocaleDateString()}</td>
              <td>{new Date(record.endDate).toLocaleDateString()}</td>
              <td>
                <i
                  className="fa-solid fa-pen-to-square"
                  onClick={() => handleEdit(record)}
                  style={{ color: 'blue', fontSize: 25, marginRight: 10 }}
                ></i>
              </td>
              <td>
                <i
                  className="fa-solid fa-trash"
                  onClick={() => handleDelete(record.id)}
                  style={{ color: '#ff0000', fontSize: 25 }}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default LibraryList;
