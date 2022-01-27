import React, { useState, useContext } from "react";
import { GlobalState } from "../../../../../globalState.js";
import { Row, Col, Form, FormControl, Button } from "react-bootstrap";
import CreatingPlaneModal from "../planes/modals/CreatingPlaneModal.jsx";
import EditingPlaneModal from "../planes/modals/EditingPlaneModal.jsx";
import RemovingPlaneModal from "../planes/modals/RemovingPlaneModal.jsx";
import Pagination from "../../../../utils/pagination/Pagination.jsx";
import Data from "../planes/Data.jsx";


const Planes = () => {
  const state = useContext(GlobalState);
  const [planes] = state.planesAPI.planes;

  const [showModalAdding, setShowModalAdding] = useState(false);
  const [showModalEditing, setShowModalEditing] = useState(false);
  const [showModalRemoving, setShowModalRemoving] = useState(false);
  const [currentPlane, setCurrentPlane] = useState(null);

  const toggleModalAdding = () => {
    setShowModalAdding(!showModalAdding);
  }

  const toggleModalEditing = () => {
    setShowModalEditing(!showModalEditing);
  }

  const toggleModalRemoving = () => {
    setShowModalRemoving(!showModalRemoving);
  }

  const showModaltype = (plane, type) => {
    setCurrentPlane(plane);
    type === "edit" ? toggleModalEditing() : 
    toggleModalRemoving();
  }

  const [page, setPage] = state.planesAPI.page;
  const [limit, setLimit] = state.planesAPI.limit;
  const [countPages] = state.planesAPI.countPages;
  const [search, setSearch] = state.planesAPI.search;

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
            <Button variant="primary" onClick={() => toggleModalAdding()}>Add a new plane</Button>
          </Col>
        </Row>
        <Col>
          <Data planes={planes} showModaltype={showModaltype} />
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
      <CreatingPlaneModal show={showModalAdding} handleClose={toggleModalAdding}/>
      <EditingPlaneModal show={showModalEditing} handleClose={toggleModalEditing} plane={currentPlane}/>
      <RemovingPlaneModal show={showModalRemoving} handleClose={toggleModalRemoving} plane={currentPlane}/>
    </>
  );
}

export default Planes;