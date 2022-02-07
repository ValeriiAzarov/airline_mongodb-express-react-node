import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { GlobalState } from "../../../../../globalState.js";
import image from "../../../../../images/status-update.svg";

const initialState = {
    _id: "", surname: "", name: "", email: ""
};

const About = () => {
    const state = useContext(GlobalState);
    const [token] = state.token;
    const [user] = state.authAPI.user;
    const updateUser = state.usersAPI.updateUser;

    const [data, setData] = useState(initialState);

    useEffect(() => {
        setData(user);
    }, [user, token]);

    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]: value});
    }

    const handleUpdate = async () => {
        await updateUser(data);
    }

    return (
        <>
            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col lg={4} md={6} sm={12}>
                        <Form>
                            <h2>About</h2>
                            <Form.Group className="mb-3">
                                <Form.Label>ID:</Form.Label>
                                <Form.Control type="text" id="id" value={data._id} name="id" disabled />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Surname:</Form.Label>
                                <Form.Control type="text" placeholder="Enter your surname" id="surname" value={data.surname} name="surname" onChange={handleChangeInput} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Name:</Form.Label>
                                <Form.Control type="text" placeholder="Enter your name" id="name" value={data.name} name="name" onChange={handleChangeInput} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control type="text" id="email" value={data.email} name="email" disabled />
                            </Form.Group>
                            <Button variant="primary btn-block" onClick={handleUpdate}>
                                Update
                            </Button>
                        </Form>
                    </Col>
                    <Col lg={8} md={6} sm={12}>
                        <img className="d-block mx-auto img-fluid w-75" src={image} alt=""/>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default About;