import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from 'axios';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button'
import { jwtDecode } from 'jwt-decode';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {FormControl, Dropdown, DropdownButton, Carousel, ModalHeader } from 'react-bootstrap';
import { API_ENDPOINT } from './Api';

import Swal from 'sweetalert2';

import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';

import './Logbook.css';

function Logbook () {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDecodeUserID = async () => {
            try {
                const response = JSON.parse(localStorage.getItem('token'))
                setUser(response.data);

                const decoded_token = jwtDecode(response.data.token);
                //console.log(decoded_token.tyep_id);
                setUser(decoded_token);
                //console.log(user.type_id);

            } catch (error) {
                navigate("/login")
            }
        };
    
    fetchDecodeUserID();

}, []);

    const handleLogout = async () => {

    try {
        localStorage.removeItem('token');
        navigate("/login");

    } catch (error) {
        console.error('Logout failed', error);
    }
};

/* Fetch Data */

const [users, setUsers] = useState([])

const userdata = JSON.parse(localStorage.getItem('token'));
const token = userdata.data.token;

const headers = {
    accept: 'application/json',
    Authorization: token
}

useEffect(()=>{
    fetchUsers()
    }, [])
    const fetchUsers = async () => {
    await axios.get(`${API_ENDPOINT}/user`, { headers: headers}).then(({data})=>{
    setUsers(data) 
})
    }

/* Delete User */
const deleteUser = async (id) => {
    try {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be undone.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'blue',
            cancelButtonColor: 'red',
            confirmButtonText: 'Yes, Delete',
        }).then((result) => result.isConfirmed);

        if (!isConfirm) return;

        // API call to delete user
        const { data } = await axios.delete(`${API_ENDPOINT}/user/${id}`, { headers });
        Swal.fire({
            icon: 'success',
            text: 'User successfully deleted!',
        });

        // Refresh user list
        fetchUsers();
    } catch (error) {
        const errorMessage = error.response?.data?.message || "An error occurred while deleting the user.";
        Swal.fire({
            text: errorMessage,
            icon: "error",
        });
    }
};


/* Create User */
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const [fullname, setFullname] = useState("")
const [username, setUsername] = useState("")   
const [email, setEmail] = useState("")    
const [password, setPassword] = useState("")
const [validationError, setValidationError] = useState({})
const [age, setAge] = useState("")

const createUser = async (e) => {

    e.preventDefault();

    const formData = new FormData()

    formData.append('fullname', fullname)
    formData.append('username', username) /* Dapat ang mga yaon digdi, same sa database */
    formData.append('email', email)
    formData.append('passwords', password)
    formData.append('age', age)

    await axios.post(`${API_ENDPOINT}/user`, {fullname, username, email, password, age}, {headers: headers}).then(({data})=>{
        Swal.fire({
            icon: 'success',
            text:data.message
        })
        fetchUsers();

    }).catch(({response})=>{
        if(response.status===422){
            setValidationError(response.data.errors)
        }else{
            Swal.fire({
                text:response.data.message,
                icon: 'error'
            })
        }
    })
}

/* Read User */
const [selectedUser, setSelectedUser] = useState(null);
const [show1, setShow1] = useState(false);

const handleClose1 = () => setShow1(false);

const handleShow1 = (row_users) => {
    setSelectedUser(row_users);
    setShow1(true);
};

/* Update User */

const [show2, setShow2] = useState(false);
const handleClose2 = () => setShow2(false);

const [selectedUserId, setSelectedUserId] = useState(null);
const [fullnames, setFullnames] = useState("");
const [usernames, setUsernames] = useState("");
const [ages, setAges] = useState("");
const [passwordx, setPasswordx] = useState("");
const [emails, setEmails] = useState("");
const [validationError2, setValidationError2] = useState({});

const handleShow2 = (users) => {
    setSelectedUserId(users.id);
    setFullnames(users.fullname);           /* Dapat digdi, same sa database */
    setUsernames(users.username);
    setAges(users.ages);
    setEmails(users.email);
    setPasswordx(users.password || '');
    setShow2(true);
};

const updateUser = async (e) => {
    e.preventDefault();
    await axios.put(`${API_ENDPOINT}/user/${selectedUserId}`, 
    { fullname: fullnames, username: usernames, age: ages, email: emails, password: passwordx }, 
    { headers })
        .then(({ data }) => {
            Swal.fire({ icon: 'success', text: data.message });
            fetchUsers();
            setShow2(false);
        })
        .catch(({ response }) => {
            if (response.status === 422) {
                setValidationError2(response.data.errors);
            } else {
                Swal.fire({ text: response.data.message, icon: 'error' });
            }
        });
};

return(
        <>


<Container>
    <Row>
        <Col>
        <center>
        <h1 style={{fontFamily: 'Junge'}}>Repository</h1>
        </center>
        </Col>
    </Row>
</Container>

<br/>

<div className='logbook-container'>

    <div>
        <Button variant="btn btn-primary mb-2 float-end btn-sm me-2" onClick={handleShow}>Create User</Button>
    </div>

    <table className='table'>

        <tbody>
            <tr>
                <td>ID</td>
                <td>Username</td>
                <td>Email</td>
                <td>Fullname</td>
                <td>Age</td>
                <td>Action</td>
            </tr>

            {
            users.length > 0 && (
                users.map((row_users, key) =>(
                    <tr key={row_users.id}>
                        <td>{row_users.id}</td>         
                        <td>{row_users.username}</td>
                        <td>{row_users.email}</td>
                        <td>{row_users.fullname}</td>
                        <td>{row_users.age}</td>
                        <td style={{ textAlign: 'center' }}>
        <Button variant='secondary' size='sm' onClick={()=>handleShow1(row_users)}>Read</Button>&nbsp;
        <Button variant='warning' size='sm' onClick={()=>handleShow2(row_users)}>Update</Button>&nbsp;
        <Button variant="danger" size="sm" onClick={() => deleteUser(row_users.id)}>Delete</Button>
                        </td>
                    </tr>
                ))
            )
        }
        </tbody>

    </table>
</div>


<Modal show={show} onHide={handleClose}>
        <Modal.Header>
            <Modal.Title>Create User</Modal.Title>
        </Modal.Header>

        <Modal.Body>

        <Form onSubmit={createUser}>
            <Row>
                <Col>
                <Form.Group controlId='Fullname'>
                    <Form.Label>Fullname</Form.Label>
                    <Form.Control type='text' value={fullname} onChange={(event)=>{setFullname(event.target.value)}} required/>
                </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                <Form.Group controlId='Username'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type='text' value={username} onChange={(event)=>{setUsername(event.target.value)}} required/>
                </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                <Form.Group controlId='Email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='text' value={email} onChange={(event)=>{setEmail(event.target.value)}} required/>
                </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                <Form.Group controlId='Age'>
                    <Form.Label>Age</Form.Label>
                    <Form.Control type='number' value={age} onChange={(event)=>{setAge(event.target.value)}} required/>
                </Form.Group>
                </Col>
            </Row>


            <Row>
                <Col>
                <Form.Group controlId='Password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='text' value={password} onChange={(event)=>{setPassword(event.target.value)}} required/>
                </Form.Group>
                </Col>
            </Row>

            <Button variant = "primary" className="mt-2" size="sm" block="block" type="submit">Save</Button>

        </Form>
        </Modal.Body>
</Modal>

<Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
            <Modal.Title>Row Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            {selectedUser ? (
                <div>
                    <p><strong>ID:</strong> {selectedUser.id}</p>
                    <p><strong>Fullname:</strong> {selectedUser.fullname}</p>
                    <p><strong>Age:</strong> {selectedUser.age}</p>
                    <p><strong>Username:</strong> {selectedUser.username}</p>
                    <p><strong>Date Joined:</strong> {selectedUser.created_at}</p>
                </div>
            ): (
                <p>No Data Available</p>
            )}
        </Modal.Body>

</Modal>

<Modal show={show2} onHide={handleClose2}>
                <Modal.Header>
                    <Modal.Title>Update User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={updateUser}>
                        <Form.Group controlId='Fullname'>
                            <Form.Label>Fullname</Form.Label>
                            <Form.Control
                                type='text'
                                value={fullnames}
                                onChange={(e) => setFullnames(e.target.value)}
                                isInvalid={!!validationError2.fullname}
                                required
                            />
                            <Form.Control.Feedback type="invalid">{validationError2.fullname}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId='Username'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type='text'
                                value={usernames}
                                onChange={(e) => setUsernames(e.target.value)}
                                isInvalid={!!validationError2.username}
                                required
                            />
                            <Form.Control.Feedback type="invalid">{validationError2.username}</Form.Control.Feedback>
                            
                        </Form.Group>

                        <Form.Group controlId='Age'>
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type='number'
                                value={ages}
                                onChange={(e) => setAges(e.target.value)}
                                isInvalid={!!validationError2.username}
                                required
                            />
                            <Form.Control.Feedback type="invalid">{validationError2.ages}</Form.Control.Feedback>
                            
                        </Form.Group>

                        <Form.Group controlId='Email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='text'
                                value={emails}
                                onChange={(e) => setEmails(e.target.value)}
                                isInvalid={!!validationError2.emails}
                                required
                            />
                            <Form.Control.Feedback type="invalid">{validationError2.fullname}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId='Password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='text'
                                value={passwordx}
                                onChange={(e) => setPasswordx(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" className="mt-2" size="sm" type="submit">Save</Button>
                    </Form>
                </Modal.Body>
            </Modal>


</>
    )
};

export default Logbook;



// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import axios from 'axios';

// import Card from 'react-bootstrap/Card';
// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';
// import Form from 'react-bootstrap/Form';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import Nav from 'react-bootstrap/Nav';
// import Button from 'react-bootstrap/Button';
// import { jwtDecode } from 'jwt-decode';
// import Tab from 'react-bootstrap/Tab';
// import Tabs from 'react-bootstrap/Tabs';
// import {FormControl, Dropdown, DropdownButton, Carousel, ModalHeader } from 'react-bootstrap';
// import { API_ENDPOINT } from './Api';

// import Swal from 'sweetalert2';

// import Modal from 'react-bootstrap/Modal';
// import ModalBody from 'react-bootstrap/ModalBody';
// import ModalFooter from 'react-bootstrap/ModalFooter';

// function Logbook () {

//     const [user, setUser] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchDecodeUserID = async () => {
//             try {
//                 const response = JSON.parse(localStorage.getItem('token'))
//                 setUser(response.data);

//                 const decoded_token = jwtDecode(response.data.token);
//                 setUser(decoded_token);

//             } catch (error) {
//                 navigate("/login")
//             }
//         };
    
//     fetchDecodeUserID();

// }, []);

//     const handleLogout = async () => {

//     try {
//         localStorage.removeItem('token');
//         navigate("/login");

//     } catch (error) {
//         console.error('Logout failed', error);
//     }
// };

// /* Fetch Data */

// const [users, setUsers] = useState([]);
// const userdata = JSON.parse(localStorage.getItem('token'));
// const token = userdata.data.token;

// const headers = {
//     accept: 'application/json',
//     Authorization: token
// }

// useEffect(()=>{
//     fetchUsers()
//     }, [])
//     const fetchUsers = async () => {
//     await axios.get(`${API_ENDPOINT}/user`, { headers: headers}).then(({data})=>{
//     setUsers(data) 
// })
//     }

// /* Delete User */
// const deleteUser = async (id) => {
//     try {
//         const isConfirm = await Swal.fire({
//             title: 'Are you sure?',
//             text: "This action cannot be undone.",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: 'blue',
//             cancelButtonColor: 'red',
//             confirmButtonText: 'Yes, Delete',
//         }).then((result) => result.isConfirmed);

//         if (!isConfirm) return;

//         // API call to delete user
//         const { data } = await axios.delete(`${API_ENDPOINT}/user/${id}`, { headers });
//         Swal.fire({
//             icon: 'success',
//             text: 'User successfully deleted!',
//         });

//         // Refresh user list
//         fetchUsers();
//     } catch (error) {
//         const errorMessage = error.response?.data?.message || "An error occurred while deleting the user.";
//         Swal.fire({
//             text: errorMessage,
//             icon: "error",
//         });
//     }
// };

// /* Create User */
// const [show, setShow] = useState(false);
// const handleClose = () => setShow(false);
// const handleShow = () => setShow(true);

// const [fullname, setFullname] = useState("");
// const [username, setUsername] = useState("");   
// const [email, setEmail] = useState("");    
// const [passwords, setPasswords] = useState("");
// const [age, setAge] = useState("");
// const [validationError, setValidationError] = useState({});

// const createUser = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();

//     formData.append('fullname', fullname);
//     formData.append('username', username);
//     formData.append('email', email);
//     formData.append('passwords', passwords);
//     formData.append('age', age);

//     await axios.post(`${API_ENDPOINT}/user`, {fullname, username, email, passwords, age}, {headers: headers}).then(({data})=>{
//         Swal.fire({
//             icon: 'success',
//             text:data.message
//         });
//         fetchUsers();

//     }).catch(({response})=>{
//         if(response.status===422){
//             setValidationError(response.data.errors);
//         }else{
//             Swal.fire({
//                 text:response.data.message,
//                 icon: 'error'
//             });
//         }
//     });
// }

// /* Read User */
// const [selectedUser, setSelectedUser] = useState(null);
// const [show1, setShow1] = useState(false);

// const handleClose1 = () => setShow1(false);

// const handleShow1 = (row_users) => {
//     setSelectedUser(row_users);
//     setShow1(true);
// };

// /* Update User */

// const [show2, setShow2] = useState(false);
// const handleClose2 = () => setShow2(false);

// const [selectedUserId, setSelectedUserId] = useState(null);
// const [fullnames, setFullnames] = useState("");
// const [usernames, setUsernames] = useState("");
// const [passwordx, setPasswordx] = useState("");
// const [emails, setEmails] = useState("");
// const [ages, setAges] = useState("");
// const [validationError2, setValidationError2] = useState({});

// const handleShow2 = (users) => {
//     setSelectedUserId(users.user_id);
//     setFullnames(users.fullname);           
//     setUsernames(users.username);
//     setEmails(users.email);
//     setPasswordx(users.password || '');
//     setAges(users.age);
//     setShow2(true);
// };

// const updateUser = async (e) => {
//     e.preventDefault();
//     await axios.put(`${API_ENDPOINT}/user/${selectedUserId}`, 
//     { fullname: fullnames, username: usernames, email: emails, passwords: passwordx, age: ages }, 
//     { headers })
//         .then(({ data }) => {
//             Swal.fire({ icon: 'success', text: data.message });
//             fetchUsers();
//             setShow2(false);
//         })
//         .catch(({ response }) => {
//             if (response.status === 422) {
//                 setValidationError2(response.data.errors);
//             } else {
//                 Swal.fire({ text: response.data.message, icon: 'error' });
//             }
//         });
// };

// return(
//         <>


// <Container style={{ backgroundColor: '#6A4E23'}}>
//     <Row>
//         <Col>
//         <center>
//         <h1 style={{fontFamily: 'Junge'}}>Logbooks</h1>
//         </center>
//         </Col>
//     </Row>
// </Container>

// <br/>

// <div className='logbook-container'>

//     <div>
//         <Button variant="btn btn-primary mb-2 float-end btn-sm me-2" onClick={handleShow}>Create User</Button>
//     </div>

//     <table className='table table-bordered'>

//         <tbody>
//             <tr>
//                 <td>ID</td>
//                 <td>Username</td>
//                 <td>Email</td>
//                 <td>Fullname</td>
//                 <td>Age</td>
//                 <td>Action</td>
//             </tr>

//             {
//             users.length > 0 && (
//                 users.map((row_users, key) =>(
//                     <tr key={row_users.user_id}>
//                         <td>{row_users.user_id}</td>         
//                         <td>{row_users.username}</td>
//                         <td>{row_users.email}</td>
//                         <td>{row_users.fullname}</td>
//                         <td>{row_users.age}</td>
//                         <td style={{ textAlign: 'center' }}>





// <Button variant='secondary' size='sm' onClick={()=>handleShow1(row_users)}>Read</Button>
// <Button variant='warning' size='sm' onClick={()=>handleShow2(row_users)}>Update</Button>
// <Button variant="danger" size="sm" onClick={() => deleteUser(row_users.user_id)}>Delete</Button>
//                 </td>
//             </tr>
//         ))
//     )
// }
// </tbody>

// </table>
// </div>


// <Modal show={show} onHide={handleClose}>
// <Modal.Header>
//     <Modal.Title>Create User</Modal.Title>
// </Modal.Header>

// <Modal.Body>

// <Form onSubmit={createUser}>
//     <Row>
//         <Col>
//         <Form.Group controlId='Fullname'>
//             <Form.Label>Fullname</Form.Label>
//             <Form.Control type='text' value={fullname} onChange={(event)=>{setFullname(event.target.value)}} required/>
//         </Form.Group>
//         </Col>
//     </Row>

//     <Row>
//         <Col>
//         <Form.Group controlId='Username'>
//             <Form.Label>Username</Form.Label>
//             <Form.Control type='text' value={username} onChange={(event)=>{setUsername(event.target.value)}} required/>
//         </Form.Group>
//         </Col>
//     </Row>

//     <Row>
//         <Col>
//         <Form.Group controlId='Email'>
//             <Form.Label>Email</Form.Label>
//             <Form.Control type='text' value={email} onChange={(event)=>{setEmail(event.target.value)}} required/>
//         </Form.Group>
//         </Col>
//     </Row>

//     <Row>
//         <Col>
//         <Form.Group controlId='Age'>
//             <Form.Label>Email</Form.Label>
//             <Form.Control type='text' value={age} onChange={(event)=>{setAGE(event.target.value)}} required/>
//         </Form.Group>
//         </Col>
//     </Row>

//     <Row>
//         <Col>
//         <Form.Group controlId='Password'>
//             <Form.Label>Password</Form.Label>
//             <Form.Control type='text' value={passwords} onChange={(event)=>{setPasswords(event.target.value)}} required/>
//         </Form.Group>
//         </Col>
//     </Row>

//     <Button variant = "primary" className="mt-2" size="sm" block="block" type="submit">Save</Button>

// </Form>
// </Modal.Body>
// </Modal>

// <Modal show={show1} onHide={handleClose1}>
// <Modal.Header closeButton>
//     <Modal.Title>Row Details</Modal.Title>
// </Modal.Header>

// <Modal.Body>
//     {selectedUser ? (
//         <div>
//             <p><strong>ID:</strong> {selectedUser.user_id}</p>
//             <p><strong>Fullname:</strong> {selectedUser.fullname}</p>
//             <p><strong>Username:</strong> {selectedUser.username}</p>
//             <p><strong>Date Joined:</strong> {selectedUser.created_at}</p>
//         </div>
//     ): (
//         <p>No Data Available</p>
//     )}

// </Modal.Body>

// </Modal>

// <Modal show={show2} onHide={handleClose2}>
//         <Modal.Header>
//             <Modal.Title>Update User</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//             <Form onSubmit={updateUser}>
//                 <Form.Group controlId='Fullname'>
//                     <Form.Label>Fullname</Form.Label>
//                     <Form.Control
//                         type='text'
//                         value={fullnames}
//                         onChange={(e) => setFullnames(e.target.value)}
//                         isInvalid={!!validationError2.fullname}
//                         required
//                     />
//                     <Form.Control.Feedback type="invalid">{validationError2.fullname}</Form.Control.Feedback>
//                 </Form.Group>
//                 <Form.Group controlId='Username'>
//                     <Form.Label>Username</Form.Label>
//                     <Form.Control
//                         type='text'
//                         value={usernames}
//                         onChange={(e) => setUsernames(e.target.value)}
//                         isInvalid={!!validationError2.username}
//                         required
//                     />
//                     <Form.Control.Feedback type="invalid">{validationError2.username}</Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group controlId='Email'>
//                     <Form.Label>Email</Form.Label>
//                     <Form.Control
//                         type='text'
//                         value={emails}
//                         onChange={(e) => setEmails(e.target.value)}
//                         isInvalid={!!validationError2.emails}
//                         required
//                     />
//                     <Form.Control.Feedback type="invalid">{validationError2.emails}</Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group controlId='Password'>
//                     <Form.Label>Password</Form.Label>
//                     <Form.Control
//                         type='text'
//                         value={passwordx}
//                         onChange={(e) => setPasswordx(e.target.value)}
//                         required
//                     />
//                 </Form.Group>

//                 <Form.Group controlId='Age'>
//                     <Form.Label>Age</Form.Label>
//                     <Form.Control
//                         type='number'
//                         value={age}
//                         onChange={(e) => setAge(e.target.value)}
//                         isInvalid={!!validationError2.age}
//                         required
//                     />
//                     <Form.Control.Feedback type="invalid">{validationError2.age}</Form.Control.Feedback>
//                 </Form.Group>

//                 <Button variant="primary" className="mt-2" size="sm" type="submit">Save</Button>
//             </Form>
//         </Modal.Body>
//     </Modal>


// </>
// )
// };

// export default Logbook;