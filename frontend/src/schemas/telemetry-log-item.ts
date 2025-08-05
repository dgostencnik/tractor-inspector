import z from "zod";

export const EditTelemetryLogItemSchema = z.object({
  gps_longitude: z.coerce.number().min(-180).max(180),
  gps_latitude: z.coerce.number().min(-90).max(90),
  total_working_hours_counter: z.number(),
  engine_speed: z.number(),
  engine_load: z.coerce.number().int().min(0).max(100),
  fuel_consumption: z.number(),
  ground_speed_gearbox: z.number(),
  ground_speed_radar: z.number(),
  coolant_temperature: z.coerce.number().int().min(0).max(100),
  speed_front_pto: z.number().int(),
  speed_rear_pto: z.number().int(),
  current_gear_shift: z.number().int().nullable(),
  ambient_temperature: z.number().nullable(),
  parking_brake_status: z.number().int(),
  transverse_differential_lock_status: z.number().int(),
  all_wheel_drive_status: z.string(),
  actual_status_of_creeper: z.string().nullable(),
});

export type EditTelemetryLogItem = z.infer<typeof EditTelemetryLogItemSchema>;
