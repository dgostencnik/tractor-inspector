import express from "express";
import { activitiyController } from "../controllers/activityController.js";

export const activityRoutes = express.Router();

/**
 * @openapi
 * /activities:
 *   get:
 *     summary: Get a list of dates with activity records
 *     tags:
 *       - Activities
 *     responses:
 *       200:
 *         description: List of all activity records
 */
activityRoutes.get("/", activitiyController.getActivities);

/**
 * @openapi
 * /activities/{date}:
 *   get:
 *     summary: Get activity tracks for all tractors on a specific date
 *     tags:
 *       - Activities
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Date in YYYY-MM-DD format
 *     responses:
 *       200:
 *         description: Activity tracks for all tractors on the given date
 *       404:
 *         description: No activity found for the date
 */
activityRoutes.get("/:date", activitiyController.getActivityTracks);

/**
 * @openapi
 * /activities/{date}/{serialNumber}:
 *   get:
 *     summary: Get list of points with exact dates for a specific tractor on a specific date
 *     tags:
 *       - Activities
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Date in YYYY-MM-DD format
 *       - in: path
 *         name: serialNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: Serial number of the tractor
 *     responses:
 *       200:
 *         description: Activity logs for the specified tractor and date
 *       404:
 *         description: Activity log not found
 */
activityRoutes.get(
  "/:date/:serialNumber",
  activitiyController.getActivityLogForTractor
);
