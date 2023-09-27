import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const RestaurantContext = createContext();

const RestaurantContextProvider = ({ children }) => {
    const [currentRestaurant, setCurrentRestaurant] = useState({});
    const [currentDishes, setCurrentDishes] = useState([]);

    const getRestaurant = () => {
        const mockRestaurant = {
            id: 1,
            name: 'Golden Apple'
        };

        setCurrentRestaurant(mockRestaurant);
    }

    const getDishes = () => {
        const mockDishes = [
            {
                name: 'Fish and Chips',
                allergens: ['fish', 'gluten'],
                checked: true
            },
            {
                name: 'Celery and cranberries salad',
                allergens: ['celery'],
                checked: false
            },
            {
                name: 'Peanut Butter Ice Cream',
                allergens: ['milk', 'peanuts'],
                checked: true
            }
        ]

        setCurrentDishes(mockDishes);
    }

    const addDish = (dishObject) => {

    }

    useEffect(() => {
        getRestaurant();
        getDishes();
    }, []);

    return (
        <RestaurantContext.Provider value={{ currentRestaurant, currentDishes }}>
            {children}
        </RestaurantContext.Provider>
    );
};

export { RestaurantContext };
export default RestaurantContextProvider;