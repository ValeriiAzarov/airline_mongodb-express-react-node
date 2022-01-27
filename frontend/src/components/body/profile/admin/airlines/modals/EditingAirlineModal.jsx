import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../../../../../globalState.js";
import { Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
    name: ""
}

const EditingAirlineModal = (props) => {
    const state = useContext(GlobalState);
    const [token] = state.token;

    const [data, setData] = useState(initialState);
    const [callback, setCallback] = state.airlinesAPI.callback;
    const {name} = data;

    useEffect(() => {
        if (props.airline) {
            setData(props.airline);
        }
    }, [props.airline, token, callback]);

    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]: value});
    }

    const updateAirline = async () => {
        try {
            const result = await axios.patch(`http://localhost:5000/api/airlines/${props.airline._id}`, {
                name: name
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
                    <Modal.Title>Edit airline</Modal.Title>
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
                    <Button variant="primary" onClick={updateAirline}>Save data</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditingAirlineModal;