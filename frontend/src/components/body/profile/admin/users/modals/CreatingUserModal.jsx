import React, { useState, useContext } from "react";
import { GlobalState } from "../../../../../../globalState.js";
import { Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
    surname: "",
    name: "",
    email: "",
    password: ""
}

const CreatingUserModal = (props) => {
    const state = useContext(GlobalState);
    const [token] = state.token;
    
    const [data, setData] = useState(initialState);
    const [callback, setCallback] = state.usersAPI.callback;
    const [number, setNumber] = useState(0);
    const {surname, name, email, password} = data;
    
    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]: value});
    }

    const handleChangeChecked = (e) => {
        setNumber(e.target.checked ? 1 : 0);
    }

    const handleAddUser = async () => {
        try {
            const result = await axios.post("http://localhost:5000/api/users/create_user", {
                surname,
                name, 
                email, 
                password, 
                role: number
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
            setData({...data, surname: "", name: "", email: "", password: ""});
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
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Surname:</Form.Label>
                        <Form.Control type="text" placeholder="Enter your surname" id="surname" value={surname} name="surname" onChange={handleChangeInput} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type="text" placeholder="Enter your name" id="name" value={name} name="name" onChange={handleChangeInput} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="text" placeholder="Enter email" id="email" value={email} name="email" onChange={handleChangeInput} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" id="password" value={password} name="password" onChange={handleChangeInput} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check label="Make to admin?" onChange={handleChangeChecked}/> 
                    </Form.Group>
                </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleAddUser}>Add a new user</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreatingUserModal;