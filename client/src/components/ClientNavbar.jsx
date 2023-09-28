import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { FaUserCircle } from 'react-icons/fa';

import '../css/ClientNavbar.css'

const ClientNavbar = () => {
    return (

        <Navbar bg="info" data-bs-theme="info">
            <Container >
                <Navbar.Brand>ScanEat</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <FaUserCircle style={{ color: 'white' }} />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default ClientNavbar;