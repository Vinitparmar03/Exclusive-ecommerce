import { getDashboardStats } from "../controllers/stats.js";
import { adminOnly } from "../middlewares/auth.js";
import express from "express";

const app = express.Router();

app.get("/stats", getDashboardStats);

export default app;
