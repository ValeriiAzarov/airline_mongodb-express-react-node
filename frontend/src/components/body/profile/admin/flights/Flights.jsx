import React, { useState, useContext } from "react";
import { GlobalState } from "../../../../../globalState.js";
import { Row, Col, Form, FormControl, Button } from "react-bootstrap";
import CreatingFlightModal from "../flights/modals/CreatingFlightModal.jsx";
import EditingFlightModal from "../flights/modals/EditingFlightModal.jsx";
import RemovingFlightModal from "../flights/modals/RemovingFlightModal";
import Pagination from "../../../../utils/pagination/Pagination.jsx";
import Data from "../flights/Data.jsx";

const Flights = () => {
  const state = useContext(GlobalState);
  const [flights] = state.flightsAPI.flights;
  const [page, setPage] = state.flightsAPI.page;
  const [limit, setLimit] = state.flightsAPI.limit;
  const [countPages] = state.flightsAPI.countPages;
  const [search, setSearch] = state.flightsAPI.search;

  const [showModalAdding, setShowModalAdding] = useState(false);
  const [showModalEditing, setShowModalEditing] = useState(false);
  const [showModalRemoving, setShowModalRemoving] = useState(false);

  const [currentFlight, setCurrentFlight] = useState(null);

  const toggleModalAdding = () => {
    setShowModalAdding(!showModalAdding);
  }

  const toggleModalEditing = () => {
    setShowModalEditing(!showModalEditing);
  }

  const toggleModalRemoving = () => {
    setShowModalRemoving(!showModalRemoving);
  }

  const showModaltype = (flight, type) => {
    setCurrentFlight(flight);
    type === "edit" ? toggleModalEditing() : toggleModalRemoving();
  }

  return (
    <>
      <Col>
        <Row className="mt-3">
          <Col md={6}>
            <FormControl
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
          </Col>
          <Col md={4}>
            <Button variant="primary" onClick={() => toggleModalAdding()}>Add a new Flight</Button>
          </Col>
        </Row>
        <Col>
          <Data flights={flights} showModaltype={showModaltype} />
        </Col>
        <Row>
          <Col md={10}>
            <Pagination page={page} countPages={countPages} setPage={setPage} />
          </Col>
          <Col md={2}>
            <Form.Select aria-label="Default select example" value={limit} onChange={e => setLimit(e.target.value)}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </Form.Select>
          </Col>
        </Row>
      </Col>
      <CreatingFlightModal show={showModalAdding} handleClose={toggleModalAdding}/>
      <EditingFlightModal show={showModalEditing} handleClose={toggleModalEditing} flight={currentFlight}/>
      <RemovingFlightModal show={showModalRemoving} handleClose={toggleModalRemoving} flight={currentFlight}/>
    </>
  );
}

export default Flights;