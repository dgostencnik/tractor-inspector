import { query } from "../db.js";
import { convertToGeoJSONLineString, simplifyPoints } from "../lib/utils.js";

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


const getActivityTracks = async (req, res) => {
  try {
    const { date } = req.params;
    const parsedDate = new Date(date).toISOString().split('T')[0]; // "2020-03-14"


    const result = await query(
      `SELECT 
        serial_number,
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'lat', gps_latitude,
            'lng', gps_longitude
           ) ORDER BY date_time
        ) AS points
       FROM vehicle_sessions
       WHERE DATE(date_time) = $1 
       GROUP BY serial_number
       ORDER BY serial_number;`,
      [date]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No data found" });
    }


    const features = result.rows.map(row => {
      const points = row.points || [];
      const simplifiedPoints = simplifyPoints(points, 0.001);

      const lineString = convertToGeoJSONLineString(simplifiedPoints);

      if (!lineString) return null;

      return {
        type: "Feature",
        properties: {
          serialNumber: row.serial_number,
        },
        geometry: lineString
      };

    });

    return res.json({
      type: "FeatureCollection",
      features: features
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to retrieve data" });
  }
};




export const activitiyController = {
  getActivities,
  getActivityTracks
};
