import mongoose from "mongoose";

const userDetailsSchema = new mongoose.Schema({
    passportID: {
        type: String,
        required: true,
        trim: true
    },
    passportValidity: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    sex: {
        type: String,
        required: true,
        trim: true
    },
    birthdate: {
        type: Date,
        required: true,
        trim: true
    },   
    address: {
        type: String,
        required: true,
        trim: true
    }, 
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    flights: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Flights",
        }
    ]
}, {
    timestamps: true
})

export default mongoose.model("UserDetails", userDetailsSchema);