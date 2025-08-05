<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";

import type { EditTelemetryLogItem } from "../schemas/telemetry-log-item";
import type { TractorTelemetryItem } from "../types";

import { tractorsApi } from "../api/tractors";
import AppHeader from "../components/app-header.vue";
import DisplayMessage from "../components/display-message.vue";
import TelemetryLogForm from "../components/telemetry-log-form.vue";
import { useFetch } from "../composables/use-fetch";
import { EditTelemetryLogItemSchema } from "../schemas/telemetry-log-item";
import { formatISO8601Date } from "../utils/formatters";

const route = useRoute();

const { loading, data, error, refetchData } = useFetch<TractorTelemetryItem, [string, number]>(tractorsApi.getTractorTelemetryItem);

const backToLink = computed(() => {
  if (data.value?.serial_number) {
    return `/tractors/${data.value.serial_number}`;
  }
  return "/";
});

const title = computed(() => {
  if (data.value?.serial_number) {
    return `${data.value.serial_number} - ${formatISO8601Date(data.value.date_time)}`;
  }
  return "N/A";
});

onMounted(async () => {
  const itemId = Number.parseInt(String(route.params.itemId));

  if (route.params.id) {
    await refetchData(String(route.params.id), itemId);
  }
});

async function submit(v: EditTelemetryLogItem) {
  await tractorsApi.updateTractorTelemetryItem(String(route.params.id), Number.parseInt(String(route.params.itemId)), v);
}
</script>

<template>
  <AppHeader :back-to="backToLink" icon="tabler:edit">
    <template #title>
      <div>
        <h1 class="text-xl font-bold">
          {{ title }}
        </h1>
        <p class="text-sm text-base-content/70">
          Edit telemetry item
        </p>
      </div>
    </template>
  </AppHeader>

  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h flex-1 w-full">
    <DisplayMessage
      v-if="error"
      title="Error"
      :description="`Error loading data: ${error}`"
      icon="tabler:alert-triangle"
    >
      <div class="flex gap-2 justify-center">
        <RouterLink to="/" class="btn btn-success">
          Back Home
        </RouterLink>
      </div>
    </DisplayMessage>

    <DisplayMessage
      v-if="!loading && !error && !data"
      title="Record not found"
      description="No record is matching provided criteria. Please verify the inputs and try again."
      icon="tabler:search"
    >
      <RouterLink to="/" class="btn btn-success">
        Back Home
      </RouterLink>
    </DisplayMessage>

    <TelemetryLogForm
      v-if="data"
      :schema="EditTelemetryLogItemSchema"
      :initial-values="data"
      :on-submit="submit"
    />
  </main>
</template>
