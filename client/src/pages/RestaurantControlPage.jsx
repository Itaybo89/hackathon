import { useState, useContext } from 'react';
import axios from 'axios';
import QRCode from "react-qr-code";

import { RestaurantContext } from '../contexts/RestaurantContext';
import ClientNavbar from '../components/ClientNavbar';
import RestauranDishesList from '../components/RestauranDishesList';
import AddDish from '../components/AddDish';
import '../css/RestaurantControlPage.css';

const RestaurantControlPage = () => {
    const { currentRestaurant, currentDishes } = useContext(RestaurantContext);

    const handleAddDish = async (newDish) => {
        try {
            const response = await axios.post('http://localhost:8080/providers/adddish', {
                ...newDish,
                restaurantId: currentRestaurant.id
            });
            
            if (response.data.success) {
                console.log("Dish added successfully");
            }
        } catch (error) {
            console.error("Error Details:", error);
        }
    };

    return (
        <>
            <ClientNavbar />
            <div className="top-part">
                <h1>{currentRestaurant.name} Dashboard</h1>
                <QRCode value={`www.scaneat.com/client-page/${currentRestaurant.id}`} />
            </div>
            <main className="restaurant-control-main">
                <RestauranDishesList dishes={currentDishes} />
                {/* Passing handleAddDish as a prop to AddDish component */}
                <AddDish onAddDish={handleAddDish} />
            </main>
        </>
    );
};

export default RestaurantControlPage;
