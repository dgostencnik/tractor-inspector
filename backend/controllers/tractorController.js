import { query } from "../db.js";
import { addImageUrl } from "../lib/utils.js";
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

export const tractorController = {
  getTractor,
  getTractors,
};
