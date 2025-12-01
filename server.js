// import express from "express";
const express = require("express");
// import cors from "cors";
const cors = require("cors");
// import dotenv from "dotenv";
const dotenv = require("dotenv");
// import connectDB from "./config/db.js";
const connectDB = require("./config/db.js");
// import clientRoutes from "./routes/clientRoutes.js";
const clientRoutes = require("./routes/clientRoutes.js");

dotenv.config();
// await connectDB(); // connectDB returns a promise
connectDB(); // connectDB returns a promise

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/clients", clientRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
