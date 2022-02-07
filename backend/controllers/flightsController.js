import Flights from "../models/flightsModel.js";
import APIfeatures from "../utils/features/features.js";

const createFlight = async (req, res) => {
    try {
        const { 
            name,
            townFrom,
            townTo,
            dateOut,
            dateIn,
            airline,
            price,
            count
        } = req.body;
        if (!name || !townFrom || !townTo || !dateOut || !dateIn || !airline || !price || !count) {
            return res.status(400).send({
                message: "Please fill in all fields."
            });
        }
        const newFlight = new Flights({
            name,
            townFrom,
            townTo,
            dateOut,
            dateIn,
            airline,
            price,
            count
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
            airline,
            price,
            count
        } = req.body;
        if (!name || !townFrom || !townTo || !dateOut || !dateIn || !airline || !price || !count) {
            return res.status(400).send({
                message: "Please fill in all fields."
            });
        }
        await Flights.findOneAndUpdate({_id: req.params.id}, {
            name,
            townFrom,
            townTo,
            dateOut,
            dateIn,
            airline,
            price, 
            count 
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

const getFlight = async (req, res) => {
    try {
        const flight = await Flights.findById(req.params.id);
        return res.status(200).send({
            status: "success",
            flight: flight
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
        const features = new APIfeatures(Flights.find(), req.query).filtering().sorting().paginating();
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

const searchFlights = async (req, res) => {
    try {
        const { 
            from,
            to,
            date
        } = req.body;
        const startDate = Date.parse(date);
        const endDate = startDate + 24 * 60 * 60 * 1000;
        const flights = await Flights.find({ 
            townFrom: from,
            townTo: to,
            dateOut:{ $gte: startDate, $lt: endDate }
        }).sort({dateOut: 1}); // ascending
        return res.status(200).send({
            status: "success",
            flights: flights
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

export {
    createFlight,
    updateFlight,
    deleteFlight,
    getFlight,
    getAllFlights,
    searchFlights
};