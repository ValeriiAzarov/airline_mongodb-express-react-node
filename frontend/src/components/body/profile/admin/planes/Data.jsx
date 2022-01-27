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
                        <th>Count economy class</th>
                        <th>Count business class</th>
                        <th>Price economy class</th>
                        <th>Price business class</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.planes.map((plane, index) => <tr key={index}>
                        <td>{plane._id}</td>
                        <td>{plane.name}</td>
                        <td>{plane.countEconomyClass}</td>
                        <td>{plane.countBusinessClass}</td>
                        <td>{plane.priceEconomyClass} €</td>
                        <td>{plane.priceBusinessClass} €</td>
                        <td>
                            <Button variant="warning" onClick={() => props.showModaltype(plane, "edit")}>Edit</Button>{" "}
                            <Button variant="danger" onClick={() => props.showModaltype(plane, "delete")}>Delete</Button>
                        </td>
                    </tr>)}
                </tbody>
            </Table>
        </>
    )
}

export default Data;