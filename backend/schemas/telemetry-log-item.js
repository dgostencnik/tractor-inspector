import z from "zod";

export const EditTelemetryLogItemSchema = z.object({
  gps_longitude: z.coerce.number().min(-180).max(180),
  gps_latitude: z.coerce.number().min(-90).max(90),
  total_working_hours_counter: z.coerce.number(),
  engine_speed: z.coerce.number(),
  engine_load: z.coerce.number().int().min(0).max(100),
  fuel_consumption: z.coerce.number(),
  ground_speed_gearbox: z.coerce.number(),
  ground_speed_radar: z.coerce.number(),
  coolant_temperature: z.coerce.number().int().min(0).max(100),
  speed_front_pto: z.coerce.number().int(),
  speed_rear_pto: z.coerce.number().int(),
  current_gear_shift: z.coerce.number().int().nullable(),
  ambient_temperature: z.coerce.number().nullable(),
  parking_brake_status: z.coerce.number().int(),
  transverse_differential_lock_status: z.coerce.number().int(),
  all_wheel_drive_status: z.string(),
  actual_status_of_creeper: z.string().nullable(),
});
