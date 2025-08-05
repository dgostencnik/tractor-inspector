import { query } from "../db.js";
import { addImageUrl } from "../lib/utils.js";
import { VALID_SORT_COLUMNS } from "../lib/const.js";
const getTractors = async (req, res) => {
  try {
    const result = await query(
      `SELECT serial_number as "serialNumber",  
              max(total_working_hours_counter) as "totalWorkingHours",
              max(date_time) as "lastActive"
       FROM vehicle_sessions  
       GROUP BY serial_number 
       order by serial_number`
    );
    const tractors = result.rows.map(addImageUrl);
    res.json(tractors);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to retrieve data" });
  }
};

const getTractor = async (req, res) => {
  try {
    const { serialNumber } = req.params;

    const result = await query(
      `SELECT 
          serial_number as "serialNumber",  
          max(total_working_hours_counter) as "totalWorkingHours",
          max(date_time) as "lastActive"
       FROM vehicle_sessions  
       WHERE serial_number=$1
       GROUP BY serial_number`,
      [serialNumber]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Tractor not found" });
    }
    const tractor = addImageUrl(result.rows[0]);
    res.json(tractor);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to retrieve data" });
  }
};


const getTractorTelemetry = async (req, res) => {
  try {
    const { serialNumber } = req.params;

    const page = Math.max(1, parseInt(req.query.page) || 1);
    const pageSize = Math.min(
      1000,
      Math.max(1, parseInt(req.query.pageSize) || 50)
    );
    const sort = req.query.sort || "date_time";
    const order = req.query.order?.toUpperCase() === "DESC" ? "DESC" : "ASC";

    if (!VALID_SORT_COLUMNS.includes(sort)) {
      return res.status(400).json({ error: "Invalid sort column" });
    }

    const offset = (page - 1) * pageSize;

    const result = await query(
      `
      SELECT *
      FROM vehicle_sessions
      WHERE serial_number = $1
      ORDER BY ${sort} ${order}
      LIMIT $2 OFFSET $3
      `,
      [serialNumber, pageSize, offset]
    );

    const countResult = await query(
      "SELECT COUNT(*) FROM vehicle_sessions WHERE serial_number = $1",
      [serialNumber]
    );

    const total = parseInt(countResult.rows[0].count);

    res.json({
      page,
      pageSize,
      total,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to retrieve data" });
  }
};

export const tractorController = {
  getTractor,
  getTractors,
  getTractorTelemetry
};
