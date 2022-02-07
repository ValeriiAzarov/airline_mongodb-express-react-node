import React, { useState, useContext } from "react";
import { GlobalState } from "../../../../../globalState.js";
import { Row, Col, Form, FormControl } from "react-bootstrap";
import ViewingTicketModal from "../tickets/modals/ViewingTicketModal.jsx";
import Pagination from "../../../../utils/pagination/Pagination.jsx";
import Data from "../tickets/Data.jsx";

const Tickets = () => {
  const state = useContext(GlobalState);
  const [tickets] = state.ticketsAPI.tickets;
  const [page, setPage] = state.ticketsAPI.page;
  const [limit, setLimit] = state.ticketsAPI.limit;
  const [countPages] = state.ticketsAPI.countPages;
  const [search, setSearch] = state.ticketsAPI.search;

  const [showModalViewing, setShowModalViewing] = useState(false);

  const [currentTicket, setCurrentTicket] = useState(null);

  const toggleModalViewing = () => {
    setShowModalViewing(!showModalViewing);
  };

  const showModal = (ticket) => {
    setCurrentTicket(ticket);
    toggleModalViewing();
  };

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
        </Row>
        <Col>
          <Data tickets={tickets} showModal={showModal} />
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
      <ViewingTicketModal show={showModalViewing} handleClose={toggleModalViewing} ticket={currentTicket} />
    </>
  );
};

export default Tickets;