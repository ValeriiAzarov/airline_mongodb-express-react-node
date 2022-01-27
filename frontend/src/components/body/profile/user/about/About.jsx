import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { GlobalState } from "../../../../../globalState.js";
import { toast } from "react-toastify";
import axios from "axios";
import image from "../../../../../images/status-update.svg";

const initialState = {
    _id: "",
    surname: "",
    name: "",
    email: ""
};

const About = () => {
    const state = useContext(GlobalState);
    const [user] = state.authAPI.user;
    const [token] = state.token;

    const [data, setData] = useState(initialState);

    useEffect(() => {
        setData(user);
    }, [user, token]);

    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]: value});
    }

    const handleUpdate = async () => {
        try {
            const result = await axios.patch(`http://localhost:5000/api/users/${data._id}`, {
                surname: data.surname,
                name: data.name
            }, {
                headers: {
                    Authorization: token
                }
            });
            toast.success(result.data.message, { 
                position: "top-right",
                autoClose: 15000,
                draggable: true
            });
        } 
        catch (error) {
            if (error.response) {
                toast.error(error.response.data.message, { 
                    position: "top-right",
                    autoClose: 15000,
                    draggable: true
                });
            }
        }
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
                    <Col lg={8} md={6} sm={12} className="text-center">
                        <img className="w-75" src={image} alt=""/>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default About;