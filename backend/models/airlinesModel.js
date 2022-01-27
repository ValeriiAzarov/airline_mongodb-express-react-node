import mongoose from "mongoose";

const airlineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

export default mongoose.model("Airlines", airlineSchema);