import React, { useState, useContext } from "react";
import { GlobalState } from "../../../../../../globalState.js";
import { Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
    name: "",
    townFrom: "",
    townTo: "",
    dateOut: "",
    dateIn: "",
    airlineId: "",
    planeId: ""
}

const CreatingFlightModal = (props) => {
    const state = useContext(GlobalState);
    const [allAirlines] = state.airlinesAPI.allAirlines;
    const [allPlanes] = state.planesAPI.allPlanes;
    const [token] = state.token;
    
    const [data, setData] = useState(initialState);
    const [callback, setCallback] = state.flightsAPI.callback;
    const {name, townFrom, townTo, dateOut, dateIn, airlineId, planeId} = data;

    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]: value});
    }

    const handleAddFlight = async () => {
        try {
            const result = await axios.post("http://localhost:5000/api/flights/create_flight", {
                name,
                townFrom,
                townTo,
                dateOut,
                dateIn, 
                airlineId,
                planeId
            }, {
                headers: {
                    Authorization: token
                }
            });
            toast.success(result.data.message, { 
                position: "top-right",
                autoClose: 15000,
                draggable: true
            });
            setData({...data, name: "", townFrom: "", townTo: "", dateOut: "", dateIn: "", airlineId: "", planeId: ""});
            setCallback(!callback);
            closeModal();
        } 
        catch (error) {
            if (error.response) {
                toast.error(error.response.data.message, { 
                    position: "top-right",
                    autoClose: 15000,
                    draggable: true
                });
            }
        }
    }

    const closeModal = ()=> {
        return props.handleClose();
    }

    return (
        <>
            <Modal centered show={props.show}>
                <Modal.Header closeButton onClick={props.handleClose}>
                    <Modal.Title>Add Flight</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Flight:</Form.Label>
                        <Form.Control type="text" placeholder="Enter name flight" id="name" value={name} name="name" onChange={handleChangeInput} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Departure Location:</Form.Label>
                        <Form.Control type="text" placeholder="Enter departure location" id="townFrom" value={townFrom} name="townFrom" onChange={handleChangeInput} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Arrival Location:</Form.Label>
                        <Form.Control type="text" placeholder="Enter arrival location" id="townTo" value={townTo} name="townTo" onChange={handleChangeInput} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Departure Date/Time:</Form.Label>
                        <Form.Control type="datetime-local" id="dateOut" value={dateOut} name="dateOut" onChange={handleChangeInput} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Arrival Data/Time:</Form.Label>
                        <Form.Control type="datetime-local" id="dateIn" value={dateIn} name="dateIn" onChange={handleChangeInput} />
                    </Form.Group>
                    <Form.Group  className="mb-3">
                        <Form.Select aria-label="Default select example" id="airlineId" value={allAirlines._id} name="airlineId" onChange={handleChangeInput}>
                            <option value="">Please select a airline</option>
                            {allAirlines.map((airline, index) => <option value={airline._id} key={index}>
                                {airline.name}
                            </option>)}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Select aria-label="Default select example" id="planeId" value={allPlanes._id} name="planeId" onChange={handleChangeInput}>
                            <option value="">Please select a plane</option>
                            {allPlanes.map((plane, index) => <option value={plane._id} key={index}>
                                {plane.name} ({plane.countEconomyClass + plane.countBusinessClass} seats)
                            </option>)}
                        </Form.Select>
                    </Form.Group>
                </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleAddFlight}>Add a new flight</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreatingFlightModal;