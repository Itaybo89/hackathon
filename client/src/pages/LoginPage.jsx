import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { AuthContext } from '../contexts/AuthContext';
import ClientNavbar from '../components/ClientNavbar';
import '../css/LoginPage.css';

const LoginPage = () => {
    const [loginFormHolder, setLoginFormHolder] = useState({
        email: '',
        password: ''
    });

    const { verifyUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLoginFields = (e) => {
        const { name, value } = e.target;
        setLoginFormHolder({ ...loginFormHolder, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const userInfo = {
            email: loginFormHolder.email,
            password: loginFormHolder.password,
        };
        const res = await verifyUser(userInfo);
        console.log(res);
        if (res) {
            navigate('/client-page/1');
        }
        else {
            console.log('something went wrong');
        }
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