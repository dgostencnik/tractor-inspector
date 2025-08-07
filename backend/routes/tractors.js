import express from "express";
import { tractorController } from "../controllers/tractorController.js";

export const tractorRoutes = express.Router();

/**
 * @openapi
 * /tractors:
 *   get:
 *     summary: Get a list of all tractors
 *     tags:
 *       - Tractors
 *     responses:
 *       200:
 *         description: A list of tractors
 */
tractorRoutes.get("/", tractorController.getTractors);

/**
 * @openapi
 * /tractors/{serialNumber}:
 *   get:
 *     summary: Get details of a specific tractor
 *     tags:
 *       - Tractors
 *     parameters:
 *       - in: path
 *         name: serialNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: Serial number of the tractor
 *     responses:
 *       200:
 *         description: Tractor details
 *       404:
 *         description: Tractor not found
 */
tractorRoutes.get("/:serialNumber", tractorController.getTractor);

/**
 * @openapi
 * /tractors/{serialNumber}/telemetry:
 *   get:
 *     summary: Get telemetry data for a specific tractor
 *     tags:
 *       - Tractors
 *     parameters:
 *       - in: path
 *         name: serialNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: Serial number of the tractor
 *     responses:
 *       200:
 *         description: Telemetry data
 *       404:
 *         description: Tractor or telemetry not found
 */
tractorRoutes.get(
  "/:serialNumber/telemetry",
  tractorController.getTractorTelemetry
);

/**
 * @openapi
 * /tractors/{serialNumber}/telemetry/{logId}:
 *   get:
 *     summary: Get a specific telemetry log
 *     tags:
 *       - Tractors
 *     parameters:
 *       - in: path
 *         name: serialNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: Serial number of the tractor
 *       - in: path
 *         name: logId
 *         required: true
 *         schema:
 *           type: string
 *         description: Telemetry log ID
 *     responses:
 *       200:
 *         description: Telemetry log
 *       404:
 *         description: Telemetry log not found
 */
tractorRoutes.get(
  "/:serialNumber/telemetry/:logId",
  tractorController.getTractorTelemetryLog
);

/**
 * @openapi
 * /tractors/{serialNumber}/telemetry/{logId}:
 *   put:
 *     summary: Update a telemetry log
 *     tags:
 *       - Tractors
 *     parameters:
 *       - in: path
 *         name: serialNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: Serial number of the tractor
 *       - in: path
 *         name: logId
 *         required: true
 *         schema:
 *           type: string
 *         description: Telemetry log ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               temperature: 85.5
 *               speed: 10.4
 *               location: "45.4215,-75.6972"
 *     responses:
 *       200:
 *         description: Telemetry log updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Telemetry log not found
 */
tractorRoutes.put(
  "/:serialNumber/telemetry/:logId",
  tractorController.updateTractorTelemetryLog
);
