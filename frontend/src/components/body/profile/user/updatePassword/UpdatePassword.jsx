import React, { useState, useContext } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { GlobalState } from "../../../../../globalState.js";
import image from "../../../../../images/blimp-illustration.svg";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  password: "",
  confPassword: ""
}

const UpdatePassword = () => {
  const state = useContext(GlobalState);
  const updatePassword = state.usersAPI.updatePassword;
  const [data, setData] = useState(initialState);
  const {password, confPassword} = data;

  const handleChangeInput = (e) => {
    const {name, value} = e.target;
    setData({...data, [name]: value});
  }

  const changePassword = async () => {
    await updatePassword(password, confPassword);
  }

  return (
    <>
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col lg={4} md={6} sm={12}>
            <Form>
              <h2>Update Password</h2>
              <Form.Group className="mb-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" placeholder="Enter password" name="password" id="password" value={password} onChange={handleChangeInput} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Confirm password:</Form.Label>
                <Form.Control type="password" placeholder="Enter confirm password" name="confPassword" id="confPassword" value={confPassword} onChange={handleChangeInput} />
              </Form.Group>
              <Button variant="primary btn-block" onClick={changePassword}>
                Update
              </Button>
            </Form>
          </Col>
          <Col lg={8} md={6} sm={12} className="text-center">
            <img className="w-75" src={image} alt=""/>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UpdatePassword;