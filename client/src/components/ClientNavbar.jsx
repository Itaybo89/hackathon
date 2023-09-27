import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { FaUserCircle } from 'react-icons/fa';

import '../css/ClientNavbar.css'

const ClientNavbar = () => {
    return (
        <Container className="navbar-container">
            <Navbar>
                <Navbar.Brand>AppName</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <FaUserCircle style={{ color: 'white' }} />
                </Navbar.Collapse>
            </Navbar>
        </Container>
    );
};

export default ClientNavbar;