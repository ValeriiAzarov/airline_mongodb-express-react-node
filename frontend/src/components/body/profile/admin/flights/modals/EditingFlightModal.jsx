import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../../../../../globalState.js";
import { Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import moment from "moment";
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

const EditingFlightModal = (props) => {
    const state = useContext(GlobalState);
    const [allAirlines] = state.airlinesAPI.allAirlines;
    const [allPlanes] = state.planesAPI.allPlanes;
    const [token] = state.token;

    const [data, setData] = useState(initialState);
    const [callback, setCallback] = state.flightsAPI.callback;
    const {name, townFrom, townTo, dateOut, dateIn, airlineId, planeId} = data;

    useEffect(() => {
        if (props.flight) {
            setData(props.flight);
        }
    }, [props.flight, token, callback]);

    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]: value});
    }

    const updateFlight = async () => {
        try {
            const result = await axios.patch(`http://localhost:5000/api/flights/${props.flight._id}`, {
                name: name,
                townFrom: townFrom,
                townTo: townTo,
                dateOut: dateOut,
                dateIn: dateIn, 
                airlineId: airlineId,
                planeId: planeId
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
                    <Modal.Title>Edit flight</Modal.Title>
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
                            <Form.Control type="datetime-local" id="dateOut" value={moment(dateOut).format('YYYY-MM-DDTHH:mm')} name="dateOut" onChange={handleChangeInput} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Arrival Data/Time:</Form.Label>
                            <Form.Control type="datetime-local" id="dateIn" value={moment(dateIn).format('YYYY-MM-DDTHH:mm')} name="dateIn" onChange={handleChangeInput} />
                        </Form.Group>
                        <Form.Group  className="mb-3">
                            <Form.Select aria-label="Default select example" id="airlineId" value={data.airlineId} name="airlineId" onChange={handleChangeInput}>
                                <option value="">Please select a airline</option>
                                {allAirlines.map((airline, index) => <option value={airline._id} key={index}>
                                    {airline.name}
                                </option>)}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Select aria-label="Default select example" id="planeId" value={data.planeId} name="planeId" onChange={handleChangeInput}>
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
                    <Button variant="primary" onClick={updateFlight}>Save data</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditingFlightModal;