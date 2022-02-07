import mongoose from "mongoose";

const ticketsSchema = new mongoose.Schema({
    ticketId: { 
        type: String, 
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserDetails",
    },
    flight: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Flights",
    }
}, {
    timestamps: true
})

export default mongoose.model("Tickets", ticketsSchema);