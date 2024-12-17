import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link from react-router-dom
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './Dashboard.css'; // Import custom CSS for Sidebar styles
import { jwtDecode } from 'jwt-decode';

function Dashboard() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Fetch and decode the JWT token to get user details
    useEffect(() => {
        const fetchDecodedUserID = () => {
          try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token not found');
            const decodedToken = jwtDecode(token);
            setUser(decodedToken);
          } catch (error) {
            console.error('Failed to verify session:', error);
            navigate('/');
          }
        };
        fetchDecodedUserID();
      }, [navigate]);

    // Logout handler to clear the token and navigate to the login page
    const handleLogout = async () => {
        try {
            localStorage.removeItem('token');
            navigate("/login");
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    // Function to render individual cards with image
    const renderCard = (title, text, items, imageSrc) => (
        <Card style={{ width: '60rem' }} className="dashboard-card">
            <Card.Img variant="top" src={imageSrc} alt={`${title} image`} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{text}</Card.Text>
            </Card.Body>
            {items && items.length > 0 && (
                <ListGroup className="list-group-flush">
                    {items.map((item, index) => (
                        <ListGroup.Item key={index}>{item}</ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </Card>
    );

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <div className="sidebar">
                <h2>Motor Vault</h2>
                <ul className="sidebar-links">
                    <li>
                        <Link to="/sales" className="sidebar-link">Top Sales Motor</Link> {/* Navigation link */}
                    </li>
                    <li>
                        <Link to="/stores" className="sidebar-link">Top Stores Motor</Link>
                    </li>
                    <li>
                        <Link to="/brands" className="sidebar-link">Top Brands Motor</Link>
                    </li>
                    <li>
                        <Link to="/cart" className="sidebar-link">Cart</Link>
                    </li>
                    <li>
                        <Link to="/logbook" className="sidebar-link">Logbook</Link>
                    </li>
                </ul>
                <div className="user-section">
                    <p>{user ? `User: ${user.username}` : 'Guest'}</p>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
            </div>

            {/* Main Content */}
            <div className="content">
                <div className="cards-container">
                    {/* Pass null or empty arrays for the items */}
                    {renderCard('', '', [], 'all.jpg')}
                 
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
