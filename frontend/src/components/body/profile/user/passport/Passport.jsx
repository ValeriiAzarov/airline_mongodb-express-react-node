import React, { useContext, useState } from "react";
import { Container, Table, Row, Col, Button } from "react-bootstrap";
import { GlobalState } from "../../../../../globalState.js";
import image from "../../../../../images/folder.svg";
import CreatingUserDetailsModal from "./modals/CreatingUserDetailsModal.jsx";
import EditingUserDetailsModal from "./modals/EditingUserDetailsModal.jsx";
import RemovingUserDetailsModal from "./modals/RemovingUserDetailsModal.jsx";
import moment from "moment";

const Passport = () => {
    const state = useContext(GlobalState);
    const [userDetails] = state.userDetailsAPI.userDetails;
    const storeUserDetail = state.userDetailsAPI.storeUserDetail;

    const [showModalAdding, setShowModalAdding] = useState(false);
    const [showModalEditing, setShowModalEditing] = useState(false);
    const [showModalRemoving, setShowModalRemoving] = useState(false);

    const toggleModalAdding = () => {
        setShowModalAdding(!showModalAdding);
    }
    
    const toggleModalEditing = (id) => {
        storeUserDetail(id);
        setShowModalEditing(!showModalEditing);
    }
    
    const toggleModalRemoving = (id) => {
        storeUserDetail(id);
        setShowModalRemoving(!showModalRemoving);
    }

    return (
        <>
            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col lg={4} md={6} sm={12}>
                        <h2>Passport</h2>
                            {userDetails.length > 0 ? (<>
                                <p>You can add user details.<br/>Passport information required when booking a flight.</p> 
                                <Button variant="primary btn-block" onClick={() => toggleModalAdding()}>
                                    Add User
                                </Button>
                            </>
                            ) : <>
                                <p>You need to fill in your passport details.<br/>Passport information required when booking a flight.</p> 
                                <Button variant="primary btn-block" onClick={() => toggleModalAdding()}>
                                    Apply Passport
                                </Button>
                            </>
                        }    
                    </Col>
                    <Col lg={8} md={6} sm={12}>
                        {userDetails.length > 0 ? (<>
                            <h2>Users Details</h2>
                            <Table bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Full Name</th>
                                        <th>Birthdate</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userDetails.map((user, key) => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.surname + " " + user.name}</td>
                                        <td>{moment(user.birthdate).format('YYYY-MM-DD')}</td>
                                        <td>
                                            <Button variant="warning" onClick={() => toggleModalEditing(user._id)}>
                                                Edit
                                            </Button>{" "}
                                            <Button variant="danger" onClick={() => toggleModalRemoving(user._id)}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </>
                        ) : <>
                            <img className="d-block mx-auto img-fluid w-75" src={image} alt=""/>
                        </>}
                    </Col>
                </Row>
                <CreatingUserDetailsModal show={showModalAdding} handleClose={toggleModalAdding} />
                <EditingUserDetailsModal show={showModalEditing} handleClose={toggleModalEditing} />
                <RemovingUserDetailsModal show={showModalRemoving} handleClose={toggleModalRemoving} />
            </Container>
        </>
    );
}

export default Passport;