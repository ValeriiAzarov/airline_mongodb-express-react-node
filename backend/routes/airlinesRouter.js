import express  from "express";
import { 
    createAirline,
    updateAirline,
    deleteAirline,
    getAllAirlines 
}  from "../controllers/airlinesController.js";
import auth from "../middleware/auth.js";
import authAdmin from "../middleware/authAdmin.js";

const router = express.Router();

// get info about all airlines
router.get("/airlines/all_info", auth, authAdmin, getAllAirlines);
// create airline
router.post("/airlines/create_airline", auth, authAdmin, createAirline);
// update airline
router.patch("/airlines/:id", auth, authAdmin, updateAirline);                            
// delete airline
router.delete("/airlines/:id", auth, authAdmin, deleteAirline);

export default router;