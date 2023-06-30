import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import logo from '../images/football.png';
import './header.css';

function Header() {
    return (
        <Navbar bg="black" expand="lg">
            <Navbar.Brand href="#home"><img src={logo} style={{ width: 50 }}></img></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link className="underline-text" style={{ color: 'white' }} as={Link} to="/">Home</Nav.Link>
                    <Nav.Link className="underline-text" style={{ color: 'white' }} as={Link} to="/about">About</Nav.Link>
                    <Nav.Link className="underline-text" style={{ color: 'white' }} href="#services">Services</Nav.Link>
                    {/* Altre voci del menu */}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;