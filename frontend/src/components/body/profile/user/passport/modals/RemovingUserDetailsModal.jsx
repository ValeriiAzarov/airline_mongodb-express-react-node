import React, { useContext } from "react";
import { GlobalState } from "../../../../../../globalState.js";
import { Modal, Button } from "react-bootstrap";

const RemovingUserDetailsModal = (props) => {
    const state = useContext(GlobalState);
    const [userDetail] = state.userDetailsAPI.userDetail;
    const deleteUserDetail = state.userDetailsAPI.deleteUserDetail;
    const [callback, setCallback] = state.userDetailsAPI.callback;
    
    const handleDeleteUserDetails = async () => {
        await deleteUserDetail(userDetail._id);
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
                    <Modal.Title>Delete User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this User Details ID: {userDetail._id}?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleDeleteUserDetails}>Delete User Details</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default RemovingUserDetailsModal;