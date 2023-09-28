import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import '../css/AddDish.css';

const AddDish = ({ onAddDish }) => { 
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
        onAddDish(addDishFormHolder); 
        setAddDishFormHolder({ dishName: '', ingredients: '', mayContain: '' }); // Reset the form
    };

    return (
        <div className="add-dish">
            <h2>Add a Dish</h2>
            <Form onSubmit={handleAddButton}>
                <Form.Group className="mb-3">
                    <Form.Label>Dish name:</Form.Label>
                    <Form.Control 
                        type="text"
                        name="dishName" 
                        value={addDishFormHolder.dishName}
                        onChange={handleFormFields} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Ingredients:</Form.Label>
                    <Form.Control 
                        as="textarea"
                        name="ingredients" 
                        rows={3}
                        value={addDishFormHolder.ingredients}
                        onChange={handleFormFields} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Might contain:</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        name="mightContain"
                        rows={2}
                        value={addDishFormHolder.mightContain}
                        onChange={handleFormFields} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Comments:</Form.Label>
                    <Form.Control 
                        as="textarea"
                        name="comments" 
                        rows={3}
                        value={addDishFormHolder.comments}
                        onChange={handleFormFields} />
                </Form.Group>
                
                <Button type="submit">Add</Button>
            </Form>
        </div>
    );
};

export default AddDish;
