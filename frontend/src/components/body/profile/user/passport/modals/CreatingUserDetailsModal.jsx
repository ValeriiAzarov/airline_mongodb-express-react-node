import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../../../../../globalState.js";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";

const CreatingUserDetailsModal = (props) => {
    const state = useContext(GlobalState);
    const [token] = state.token;
    const [auth] = state.authAPI.user;
    const createUserDetail = state.userDetailsAPI.createUserDetail;
    const [callback, setCallback] = state.userDetailsAPI.callback;
    
    const [data, setData] = useState({});
    const [user, setUser] = useState("");
    const [active, setActive] = useState(false);
    
    useEffect(() => {
        setUser(auth);
    }, [auth, token]);

    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]: value});
    }

    const handleAddUserDetails= async () => {
        await createUserDetail(user, data);
        setData({});
        setCallback(!callback);
        closeModal();
    }

    const closeModal = ()=> {
        return props.handleClose();
    }

    return (
        <>
            <Modal size="lg" centered show={props.show} >
                <Modal.Header closeButton onClick={props.handleClose}>
                    <Modal.Title>Add User Details</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>ID Passport:</Form.Label>
                                <Form.Control type="text" placeholder="Enter ID Passport" id="passportID" value={data.passportID} name="passportID" onChange={handleChangeInput} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Passport validity:</Form.Label>
                                <Form.Control type="date" id="passportValidity" value={data.passportValidity} name="passportValidity" onChange={handleChangeInput} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Surname:</Form.Label>
                                <Form.Control type="text" placeholder="Enter surname" id="surname" value={data.surname} name="surname" onChange={handleChangeInput} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Name:</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" id="name" value={data.name} name="name" onChange={handleChangeInput} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Sex:</Form.Label>
                                <Form.Group>
                                    <Form.Select id="sex" value={data.sex} name="sex" onChange={handleChangeInput}>
                                        <option value="">Please select a sex</option>
                                        <option value="man">Man</option>
                                        <option value="woman">Woman</option>
                                    </Form.Select>
                                </Form.Group>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Birthdate:</Form.Label>
                                <Form.Control type="date" id="birthdate" value={data.birthdate} name="birthdate" onChange={handleChangeInput} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Address:</Form.Label>
                                <Form.Control type="text" placeholder="Enter address" id="address" value={data.address} name="address" onChange={handleChangeInput} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control type="text" placeholder="Enter email" id="email" value={data.email} name="email" onChange={handleChangeInput} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Phone:</Form.Label>
                                <Form.Control type="text" placeholder="Enter phone" id="phone" value={data.phone} name="phone" onChange={handleChangeInput} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label style={{color: "crimson"}}>* Passport information confidentiality.</Form.Label>
                                <Form.Check label="I consent to the processing of the personal data" onChange={(e) => {setActive(e.target.checked ? true : false)}}/> 
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleAddUserDetails} disabled={!active}>Add User Details</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreatingUserDetailsModal;