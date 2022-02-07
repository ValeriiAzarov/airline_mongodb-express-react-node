import React from "react";
import { Table, Button } from "react-bootstrap";
import moment from "moment";

const Data = (props) => {
    return (
        <>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>PNR</th>
                        <th>Flight</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Date</th>
                        <th>Full Name</th>
                        <th>Birthdate</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.tickets.map((ticket, index) => <tr key={index}>
                        <td>{ticket.ticketId}</td>
                        <td>{ticket.flight.name}</td>
                        <td>{ticket.flight.townFrom}</td>
                        <td>{ticket.flight.townTo}</td>
                        <td>{moment(ticket.flight.dateOut).format('YYYY-MM-DD')}</td>
                        <td>{ticket.user.surname + " " + ticket.user.name}</td>
                        <td>{moment(ticket.user.birthdate).format('YYYY-MM-DD')}</td>
                        <td>
                            <Button variant="info" onClick={() => props.showModal(ticket)}>View</Button>
                        </td>
                    </tr>)}
                </tbody>
            </Table>
        </>
    )
}

export default Data;