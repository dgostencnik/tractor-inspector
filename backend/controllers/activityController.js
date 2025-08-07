import { query } from "../db.js";
import { convertToGeoJSONLineString, simplifyPoints } from "../lib/utils.js";

async function getActivities(req, res) {
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

async function getActivityTracks(req, res) {
  try {
    const { date } = req.params;
    const parsedDate = new Date(date).toISOString().split('T')[0];


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
      [parsedDate]
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

async function getActivityLogForTractor(req, res) {
  try {
    const { date, serialNumber } = req.params;
    const parsedDate = new Date(date).toISOString().split('T')[0];

    // Query the database for sessions matching the provided date and serial number
    const result = await query(
      `SELECT 
        id,
        date_time as date,
        gps_latitude as lat,
        gps_longitude as lng 
       FROM 
        vehicle_sessions
       WHERE serial_number = $1 
       AND DATE(date_time) = $2
       ORDER BY date_time;`,
      [serialNumber, parsedDate]
    );

    // If no data is found, return a 404 error
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No data found" });
    }

    // Return the resulting rows as JSON
    return res.json(result.rows);
  } catch (error) {
    // Log any errors and return a 500 error response
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to retrieve data" });
  }
};




export const activitiyController = {
  getActivities,
  getActivityTracks,
  getActivityLogForTractor
};
