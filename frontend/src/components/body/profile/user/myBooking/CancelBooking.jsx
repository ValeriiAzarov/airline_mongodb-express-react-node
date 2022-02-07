import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Row, Col } from "react-bootstrap";
import { GlobalState } from "../../../../../globalState.js";

const CancelBooking = () => {
    const state = useContext(GlobalState);
    const cancelBooking = state.ticketsAPI.cancelBooking;

    return (
        <>
            {cancelBooking ? <>
                <Container className="mt-5">
                    <Row className="justify-content-md-center">
                        <Col lg={8} md={6} sm={12} className="text-center">
                            <h1>Booking cancelled!</h1>
                            <p>Your payment will be refunded soon.</p>
                            <p>
                                <Button variant="primary">
                                    <Link to="/" style={{ color: "inherit", textDecoration: "inherit" }}>
                                        Book new flight
                                    </Link>
                                </Button>{" "}
                            </p>
                        </Col>
                    </Row>
                </Container>
            </> : <>
                <Container className="mt-5">
                    <Row className="justify-content-md-center">
                        <Col lg={8} md={6} sm={12} className="text-center">
                            <h1>Booking cancellation failed!</h1>
                            <p>Please try again.</p>
                            <p>
                                <Button variant="primary">
                                    <Link to="/profile/my_booking" style={{ color: "inherit", textDecoration: "inherit" }}>
                                        View all bookings
                                    </Link>
                                </Button>{" "}
                            </p>
                        </Col>
                    </Row>
                </Container>
            </>}
        </>
    );
};

export default CancelBooking;
