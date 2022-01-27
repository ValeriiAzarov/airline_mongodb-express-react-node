import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../../../../../globalState.js";
import { Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
    name: "",
    email: ""
}

const ChangingRoleUserModal = (props) => {
    const state = useContext(GlobalState);
    const [token] = state.token;
    const [isAdmin] = state.authAPI.isAdmin;

    const [data, setData] = useState(initialState);
    const [checkAdmin, setCheckAdmin] = useState(false);
    const [callback, setCallback] = state.usersAPI.callback;
    const [number, setNumber] = useState(0);

    useEffect(() => {
        if (isAdmin && props.user) {
            setData(props.user);
            setCheckAdmin(props.user.role === 1 ? true : false);
        }
    }, [props.user, token, isAdmin, callback]);

    const handleChangeChecked = () => {
        setCheckAdmin(!checkAdmin);
        setNumber(number + 1);
    }

    const handleAddUser = async () => {
        try {
            const result = await axios.patch(`http://localhost:5000/api/users/update_role/${props.user._id}`, { 
                role: checkAdmin ? 1 : 0
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
            setNumber(0);
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
                    <Button variant="primary" onClick={handleAddUser}>Save role</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ChangingRoleUserModal;