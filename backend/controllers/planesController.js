import Planes from "../models/planesModel.js";
import APIfeatures from "../utils/features/features.js";

const createPlane = async (req, res) => {
    try {
        const { 
            name, 
            countEconomyClass, 
            priceEconomyClass, 
            countBusinessClass, 
            priceBusinessClass 
        } = req.body;
        if (!name || !countEconomyClass || !countBusinessClass || !priceEconomyClass || !priceBusinessClass) {
            return res.status(400).send({
                message: "Please fill in all fields."
            });
        }
        const newPlane = new Planes({
            name,
            countEconomyClass, 
            priceEconomyClass, 
            countBusinessClass, 
            priceBusinessClass
        });
        await newPlane.save();
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

const updatePlane = async (req, res) => {
    try {
        const { 
            name, 
            countEconomyClass, 
            priceEconomyClass, 
            countBusinessClass, 
            priceBusinessClass 
        } = req.body;
        if (!name || !countEconomyClass || !countBusinessClass || !priceEconomyClass || !priceBusinessClass) {
            return res.status(400).send({
                message: "Please fill in all fields."
            });
        }
        await Planes.findOneAndUpdate({_id: req.params.id}, {
            name, 
            countEconomyClass, 
            priceEconomyClass, 
            countBusinessClass, 
            priceBusinessClass 
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

const deletePlane = async (req, res) => {
    try {
        await Planes.findByIdAndDelete(req.params.id);
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

const getAllPlanes = async (req, res) => {
    try {
        const countPages = Math.ceil(await Planes.countDocuments() / req.query.limit);
        const allPlanes = await Planes.find();
        const features = new APIfeatures(Planes.find(), req.query).filtering().sorting().paginating();
        const planes = await features.data;
        return res.status(200).send({
            status: "success",
            countPages: countPages,
            allPlanes: allPlanes,
            result: planes.length,
            planes: planes
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
    createPlane,
    updatePlane,
    deletePlane,
    getAllPlanes
};