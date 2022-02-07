import express  from "express";
import { 
    createFlight,
    updateFlight,
    deleteFlight,
    getFlight,
    getAllFlights,
    searchFlights
}  from "../controllers/flightsController.js";
import auth from "../middleware/auth.js";
import authAdmin from "../middleware/authAdmin.js";

const router = express.Router();

// get info about flight
router.get("/flights/info_flight/:id", getFlight); 
// get info about all flights
router.get("/flights/all_info", auth, authAdmin, getAllFlights);
// create flight
router.post("/flights/create_flight", auth, authAdmin, createFlight);
// update flight
router.patch("/flights/:id", auth, authAdmin, updateFlight);                            
// delete flight
router.delete("/flights/:id", auth, authAdmin, deleteFlight);
// search flights
router.post("/flights/search_flights", searchFlights);

export default router;