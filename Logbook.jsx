import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from 'axios';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import { API_ENDPOINT } from './Api';

function Logbook() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [passwords, setPasswords] = useState("");
  const [validationError, setValidationError] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [fullnames, setFullnames] = useState("");
  const [usernames, setUsernames] = useState("");
  const [passwordx, setPasswordx] = useState("");
  const [validationError2, setValidationError2] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDecodeUserID = async () => {
      try {
        const tokenData = JSON.parse(localStorage.getItem('token'));
        if (!tokenData) throw new Error('No token');
        const decodedToken = jwtDecode(tokenData.token);
        setUser(decodedToken);
      } catch (error) {
        navigate("/login");
      }
    };
    fetchDecodeUserID();
  }, [navigate]);

  const headers = {
    accept: 'application/json',
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))?.token}`,
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${API_ENDPOINT}/user`, { headers });
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  };

  const deleteUser = async (id) => {
    const isConfirm = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'blue',
      cancelButtonColor: 'red',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => result.isConfirmed);

    if (!isConfirm) return;

    try {
      await axios.delete(`${API_ENDPOINT}/user/${id}`, { headers });
      Swal.fire({ icon: 'success', text: 'Successfully Deleted' });
      fetchUsers();
    } catch (error) {
      Swal.fire({ text: error.response?.data?.message || 'Error deleting user', icon: 'error' });
    }
  };

  const createUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API_ENDPOINT}/user`, { fullname, username, passwords }, { headers });
      Swal.fire({ icon: 'success', text: data.message });
      fetchUsers();
      setShow(false);
    } catch (error) {
      if (error.response?.status === 422) {
        setValidationError(error.response.data.errors);
      } else {
        Swal.fire({ text: error.response?.data?.message || 'Error creating user', icon: 'error' });
      }
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${API_ENDPOINT}/user/${selectedUserId}`,
        { fullname: fullnames, username: usernames, passwords: passwordx },
        { headers }
      );
      Swal.fire({ icon: 'success', text: data.message });
      fetchUsers();
      setShow2(false);
    } catch (error) {
      if (error.response?.status === 422) {
        setValidationError2(error.response.data.errors);
      } else {
        Swal.fire({ text: error.response?.data?.message || 'Error updating user', icon: 'error' });
      }
    }
  };

  return (
    <>
      <Navbar className='custom-navbar'>
        <Container>
          <Navbar.Brand as={Link} to="/dashboard">The Book Nook</Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link as={Link} to="/fantasy">Fantasy</Nav.Link>
            <Nav.Link as={Link} to="/horror">Horror</Nav.Link>
            <Nav.Link as={Link} to="/romance">Romance</Nav.Link>
            <Nav.Link as={Link} to="/scifi">Science Fiction</Nav.Link>
          </Nav>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/logbook">The Logbook</Nav.Link>
              <NavDropdown title={user ? user.username : 'Dropdown'} id="basic-nav-dropdown" align="end">
                <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                <NavDropdown.Item href="#">Settings</NavDropdown.Item>
                <NavDropdown.Item href="#" onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Rest of your JSX */}
    </>
  );
}

export default Logbook;
