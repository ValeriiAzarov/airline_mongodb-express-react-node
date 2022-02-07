import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../../../../../globalState.js";
import { Modal, Button } from "react-bootstrap";

const RemovingFlightModal = (props) => {
    const state = useContext(GlobalState);
    const deleteFlight = state.flightsAPI.deleteFlight;
    const [callback, setCallback] = state.flightsAPI.callback;
    
    const [data, setData] = useState({});
       
    useEffect(() => {
        if (props.flight) {
            setData(props.flight);
        }
    }, [props.flight]);

    const handleDeleteFlight = async () => {
        await deleteFlight(data);
        setCallback(!callback);
        closeModal();        
    }

    const closeModal = ()=> {
        return props.handleClose();
    }

    return (
        <>
            <Modal centered show={props.show}>
                <Modal.Header closeButton onClick={props.handleClose} >
                    <Modal.Title>Delete Flight</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this flight ID: {data._id}?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleDeleteFlight}>Delete Flight</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default RemovingFlightModal;