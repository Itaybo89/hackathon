import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

import ClientNavbar from '../components/ClientNavbar';
import '../css/SignupPage.css';

const SignupPage = () => {
    const [signupFormHolder, setSignupFormHolder] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        rePassword: '',
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

    const handleSignup = (e) => {
        e.preventDefault();

        console.log(signupFormHolder.allergens);
    }

    return (<>
        <ClientNavbar />
        <main>
            <h2>Sign Up</h2>
            <div className="explanation">Please fill you details:</div>
            <div className="form-wrapper">
                <Form className="login-form"
                    onSubmit={handleSignup}>

                    <FloatingLabel label="First name" className="mb-3">
                        <Form.Control name="firstName" type="text" placeholder=" "
                            value={signupFormHolder.firstName}
                            onChange={handleSignupFields}
                        />
                    </FloatingLabel>

                    <FloatingLabel label="Last name" className="mb-3">
                        <Form.Control name="lastName" type="text" placeholder=" "
                            value={signupFormHolder.lastName}
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
                            value={signupFormHolder.rePassword}
                            onChange={handleSignupFields}
                        />
                    </FloatingLabel>

                    <Form.Group className="mb-3">
                        <Form.Label>Mark the foods you are allergic to:</Form.Label>
                        <div className="allergens-checkboxes">
                            {[
                                { value: 'gluten', label: 'Gluten' },
                                { value: 'milk', label: 'Milk' },
                                { value: 'fish', label: 'Fish' },
                                { value: 'eggs', label: 'Eggs' },
                                { value: 'peanuts', label: 'Peanuts' },
                                { value: 'nuts', label: 'Nuts' },
                                { value: 'soya', label: 'Soya' },
                                { value: 'celery', label: 'Celery' },
                                { value: 'crustaceans', label: 'Crustaceans' },
                                { value: 'sulphurDioxide', label: 'Sulphur dioxide' },
                                { value: 'sesameSeeds', label: 'Sesame seeds' },
                                { value: 'mustard', label: 'Mustard' },
                                { value: 'molluscs', label: 'Molluscs' },
                                { value: 'lupin', label: 'Lupin' }
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