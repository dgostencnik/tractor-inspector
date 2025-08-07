import z from "zod";

import { optionalNumber, requiredInt, requiredNumber } from "../utils/validation";

export const EditTelemetryLogItemSchema = z.object({
  gps_longitude: requiredNumber("GPS longitude", -180, 180),
  gps_latitude: requiredNumber("GPS latitude", -90, 90),
  total_working_hours_counter: requiredNumber("Total working hours counter", 0),
  engine_speed: requiredNumber("Engine speed", 0),
  engine_load: requiredInt("Engine load", 0, 100),
  fuel_consumption: requiredNumber("Fuel consumption", 0),
  ground_speed_gearbox: requiredNumber("Ground speed gearbox", 0),
  ground_speed_radar: requiredNumber("Ground speed radar", 0),
  coolant_temperature: requiredInt("Coolant temperature", 0, 100),
  speed_front_pto: requiredInt("Speed front PTO", 0, Number.POSITIVE_INFINITY),
  speed_rear_pto: requiredInt("Speed rear PTO", 0, Number.POSITIVE_INFINITY),
  current_gear_shift: optionalNumber("Current gear shift", { isInt: true, min: 0 }),
  ambient_temperature: optionalNumber("Ambient temperature", { min: -40, max: 55 }),
  parking_brake_status: requiredInt("Parking brake status", 0, 5),
  transverse_differential_lock_status: requiredInt("Transverse differential lock status", 0, 5),
  all_wheel_drive_status: z.string().nullable(),
  actual_status_of_creeper: z.string().nullable(),
});

export type EditTelemetryLogItem = z.infer<typeof EditTelemetryLogItemSchema>;
