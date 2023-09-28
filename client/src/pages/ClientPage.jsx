import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

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

    const getAllData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/providers/restaurant/${restaurantid}`, { withCredentials: true });
            console.log(response.data);
            setDishesArr(response.data);
        } catch (err) {

        }
    };

    useEffect(() => {
        if (!loggedinUser) {
            navigate('/login');
        }
        getAllData();
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