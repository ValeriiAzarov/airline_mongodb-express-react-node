import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../../../../../globalState.js";
import { Modal, Button } from "react-bootstrap";

const RemovingUserModal = (props) => {
    const state = useContext(GlobalState);
    const deleteUser = state.usersAPI.deleteUser;
    const [callback, setCallback] = state.usersAPI.callback;

    const [data, setData] = useState({});
    
    useEffect(() => {
        if (props.user) {
            setData(props.user);
        }
    }, [props.user]);

    const handleDeleteUser = async () => {
        await deleteUser(data);
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
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this account ID: {data._id}?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleDeleteUser}>Delete User</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default RemovingUserModal;