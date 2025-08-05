import express from "express";

import { tractorController } from "../controllers/tractorController.js";

export const tractorRoutes = express.Router();

// GET /tractors
tractorRoutes.get("/", tractorController.getTractors);

// GET /tractors/:serialNumber
tractorRoutes.get("/:serialNumber", tractorController.getTractor);

// GET /tractors/:serialNumber/telemetry
tractorRoutes.get(
  "/:serialNumber/telemetry",
  tractorController.getTractorTelemetry
);
