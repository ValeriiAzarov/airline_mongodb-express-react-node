import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import image from "../../../images/fingerprint.svg";

const AccessDenied = () => {
    return (
        <Container className="mt-3">
            <Row className="justify-content-md-center">
                <Col lg={8} md={6} sm={12} className="text-center">
                    <h2>Admin resources access denied.</h2>
                    <img className="w-100" src={image} alt=""/>
                </Col>
            </Row>
        </Container>
    );
};

export default AccessDenied;