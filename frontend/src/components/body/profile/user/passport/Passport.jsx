import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { GlobalState } from "../../../../../globalState.js";
import image from "../../../../../images/status-update.svg";

const initialState = {
    _id: "",
    userDetails: []
};

const Passport = () => {
    const state = useContext(GlobalState);
    const [user] = state.authAPI.user;
    const [token] = state.token;

    const [data, setData] = useState(initialState);

    useEffect(async () => {
        setData(user);
    }, [user, token]);

    return (
        <>
            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col lg={4} md={6} sm={12}>
                        <Form>
                            <h2>Passport</h2>                
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

export default Passport;