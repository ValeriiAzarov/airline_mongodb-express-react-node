import React from "react";
import { ListGroup } from "react-bootstrap";

const AdminMenu = () => {
  return (
    <>
      <h4 align="center">Admin Page</h4>
      <ListGroup>        
        <ListGroup.Item action variant="light" href="/profile/users">
          Users
        </ListGroup.Item>
        <ListGroup.Item action variant="light" href="/profile/tickets">
          Tickets
        </ListGroup.Item>
        <ListGroup.Item action variant="light" href="/profile/flights">
          Flights 
        </ListGroup.Item>
        <ListGroup.Item action variant="light" href="/profile/airlines">
          Airlines
        </ListGroup.Item>
        <ListGroup.Item action variant="light" href="/profile/planes"> 
          Planes
        </ListGroup.Item>
      </ListGroup>                                  
    </>
  );
}

export default AdminMenu;