import React from 'react';
import { useNavigate } from "react-router-dom";

import '../css/ClientPage.css';
import ClientNavbar from '../components/ClientNavbar';
import MenuItem from '../components/MenuItem';

const ClientPage = () => {
    const navigate = useNavigate();

    return (<>
        <ClientNavbar />

        <main>

            <p className="restaurant-line">Welcome to <span className="restaurant-name">Golden Apple</span></p>

            <hr />
            <div className="explanation">Dishes you should avoid, based on your personal allergens:</div>

            <MenuItem dishName={'Fish and Chips'} allergensArray={['fish', 'gluten']} />
            <MenuItem dishName={'Celery and Cranberries Salad'} allergensArray={['celery']} />
            <MenuItem dishName={'Peanut Butter Ice Cream'} allergensArray={['peanuts', 'milk']} />

            <hr />
        </main>
    </>
    );
};

export default ClientPage;