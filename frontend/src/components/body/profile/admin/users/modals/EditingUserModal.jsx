import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../../../../../globalState.js";
import { Modal, Form, Button } from "react-bootstrap";

const EditingUserModal = (props) => {
    const state = useContext(GlobalState);
    const updateUser = state.usersAPI.updateUser;
    const updatePassword = state.usersAPI.updatePassword;
    const [callback, setCallback] = state.usersAPI.callback;

    const [data, setData] = useState({});
    const {password, confPassword} = data;

    useEffect(() => {
        if (props.user) {
            setData(props.user);
        }
    }, [props.user]);

    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]: value});
    }

    const changeUser = async () => {
        await updateUser(data);
        setCallback(!callback);            
        closeModal();
    }

    const changePassword = async () => {
        await updatePassword(password, confPassword);    
    }

    const closeModal = ()=> {
        return props.handleClose();
    }

    return (
        <>
            <Modal centered show={props.show}>
                <Modal.Header closeButton onClick={props.handleClose}>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Surname:</Form.Label>
                            <Form.Control type="text" placeholder="Enter your surname" id="surname" value={data.surname} name="surname" onChange={handleChangeInput} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type="text" placeholder="Enter your name" id="name" value={data.name} name="name" onChange={handleChangeInput} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type="text" placeholder="Enter email" id="email" value={data.email} name="email" onChange={handleChangeInput} disabled/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" id="password" name="password" onChange={handleChangeInput} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Confirm Password:</Form.Label>
                            <Form.Control type="password" placeholder="Enter confirm password" id="confPassword" name="confPassword" onChange={handleChangeInput} />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={changePassword}>Reset Password</Button>
                    <Button variant="primary" onClick={changeUser}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditingUserModal;