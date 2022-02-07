import express  from "express";
import { 
    register,
    activateAccount,
    forgotPassword,
    resetPassword,
    getAccessToken, 
    login,
    logout,
    getUser,
    getAllUsers,
    createUser,
    updateUser,
    updateUserRole,
    deleteUser 
} from "../controllers/usersController.js";
import { 
    createUserDetail,
    updateUserDetail,
    deleteUserDetail,
    getUserDetail,
    getAllUserDetails
} from "../controllers/userDetailsController.js";
import auth from "../middleware/auth.js";
import authAdmin from "../middleware/authAdmin.js";

const router = express.Router();

// register
router.post("/users/register", register);
// activate account
router.post("/users/activation", activateAccount);
// forgot password
router.post("/users/forgot", forgotPassword);
// reset password
router.post("/users/reset", auth, resetPassword);
// get access token
router.get("/users/refresh_token", getAccessToken);
// login
router.post("/users/login", login);
// logout
router.get("/users/logout", logout);
// get info about user
router.get("/users/info_user", auth, getUser);
// get info about all users
router.get("/users/all_info_users", auth, authAdmin, getAllUsers);
// create user
router.post("/users/create_user", auth, authAdmin, createUser);
// update user
router.patch("/users/update_user/:id", auth, updateUser);
// update role
router.patch("/users/update_role/:id", auth, authAdmin, updateUserRole);
// delete user
router.delete("/users/delete_user/:id", auth, authAdmin, deleteUser);
// get info about user detail 
router.get("/users/info_user_detail/:id", auth, getUserDetail);
// get info about all user details 
router.get("/users/info_all_user_details", auth, getAllUserDetails);
// create user detail (ID User)
router.post("/users/craete_user_detail/:id", auth, createUserDetail);
// update user detail
router.patch("/users/update_user_detail/:id", auth, updateUserDetail);
// delete user detail
router.delete("/users/delete_user_detail/:id", auth, deleteUserDetail);

export default router;