import { query } from "../db.js";
import { VALID_SORT_COLUMNS, UPDATABLE_COLUMNS } from "../lib/const.js";
import { addImageUrl, sendZodError } from "../lib/utils.js";
import { EditTelemetryLogItemSchema } from "../schemas/telemetry-log-item.js";
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

const getTractorTelemetryLog = async (req, res) => {
  try {
    const { serialNumber, logId } = req.params;

    const parsedLogId = parseInt(logId);

    if (isNaN(parsedLogId)) {
      return res.status(400).json({ error: "Invalid log ID" });
    }

    const result = await query(
      `SELECT *
       FROM vehicle_sessions  
       where id=$1 and 
       serial_number=$2
       `,
      [parsedLogId, serialNumber]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Telemetry log not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to retrieve data" });
  }
};

const updateTractorTelemetryLog = async (req, res) => {
  try {
    const { serialNumber, logId } = req.params;
    const parsedLogId = parseInt(logId);

    if (isNaN(parsedLogId)) {
      return res.status(400).json({ error: "Invalid log ID" });
    }

    const existingTelemetryLog = await query(
      `
      SELECT id
      FROM vehicle_sessions  
      WHERE id = $1 AND serial_number = $2
    `,
      [parsedLogId, serialNumber]
    );

    if (existingTelemetryLog.rows.length === 0) {
      return res.status(404).json({ error: "Telemetry log not found" });
    }

    // Get the request body and filter out undefined/null values
    const updateData = req.body;
    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "No data provided for update" });
    }

    //validate data

    const validationResult = EditTelemetryLogItemSchema.safeParse(updateData);

    let validData;
    if (!validationResult.success) {
      return sendZodError(res, validationResult.error);
    } else {
      validData = validationResult.data;
    }

    // Build dynamic UPDATE query
    const updateFields = [];
    const updateValues = [parsedLogId, serialNumber];
    let paramIndex = 3;

    for (const [key, value] of Object.entries(validData)) {
      if (
        UPDATABLE_COLUMNS.includes(key) &&
        value !== undefined &&
        value !== null
      ) {
        updateFields.push(`${key} = $${paramIndex}`);
        updateValues.push(value);
        paramIndex++;
      }
    }

    if (updateFields.length === 0) {
      return res.status(400).json({
        error: "No valid fields provided for update",
      });
    }

    // Execute the update
    const updateQuery = `
      UPDATE vehicle_sessions 
      SET ${updateFields.join(", ")}
      WHERE id = $1 AND serial_number = $2
      RETURNING *
    `;

    const result = await query(updateQuery, updateValues);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Failed to update telemetry log" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating telemetry log:", error);
    res.status(500).json({ error: "Failed to update telemetry log" });
  }
};

export const tractorController = {
  getTractor,
  getTractors,
  getTractorTelemetry,
  getTractorTelemetryLog,
  updateTractorTelemetryLog,
};
