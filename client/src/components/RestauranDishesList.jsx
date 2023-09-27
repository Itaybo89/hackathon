import React from 'react';

import DishCard from './DishCard';
import '../css/RestauranDishesList.css';

const RestauranDishesList = () => {
    return (<div className="dishes-list">
        <h2>Restaurant's Dishes</h2>
        <DishCard title={'Fish and Chips'} allergens={['fish', 'gluten']} checked={true} />
    </div>);
};

export default RestauranDishesList;