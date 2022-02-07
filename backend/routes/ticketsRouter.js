import express  from "express";
import { 
    createTicket,
    cancelTicket,
    getTicket,
    getUserDetailTickets,
    getAllTickets,
    createTicketPDF,
    downloadTicketPDF
} from "../controllers/ticketsController.js";
import auth from "../middleware/auth.js";
import authAdmin from "../middleware/authAdmin.js";

const router = express.Router();

// create ticket
router.post("/tickets/create_ticket", auth, createTicket);
// delete ticket (ID ticket)
router.delete("/tickets/delete_ticket/:id", auth, cancelTicket);
// get info about ticket (ID User Detail)
router.get("/tickets/info_ticket/:id", auth, getTicket);
// get info about user detail tickets (ID User)
router.get("/tickets/info_user_detail_ticket/:id", auth, getUserDetailTickets);
// get info about all tickets
router.get("/tickets/info_all_tickets", auth, authAdmin, getAllTickets);
// create ticket-PDF
router.post("/tickets/create-pdf", createTicketPDF);
// send file ticket-PDF
router.get("/tickets/download-pdf", downloadTicketPDF);

export default router;