import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../../../../../globalState.js";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import moment from "moment";

const EditingFlightModal = (props) => {
    const state = useContext(GlobalState);
    const updateFlight = state.flightsAPI.updateFlight;
    const [callback, setCallback] = state.flightsAPI.callback;

    const [data, setData] = useState({});    

    useEffect(() => {
        if (props.flight) {
            setData(props.flight);
        }
    }, [props.flight]);

    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]: value});
    }

    const changeFlight = async () => {
        await updateFlight(data, {
            name: data.name,
            townFrom: data.townFrom,
            townTo: data.townTo,
            dateOut: data.dateOut,
            dateIn: data.dateIn, 
            airline: data.airline,
            price: data.price,
            count: data.count
        });
        setCallback(!callback);
        closeModal();
    }

    const closeModal = ()=> {
        return props.handleClose();
    }

    return (
        <>
            <Modal centered show={props.show}>
                <Modal.Header closeButton onClick={props.handleClose}>
                    <Modal.Title>Edit Flight</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Flight:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter name flight" id="name" value={data.name} name="name" onChange={handleChangeInput} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Departure Location:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter departure location" id="townFrom" value={data.townFrom} name="townFrom" onChange={handleChangeInput} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Arrival Location:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter arrival location" id="townTo" value={data.townTo} name="townTo" onChange={handleChangeInput} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Price:</Form.Label>
                                    <Form.Control type="number" step={0.01} placeholder="Enter price" id="price" value={data.price} name="price" onChange={handleChangeInput} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Departure Date/Time:</Form.Label>
                                    <Form.Control type="datetime-local" id="dateOut" value={moment(data.dateOut).format('YYYY-MM-DDTHH:mm')} name="dateOut" onChange={handleChangeInput} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Arrival Data/Time:</Form.Label>
                                    <Form.Control type="datetime-local" id="dateIn" value={moment(data.dateIn).format('YYYY-MM-DDTHH:mm')} name="dateIn" onChange={handleChangeInput} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Airline:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter airline" id="airline" value={data.airline} name="airline" onChange={handleChangeInput} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Seats:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter seats" id="count" value={data.count} name="count" onChange={handleChangeInput} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={changeFlight}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditingFlightModal;