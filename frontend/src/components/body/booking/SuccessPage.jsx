import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Row, Col } from "react-bootstrap";
import { GlobalState } from "../../../globalState.js";
import imageSuccess from "../../../images/done.svg";
import imageBorder from "../../../images/bored.svg";

const SuccessPage = () => {
    const state = useContext(GlobalState);
    const [ticket] = state.ticketsAPI.ticket;

    return (
        <>
            <Container className="mt-5">
                {ticket.hasOwnProperty("_id") ? <>
                    <Row className="justify-content-md-center">
                        <Col lg={8} md={6} sm={12} className="text-center">
                            <h1>Booking successful!</h1>
                            <p>Your ticket number is {ticket.ticketId}.</p>
                            <p>
                            <Button variant="primary">
                                <Link to="/profile/my_booking" style={{ color: "inherit", textDecoration: "inherit" }}>
                                    View all tickets
                                </Link>
                            </Button>
                            </p>
                            <img className="d-block mx-auto img-fluid w-50" src={imageSuccess} alt=""/>
                        </Col>
                    </Row>
                </> : <>
                    <Row className="justify-content-md-center">
                        <Col lg={8} md={6} sm={12} className="text-center">
                            <h2>We are sorry,</h2>
                            <p>but booking failed! Please try again...</p>
                            <Button variant="primary">
                                <Link to="/" style={{ color: "inherit", textDecoration: "inherit" }}>
                                    Search Flight
                                </Link>
                            </Button>
                            <img className="d-block mx-auto img-fluid w-75" src={imageBorder} alt=""/>
                        </Col>
                    </Row>
                </>}
            </Container>
        </>
    );
}

export default SuccessPage;