import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card, Spinner } from "react-bootstrap";
import { GlobalState } from "../../../../../globalState.js";
import formatDuration from "../../../../utils/formatDuration/FormatDuration.js";
import imagePlane from "../../../../../images/plane.svg";
import imageBorder from "../../../../../images/bored.svg";
import moment from "moment";
import CancelBookingModal from "./modals/CancelBookingModal.jsx";

const MyBooking = () => {
    const state = useContext(GlobalState);
    const [userDetails] = state.userDetailsAPI.userDetails;
    const getBookings = state.ticketsAPI.getBookings;
    const sendBooking = state.ticketsAPI.sendBooking;

    const [tickets, setTickets] = useState([]);
    const [loadingDownload, setLoadingDownload] = useState(false);
    const [showModalConfirm, setShowModalConfirm] = useState(false);

    const toggleModalConfirm = () => {
        setShowModalConfirm(!showModalConfirm);
    }

    useEffect(() => {
        loadTickets();
    }, []);

    const loadTickets = async () => {
        for (var i = 0; i < userDetails.length; i++) {
            const newBookings = await getBookings(userDetails[i]._id);
            setTickets(tickets => tickets.concat(newBookings));
        }
    }

    const createAndDownloadPdf = async (booking) => {
        setLoadingDownload(true);
        await sendBooking(booking);
        setLoadingDownload(false);
    }

    const cancelBooking = (booking) => {
        toggleModalConfirm();
    }
    
    return (
        <>
            <Container>
                {tickets.length > 0 ? <>    
                    <h2>My Bookings</h2> 
                    {tickets.map((booking) => (
                        <>
                            <Card key={booking._id} style={{ marginBottom: "2rem" }}>
                                <Card.Header>{booking.ticketId}</Card.Header>
                                <Card.Body>
                                    <Card.Title>
                                        {booking.user.surname + " " + booking.user.name}
                                    </Card.Title>
                                    <table style={{ width: "100%", tableLayout: "fixed" }}>
                                        <tbody>                       
                                            <tr>
                                                <td style={{ width: "10%", fontSize: "1.2rem" }}>{moment(booking.flight.dateOut).format('HH:mm')}</td>
                                                <td style={{ width: "35%", textAlign: "center" }}>{formatDuration(booking.flight.dateIn, booking.flight.dateOut)}</td>
                                                <td style={{ width: "20%", fontSize: "1.2rem" }}>{moment(booking.flight.dateIn).format('HH:mm')}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: "10%" }}>{booking.flight.townFrom}</td>
                                                <td style={{ width: "35%", textAlign: "center" }}><img src={imagePlane} alt=""/></td>
                                                <td style={{ width: "20%" }}>{booking.flight.townTo}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <Button variant="primary" style={{ marginRight: "2rem" }} onClick={() => createAndDownloadPdf(booking)}>
                                        {loadingDownload ? <Spinner animation="border" size="sm" /> : null} Download
                                    </Button>    
                                    <Button variant="secondary" onClick={() => cancelBooking(booking)}>
                                        Cancel booking
                                    </Button> 
                                </Card.Body>
                            </Card>
                            <CancelBookingModal show={showModalConfirm} handleClose={toggleModalConfirm} booking={booking} />
                        </>
                    ))}
                </> : <>
                    <Row>
                        <Col className="text-center">
                            <h2>We are sorry,</h2>
                            <p>but you have not booked any flight or you accidentally refreshed the page.</p>
                            <Button variant="primary">
                                <Link to="/" style={{ color: "inherit", textDecoration: "inherit" }}>
                                    Search Flight
                                </Link>
                            </Button>
                            <img className="d-block mx-auto img-fluid w-50" src={imageBorder} alt=""/>
                        </Col>
                    </Row>
                </>}
            </Container>
        </>
    );
};

export default MyBooking;