import React from 'react';

import '../css/MenuItem.css'

const MenuItem = ({ dishName, allergensArray }) => {
    return (
        <div className="dish">
            <div className="dish-name">{dishName}</div>
            <div className="dish-allergens"></div>
            {allergensArray.join(", ")}
        </div>
    );
};

export default MenuItem;