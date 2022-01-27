import React, { useContext } from "react";
import { Container, Row, Col} from "react-bootstrap";
import { GlobalState } from "../../../globalState.js";
import Main from "./Main.jsx";
import UserMenu from "./user/UserMenu.jsx";
import AdminMenu  from "./admin/AdminMenu.jsx";


const Profile = () => {    
    const state = useContext(GlobalState);
    const [isAdmin] = state.authAPI.isAdmin;
    
    return (
        <>
            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col lg={2} md={6} sm={12} className="mt-3 p-3">
                        {isAdmin ? <AdminMenu /> : <UserMenu />}
                    </Col>
                    <Col lg={10} md={6} sm={12} className="mt-3 p-3">
                        <Main />
                    </Col>
                </Row>
            </Container>           
        </>        
    );
};

export default Profile;
