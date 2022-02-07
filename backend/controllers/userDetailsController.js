import UserDetail from "../models/UserDetailsModel.js";
import Users from "../models/usersModel.js";

const createUserDetail = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await Users.findById(id);
        const { 
            passportID, 
            passportValidity, 
            surname, 
            name, 
            sex,
            birthdate,
            address,
            email,
            phone
        } = req.body;
        if (!passportID || !passportValidity || !surname || !name || !sex || !birthdate || !address || !email || !phone) {
            return res.status(400).send({
                message: "Please fill in all fields."
            });
        }
        const newUserDetail = new UserDetail({
            passportID, 
            passportValidity, 
            surname, 
            name, 
            sex,
            birthdate,
            address,
            email,
            phone
        });
        const userDetail = await newUserDetail.save();
        user.userDetails.push(userDetail);
        await user.save();
        return res.status(201).send({ 
            status: "success",
            message: "Created successfuly!"
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

const updateUserDetail = async (req, res) => {
    try {
        const { 
            passportID, 
            passportValidity, 
            surname, 
            name, 
            sex,
            birthdate,
            address,
            email,
            phone
        } = req.body;
        if (!passportID || !passportValidity || !surname || !name || !sex || !birthdate || !address || !email || !phone) {
            return res.status(400).send({
                message: "Please fill in all fields."
            });
        }
        await UserDetail.findByIdAndUpdate({_id: req.params.id}, {
            passportID, 
            passportValidity, 
            surname, 
            name, 
            sex,
            birthdate,
            address,
            email,
            phone
        });
        return res.status(201).send({ 
            status: "success",
            message: "Updated successfuly."
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

const deleteUserDetail = async (req, res) => {
    try {
        const {id} = req.params;
        await UserDetail.findByIdAndDelete(id);
        return res.status(200).send({
            status: "success",
            message: "Deleted successfuly."
        });
    }
    catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Server Error"
        });
    }
}

const getUserDetail = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await UserDetail.findById(id);
        return res.status(200).send({
            status: "success",
            user: user
        });
    }
    catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Server Error"
        });
    }
}

const getAllUserDetails = async (req, res) => {
    try {
        //const {id} = req.params;
        const user = await Users.findById(req.user.id).populate("userDetails");
        return res.status(200).send({
            status: "success",
            user: user
        });
    }
    catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Server Error"
        });
    }
}

export {
    createUserDetail,
    updateUserDetail,
    deleteUserDetail,
    getUserDetail,
    getAllUserDetails
};