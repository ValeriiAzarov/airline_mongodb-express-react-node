import Users from "../models/usersModel.js";
import isEmailValid from "../utils/validation/validation.js";
import sendMail from "../controllers/sendMail.js"
import APIfeatures from "../utils/features/features.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
    try {
        const { surname, name, email, password, confPassword } = req.body;
        const user = await Users.findOne({email});
        if (!surname || !name || !email || !password || !confPassword) {
            return res.status(400).send({
                message: "Please fill in all fields."
            });
        }
        if (!isEmailValid(email)) {
            return res.status(400).send({
                message: "Invalid email."
            });
        }
        if (!password || password.length < 5) {
            return res.status(400).send({ 
                message: "Password must be at least 5 characters."
            });
        }
        if (password != confPassword) {
            return res.status(400).send({ 
                message: "Both passwords must match."
            });
        }
        if (user) {
            return res.status(400).send({
                message: "This email already exists."
            });        
        }
        const salt = bcrypt.genSalt();
        bcrypt.hash(password, parseInt(salt), async (error, encryptedPassword) => {
            if (error) {
                return res.status(500).send({
                    message: error.message
                });
            }
            else {
                const activationToken = jwt.sign({
                    surname: surname,
                    name: name,
                    email: email,
                    password: encryptedPassword
                }, process.env.ACTIVATION_TOKEN_SECRET, {
                    expiresIn: "60m" // 1 час
                });
                sendMail(
                    email,
                    "Verify Email Address", 
                    `http://localhost:3000/activate/${activationToken}`, 
                    "Please click the button below to verify your email adress. This link will expire in 1 hour.",
                    "VERIFY EMAIL"
                );
                return res.status(200).send({
                    status: "success",
                    message: "Register Success! Please activate your email to start."
                });    
            }
        });  
    }  
    catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Server Error"
        });
    }
}

const activateAccount = async (req, res) => {
    try {
        const { activationToken } = req.body;
        jwt.verify(activationToken, process.env.ACTIVATION_TOKEN_SECRET, async (error, decoded) => {
            if (error) {
                return res.status(403).send({
                    message: "Unfortunately the activation period has expired."
                });
            }
            else {
                const {surname, name, email, password} = decoded;
                const user = await Users.findOne({email});
                if (user) {
                    return res.status(400).send({
                        message: "This email already exists."
                    });        
                }
                const newUser = new Users({
                    surname,
                    name,
                    email, 
                    password
                });
                await newUser.save();
                return res.status(201).send({ 
                    status: "success",
                    message: "Account has been activated!"
                });
            }  
        });
    }
    catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Server Error"
        });
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await Users.findOne({email});
        if (!user) {
            return res.status(400).send({
                message: "This email does not exist."
            });
        }
        else {
            const accessToken = jwt.sign({
                id: user.id
            }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "30m" // 30 минут
            });
            sendMail(
                email,
                "Reset Your Password", 
                `http://localhost:3000/reset/${accessToken}`, 
                "You are receiving this email because we receied a password reset request for your account. This link will expire in 30 minutes.",
                "RESET PASSWORD"
            );
            return res.status(200).send({
                status: "success",
                message: "Re-send the password, please check your email."
            });
        }   
    }
    catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Server Error"
        });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { password, confPassword } = req.body;
        if (!password || !confPassword) {
            return res.status(400).send({
                message: "Please fill in all fields."
            });
        }
        if (!password || password.length < 5) {
            return res.status(400).send({ 
                message: "Password must be at least 5 characters."
            });
        }
        if (password != confPassword) {
            return res.status(400).send({ 
                message: "Both passwords must match."
            });
        }
        const salt = bcrypt.genSalt();
        bcrypt.hash(password, parseInt(salt), async (error, encryptedPassword) => {
            if (error) {
                return res.status(500).send({
                    message: err.message
                });
            }
            else {
                await Users.findOneAndUpdate({_id: req.user.id}, {
                    password: encryptedPassword
                });
                return res.status(200).send({
                    status: "success",
                    message: "Password successfully changed!"
                });             
            }
        });
    }
    catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Server Error"
        });
    }
}

const getAccessToken = async (req, res) => {
    try {
        const refreshToken  = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(400).send({
                message: "Please login now."
            });
        }
        jwt.verify(refreshToken, process.env.REFREAH_TOKEN_SECRET, (error, decoded) => {
            if (error) {
                return res.sendStatus(403);
            }
            const accessToken = jwt.sign({
                id: decoded.id
            },
            process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "60m" // 1 час
            });
            return res.status(200).send({ 
                status: "success",
                accessToken: accessToken
            });
        });   
    } 
    catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Server Error"
        });
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await Users.findOne({email});
        if (!email || !password) {
            return res.status(400).send({
                message: "Please enter email and password."
            });
        } 
        else {
            if (!user) {
                return res.status(400).send({
                    message: "This email does not exist."
                });   
            }
            if (!bcrypt.compareSync(password, user.password)) {
                return res.status(400).send({
                    message: "Password is incorrect."
                });
            } 
            else {
                const refreshToken = jwt.sign({
                    id: user._id
                }, 
                process.env.REFREAH_TOKEN_SECRET, {
                    expiresIn: "7d"
                });
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    maxAge: 1 * 24 * 60 * 60 * 1000 // 1 день
                });
                return res.status(200).send({
                    status: "success",
                    message: "Login success!"
                });       
            }
        }   
    }
    catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Server Error"
        });
    }
}

const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.sendStatus(204);
        }
        res.clearCookie("refreshToken");
        return res.status(200).send({
            status: "success",
            message: "Logged out."
        });       
    }
    catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Server Error"
        });
    }
}

const getUser = async (req, res) => {
    try {
        const user = await Users.findById(req.user.id);
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

const getAllUsers = async (req, res) => {
    try {
        const countPages = Math.ceil(await Users.countDocuments() / req.query.limit);
        const features = new APIfeatures(Users.find(), req.query).filtering().paginating();
        const users = await features.data;
        return res.status(200).send({
            status: "success",
            countPages: countPages,
            result: users.length,
            users: users
        });
    }
    catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Server Error"
        });
    }
}

const createUser = async (req, res) => {
    try {
        const { surname, name, email, password, role } = req.body;
        const user = await Users.findOne({email});
        if (!surname || !name || !email || !password) {
            return res.status(400).send({
                message: "Please fill in all fields."
            });
        }
        if (!isEmailValid(email)) {
            return res.status(400).send({
                message: "Invalid email."
            });
        }
        if (!password || password.length < 5) {
            return res.status(400).send({ 
                message: "Password must be at least 5 characters."
            });
        }
        if (user) {
            return res.status(400).send({
                message: "This email already exists."
            });        
        }
        const salt = bcrypt.genSalt();
        bcrypt.hash(password, parseInt(salt), async (error, encryptedPassword) => {
            if (error) {
                return res.status(500).send({
                    message: err.message
                });
            }
            else {
                const newUser = new Users({
                    surname,
                    name,
                    email,
                    password: encryptedPassword,
                    role
                });
                await newUser.save();
                return res.status(201).send({ 
                    status: "success",
                    message: "Created successfuly!"
                });           
            }
        });
    }
    catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Server Error"
        });
    }
}

const updateUser = async (req, res) => {
    try {
        const { surname, name } = req.body;
        if (!surname || !name) {
            return res.status(400).send({
                message: "Please fill in all fields."
            });
        }
        await Users.findOneAndUpdate({_id: req.params.id}, {
            surname,
            name
        })
        return res.status(201).send({ 
            status: "success",
            message: "Updated successfuly."
        });
    }
    catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Server Error"
        });
    }
}

const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;
        await Users.findOneAndUpdate({_id: req.params.id}, {
            role
        });
        return res.status(201).send({ 
            status: "success",
            message: "Updated successfuly."
        });
    }
    catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Server Error"
        });
    }
}

const deleteUser = async (req, res) => {
    try {
        await Users.findByIdAndDelete(req.params.id);
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

export {
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
};