import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import usersRouter from "./routes/usersRouter.js";
import airlinesRouter from "./routes/airlinesRouter.js";
import planesRouter from "./routes/planesRouter.js";
import flightsRouter from "./routes/flightsRouter.js";
import connectDB from "./config/database.js";

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// routes
// users
app.use("/api", usersRouter);
// airlines
app.use("/api", airlinesRouter);
// planes
app.use("/api", planesRouter);
// flights
app.use("/api", flightsRouter);

// connection database
connectDB();

app.listen(5000, () => {
    console.log("Server running at 5000 port...");
});