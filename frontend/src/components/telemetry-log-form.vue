<script setup lang="ts">
import type { ZodSchema } from "zod";

import { Icon } from "@iconify/vue";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { computed, ref, watch } from "vue";

import type { EditTelemetryLogItem } from "../schemas/telemetry-log-item";

import { useToast } from "../composables/use-toast";
import { ToastTypes } from "../types";
import FormField from "./form-field.vue";
import Toaster from "./toaster.vue";

const props = defineProps<{
  onSubmit: (location: EditTelemetryLogItem) => Promise<any>;
  initialValues: EditTelemetryLogItem;
  schema: ZodSchema;

}>();

const { handleSubmit, errors, resetForm, values } = useForm({
  validationSchema: toTypedSchema(props.schema),
  initialValues: props.initialValues,
});

const { showToast, removeToast, toasts } = useToast();

const numberOfErrors = computed(() => Object.keys(errors.value).length);

const submitError = ref<string>("");
const isPending = ref(false);
const isSubmitted = ref(false);

const onSubmit = handleSubmit(async (values: unknown) => {
  const typedValues = values as EditTelemetryLogItem;

  try {
    isPending.value = true;
    isSubmitted.value = false;
    submitError.value = "";
    await props.onSubmit(typedValues);
    isSubmitted.value = true;
    showToast("Changes saved successfully!", ToastTypes.success);
  }
  catch (e) {
    if (e instanceof Error) {
      submitError.value = e.message || "An unknown error occurred.";
    }
    else {
      submitError.value = "An unknown error occurred.";
    }
  }
  finally {
    isPending.value = false;
  }
});

function onResetForm() {
  resetForm({ values: props.initialValues });
  submitError.value = "";
  isSubmitted.value = false;
  showToast("Form was reset to initial state", ToastTypes.info, 10000);
}

const locationFields = [
  { key: "gps_longitude", label: "GPS longitude [°]", type: "number" },
  { key: "gps_latitude", label: "GPS latitude [°]", type: "number" },
];

const engine = [
  { key: "total_working_hours_counter", label: "Total working hours counter [h]", type: "number" },
  { key: "engine_speed", label: "Engine speed [rpm]", type: "number" },
  { key: "engine_load", label: "Engine load [%]", sortable: false, type: "number" },
  { key: "fuel_consumption", label: "Fuel consumption [l/h]", type: "number" },
  { key: "coolant_temperature", label: "Coolant temperature [°C]", type: "number" },

];

const movement = [
  { key: "ground_speed_gearbox", label: "Ground speed gearbox [km/h]", type: "number" },
  { key: "ground_speed_radar", label: "Ground speed radar [km/h]", type: "number" },
  { key: "speed_front_pto", label: "Speed front PTO [rpm]", type: "number" },
  { key: "speed_rear_pto", label: "Speed rear PTO [rpm]", type: "number" },
  { key: "current_gear_shift", label: "Current gear shift []", type: "number" },
];

const status = [
  { key: "ambient_temperature", label: "Ambient temperature [°C]", type: "number" },
  { key: "parking_brake_status", label: "Parking brake status []", type: "number" },
  { key: "transverse_differential_lock_status", label: "Transverse differential lock status []", type: "number" },
  { key: "all_wheel_drive_status", label: "All-wheel drive status []", type: "number" },
  { key: "actual_status_of_creeper", label: "Actual status of creeper []", type: "number" },
];

const sections = [{
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

watch(
  values,
  () => {
    if (submitError.value) {
      submitError.value = "";
    }
  },
  { deep: true },
);
</script>

<template>
  <div class="flex flex-col gap-4">
    <div
      v-if="submitError"
      role="alert"
      class="alert alert-error flex flex-col justify-center items-start "
    >
      <div class="flex justify-center items-center gap-4 text-xl">
        <Icon icon="tabler:alert-triangle-filled" />
        <span>Error</span>
      </div>
      {{ submitError }}
    </div>

    <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
      <div class="flex flex-col gap-4">
        <div
          v-for="section in sections"
          :key="section.key"
          class="card bg-base-100 shadow"
        >
          <div class="card-body">
            <h3 class="card-title text-lg mb-4" :class="section.class">
              <Icon :icon="section.icon" />
              {{ section.label }}
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                v-for="field in section.items"
                :key="field.key"
                class="form-field"
              >
                <FormField
                  :name="field.key"
                  :label="field.label"
                  type="text"
                  :error="errors[field.key]"
                  :disabled="isPending"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div class="text-sm text-base-content/70">
              <div v-if="numberOfErrors > 0" class="flex items-center text-error">
                <Icon

                  icon="tabler:alert-triangle-filled"
                  class="mr-2"
                />
                {{ numberOfErrors }} field(s) are invalid
              </div>
            </div>
            <div class="flex gap-3">
              <button
                type="button"
                class="btn btn-outline"
                :disabled="isPending"
                @click="onResetForm"
              >
                <Icon icon="tabler:restore" class="text-lg" />
                Reset
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                :class="{ 'success-pulse': isSubmitted }"
                :disabled="isPending || numberOfErrors > 0"
              >
                <span v-if="isPending" class="loading loading-spinner loading-sm mr-2" />
                <Icon
                  v-else
                  icon="tabler:device-floppy"
                  class="text-lg"
                />
                {{ isPending ? 'Saving...' : 'Save Changes' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
    <Toaster
      :toasts="toasts"
      @remove-toast="removeToast"
    />
  </div>
</template>
