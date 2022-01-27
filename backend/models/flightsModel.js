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
        required: true,
    },
    dateIn: {
        type: Date,
        required: true,
    },
    airline: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Airlines",
    },
    plane: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Planes",
    }
}, {
    timestamps: true
})

export default mongoose.model("Flights", flightSchema);