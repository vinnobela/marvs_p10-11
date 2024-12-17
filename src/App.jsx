import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import axios from 'axios';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";


import Login from './Login';
import Dashboard from './Dashboard';
import Sales from './Sales';
import Stores from './Stores';
import Brands from './Brands';
import Cart from './Cart';
import Logbook from './Logbook';

function App() {
  
  return (
    <>
    
    <Router>
      <Row>
        <Col md= {12}>
        <Routes>
        <Route path="/" element= {<Login />}/>
          <Route path="/login" element= {<Login />}/>
          <Route path="/dashboard" element= {<Dashboard />}/>
          <Route path="/sales" element={<Sales />} />
                <Route path="/stores" element={<Stores />} />
                <Route path="/brands" element={<Brands />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/logbook" element={<Logbook />} />
        </Routes>
        </Col>
        </Row>
        </Router>
        </>
  )
}

export default App;
