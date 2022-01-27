import React, { useState, useContext } from "react";
import { GlobalState } from "../../../../../globalState.js";
import { Row, Col, Form, FormControl, Button } from "react-bootstrap";
import CreatingAirlineModal from "../airlines/modals/CreatingAirlineModal.jsx";
import EditingAirlineModal from "../airlines/modals/EditingAirlineModal.jsx";
import RemovingAirlineModal from "../airlines/modals/RemovingAirlineModal";
import Pagination from "../../../../utils/pagination/Pagination.jsx";
import Data from "../airlines/Data.jsx";


const Airlines = () => {
  const state = useContext(GlobalState);
  const [airlines] = state.airlinesAPI.airlines;

  const [showModalAdding, setShowModalAdding] = useState(false);
  const [showModalEditing, setShowModalEditing] = useState(false);
  const [showModalRemoving, setShowModalRemoving] = useState(false);
  const [currentAirline, setCurrentAirline] = useState(null);

  const toggleModalAdding = () => {
    setShowModalAdding(!showModalAdding);
  }

  const toggleModalEditing = () => {
    setShowModalEditing(!showModalEditing);
  }

  const toggleModalRemoving = () => {
    setShowModalRemoving(!showModalRemoving);
  }

  const showModaltype = (airline, type) => {
    setCurrentAirline(airline);
    type === "edit" ? toggleModalEditing() : 
    toggleModalRemoving();
  }

  const [page, setPage] = state.airlinesAPI.page;
  const [limit, setLimit] = state.airlinesAPI.limit;
  const [countPages] = state.airlinesAPI.countPages;
  const [search, setSearch] = state.airlinesAPI.search;

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
            <Button variant="primary" onClick={() => toggleModalAdding()}>Add a new airline</Button>
          </Col>
        </Row>
        <Col>
          <Data airlines={airlines} showModaltype={showModaltype} />
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
      <CreatingAirlineModal show={showModalAdding} handleClose={toggleModalAdding}/>
      <EditingAirlineModal show={showModalEditing} handleClose={toggleModalEditing} airline={currentAirline}/>
      <RemovingAirlineModal show={showModalRemoving} handleClose={toggleModalRemoving} airline={currentAirline}/>
    </>
  );
}

export default Airlines;