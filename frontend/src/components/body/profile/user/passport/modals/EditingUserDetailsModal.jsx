import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../../../../globalState.js";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import moment from "moment";

const EditingUserDetailsModal = (props) => {
    const state = useContext(GlobalState);
    const [userDetail] = state.userDetailsAPI.userDetail;
    const updateUserDetail = state.userDetailsAPI.updateUserDetail;
    const [callback, setCallback] = state.userDetailsAPI.callback;
    const [data, setData] = useState({});
    
    useEffect(() => {         
        if (userDetail) {       
            setData(userDetail);            
        }
    }, [userDetail]);
    
    const handleUpdateUserDetails = async () => {
        await updateUserDetail(userDetail._id, data);
        setCallback(!callback);
        closeModal();  
    }

    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]: value});
    }

    const closeModal = ()=> {
        return props.handleClose();
    }

    return (
        <>
            <Modal size="lg" centered show={props.show}>
                <Modal.Header closeButton onClick={props.handleClose} >
                    <Modal.Title>Edit User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <h2>{data.surname + " " + data.name}</h2>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>ID:</Form.Label>
                                <Form.Control type="text" id="id" value={data._id} name="id" disabled />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>ID Passport:</Form.Label>
                                <Form.Control type="text" id="passportID" value={data.passportID} name="passportID" onChange={handleChangeInput} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Passport validity:</Form.Label>
                                <Form.Control type="date" id="passportValidity" value={moment(data.passportValidity).format('YYYY-MM-DD')} name="passportValidity" onChange={handleChangeInput} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Surname:</Form.Label>
                                <Form.Control type="text" id="surname" value={data.surname} name="surname" onChange={handleChangeInput} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Name:</Form.Label>
                                <Form.Control type="text" id="name" value={data.name} name="name" onChange={handleChangeInput} />
                            </Form.Group>
                        </Col>
                        <Col>
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
                            <Form.Group className="mb-3">
                                <Form.Label>Birthdate:</Form.Label>
                                <Form.Control type="date" id="birthdate" value={moment(data.birthdate).format('YYYY-MM-DD')} name="birthdate" onChange={handleChangeInput} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Address:</Form.Label>
                                <Form.Control type="text" id="address" value={data.address} name="address" onChange={handleChangeInput} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control type="text" id="email" value={data.email} name="email" onChange={handleChangeInput} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Phone:</Form.Label>
                                <Form.Control type="text" id="phone" value={data.phone} name="phone" onChange={handleChangeInput} />
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleUpdateUserDetails}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EditingUserDetailsModal;