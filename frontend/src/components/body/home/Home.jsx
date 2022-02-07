import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Form, FloatingLabel, Button, Card } from "react-bootstrap";
import { GlobalState } from "../../../globalState.js";
import validateSearch from "../../utils/validateSearch/ValidateSearch.js";
import formatDuration from "../../utils/formatDuration/FormatDuration.js";
import imageSuburbs from "../../../images/suburbs.svg";
import imagePlane from "../../../images/plane.svg";
import { toast } from "react-toastify";
import moment from "moment";
import "../home/home.css"

const towns = [
    "Kiev",
    "Kharkov",
    "Odessa",
    "Dnipro",
    "Donetsk",
    "Zaporozhye",
    "Lviv",
    "Simferopol"
];

const Home = () =>  {
    const history = useHistory();

    const state = useContext(GlobalState);
    const [isLogged] = state.authAPI.isLogged;
    
    const searchFlight = state.flightsAPI.searchFlight;
    const storeFlight = state.flightsAPI.storeFlight;
    const [flights] = state.flightsAPI.results;
    
    const [townFrom, setTownFrom] = useState("");
    const [townTo, setTownTo] = useState("");
    const [date, setDate] = useState("");
    const [swap, setSwap] = useState(false);

    const handleSwap = () => {
        setSwap(!swap);
    }

    const handleSubmit = async () => {
        try {
            if (swap) {
                const swapper = townFrom;
                setTownFrom(townTo);
                setTownTo(swapper);
                setSwap(false);
            }
            const data = {
                from: townFrom,
                to: townTo,
                date: date
            }; console.log(data);
            if (validateSearch(data)) {
                await searchFlight(data);
            }
        } 
        catch (error) {
            if (error.response) {
                toast.error(error.response.data.message, { 
                    position: "top-right",
                    autoClose: 15000,
                    draggable: true
                });
            }
        }
    }  
    
    const handleBookNow = (flightId) => {
        storeFlight(flightId);
        if (isLogged) {
            history.push("/booking");
        }
        else {
            toast.error("Please login to continue booking", { 
                position: "top-right",
                autoClose: 15000,
                draggable: true
            });
        }
    }
    
    return (
        <>
            <Container className="mt-5">
                <Row className="justify-content-md-center">
                    <Col lg={4} md={6} sm={12}>
                        <Form>
                            <h2>Search Flight</h2>
                            <Form.Group className="mb-3">
                                {!swap ? 
                                <FloatingLabel label="From:">
                                    <Form.Select id="townFrom" value={townFrom} name="townFrom" onChange={(e) => setTownFrom(e.target.value)}>
                                        <option value="">Please select city from</option>
                                        {towns.map((from, index) => <option value={from} key={index}>{from}</option>)}
                                    </Form.Select> 
                                </FloatingLabel>
                                : 
                                <FloatingLabel label="From:">
                                    <Form.Select id="townTo" value={townTo} name="townTo" onChange={(e) => setTownTo(e.target.value)}>
                                        <option value="">Please select city from</option>
                                        {towns.map((to, index) => <option value={to} key={index}>{to}</option>)}
                                    </Form.Select>
                                </FloatingLabel>}
                            </Form.Group>                            
                            <Form.Group className="mb-3">
                                <Button style={{ textAlignLast: "center", width: "100%"}} onClick={() => handleSwap()}>
                                    ↑↓
                                </Button>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                {!swap ? 
                                <FloatingLabel label="To:">
                                    <Form.Select id="townTo" value={townTo} name="townTo" onChange={(e) => setTownTo(e.target.value)}>
                                        <option value="">Please select city to</option>
                                        {towns.map((to, index) => <option value={to} key={index}>{to}</option>)}
                                    </Form.Select>
                                </FloatingLabel>
                                : 
                                <FloatingLabel label="To:">
                                    <Form.Select id="townFrom" value={townFrom} name="townFrom" onChange={(e) => setTownFrom(e.target.value)}>
                                        <option value="">Please select city to</option>
                                        {towns.map((from, index) => <option value={from} key={index}>{from}</option>)}
                                    </Form.Select> 
                                </FloatingLabel>}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="date" id="date" name="date" onChange={(e) => setDate(e.target.value)}/>
                            </Form.Group>
                            <Button variant="primary" onClick={handleSubmit}>
                                Search
                            </Button>
                        </Form>
                    </Col>
                    <Col lg={8} md={6} sm={12}>
                        {flights.length > 0 ? 
                        <>
                            <h2>{flights[0].townFrom + "-" + flights[0].townTo}</h2>
                            {flights.map((flight, index) => 
                            <Card style={{ width: "100%", marginBottom: "1em" }} key={index}>
                                <Card.Header >Flight: {flight.name}</Card.Header>
                                <Card.Body>
                                    <Card.Subtitle className="mb-2 text-muted">{flight.airline}</Card.Subtitle>
                                    <table style={{ width: "100%", tableLayout: "fixed" }}>
                                        <tbody>                       
                                            <tr>
                                                <td style={{ width: "15%", fontSize: "1.2rem" }}>{moment(flight.dateOut).format('HH:mm')}</td>
                                                <td style={{ width: "35%", textAlign: "center" }}>{formatDuration(flight.dateIn, flight.dateOut)}</td>
                                                <td style={{ width: "15%", fontSize: "1.2rem" }}>{moment(flight.dateIn).format('HH:mm')}</td>
                                                <td style={{ fontSize: "1.2rem" }}>{flight.price} €</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: "15%" }}>{flight.townFrom}</td>
                                                <td style={{ width: "35%", textAlign: "center" }}><img src={imagePlane} alt=""/></td>
                                                <td style={{ width: "15%" }}>{flight.townTo}</td>
                                                <td>Seats: {flight.count}</td>
                                                <td>
                                                    <Button variant="primary" onClick={() => handleBookNow(flight._id)}>
                                                        Book now
                                                    </Button>            
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Card.Body>
                            </Card>)}
                        </> : 
                        <>
                            <img className="d-block mx-auto img-fluid w-100" src={imageSuburbs} alt=""/>
                        </>}
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Home;