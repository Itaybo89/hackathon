import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

import { AuthContext } from '../contexts/AuthContext';
import ClientNavbar from '../components/ClientNavbar';
import '../css/SignupPage.css';

const SignupPage = () => {
    const navigate = useNavigate();

    const { addUser } = useContext(AuthContext);;

    const [signupFormHolder, setSignupFormHolder] = useState({
        userName: '',
        email: '',
        password: '',
        allergens: []
    });

    const handleSignupFields = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            // Update the selected allergens based on checkbox state
            if (checked) {
                setSignupFormHolder(prevState => ({
                    ...prevState,
                    allergens: [...prevState.allergens, value]
                }));
            } else {
                setSignupFormHolder(prevState => ({
                    ...prevState,
                    allergens: prevState.allergens.filter(item => item !== value)
                }));
            }
        } else {
            setSignupFormHolder({ ...signupFormHolder, [name]: value });
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        await addUser(signupFormHolder);
        navigate('/login');
    }

    return (<>
        <ClientNavbar />
        <main>
            <h2>Sign Up</h2>
            <div className="explanation">Please fill you details:</div>
            <div className="form-wrapper">
                <Form className="login-form"
                    onSubmit={handleSignup}>

                    <FloatingLabel label="User name" className="mb-3">
                        <Form.Control name="username" type="text" placeholder=" "
                            value={signupFormHolder.firstName}
                            onChange={handleSignupFields}
                        />
                    </FloatingLabel>

                    <FloatingLabel label="Email" className="mb-3">
                        <Form.Control name="email" type="email" placeholder=" "
                            value={signupFormHolder.email}
                            onChange={handleSignupFields}
                        />
                    </FloatingLabel>

                    <FloatingLabel label="Password" className="mb-3">
                        <Form.Control name="password" type="password" placeholder=" "
                            value={signupFormHolder.password}
                            onChange={handleSignupFields}
                        />
                    </FloatingLabel>

                    <FloatingLabel label="Confirm password" className="mb-3">
                        <Form.Control name="rePassword" type="password" placeholder=" "
                        />
                    </FloatingLabel>

                    <Form.Group className="mb-3">
                        <Form.Label>Mark the foods you are allergic to:</Form.Label>
                        <div className="allergens-checkboxes">
                            {[
                                { value: '1', label: 'Gluten' },
                                { value: '6', label: 'Milk' },
                                { value: '4', label: 'Fish' },
                                { value: '3', label: 'Eggs' },
                                { value: '10', label: 'Peanuts' },
                                { value: '9', label: 'Nuts' },
                                { value: '13', label: 'Soya' },
                                { value: '0', label: 'Celery' },
                                { value: '2', label: 'Crustaceans' },
                                { value: '12', label: 'Sulphur dioxide' },
                                { value: '11', label: 'Sesame seeds' },
                                { value: '8', label: 'Mustard' },
                                { value: '7', label: 'Molluscs' },
                                { value: '5', label: 'Lupin' }
                            ].map(allergen => (
                                <Form.Check
                                    key={allergen.value}
                                    id={`allergen-${allergen.value}`}
                                    value={allergen.value}
                                    label={allergen.label}
                                    name="allergens"
                                    type="checkbox"
                                    checked={signupFormHolder.allergens.includes(allergen.value)}
                                    onChange={handleSignupFields}
                                />
                            ))}
                        </div>
                    </Form.Group>


                    <Button type="submit" variant="info">Sign up</Button>
                </Form>
            </div>
        </main>
    </>);
};

export default SignupPage;