import express from "express";
import cors from "cors";

import { tractorRoutes } from "./routes/tractors.js";
import { activityRoutes } from "./routes/activities.js";


const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];

app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use("/tractors", tractorRoutes);
app.use("/activities", activityRoutes);


app.listen(PORT, () => {
  console.log(`🚀 Backend API running at http://localhost:${PORT}`);
});
