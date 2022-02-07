import React from "react";
import { Table, Button } from "react-bootstrap";
import moment from "moment";

const Data = (props) => {
    return (
        <>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>Flight</th>
                        <th>Departure Location</th>
                        <th>Arrival Location</th>
                        <th>Departure Date/Time</th>
                        <th>Arrival Data/Time</th>
                        <th>Airline</th>
                        <th>Price</th>
                        <th>Seats</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.flights.map((flight, index) => <tr key={index}>
                        <td>{flight.name}</td>
                        <td>{flight.townFrom}</td>
                        <td>{flight.townTo}</td>
                        <td>{moment(flight.dateOut).format('YYYY-MM-DD HH:mm')}</td>
                        <td>{moment(flight.dateIn).format('YYYY-MM-DD HH:mm')}</td>
                        <td>{flight.airline}</td>
                        <td>{flight.price} €</td>
                        <td>{flight.count}</td>
                        <td>
                            <Button variant="warning" onClick={() => props.showModaltype(flight, "edit")}>Edit</Button>{" "}
                            <Button variant="danger" onClick={() => props.showModaltype(flight, "delete")}>Delete</Button>
                        </td>
                    </tr>)}
                </tbody>
            </Table>
        </>
    )
}

export default Data;