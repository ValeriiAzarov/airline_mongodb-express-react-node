import React from "react";
import { useHistory } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

const AdminMenu = () => {
  const history = useHistory();

  const alertClicked = (label) => {
    history.push("/profile/" + label);
  }

  return (
    <>
      <h4 align="center">Admin Page</h4>
      <ListGroup>        
        <ListGroup.Item action variant="light" onClick={() => alertClicked("users")}>
          Users
        </ListGroup.Item>
        <ListGroup.Item action variant="light" onClick={() => alertClicked("flights")}>
          Flights 
        </ListGroup.Item>
        <ListGroup.Item action variant="light" onClick={() => alertClicked("tickets")}>
          Tickets
        </ListGroup.Item>
      </ListGroup>                                  
    </>
  );
}

export default AdminMenu;