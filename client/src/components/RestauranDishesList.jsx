import React from 'react';

import DishCard from './DishCard';
import '../css/RestauranDishesList.css';

const RestauranDishesList = ({ dishes }) => {
    return (<div className="dishes-list">
        <h2>Restaurant's Dishes</h2>
        {dishes.map((dish, i) => <DishCard title={dish.name} allergens={dish.allergens} checked={dish.checked} key={i} />)}

        {/* <DishCard title={'Fish and Chips'} allergens={['fish', 'gluten']} checked={true} /> */}
    </div>);
};

export default RestauranDishesList;