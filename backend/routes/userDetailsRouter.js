import express  from "express";
import { 
    createUserDetail,
    updateUserDetail,
    deleteUserDetail,
    getUserDetail,
    getAllUserDetails
}  from "../controllers/userDetailsController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// create user detail
router.post("/users/craete_user_detail/:id", auth, createUserDetail);
// update user detail
router.patch("/users/update_user_detail/:id", auth, updateUserDetail);
// delete user detail
router.delete("/users/delete_user_detail:id", auth, deleteUserDetail);
// get info about user detail 
router.get("/users/info_user_detail/:id", auth, getUserDetail);
// get info about all user details
router.get("/users/info_all_user_details/:id", auth, getAllUserDetails);

export default router;