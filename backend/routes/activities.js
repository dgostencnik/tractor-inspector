import express from "express";

import { activitiyController } from "../controllers/activityController.js";

export const activityRoutes = express.Router();

// GET /activities
activityRoutes.get("/", activitiyController.getActivities);

// GET /activities/:date
activityRoutes.get("/:date", activitiyController.getActivityTracks);

// GET /activities/:date/:serialNumber
activityRoutes.get("/:date/:serialNumber", activitiyController.getActivityLogForTractor);
