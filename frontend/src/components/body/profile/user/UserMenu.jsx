import React from "react";
import { ListGroup } from "react-bootstrap";

const UserMenu = () => {
    return (
        <>
          <h4 align="center">User Page</h4>
          <ListGroup>        
            <ListGroup.Item action variant="light" href="/profile/about">
              About
            </ListGroup.Item>
            <ListGroup.Item action variant="light" href="/profile/passport">
              Passport
            </ListGroup.Item>
            <ListGroup.Item action variant="light" href="/profile/update_password">
              Update Password
            </ListGroup.Item>
          </ListGroup>                                  
        </>
      );
};

export default UserMenu;
