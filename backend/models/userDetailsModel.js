import mongoose from "mongoose";

const userDetailsSchema = new mongoose.Schema({
    passportID: {
        type: String,
        required: true,
        trim: true
    },
    passportValidity: {
        type: Date,
        required: true
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
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },   
    address: {
        type: String,
        required: true,
        trim: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
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

//export default mongoose.model("UserDetails", userDetailsSchema);
export default mongoose.models["UserDetails"] ? mongoose.model("UserDetails") : mongoose.model("UserDetails", userDetailsSchema);