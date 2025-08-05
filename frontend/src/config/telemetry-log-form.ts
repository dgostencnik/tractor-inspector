type FormField = {
  key: string;
  label: string;
  type: string;
};

type FormGroup = {
  key: string;
  label: string;
  items: FormField[];
  icon: string;
  class: string;
};

const locationFields: FormField[] = [
  { key: "gps_longitude", label: "GPS longitude [°]", type: "number" },
  { key: "gps_latitude", label: "GPS latitude [°]", type: "number" },
];

const engine: FormField[] = [
  { key: "total_working_hours_counter", label: "Total working hours counter [h]", type: "number" },
  { key: "engine_speed", label: "Engine speed [rpm]", type: "number" },
  { key: "engine_load", label: "Engine load [%]", type: "number" },
  { key: "fuel_consumption", label: "Fuel consumption [l/h]", type: "number" },
  { key: "coolant_temperature", label: "Coolant temperature [°C]", type: "number" },

];

const movement: FormField[] = [
  { key: "ground_speed_gearbox", label: "Ground speed gearbox [km/h]", type: "number" },
  { key: "ground_speed_radar", label: "Ground speed radar [km/h]", type: "number" },
  { key: "speed_front_pto", label: "Speed front PTO [rpm]", type: "number" },
  { key: "speed_rear_pto", label: "Speed rear PTO [rpm]", type: "number" },
  { key: "current_gear_shift", label: "Current gear shift []", type: "number" },
];

const status: FormField[] = [
  { key: "ambient_temperature", label: "Ambient temperature [°C]", type: "number" },
  { key: "parking_brake_status", label: "Parking brake status []", type: "number" },
  { key: "transverse_differential_lock_status", label: "Transverse differential lock status []", type: "number" },
  { key: "all_wheel_drive_status", label: "All-wheel drive status []", type: "number" },
  { key: "actual_status_of_creeper", label: "Actual status of creeper []", type: "number" },
];

export const telemetryLogEditForm: FormGroup[] = [{
  key: "location",
  label: "Location",
  items: locationFields,
  icon: "tabler:map-pin-filled",
  class: "text-primary",
}, {
  key: "engine",
  label: "Engine & Powertrain",
  items: engine,
  icon: "tabler:settings",
  class: "text-success",

}, {
  key: "movement",
  label: "Movement & Speed",
  items: movement,
  icon: "tabler:brand-speedtest",
  class: "text-warning",

}, {
  key: "status",
  label: "Operational Status",
  items: status,
  icon: "tabler:list-check",
  class: "text-info",

}];
