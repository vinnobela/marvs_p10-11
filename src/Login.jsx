// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// import "bootstrap/dist/css/bootstrap.css";
// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';
// import Form from 'react-bootstrap/Form';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Button from 'react-bootstrap/Button';

// import { API_ENDPOINT } from './Api';

// function Login() {
//   const navigate = useNavigate();

//   /* Verify if user in session in localStorage */
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = JSON.parse(localStorage.getItem('token'))
//         setUser(response.data);

//         navigate("/dashboard");
        
//       } catch (error) {
//         navigate('/login');
//       }
//     };

//     fetchUser();
//   }, []);

//   /* Performs login method */
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const [error, setError] = useState('');
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(`${API_ENDPOINT}/auth/login`, {
//         username,
//         password: password,
//       });

//       // Assuming the response contains the token in response.data.token
//       localStorage.setItem("token", JSON.stringify(response));
//       setError(''); // Clear any previous errors
//       navigate("/dashboard"); // Redirect to dashboard

//     } catch (error) {
//       // Handle errors and display message
//       setError('Invalid username or password');
//     }
//   };

//   return (
//     <>
//       <Navbar style={{ backgroundColor: '#CACACA' }} data-bs-theme="light">
//   <Container>
//     <Navbar.Brand href="#home">THE MOTOR VAULT</Navbar.Brand>
//   </Container>
// </Navbar>

//       <br /><br /><br /><br /><br /><br />

//       <Container>
//         <Row className="justify-content-md-center">
//           <Col md={5}>
//             <div className="login-form">
//               <div className="container">
//                 <div className="login-logo">
//                   {/* <img src={logo} width={'38%'} alt="Logo" /> */}
//                 </div>
//                 <center>Sing in</center>&nbsp;

//                 <div className="card">
//                   <div className="card-body login-card-body">
//                     <Form onSubmit={handleSubmit}>
//                       <Form.Group controlId="formusername">
//                         <Form.Label>username:</Form.Label>
//                         <Form.Control
//                           className="form-control-sm rounded-0"
//                           type="text"
//                           placeholder="Enter username"
//                           value={username}
//                           onChange={(e) => setUsername(e.target.value)}
//                           required
//                         />
//                       </Form.Group><br />

//                       <Form.Group controlId="formpassword">
//                         <Form.Label>Password:</Form.Label>
//                         <Form.Control
//                           className="form-control-sm rounded-0"
//                           type="passwords"
//                           placeholder="Enter Password"
//                           value={password}
//                           onChange={(e) => setPassword(e.target.value)}
//                           required
//                         />
//                       </Form.Group><br />

//                       <Form.Group controlId="formButton">
//                         {error && <p style={{ color: 'red' }}>{error}</p>}
//                         <Button
                          
//                           variant="primary"
//                           className="btn btn-block bg-custom btn-flat rounded-0"
//                           size="sm"
//                           block="block"
//                           type="submit"
//                           style={{ backgroundColor: '#CACACA', borderColor: '#CACACA' }} // Updated to chocolate color
//                         >
                        
//                           Login &nbsp;
//                         </Button>
//                       </Form.Group>
//                     </Form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// }

// export default Login;



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import "bootstrap/dist/css/bootstrap.css";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { API_ENDPOINT } from './Api';

function Login() {
  const navigate = useNavigate();

  /* Verify if user in session in localStorage */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = JSON.parse(localStorage.getItem('token'))
        setUser(response.data);

        navigate("/dashboard");
        
      } catch (error) {
        navigate('/login');
      }
    };

    fetchUser();
  }, []);

  /* Performs login method */
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_ENDPOINT}/auth/login`, {
        username,
        password: password,
      });

      // Assuming the response contains the token in response.data.token
      localStorage.setItem("token", JSON.stringify(response));
      setError(''); // Clear any previous errors
      navigate("/dashboard"); // Redirect to dashboard

    } catch (error) {
      // Handle errors and display message
      setError('Invalid username or password');
    }
  };

  return (
    <>
      <Navbar style={{ backgroundColor: '#CACACA' }} data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">THE MOTOR VAULT</Navbar.Brand>
        </Container>
      </Navbar>
  
      <div
        style={{
          backgroundImage: 'url("back.jpg")',
          backgroundSize: 'cover',
          minHeight: '100vh',
        }}
      >
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
  
        <Container>
          <Row className="justify-content-md-center">
            <Col md={5}>
              <div className="login-form">
                <div className="container">
                  <div className="login-logo">
                    {/* <img src={logo} width={'38%'} alt="Logo" /> */}
                  </div>
                  <center>Sign in</center>&nbsp;
  
                  <div
                    className="card"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent white
                      backdropFilter: 'blur(1px)', // Adds a blur effect
                      borderRadius: '10px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Optional shadow for depth
                    }}
                  >
                    <div className="card-body login-card-body">
                      <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formusername">
                          <Form.Label>Username:</Form.Label>
                          <Form.Control
                            className="form-control-sm rounded-0"
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                          />
                        </Form.Group>
                        <br />
  
                        <Form.Group controlId="formpassword">
                          <Form.Label>Password:</Form.Label>
                          <Form.Control
                            className="form-control-sm rounded-0"
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </Form.Group>
                        <br />
  
                        <Form.Group controlId="formButton">
                          {error && <p style={{ color: 'red' }}>{error}</p>}
                          <Button
                            variant="primary"
                            className="btn btn-block bg-custom btn-flat rounded-0"
                            size="sm"
                            block="block"
                            type="submit"
                            style={{
                              backgroundColor: '#CACACA',
                              borderColor: '#CACACA',
                            }} // Updated to chocolate color
                          >
                            Login &nbsp;
                          </Button>
                        </Form.Group>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}  

export default Login;

