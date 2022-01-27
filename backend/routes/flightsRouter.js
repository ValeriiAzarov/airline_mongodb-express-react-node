import express  from "express";
import { 
    createFlight,
    updateFlight,
    deleteFlight,
    getAllFlights
}  from "../controllers/flightsController.js";
import auth from "../middleware/auth.js";
import authAdmin from "../middleware/authAdmin.js";

const router = express.Router();

// get info about all flights
router.get("/flights/all_info", auth, authAdmin, getAllFlights);
// create flight
router.post("/flights/create_flight", auth, authAdmin, createFlight);
// update flight
router.patch("/flights/:id", auth, authAdmin, updateFlight);                            
// delete flight
router.delete("/flights/:id", auth, authAdmin, deleteFlight);

export default router;