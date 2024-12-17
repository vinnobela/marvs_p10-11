import React from 'react';
import './Sales.css';  // Import the sales CSS

function Sales() {
    // Sample data for sales items (replace with actual sales data)
    const salesItems = [
        {
            id: 1,
            name: 'Kawasaki',
            price: 99.99,
            image: 'kawa.jpg'
        },
        {
            id: 2,
            name: 'Suzuki',
            price: 99.99,
            image: 'bad.jpg'
        },
    ];

    return (
        <div className="sales-container">
            <h1>Top Sales</h1>
            <div className="sales-list">
                {salesItems.map((item) => (
                    <div key={item.id} className="sales-item">
                        <img src={item.image} alt={item.name} />
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <div className="price">${item.price.toFixed(2)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Sales;
