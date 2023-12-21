import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import multer from "multer";
const app = express();
const routes = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// MongoDB connection setup
const MONGODB_URI = "mongodb://localhost:27017/auth";
mongoose.connect(MONGODB_URI, {});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Express middleware setup
app.use(cors({ origin: true }));
app.use(bodyParser.json());

// Routes setup
require("./auth").default(routes);
app.use("/api", routes);

export default app;
