import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import '../css/ClientPage.css';
import { AuthContext } from '../contexts/AuthContext';
import ClientNavbar from '../components/ClientNavbar';
import MenuItem from '../components/MenuItem';

const ClientPage = () => {
    const { loggedinUser } = useContext(AuthContext);
    const { restaurantid } = useParams();
    const mockDishesArr = [
        {
            name: 'Fish and Chips',
            allergens: ['fish', 'gluten']
        },
        {
            name: 'Celery and Cranberries Salad',
            allergens: ['celery']
        },
        {
            name: 'Peanut Butter Ice Cream',
            allergens: ['peanuts', 'milk']
        }
    ]
    const [dishesArr, setDishesArr] = useState(mockDishesArr);

    const navigate = useNavigate();

    const getAllData = (restaurantid, loggedinUser) => {
        try {

        } catch (err) {

        }
    };

    useEffect(() => {
        if (!loggedinUser) {
            navigate('/login');
        }
    }, []);

    return (<>
        <ClientNavbar />

        <main>

            <p className="restaurant-line">Welcome to <span className="restaurant-name">Golden Apple</span></p>

            <hr />
            <div className="explanation">{loggedinUser.name}, these are the dishes you should avoid, based on your personal allergens:</div>

            {dishesArr.map((dish, i) => <MenuItem dishName={dish.name} allergensArray={dish.allergens} key={i} />)}

            <hr />
        </main>
    </>
    );
};

export default ClientPage;