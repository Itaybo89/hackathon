import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import '../css/DishCard.css';

const DishCard = ({ title, allergens, checked }) => {
    const [isChecked, setIsChecked] = useState(checked);

    return (
        <Card className={!isChecked && "greyed"}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <div className="dish-allergens">
                    {allergens.join(', ')}
                </div>
                <Form.Check type="switch" id="custom-switch" label="On menu" checked={isChecked} onChange={e => setIsChecked(!isChecked)} />
            </Card.Body>
        </Card>
    );
};

export default DishCard;