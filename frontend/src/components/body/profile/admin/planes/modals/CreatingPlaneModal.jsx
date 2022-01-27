import React, { useState, useContext } from "react";
import { GlobalState } from "../../../../../../globalState.js";
import { Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
    name: "", 
    countEconomyClass: 0, 
    countBusinessClass: 0, 
    priceEconomyClass: 0,
    priceBusinessClass: 0 
}

const CreatingPlaneModal = (props) => {
    const state = useContext(GlobalState);
    const [token] = state.token;
    
    const [data, setData] = useState(initialState);
    const [callback, setCallback] = state.planesAPI.callback;
    const {name, countEconomyClass, countBusinessClass, priceEconomyClass, priceBusinessClass} = data;

    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]: value});
    }

    const handleAddPlane = async () => {
        try {
            const result = await axios.post("http://localhost:5000/api/planes/create_plane", {
                name,
                countEconomyClass,
                priceEconomyClass,
                countBusinessClass,
                priceBusinessClass
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
            setData({...data, name: "", countEconomyClass: 0, countBusinessClass: 0, priceEconomyClass: 0, priceBusinessClass: 0});
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
                    <Modal.Title>Add Plane</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type="text" placeholder="Enter name plane" id="name" value={name} name="name" onChange={handleChangeInput} />
                    </Form.Group> 
                    <Form.Group className="mb-3">
                        <Form.Label>Count economy class:</Form.Label>
                        <Form.Control type="number" placeholder="Enter count economy class" id="countEconomyClass" value={countEconomyClass} name="countEconomyClass" onChange={handleChangeInput} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Count business class:</Form.Label>
                        <Form.Control type="number" placeholder="Enter count business class" id="countBusinessClass" value={countBusinessClass} name="countBusinessClass" onChange={handleChangeInput} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Price economy class:</Form.Label>
                        <Form.Control type="number" step="0.01" placeholder="Enter price economy class" id="priceEconomyClass" value={priceEconomyClass} name="priceEconomyClass" onChange={handleChangeInput} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Price business class:</Form.Label>
                        <Form.Control type="number" step="0.01" placeholder="Enter price business classe" id="priceBusinessClass" value={priceBusinessClass} name="priceBusinessClass" onChange={handleChangeInput} />
                    </Form.Group> 
                </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleAddPlane}>Add a new plane</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreatingPlaneModal;