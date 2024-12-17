import React from 'react';
import './Cart.css';  // Import the cart CSS

function Cart() {
    // Sample data for cart items (replace with actual cart data from your application)
    const cartItems = [
        {
            id: 1,
            name: 'Honda',
            price: 99.99,
            image: 'cart.jpg'
        },
    ];

    // Calculate the total price dynamically based on the cart items
    const total = cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);

    return (
        <div className="cart-container">
            <h1>Your Cart</h1>
            <p>Here are the items in your cart:</p>
            <div className="cart-items">
                {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.name} />
                        <div className="cart-item-info">
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                        </div>
                        <div className="price">${item.price.toFixed(2)}</div>
                    </div>
                ))}
            </div>
            <div className="cart-footer">
                <div className="total">Total: ${total}</div>
                <button>Proceed to Checkout</button>
            </div>
        </div>
    );
}

export default Cart;
