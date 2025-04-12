import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./StylesTable.css";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:3001/students');
        setStudents(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudents();
  }, []);

  const handleEdit = (student) => {
    navigate(`/edit-student/${student.id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/students/${id}`);
      setStudents(students.filter(student => student.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Link to="/studentform" style={{ marginLeft: 872, fontSize: 22, color: "#FFD700" }}>
        <i className="fa-solid fa-graduation-cap"></i> Add Student Details
      </Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Class</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.class}</td>
              <td>
                <i
                  className="fa-solid fa-pen-to-square"
                  onClick={() => handleEdit(student)}
                  style={{ color: 'blue', fontSize: 35, marginRight: 10 }}
                ></i>
              </td>
              <td>
                <i
                  className="fa-solid fa-trash"
                  onClick={() => handleDelete(student.id)}
                  style={{ color: '#ff0000', fontSize: 35 }}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default StudentList;
