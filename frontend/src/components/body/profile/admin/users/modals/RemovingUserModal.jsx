import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../../../../../globalState.js";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
    _id: 0
}

const RemovingUserModal = (props) => {
    const state = useContext(GlobalState);
    const [token] = state.token;

    const [data, setData] = useState(initialState);
    const [callback, setCallback] = state.usersAPI.callback;
    const {_id} = data;

    useEffect(() => {
        if (props.user) {
            setData(props.user);
        }
    }, [props.user, token, callback]);

    const handleDeleteUser = async () => {
        try {
            const result = await axios.delete(`http://localhost:5000/api/users/delete_user/${props.user._id}`, {
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
                    <Modal.Title>Delete user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this account ID: {_id}?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleDeleteUser}>Delete user</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default RemovingUserModal;