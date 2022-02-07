import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import moment from "moment";

const ViewingUserModal = (props) => {
    const [data, setData] = useState({});

    useEffect(() => {
        if (props.user) {
            setData(props.user);
        }
    }, [props.user]);

    return (
        <>
          <Modal centered show={props.show}>
                <Modal.Header closeButton onClick={props.handleClose}>
                    <Modal.Title>Information about User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-1">
                        <Form.Label>ID: {data._id}</Form.Label> 
                    </Form.Group>
                    <Form.Group className="mb-1">
                        <Form.Label>Surname: {data.surname}</Form.Label> 
                    </Form.Group>
                    <Form.Group className="mb-1">
                        <Form.Label>Name: {data.name}</Form.Label> 
                    </Form.Group>
                    <Form.Group className="mb-1">
                        <Form.Label>Email: {data.email}</Form.Label>
                    </Form.Group>
                    <Form.Group className="mb-1">
                        <Form.Label>Created: {moment(data.createdAt).format('YYYY-MM-DD HH:MM:SS')}</Form.Label>
                    </Form.Group>
                    <Form.Group className="mb-1">
                        <Form.Label>Updated: {moment(data.updatedAt).format('YYYY-MM-DD HH:MM:SS')}</Form.Label>
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