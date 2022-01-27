import React, { useState, useContext } from "react";
import { GlobalState } from "../../../../../globalState.js";
import { Row, Col, Form, FormControl, Button } from "react-bootstrap";
import CreatingUserModal from "../users/modals/CreatingUserModal.jsx";
import EditingUserModal from "../users/modals/EditingUserModal.jsx";
import ChangingRoleUserModal from "../users/modals/ChangingRoleUserModal.jsx";
import RemovingUserModal from "../users/modals/RemovingUserModal";
import ViewingUserModal from "../users/modals/ViewingUserModal";
import Pagination from "../../../../utils/pagination/Pagination.jsx";
import Data from "../users/Data.jsx";

const Users = () => {
    const state = useContext(GlobalState);
    const [users] = state.usersAPI.users;
    
    const [showModalAdding, setShowModalAdding] = useState(false);
    const [showModalEditing, setShowModalEditing] = useState(false);
    const [showModalChangingRole, setShowModalChangingRole] = useState(false);
    const [showModalRemoving, setShowModalRemoving] = useState(false);
    const [showModalViewing, setShowModalViewing] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const toggleModalAdding = () => {
        setShowModalAdding(!showModalAdding);
    };

    const toggleModalEditing = () => {
        setShowModalEditing(!showModalEditing);
    };

    const toggleModalChangingRole = () => {
        setShowModalChangingRole(!showModalChangingRole);
    };

    const toggleModalRemoving = () => {
        setShowModalRemoving(!showModalRemoving);
    };

    const toggleModalViewing = () => {
        setShowModalViewing(!showModalViewing);
    };

    const showModaltype = (user, type) => {
        setCurrentUser(user);
        type === "edit" ? toggleModalEditing() : 
        type === "update_role" ? toggleModalChangingRole() : 
        type === "delete" ? toggleModalRemoving() : 
        toggleModalViewing();
    };
    const [page, setPage] = state.usersAPI.page;
    const [limit, setLimit] = state.usersAPI.limit;
    const [countPages] = state.usersAPI.countPages;
    const [search, setSearch] = state.usersAPI.search;

    return (
        <>
            <Col>
                <Row className="mt-3">
                    <Col md={6}>
                        <FormControl
                            type="search"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                    </Col>
                    <Col md={4}>
                        <Button variant="primary" onClick={() => toggleModalAdding()}>Add a new user</Button>
                    </Col>
                </Row>
                <Col>
                    <Data users={users} showModaltype={showModaltype} />
                </Col>
                <Row>
                    <Col md={10}>
                        <Pagination page={page} countPages={countPages} setPage={setPage} />
                    </Col>
                    <Col md={2}>
                        <Form.Select aria-label="Default select example" value={limit} onChange={e => setLimit(e.target.value)}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </Form.Select>
                    </Col>
                </Row>
            </Col>
            <CreatingUserModal show={showModalAdding} handleClose={toggleModalAdding}/>
            <EditingUserModal show={showModalEditing} handleClose={toggleModalEditing} user={currentUser}/>
            <ChangingRoleUserModal show={showModalChangingRole} handleClose={toggleModalChangingRole} user={currentUser}/>
            <RemovingUserModal show={showModalRemoving} handleClose={toggleModalRemoving} user={currentUser}/>
            <ViewingUserModal show={showModalViewing} handleClose={toggleModalViewing} user={currentUser}/>
        </>
    );
};

export default Users;
