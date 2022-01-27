import Flights from "../models/flightsModel.js";
import Airlines from "../models/airlinesModel.js";
import Planes from "../models/planesModel.js";
import APIfeatures from "../utils/features/features.js";

const createFlight = async (req, res) => {
    try {
        const { 
            name,
            townFrom,
            townTo,
            dateOut,
            dateIn,
            airlineId,
            planeId
        } = req.body;
        if (!name || !townFrom || !townTo || !dateOut || !dateIn || !airlineId || !planeId) {
            return res.status(400).send({
                message: "Please fill in all fields."
            });
        }
        const airline = await Airlines.findById(airlineId);
        const plane = await Planes.findById(planeId);
        if (!airline) {
            return res.status(400).send({
                message: "This airline does not exist."
            });   
        }
        if (!plane) {
            return res.status(400).send({
                message: "This plane does not exist."
            });   
        }
        const newFlight = new Flights({
            name,
            townFrom,
            townTo,
            dateOut,
            dateIn,
            airline,
            plane
        });
        await newFlight.save();
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

const updateFlight = async (req, res) => {
    try {
        const { 
            name,
            townFrom,
            townTo,
            dateOut,
            dateIn,
            airlineId,
            planeId
        } = req.body;
        const airline = await Airlines.findById(airlineId);
        const plane = await Planes.findById(planeId);
        if (!name || !townFrom || !townTo || !dateOut || !dateIn || !airlineId || !planeId) {
            return res.status(400).send({
                message: "Please fill in all fields."
            });
        }
        if (!airline) {
            return res.status(400).send({
                message: "This airline does not exist."
            });   
        }
        if (!plane) {
            return res.status(400).send({
                message: "This plane does not exist."
            });   
        }
        await Flights.findOneAndUpdate({_id: req.params.id}, {
            name,
            townFrom,
            townTo,
            dateOut,
            dateIn,
            airline,
            plane 
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

const deleteFlight = async (req, res) => {
    try {
        await Flights.findByIdAndDelete(req.params.id);
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

const getAllFlights = async (req, res) => {
    try {
        const countPages = Math.ceil(await Flights.countDocuments() / req.query.limit);
        const features = new APIfeatures(Flights.find().populate("airline").populate("plane"), req.query).filtering().sorting().paginating();
        const flights = await features.data;
        return res.status(200).send({
            status: "success",
            countPages: countPages,
            result: flights.length,
            flights: flights
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
    createFlight,
    updateFlight,
    deleteFlight,
    getAllFlights
};