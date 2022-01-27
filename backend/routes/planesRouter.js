import express  from "express";
import { 
    createPlane,
    updatePlane,
    deletePlane,
    getAllPlanes 
}  from "../controllers/planesController.js";
import auth from "../middleware/auth.js";
import authAdmin from "../middleware/authAdmin.js";

const router = express.Router();

// get info about all planes
router.get("/planes/all_info", auth, authAdmin, getAllPlanes);
// create plane
router.post("/planes/create_plane", auth, authAdmin, createPlane);
// update plane
router.patch("/planes/:id", auth, authAdmin, updatePlane);                            
// delete plane
router.delete("/planes/:id", auth, authAdmin, deletePlane);

export default router;