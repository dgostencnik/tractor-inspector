export type Tractor = {
  serialNumber: string;
  totalWorkingHours: number;
  lastActive: string;
  imageUrl?: string;
  location?: string;
};

export type TractorTelemetryItem = {
  id: number;
  date_time: string;
  serial_number: string;
  gps_longitude: number;
  gps_latitude: number;
  total_working_hours_counter: number;
  engine_speed: number;
  engine_load: number;
  fuel_consumption: number;
  ground_speed_gearbox: number;
  ground_speed_radar: number;
  coolant_temperature: number;
  speed_front_pto: number;
  speed_rear_pto: number;
  current_gear_shift: number | null;
  ambient_temperature: number;
  parking_brake_status: number;
  transverse_differential_lock_status: number;
  all_wheel_drive_status: "Automatic" | "Manual" | string;
  actual_status_of_creeper: string | null;
};
