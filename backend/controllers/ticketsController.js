import Tickets from "../models/ticketsModel.js";
import UserDetails from "../models/userDetailsModel.js";
import Flights from "../models/flightsModel.js";
import APIfeatures from "../utils/features/features.js";
import customId from "custom-id";
import pdfTemplate from "../documents/index.js";
import pdf from "html-pdf";

import path from "path";

const createTicket = async (req, res) => {
  try {
    const { 
      userDetailId,
      flightId
    } = req.body;
    const user = await UserDetails.findById(userDetailId);
    const flight = await Flights.findById(flightId);
    const ticketId = customId({
      name: flight.name + flight.townFrom + flight.townTo,
      email: user.surname + user.name,
    });
    user.flights.push(flight);
    await user.save();
    await flight.update({_id: flightId, $inc: {count: -1}});
    const newTicket = new Tickets({ 
      ticketId, 
      flight, 
      user 
    });
    await newTicket.save();
    return res.status(200).send({
        status: "success",
        message: "Created successfuly!",
        ticket: newTicket
    });
  }
  catch (error) {
    return res.status(500).send({
        status: "error",
        message: "Server Error"
    });
  }
}

const cancelTicket = async (req, res) => {
  try {
    const {id} = req.params;
    const ticket = await Tickets.findById(id);
    const userId = ticket.user;
    const flightId = ticket.flight;
    await Tickets.findByIdAndDelete(id);
    const user = await UserDetails.findById(userId);
    const flight = await Flights.findById(flightId);
    user.flights.pull(flight);
    await user.save();
    return res.status(200).send({
      status: "success",
      message: "Canceled successfuly."
    });
  }
  catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "error",
      message: "Server Error"
    });
  }
}

const getTicket = async (req, res) => {
  try {
    const {id} = req.params;
    const ticket = await Tickets.findById(id);
    return res.status(200).send({
      status: "success",
      ticket
    });
  }
  catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Server Error"
    });
  }
}

const getUserDetailTickets = async (req, res) => {
  try {
    const {id} = req.params;
    const tickets = await Tickets.find({ user: id }).populate("flight").populate("user");
    return res.status(200).send({
      status: "success",
      tickets
    });
  }
  catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Server Error"
    });
  }
}

const getAllTickets = async (req, res) => {
  try {
    const countPages = Math.ceil(await Tickets.countDocuments() / req.query.limit);
    const features = new APIfeatures(Tickets.find().populate("flight").populate("user"), req.query).filtering().paginating();
    const tickets = await features.data;
    return res.status(200).send({
      status: "success",
      countPages: countPages,
      result: tickets.length,
      tickets: tickets
    });
  }
  catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Server Error"
    });
  }
}

const createTicketPDF = (req, res) => {
  try {
    pdf.create(pdfTemplate(req.body), {}).toFile("result.pdf", (err) => {
      if (err) {
        res.send(Promise.reject());
      }
      res.send(Promise.resolve());
    });
  }
  catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Server Error"
    });
  }
}

const downloadTicketPDF = (req, res) => {
  try {
    const __dirname = path.resolve();
    res.sendFile(`${__dirname}\\result.pdf`);
  }
  catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Server Error"
    });
  }
}
    
export { 
  createTicket, 
  cancelTicket,
  getTicket,
  getUserDetailTickets,
  getAllTickets,
  createTicketPDF,
  downloadTicketPDF
};