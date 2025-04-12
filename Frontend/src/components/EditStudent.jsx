import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/students/${id}`);
        setStudent(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const updatedStudent = {
        name: student.name,
        class: student.class,
      };

      await axios.put(`http://localhost:3001/students/${id}`, updatedStudent);

      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  if (!student) return <div>Loading...</div>;

  return (
    <>
      <h2>Edit Student</h2>
      <form>
        <table cellPadding={10} style={{ backgroundColor: "white", marginTop: 10, borderRadius: 20 }}>
          <tbody>
            <tr>
              <td><label htmlFor="name">Name:</label></td>
              <td><input type="text" name="name" value={student.name} onChange={handleChange} /></td>
            </tr>
            <tr>
              <td><label htmlFor="class">Class:</label></td>
              <td><input type="text" name="class" value={student.class} onChange={handleChange} /></td>
            </tr>
            <tr>
              <td colSpan="2">
                <button type="button" onClick={handleSave} style={{ marginTop: 30 }}>Save</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  );
};

export default EditStudent;
