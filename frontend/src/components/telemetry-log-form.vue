<script setup lang="ts">
import type { ZodSchema } from "zod";

import { Icon } from "@iconify/vue";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { computed, ref, watch } from "vue";

import type { EditTelemetryLogItem } from "../schemas/telemetry-log-item";

import { useToast } from "../composables/use-toast";
import { telemetryLogEditForm } from "../config/telemetry-log-form";
import { ToastTypes } from "../types";
import FormField from "./form-field.vue";
import Toaster from "./toaster.vue";

const props = defineProps<{
  onSubmit: (location: EditTelemetryLogItem) => Promise<any>;
  initialValues: EditTelemetryLogItem;
  schema: ZodSchema;
}>();

const { handleSubmit, errors, resetForm, values, setErrors: setFormErrors } = useForm({
  validationSchema: toTypedSchema(props.schema),
  initialValues: props.initialValues,
});

const { showToast, removeToast, toasts } = useToast();

const numberOfErrors = computed(() => Object.keys(errors.value).length);

const submitError = ref<string>("");
const isPending = ref(false);

const onSubmit = handleSubmit(async (values: unknown) => {
  const typedValues = values as EditTelemetryLogItem;

  try {
    isPending.value = true;
    submitError.value = "";
    await props.onSubmit(typedValues);
    showToast("Changes saved successfully!", ToastTypes.success);
  }
  catch (e) {
    if (e instanceof Error) {
      try {
        const parsed = JSON.parse(e.message);
        submitError.value = "Some fields are invalid. Please review the form";
        const formErrors = JSON.parse(parsed.message);
        setFormErrors(formErrors);
      }
      catch (err) {
      // fallback
        console.warn(err);
        submitError.value = e.message || "An unknown error occurred.";
      }
    }
    else {
      submitError.value = "An unknown error occurred.";
    }
    showToast(`Save failed: ${submitError.value}`, ToastTypes.error);
  }
  finally {
    isPending.value = false;
  }
});

function onResetForm() {
  resetForm({ values: props.initialValues });
  submitError.value = "";
  showToast("Form was reset to initial state", ToastTypes.info, 10000);
}

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
      class="alert alert-error flex flex-col justify-center items-start"
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
          v-for="section in telemetryLogEditForm"
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
          <div
            class="flex flex-col sm:flex-row justify-between items-center gap-4"
          >
            <div class="text-sm text-base-content/70">
              <div
                v-if="numberOfErrors > 0"
                class="flex items-center text-error"
              >
                <Icon icon="tabler:alert-triangle-filled" class="mr-2" />
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
                :disabled="isPending || numberOfErrors > 0"
              >
                <span
                  v-if="isPending"
                  class="loading loading-spinner loading-sm mr-2"
                />
                <Icon
                  v-else
                  icon="tabler:device-floppy"
                  class="text-lg"
                />
                {{ isPending ? "Saving..." : "Save Changes" }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
    <Toaster :toasts="toasts" @remove-toast="removeToast" />
  </div>
</template>
