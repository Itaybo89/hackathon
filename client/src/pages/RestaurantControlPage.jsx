import React from 'react';

import ClientNavbar from '../components/ClientNavbar';
import RestauranDishesList from '../components/RestauranDishesList';
import AddDish from '../components/AddDish';
import '../css/RestaurantControlPage.css';

const RestaurantControlPage = () => {
    return (<>
        <ClientNavbar />
        <h1>Golden Apple Dashboard</h1>
        <main className="restaurant-control-main">
            <RestauranDishesList />
            <AddDish />
        </main>
    </>);
};

export default RestaurantControlPage;