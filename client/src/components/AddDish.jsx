import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

import '../css/AddDish.css';

const AddDish = () => {
    const [addDishFormHolder, setAddDishFormHolder] = useState({
        dishName: '',
        ingredients: '',
        mightContain: '',
        comments: ''
    });

    const handleFormFields = (e) => {
        const { name, value } = e.target;
        setAddDishFormHolder({ ...addDishFormHolder, [name]: value });
    };

    const handleAddButton = (e) => {
        e.preventDefault();
    }

    return (
        <div className="add-dish">
            <h2>Add a Dish</h2>
            <Form onSubmit={handleAddButton}>
                <Form.Group className="mb-3">
                    <Form.Label>Dish name:</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Ingredients:</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Might contain:</Form.Label>
                    <Form.Control as="textarea" rows={2} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Comments:</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <Button type="submit">Add</Button>
            </Form>
        </div>
    );
};

export default AddDish;