import mongoose from "mongoose";

const flightSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    townFrom: {
        type: String,
        required: true,
        trim: true
    },
    townTo: {
        type: String,
        required: true,
        trim: true
    },
    dateOut: {
        type: Date,
        required: true
    },
    dateIn: {
        type: Date,
        required: true
    },
    airline: {
        type: String,
        required: true,
        trim: true
    },
    count: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
})

export default mongoose.model("Flights", flightSchema);