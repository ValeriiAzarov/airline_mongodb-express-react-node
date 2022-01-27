import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const initialState = {
    _id: 0,
    surname: "",
    name: "",
    email: "",
    createdAt: "",
    updatedAt: ""
};

const ViewingUserModal = (props) => {
    const [data, setData] = useState(initialState);
    const {_id, surname, name, email, createdAt, updatedAt} = data;

    useEffect(() => {
        if (props.user) {
            setData(props.user);
        }
    }, [props.user]);

    return (
        <>
          <Modal centered show={props.show}>
                <Modal.Header closeButton onClick={props.handleClose}>
                    <Modal.Title>Information about user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>ID: {_id}</Form.Label> 
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Surname: {surname}</Form.Label> 
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Name: {name}</Form.Label> 
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email: {email}</Form.Label>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Created: {createdAt}</Form.Label>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Updated: {updatedAt}</Form.Label>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>  
        </>
    );
}

export default ViewingUserModal;