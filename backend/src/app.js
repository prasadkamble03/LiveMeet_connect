import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/users.routes.js"; // make sure filename matches
import { connectToSocket } from "./controllers/socketManager.js";

dotenv.config();

const app = express();
const server = createServer(app);

// Setup Socket.io
const io = connectToSocket(server);

// Middlewares
app.set("port", process.env.PORT || 8000);
app.use(cors()); // allow all origins for now, can restrict later
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

// Root route for testing backend deployment
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Routes
app.use("/api/v1/users", userRoutes);

// Start server function
const start = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected successfully");

    // Start listening
    server.listen(app.get("port"), () => {
      console.log(`Server listening on port ${app.get("port")}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

start();
