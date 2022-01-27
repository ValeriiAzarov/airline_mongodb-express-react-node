import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
    userDetails: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "UserDetails",
        }
    ]
}, {
    timestamps: true
})

export default mongoose.model("Users", userSchema);