import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Breadcrumb, Card, Table, Button } from "react-bootstrap";
import { GlobalState } from "../../../globalState.js";
import CreatingUserDetailsModal from "../profile/user/passport/modals/CreatingUserDetailsModal.jsx";
import formatDuration from "../../utils/formatDuration/FormatDuration.js";
import image from "../../../images/bored.svg";
import imagePlane from "../../../images/plane.svg";
import moment from "moment";
import ConfirmFlightModal from "./modals/ConfirmFlightModal.jsx";

const Booking = () => {
    const state = useContext(GlobalState);
    const [userDetails] = state.userDetailsAPI.userDetails;
    const storeUserDetail = state.userDetailsAPI.storeUserDetail;
    const [flight] = state.flightsAPI.flight;
    
    const [showModalAdding, setShowModalAdding] = useState(false);
    const [showModalConfirm, setShowModalConfirm] = useState(false);

    const toggleModalAdding = () => {
        setShowModalAdding(!showModalAdding);
    }

    const toggleModalConfirm = (id) => {
        storeUserDetail(id);
        setShowModalConfirm(!showModalConfirm);
    }

    return (
        <>
            <Container className="mt-3">
                <Breadcrumb>
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Search Flight</Breadcrumb.Item>
                    <Breadcrumb.Item active>User Details</Breadcrumb.Item>
                </Breadcrumb>
                {flight.hasOwnProperty("_id") ? <>
                    <Row className="justify-content-md-center">
                        <Col lg={7} md={5} sm={12}>
                            <h2>Book Flight</h2>
                            <Card style={{ width: "100%", marginBottom: "1em" }}>
                                <Card.Header >Flight: {flight.name}</Card.Header>
                                <Card.Body>
                                    <Card.Subtitle className="mb-2 text-muted">{flight.airline}</Card.Subtitle>
                                    <table style={{ width: "130%", tableLayout: "fixed" }}>
                                        <tbody>                       
                                            <tr>
                                                <td style={{ width: "15%", fontSize: "1.2rem" }}>{moment(flight.dateOut).format('HH:mm')}</td>
                                                <td style={{ width: "35%", textAlign: "center" }}>{formatDuration(flight.dateIn, flight.dateOut)}</td>
                                                <td style={{ width: "15%", fontSize: "1.2rem" }}>{moment(flight.dateIn).format('HH:mm')}</td>
                                                <td style={{ fontSize: "1.2rem" }}>{flight.price} €</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: "15%" }}>{flight.townFrom}</td>
                                                <td style={{ width: "35%", textAlign: "center" }}><img src={imagePlane} alt=""/></td>
                                                <td style={{ width: "15%" }}>{flight.townTo}</td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                </table>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={5} md={6} sm={12}>
                            <h2>Book Flight for</h2>
                            {userDetails.length > 0 ? (<>
                                <Table bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Full Name</th>
                                            <th>Birthdate</th>
                                            <th>Book</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userDetails.map((user, key) => (
                                        <tr key={user._id}>
                                            <td>{user.surname + " " + user.name}</td>
                                            <td>{moment(user.birthdate).format('YYYY-MM-DD')}</td>
                                            <td>
                                                <Button variant="primary" onClick={() => toggleModalConfirm(user._id)}>
                                                    Book
                                                </Button>
                                            </td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <Button variant="primary" onClick={() => toggleModalAdding()}>
                                    Add Other User
                                </Button>
                            </>
                            ) : <>
                                <p>You need to fill in your passport details.<br/>Passport information required when booking a flight.</p> 
                                <Button variant="primary btn-block" onClick={() => toggleModalAdding()}>
                                    Apply Passport
                                </Button>
                            </>}
                        </Col>
                    </Row>
                </> : <>
                    <Row className="justify-content-md-center">
                        <Col lg={8} md={6} sm={12} className="text-center">
                            <h2>We are sorry,</h2>
                            <p>but you have not selected any flight to book.</p>
                            <img className="w-75" src={image} alt=""/>
                        </Col>
                    </Row>
                </>}
                <CreatingUserDetailsModal show={showModalAdding} handleClose={toggleModalAdding}/>
                <ConfirmFlightModal show={showModalConfirm} handleClose={toggleModalConfirm}/>
            </Container>
        </>
    );
}

export default Booking;