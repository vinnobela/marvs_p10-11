import React from 'react';
import './Brands.css';  // Import the brands CSS

function Brands() {
    // Sample data for brands
    const brandsData = [
        {
            id: 1,
            name: 'Honda',
            description: ' "HOW we Move you. The Power of Dreams"',
            rating: 4.5,
            image: 'honda.jpg'
        },
        {
            id: 2,
            name: 'Suzuki',
            description: '"products of superior value"',
            rating: 4.7,
            image: 'suzuki.jpg'
        },
        {
            id: 3,
            name: 'Kawasaki',
            description: '"Let the Good Times Roll"',
            rating: 4.2,
            image: 'kawasaki.jpg'
        },
        {
            id: 4,
            name: 'Yamaha',
            description: '"Revs your Heart"',
            rating: 4.9,
            image: 'yamaha.jpg'
        }
    ];

    return (
        <div className="brands-container">
            <h1>Top Brands</h1>
            <div className="brand-list">
                {brandsData.map((brand) => (
                    <div key={brand.id} className="brand-item">
                        <img src={brand.image} alt={brand.name} />
                        <h3>{brand.name}</h3>
                        <p>{brand.description}</p>
                        <div className="rating">
                            {'★'.repeat(Math.floor(brand.rating))} {/* Whole stars */}
                            {brand.rating % 1 !== 0 && '☆'} {/* Add partial star if rating is fractional */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Brands;
