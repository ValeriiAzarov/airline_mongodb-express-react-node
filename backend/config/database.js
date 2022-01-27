import mongoose from "mongoose";

const db = () => { 
    mongoose.connect(process.env.MONGODB_URL).then(() => {
        console.log("Connected successfully to MongoDB");
    }).catch((error) => {
        console.log("Error connecting: " + error.message);  
    });
}

export default db;