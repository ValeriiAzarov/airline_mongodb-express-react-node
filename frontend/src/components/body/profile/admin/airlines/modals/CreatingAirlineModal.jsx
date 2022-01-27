import React, { useState, useContext } from "react";
import { GlobalState } from "../../../../../../globalState.js";
import { Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
    name: ""
}

const CreatingAirlineModal = (props) => {
    const state = useContext(GlobalState);
    const [token] = state.token;
    
    const [data, setData] = useState(initialState);
    const [callback, setCallback] = state.airlinesAPI.callback;
    const {name} = data;

    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]: value});
    }

    const handleAddAirline = async () => {
        try {
            const result = await axios.post("http://localhost:5000/api/airlines/create_airline", {
                name
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
            setData({...data, name: ""});
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
                    <Modal.Title>Add Airline</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type="text" placeholder="Enter name airline" id="name" value={name} name="name" onChange={handleChangeInput} />
                    </Form.Group>
                </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleAddAirline}>Add a new airline</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreatingAirlineModal;