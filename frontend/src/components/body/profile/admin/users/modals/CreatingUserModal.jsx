import React, { useState, useContext } from "react";
import { GlobalState } from "../../../../../../globalState.js";
import { Modal, Form, Button } from "react-bootstrap";

const CreatingUserModal = (props) => {
    const state = useContext(GlobalState);
    const createUser = state.usersAPI.createUser;
    const [callback, setCallback] = state.usersAPI.callback;
    
    const [data, setData] = useState({});    
    const [number, setNumber] = useState(0);
    
    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]: value});
    }

    const handleChangeChecked = (e) => {
        setNumber(e.target.checked ? 1 : 0);
    }

    const handleAddUser = async () => {
        await createUser({ 
            surname: data.surname, 
            name: data.name, 
            email: data.email, 
            password: data.password,
            role: number
        });
        setData({});
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
                    <Modal.Title>Add User</Modal.Title>
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
                        <Form.Control type="text" placeholder="Enter email" id="email" value={data.email} name="email" onChange={handleChangeInput} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" id="password" value={data.password} name="password" onChange={handleChangeInput} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check label="Make to admin?" onChange={handleChangeChecked}/> 
                    </Form.Group>
                </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleAddUser}>Add a new User</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreatingUserModal;