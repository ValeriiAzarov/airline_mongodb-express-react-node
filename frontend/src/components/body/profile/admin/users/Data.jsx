import React from "react";
import { Table, Button } from "react-bootstrap";

const Data = (props) => {
    return (
        <>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Surname</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.users.map((user, index) => <tr key={index}>
                        <td>{user._id}</td>
                        <td>{user.surname}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                            {user.role === 1 ? <a>Admin</a> : <a>User</a>}
                        </td>
                        <td>
                            <Button variant="success" onClick={() => props.showModaltype(user, "edit")}>Edit</Button>{" "}
                            <Button variant="warning" onClick={() => props.showModaltype(user, "update_role")}>Change role</Button>{" "}
                            <Button variant="danger" onClick={() => props.showModaltype(user, "delete")}>Delete</Button>{" "}  
                            <Button variant="info" onClick={() => props.showModaltype(user, "view")}>View</Button> 
                        </td>
                    </tr>)}
                </tbody>
            </Table>
        </>
    )
}

export default Data;