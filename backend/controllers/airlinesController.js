import Airlines from "../models/airlinesModel.js";
import APIfeatures from "../utils/features/features.js";

const createAirline = async (req, res) => {
    try {
        const { name } = req.body;
        const airline = await Airlines.findOne({name});
        if (!name) {
            return res.status(400).send({
                message: "Please fill in field."
            });
        }
        if (airline) {
            return res.status(400).send({
                message: "This airline already exists."
            });        
        }
        const newAirline = new Airlines({
            name
        });
        await newAirline.save();
        return res.status(201).send({ 
            status: "success",
            message: "Created successfuly!"
        });     
    }
    catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Server Error"
        });
    }
}

const updateAirline = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).send({
                message: "Please fill in field."
            });
        }
        await Airlines.findOneAndUpdate({_id: req.params.id}, {
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

const deleteAirline = async (req, res) => {
    try {
        await Airlines.findByIdAndDelete(req.params.id);
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

const getAllAirlines = async (req, res) => {
    try {
        const countPages = Math.ceil(await Airlines.countDocuments() / req.query.limit);
        const allAirlines = await Airlines.find();
        const features = new APIfeatures(Airlines.find(), req.query).filtering().paginating();
        const airlines = await features.data;
        return res.status(200).send({
            status: "success",
            countPages: countPages,
            allAirlines: allAirlines,
            result: airlines.length,
            airlines: airlines
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
    createAirline,
    updateAirline,
    deleteAirline,
    getAllAirlines
};