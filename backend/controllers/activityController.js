import { query } from "../db.js";

const getActivities = async (req, res) => {
  try {
    const result = await query(
      `SELECT 
            DATE(date_time) AS date,
            ARRAY_AGG(DISTINCT serial_number ORDER BY serial_number) AS "serialNumbers"
        FROM vehicle_sessions
        GROUP BY DATE(date_time)
        ORDER BY date desc;`
    );
    const tractors = result.rows;
    res.json(tractors);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to retrieve data" });
  }
};


export const activitiyController = {
  getActivities: getActivities
};
