import React from 'react';
import './Stores.css';  // Import the stores CSS

function Stores() {
    // Sample data for stores (replace with actual store data)
    const storeItems = [
        {
            id: 1,
            name: 'MCP',
            location: 'Cebu City, Philippines',
            image: 'wag.jpg'
        },
        {
            id: 2,
            name: 'Harley-Davidson',
            location: 'New Work',
            image: 'boo.jpg'
        },
        {
            id: 3,
            name: 'Royal Infield',
            location: 'UK',
            image: 'rot.jpg'
        },
        {
            id: 4,
            name: 'MotoWorld',
            location: 'Spain',
            image: 'rat.jpeg'
        }
    ];

    return (
        <div className="stores-container">
            <h1>Top Stores</h1>
            <div className="store-list">
                {storeItems.map((store) => (
                    <div key={store.id} className="store-item">
                        <img src={store.image} alt={store.name} />
                        <h3>{store.name}</h3>
                        <p>Location: {store.location}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Stores;
