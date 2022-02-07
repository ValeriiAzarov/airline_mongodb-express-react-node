import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { GlobalState } from "../../../../../../globalState.js";
import { Modal, Button, Spinner } from "react-bootstrap";

const CancelBookingModal = (props) => {
    const history = useHistory();

    const state = useContext(GlobalState);
    const cancelBooking = state.ticketsAPI.cancelBooking;
    const [loadingCancel, setLoadingCancel] = useState(false);

    const confirmCancel = async () => {
        setLoadingCancel(true);
        await cancelBooking(props.booking._id);
        setLoadingCancel(false);
        history.push("/profile/cancel_booking");
    }

    return (
        <>
            <Modal centered show={props.show} >
                <Modal.Header closeButton onClick={props.handleClose}>
                    <Modal.Title>Cancel Booking</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Are you sure you want to cancel booking?
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={confirmCancel}>
                        {loadingCancel ? (
                            <Spinner animation="border" size="sm" />
                        ) : null}
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CancelBookingModal;