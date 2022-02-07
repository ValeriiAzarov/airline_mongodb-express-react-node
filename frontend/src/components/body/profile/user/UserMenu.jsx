import React from "react";
import { useHistory } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

const UserMenu = () => {
  const history = useHistory();

  const alertClicked = (label) => {
    history.push("/profile/" + label);
  }

  return (
    <>
      <h4 align="center">User Page</h4>
      <ListGroup>        
        <ListGroup.Item action variant="light" onClick={() => alertClicked("about")}>
          About
        </ListGroup.Item>
        <ListGroup.Item action variant="light" onClick={() => alertClicked("my_booking")}>
          Tickets
        </ListGroup.Item>
        <ListGroup.Item action variant="light" onClick={() => alertClicked("passport")}>
          Passport
        </ListGroup.Item>
        <ListGroup.Item action variant="light" onClick={() => alertClicked("update_password")}>
          Update Password
        </ListGroup.Item>
      </ListGroup>                                  
    </>
  );
}

export default UserMenu