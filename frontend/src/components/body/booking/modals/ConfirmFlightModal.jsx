import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { GlobalState } from "../../../../globalState.js";
import { Modal, Card, Button } from "react-bootstrap";
import moment from "moment";

const ConfirmFlightModal = (props) => {
    const history = useHistory();

    const state = useContext(GlobalState);
    const [userDetail] = state.userDetailsAPI.userDetail;
    const [flight] = state.flightsAPI.flight;

    const confirmFlight = () => {
        history.push("/payments");
    }

    return (
        <>
            <Modal size="lg" centered show={props.show} >
                <Modal.Header closeButton onClick={props.handleClose}>
                    <Modal.Title>Review Details</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Card style={{ marginBottom: "2rem" }}>
                        <Card.Header>Flight Details</Card.Header>
                        <Card.Body>
                            <Card.Subtitle className="mb-2 text-muted">{flight.airline}</Card.Subtitle>
                            <Card.Text>
                                Flight №{flight.name}<br/>
                                From: {flight.townFrom}<br/>
                                To: {flight.townTo}<br/>
                                Price: {flight.price} €<br />
                                Date: {moment(flight.dateOut).format('YYYY-MM-DD HH:mm')}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{ marginBottom: "2rem" }}>
                        <Card.Header>User Details</Card.Header>
                        <Card.Body>
                            <Card.Title>
                                {userDetail.surname}{" "}
                                {userDetail.name}{" "}
                            </Card.Title>
                            <Card.Text>
                                Birthdate:{" "}
                                {moment(userDetail.birthdate).format('YYYY-MM-DD')}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={confirmFlight}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ConfirmFlightModal;