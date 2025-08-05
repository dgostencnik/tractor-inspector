import type { PaginationParams } from "../types";

import { SORT_ORDERS } from "../types";
import { formatISO8601Date } from "./formatters";

export const TRACTOR_API_ENDPOINT = "http://localhost:3000";

export const defaultTractorImageUrl = "https://images.unsplash.com/photo-1530267981375-f0de937f5f13?q=80&w=640";

export const tractorDefaultPagination: PaginationParams = {
  page: 1,
  pageSize: 25,
  sort: "date_time",
  order: SORT_ORDERS.ASC,
};

export const tractorSessionTableColumns = [
  { key: "date_time", label: "Date/Time", type: "Date", link: true, format: formatISO8601Date },
  { key: "gps_longitude", label: "GPS longitude [°]", type: "number" },
  { key: "gps_latitude", label: "GPS latitude [°]", type: "number" },
  { key: "total_working_hours_counter", label: "Total working hours counter [h]", type: "number" },
  { key: "engine_speed", label: "Engine speed [rpm]", type: "number" },
  { key: "engine_load", label: "Engine load [%]", sortable: false, type: "number" },
  { key: "fuel_consumption", label: "Fuel consumption [l/h]", type: "number" },
  { key: "ground_speed_gearbox", label: "Ground speed gearbox [km/h]", type: "number" },
  { key: "ground_speed_radar", label: "Ground speed radar [km/h]", type: "number" },
  { key: "coolant_temperature", label: "Coolant temperature [°C]", type: "number" },
  { key: "speed_front_pto", label: "Speed front PTO [rpm]", type: "number" },
  { key: "speed_rear_pto", label: "Speed rear PTO [rpm]", type: "number" },
  { key: "current_gear_shift", label: "Current gear shift []", type: "number" },
  { key: "ambient_temperature", label: "Ambient temperature [°C]", type: "number" },
  { key: "parking_brake_status", label: "Parking brake status []", type: "number" },
  { key: "transverse_differential_lock_status", label: "Transverse differential lock status []", type: "number" },
  { key: "all_wheel_drive_status", label: "All-wheel drive status []", type: "number" },
  { key: "actual_status_of_creeper", label: "Actual status of creeper []", type: "number" },

];
