import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

import ClientNavbar from '../components/ClientNavbar';
import '../css/LoginPage.css';

const LoginPage = () => {
    const [loginFormHolder, setLoginFormHolder] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        rePassword: ''
    });

    const handleLoginFields = (e) => {
        const { name, value } = e.target;
        setLoginFormHolder({ ...loginFormHolder, [name]: value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
    }

    return (<>
        <ClientNavbar />
        <main>
            <p className="restaurant-line">Welcome to <span className="restaurant-name">Golden Apple</span></p>
            <div className="explanation">Log in to see your personalized allergy alerts:</div>

            <div className="form-wrapper">
                <Form className="login-form" onSubmit={handleLogin}>
                    <FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
                        <Form.Control name="email" type="email" placeholder=" "
                            value={loginFormHolder.email}
                            onChange={handleLoginFields}
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                        <Form.Control name="password" type="password" placeholder=" "
                            value={loginFormHolder.password}
                            onChange={handleLoginFields}
                        />
                    </FloatingLabel>
                    <Button type="submit" variant="info">Log In</Button>
                </Form>
                <p>Don't hava a profile yet? <a href="/signup">Sign up</a></p>
            </div>
        </main>
    </>);
};

export default LoginPage;