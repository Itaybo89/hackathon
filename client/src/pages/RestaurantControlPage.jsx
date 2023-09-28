import { useState, useContext } from 'react';
import QRCode from "react-qr-code";

import { RestaurantContext } from '../contexts/RestaurantContext';
import ClientNavbar from '../components/ClientNavbar';
import RestauranDishesList from '../components/RestauranDishesList';
import AddDish from '../components/AddDish';
import '../css/RestaurantControlPage.css';

const RestaurantControlPage = () => {
    const { currentRestaurant, currentDishes } = useContext(RestaurantContext);

    return (<>
        <ClientNavbar />
        <div className="top-part">
            <h1>{currentRestaurant.name} Dashboard</h1>
            <QRCode value={`www.scaneat.com/client-page/${currentRestaurant.id}`} />
        </div>
        <main className="restaurant-control-main">
            <RestauranDishesList dishes={currentDishes} />
            <AddDish />
        </main>
    </>);
};

export default RestaurantControlPage;