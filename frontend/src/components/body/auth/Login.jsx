import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import notification from "../../utils/notification/Notification.jsx";
import image from "../../../images/airport.svg";
import axios from "axios";

const initialState = {
    email: "",
    password: ""
}

const Login = () => {
    const [user, setUser] = useState(initialState);
    const {email, password} = user;

    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/users/login", {
                email,
                password
            });
            localStorage.setItem('firstLogin', true);
            window.location.href = "/";
        } 
        catch (error) {
            if (error.response) {
                notification("error", error.response.data.message);
            }
        }
    }

    return (
        <>
            <Container className="mt-5">
                <Row className="justify-content-md-center">
                    <Col lg={4} md={6} sm={12} className="mt-5 p-3">
                        <Form onSubmit={handleSubmit}>
                            <h2>Login</h2>
                            <Form.Group className="mb-3">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control type="text" placeholder="Enter email" id="email" value={email} name="email" onChange={handleChangeInput} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control type="password" placeholder="Enter password" id="password" value={password} name="password" onChange={handleChangeInput} />
                            </Form.Group>
                            <Button variant="primary btn-block" type="submit">
                                LOGIN
                            </Button>
                        </Form>
                        <p>New Account? <Link to="/register">Register</Link> | <Link to="/forgot_password">Forgot password?</Link></p>
                    </Col>
                    <Col lg={8} md={6} sm={12}>
                        <img className="w-100" src={image} alt=""/>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Login;