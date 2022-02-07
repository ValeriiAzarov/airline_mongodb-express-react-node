import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import usersRouter from "./routes/usersRouter.js";
import flightsRouter from "./routes/flightsRouter.js";
import ticketsRouter from "./routes/ticketsRouter.js";
import paymentsRouter from "./routes/paymentsRouter.js";
import connectDB from "./config/database.js";

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// routes
// users
app.use("/api", usersRouter);
// flights
app.use("/api", flightsRouter);
// tickets
app.use("/api", ticketsRouter);
// payments
app.use("/api", paymentsRouter);

// connection database
connectDB();

app.listen(5000, () => {
    console.log("Server running at 5000 port...");
});