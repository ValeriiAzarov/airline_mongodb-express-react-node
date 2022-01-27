import mongoose from "mongoose";

const planeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    countEconomyClass: {
        type: Number,
        default: 0
    },
    countBusinessClass: {
        type: Number,
        default: 0
    },
    priceEconomyClass: {
        type: Number,
        default: 0
    },
    priceBusinessClass: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

export default mongoose.model("Planes", planeSchema);