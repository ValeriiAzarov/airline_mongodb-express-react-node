import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../../../../../globalState.js";
import { Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
    surname: "",
    name: "",
    email: "",
    password: "",
    confPassword: ""
}

const EditingUserModal = (props) => {
    const state = useContext(GlobalState);
    const [token] = state.token;

    const [data, setData] = useState(initialState);
    const [callback, setCallback] = state.usersAPI.callback;
    const {surname, name, email, password, confPassword} = data;

    useEffect(() => {
        if (props.user) {
            setData(props.user);
        }
    }, [props.user, token, callback]);

    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]: value});
    }

    const updateUser = async () => {
        try {
            const result = await axios.patch(`http://localhost:5000/api/users/update_user/${props.user._id}`, {
                surname: surname,
                name: name
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

    const updatePassword = async () => {
        try {
            const result = await axios.post("http://localhost:5000/api/users/reset", {
                password, 
                confPassword
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
                    <Modal.Title>Edit user</Modal.Title>
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
                            <Form.Control type="text" placeholder="Enter email" id="email" value={email} name="email" onChange={handleChangeInput} disabled/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" id="password" name="password" onChange={handleChangeInput} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Confirm password:</Form.Label>
                            <Form.Control type="confPassword" placeholder="Enter confirm password" id="confPassword" name="confPassword" onChange={handleChangeInput} />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={updatePassword}>Reset password</Button>
                    <Button variant="primary" onClick={updateUser}>Save data</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditingUserModal;