import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, Breadcrumb, Row, Col } from "react-bootstrap";
import { GlobalState } from "../../../globalState.js";
import PaypalButton from "../booking/payPal/PaypalButton.jsx";
import notification from "../../utils/notification/Notification.jsx";
import image from "../../../images/bored.svg";
import imagePay from "../../../images/payday.svg";

const Payments = () => {
    const history = useHistory();

    const state = useContext(GlobalState);
    const [userDetail] = state.userDetailsAPI.userDetail;
    const [flight] = state.flightsAPI.flight;
    const bookFlight = state.ticketsAPI.bookFlight;

    const transactionSuccess = async(payment) => {
        await bookFlight(userDetail._id, flight._id);
        history.push("/success_page");
    }

    const transactionCancel = async() => {
        notification("warn", "The payment was cancelled.");
    }

    const transactionError = async() => {
        notification("error", "The payment was declined or failed.");
    }

    return (
        <>
            <Container className="mt-3">
                <Breadcrumb>
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Search Flights</Breadcrumb.Item>
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/booking" }}>User Details</Breadcrumb.Item>
                    <Breadcrumb.Item active>Payment</Breadcrumb.Item>
                </Breadcrumb>
                {flight.hasOwnProperty("_id") ? <>
                    <Row className="justify-content-md-center">
                        <Col lg={4} md={5} sm={12}>
                            <h2>Payment</h2>
                            <h5>You need to pay {flight.price} € for the air ticket.</h5>
                            <p>Make secure online purchases around the world with the PayPal payment service.</p>
                            <p style={{color: "crimson"}}> * Otherwise, the ticket will not be printed.</p>
                            <PaypalButton 
                                total={flight.price}
                                transactionSuccess={transactionSuccess}
                                transactionCancel={transactionCancel}
                                transactionError={transactionError}
                            />
                        </Col>
                        <Col lg={8} md={6} sm={12}>
                            <img className="d-block mx-auto img-fluid w-100" src={imagePay} alt=""/>
                        </Col>
                    </Row>
                </> : <>
                    <Row className="justify-content-md-center">
                        <Col lg={8} md={6} sm={12} className="text-center">
                            <h2>We are sorry,</h2>
                            <p>but you accidentally refreshed the page.</p>
                            <img className="w-75" src={image} alt=""/>
                        </Col>
                    </Row>
                </>}
            </Container>
        </>
    );
}

export default Payments;
