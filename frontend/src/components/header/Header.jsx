import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../globalState.js";
import { Container, Navbar, Nav } from "react-bootstrap";
import "../header/header.css";
import axios from "axios";

const Header = () => {
    const state = useContext(GlobalState);
    const [isLogged] = state.authAPI.isLogged;
    const [isAdmin] = state.authAPI.isAdmin;

    const handleLogout = async () => {
        try {
            await axios.get("http://localhost:5000/api//users/logout");
            localStorage.removeItem("firstLogin");
            window.location.href = "/";
        } 
        catch (err) {
            window.location.href = "/";
        }
    };

    const loggedRouter = () => {
        return (
            <>
                <Nav.Link>
                    <Link to="/profile" style={{ color: "inherit", textDecoration: "inherit" }}>
                        Profile
                    </Link>
                </Nav.Link>
                <Nav.Link href="/" onClick={handleLogout}>Logout</Nav.Link>
            </>
        );
    };

    return (
        <>
            <Navbar className="color-nav" variant="dark" expand="lg">
                <Container fluid>
                    <Navbar.Brand className="navbar-brand">{isAdmin ? "ADMIN" : "FLIGHT BOOKING SYSTEM"}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse>
                    <Nav className="navbar-nav ms-auto" style={{ height: '100vh !important' }} navbarScroll>
                        <Nav.Link>
                            <Link to="/" style={{ color: "inherit", textDecoration: "inherit" }}>
                                Home
                            </Link>
                        </Nav.Link>
                        {isLogged ? loggedRouter() : 
                        <>
                            <Nav.Link href="/login">Sign in</Nav.Link>
                            <Nav.Link href="/register">Sign up</Nav.Link>
                        </>}
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;