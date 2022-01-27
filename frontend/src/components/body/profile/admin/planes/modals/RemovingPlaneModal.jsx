import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../../../../../globalState.js";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
    _id: 0
}

const RemovingPlaneModal = (props) => {
    const state = useContext(GlobalState);
    const [token] = state.token;

    const [data, setData] = useState(initialState);
    const [callback, setCallback] = state.planesAPI.callback;
    const {_id} = data;

    useEffect(() => {
        if (props.plane) {
            setData(props.plane);
        }
    }, [props.plane, token, callback]);

    const handleDeletePlane = async () => {
        try {
            const result = await axios.delete(`http://localhost:5000/api/planes/${props.plane._id}`, {
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
                <Modal.Header closeButton onClick={props.handleClose} >
                    <Modal.Title>Delete plane</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this plane ID: {_id}?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleDeletePlane}>Delete plane</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default RemovingPlaneModal;