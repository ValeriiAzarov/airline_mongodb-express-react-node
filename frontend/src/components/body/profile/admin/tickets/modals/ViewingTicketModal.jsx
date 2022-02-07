import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../../../../globalState.js";
import { Modal, Form, Row, Col, Button, Spinner } from "react-bootstrap";
import notification from "../../../../../utils/notification/Notification.jsx";
import moment from "moment";

const ViewingTicketModal = (props) => {
    const state = useContext(GlobalState);
    const cancelBooking = state.ticketsAPI.cancelBooking;
    const [callback, setCallback] = state.ticketsAPI.callback;

    const [loadingCancel, setLoadingCancel] = useState(false);
    
    const [user, setUser] = useState({});
    const [ticket, setTicket] = useState({});
    const [flight, setFlight] = useState({});

    useEffect(() => {
        if (props.ticket) {
            setUser(props.ticket.user);
            setTicket(props.ticket);
            setFlight(props.ticket.flight);
        }
    }, [props.ticket]);

    const deleteTicket = async () => {
        setLoadingCancel(true);
        await cancelBooking(ticket._id);
        setLoadingCancel(false);
        notification("success", "Ticket deleted successfully.");
        setCallback(!callback);
        closeModal(); 
    }

    const closeModal = ()=> {
        return props.handleClose();
    }

    return (
        <>
          <Modal size="lg"  centered show={props.show}>
                <Modal.Header closeButton onClick={props.handleClose}>
                    <Modal.Title>Information about Ticket</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Row>
                            <Col>
                                <h3>Ticket</h3>
                                <Form.Group className="mb-1">
                                    <Form.Label>ID: {ticket._id}</Form.Label> 
                                </Form.Group>
                                <Form.Group className="mb-1">
                                    <Form.Label>PNR: {ticket.ticketId}</Form.Label> 
                                </Form.Group>
                                <Form.Group className="mb-1">
                                    <Form.Label>Departure Location: {flight.townFrom}</Form.Label> 
                                </Form.Group>
                                <Form.Group className="mb-1">
                                    <Form.Label>Arrival Location: {flight.townTo}</Form.Label>
                                </Form.Group>
                                <Form.Group className="mb-1">
                                    <Form.Label>Departure Date/Time: {moment(flight.dateOut).format('YYYY-MM-DD HH:MM')}</Form.Label>
                                </Form.Group>
                                <Form.Group className="mb-1">
                                    <Form.Label>Arrival Data/Time: {moment(flight.dateIn).format('YYYY-MM-DD HH:MM')}</Form.Label>
                                </Form.Group>
                                <Form.Group className="mb-1">
                                    <Form.Label>Airline: {flight.airline}</Form.Label>
                                </Form.Group>
                                <Form.Group className="mb-1">
                                    <Form.Label>Price: {flight.price} €</Form.Label>
                                </Form.Group>
                                <Form.Group className="mb-1">
                                    <Form.Label>Created: {moment(flight.createdAt).format('YYYY-MM-DD HH:MM:SS')}</Form.Label>
                                </Form.Group>
                                <Form.Group className="mb-1">
                                    <Form.Label>Updated: {moment(flight.updatedAt).format('YYYY-MM-DD HH:MM:SS')}</Form.Label>
                                </Form.Group>
                            </Col>
                            <Col>
                                <h3>Passport</h3>
                                <Form.Group className="mb-1">
                                    <Form.Label>ID: {user._id}</Form.Label> 
                                </Form.Group>
                                <Form.Group className="mb-1">
                                    <Form.Label>Passport ID: {user.passportID}</Form.Label> 
                                </Form.Group>
                                <Form.Group className="mb-1">
                                    <Form.Label>Passport validity: {moment(user.passportValidity).format('YYYY-MM-DD')}</Form.Label> 
                                </Form.Group>
                                <Form.Group className="mb-1">
                                    <Form.Label>Surname: {user.surname}</Form.Label> 
                                </Form.Group>
                                <Form.Group className="mb-1">
                                    <Form.Label>Name: {user.name}</Form.Label> 
                                </Form.Group>
                                <Form.Group className="mb-1">
                                    <Form.Label>Sex: {user.sex}</Form.Label> 
                                </Form.Group>
                                <Form.Group className="mb-1">
                                    <Form.Label>Birthdate: {moment(user.birthdate).format('YYYY-MM-DD')}</Form.Label> 
                                </Form.Group>
                                <Form.Group className="mb-1">
                                    <Form.Label>Address: {user.address}</Form.Label> 
                                </Form.Group>                               
                                <Form.Group className="mb-1">
                                    <Form.Label>Email: {user.email}</Form.Label>
                                </Form.Group>
                                <Form.Group className="mb-1">
                                    <Form.Label>Phone: {user.phone}</Form.Label>
                                </Form.Group>
                                <Form.Group className="mb-1">
                                    <Form.Label>Created: {moment(user.createdAt).format('YYYY-MM-DD HH:MM:SS')}</Form.Label>
                                </Form.Group>
                                <Form.Group className="mb-1">
                                    <Form.Label>Updated: {moment(user.updatedAt).format('YYYY-MM-DD HH:MM:SS')}</Form.Label>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form> 
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>Close</Button>
                    <Button variant="primary" onClick={deleteTicket}>
                        {loadingCancel ? (
                            <Spinner animation="border" size="sm" />
                        ) : null}
                        Cancel booking
                    </Button>
                </Modal.Footer>
            </Modal>  
        </>
    );
}

export default ViewingTicketModal;