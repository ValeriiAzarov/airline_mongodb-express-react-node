import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../../../../../globalState.js";
import { Modal, Form, Button } from "react-bootstrap";

const ChangingRoleUserModal = (props) => {
    const state = useContext(GlobalState);
    const [isAdmin] = state.authAPI.isAdmin;
    const updateRole = state.usersAPI.updateRole;
    const [callback, setCallback] = state.usersAPI.callback;

    const [data, setData] = useState({});
    const [checkAdmin, setCheckAdmin] = useState(false);
    const [number, setNumber] = useState(0);

    useEffect(() => {
        if (isAdmin && props.user) {
            setData(props.user);
            setCheckAdmin(props.user.role === 1 ? true : false);
        }
    }, [props.user, isAdmin]);

    const handleChangeChecked = () => {
        setCheckAdmin(!checkAdmin);
        setNumber(number + 1);
    }

    const changeRole = async () => {
        await updateRole(data, checkAdmin ? 1 : 0);
        setNumber(0);
        setCallback(!callback);
        closeModal();
    }

    const closeModal = ()=> {
        return props.handleClose();
    }

    return (
        <>
            <Modal centered show={props.show}>
                <Modal.Header closeButton onClick={props.handleClose}>
                    <Modal.Title>Change Role</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type="text" placeholder="Enter your name" id="name" value={data.name} name="name" disabled />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type="text" placeholder="Enter email" id="email" value={data.email} name="email" disabled />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Check label="Make to admin?" checked={checkAdmin} onChange={handleChangeChecked} /> 
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={changeRole}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ChangingRoleUserModal;