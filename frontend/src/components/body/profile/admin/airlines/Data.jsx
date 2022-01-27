import React from "react";
import { Table, Button } from "react-bootstrap";

const Data = (props) => {
    return (
        <>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.airlines.map((airline, index) => <tr key={index}>
                        <td>{airline._id}</td>
                        <td>{airline.name}</td>
                        <td>
                            <Button variant="warning" onClick={() => props.showModaltype(airline, "edit")}>Edit</Button>{" "}
                            <Button variant="danger" onClick={() => props.showModaltype(airline, "delete")}>Delete</Button>
                        </td>
                    </tr>)}
                </tbody>
            </Table>
        </>
    )
}

export default Data;