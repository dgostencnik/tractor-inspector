import express from "express";

import { activitiyController } from "../controllers/activityController.js";

export const activityRoutes = express.Router();

// GET /activities
activityRoutes.get("/", activitiyController.getActivities);
