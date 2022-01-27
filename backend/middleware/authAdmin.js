import Users from "../models/usersModel.js"

const authAdmin = async (req, res, next) => {
    const user = await Users.findOne({_id: req.user.id});
    if (user.role !== 1) {                 
        return res.status(500).send({
            message: "Admin resources access denied."
        });
    } 
    next();
}

export default authAdmin;