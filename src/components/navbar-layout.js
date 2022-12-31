import React from 'react';
import {Container, Nav, Navbar, Offcanvas} from "react-bootstrap";
import {NavLink} from "react-router-dom";

function NavbarLayout(props) {
    return (
        <div>
            <Navbar  bg="white" expand={'md'} className="mb-3 shadow px-5 py-3">
                <Container fluid>
                    <Navbar.Brand href="#" className={"fw-bold"}>E-Commerce System</Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-md`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-md`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                                E-Commerce System
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">

                            <NavLink to="/" className={({isActive}) => isActive ? "nav-link fw-bold" : "nav-link"} >Manage Categories</NavLink>
                                <NavLink to="manage-products" className={({isActive}) => isActive ? "nav-link fw-bold" : "nav-link"}>Manage Products</NavLink>

                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavbarLayout;