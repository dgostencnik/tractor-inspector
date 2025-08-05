import express from "express";
import { query } from "./db.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/tractors", async (req, res) => {
  try {
    const result = await query(
      "SELECT DISTINCT serial_number FROM vehicle_sessions"
    );
    res.json(result.rows.flatMap(row => row.serial_number));
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to retrieve data" });
  }
});

app.get("/tractors/:serialNumber", async (req, res) => {
  try {
    const { serialNumber } = req.params;
    const result = await query("SELECT * FROM vehicle_sessions WHERE serial_number = $1", [serialNumber]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to retrieve data" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend API running at http://localhost:${PORT}`);
});
