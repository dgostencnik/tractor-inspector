<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

import ActivitiesList from "../components/activities/activities-list.vue";
import MapComponent from "../components/activities/map-component.vue";
import AppHeader from "../components/app-header.vue";
import { useActivitiesStore } from "../stores/activities-store";
import env from "../utils/env";

const route = useRoute();

const serviceUrl = computed(() => String(route.params.date) ? `${env.VITE_TRACTOR_API_URL}/activities/${route.params.date}` : undefined);

const activitiesStore = useActivitiesStore();
onMounted(() => {
  if (!activitiesStore.activities) {
    activitiesStore.fetchActivities();
  }
});

watch(
  () => route.params,
  async (newParams, oldParams) => {
    if (newParams.date !== oldParams?.date) {
      const selectedActivity = activitiesStore.activities?.find(activity => activity.date === String(route.params.date));
      if (selectedActivity) {
        activitiesStore.selectedActivity = selectedActivity;
      }
    }
  },
  { immediate: true },
);

watch(
  () => activitiesStore.activities,
  async (newActivities, oldActivities) => {
    if (!!newActivities?.length && !oldActivities?.length) {
      const selectedActivity = newActivities?.find(activity => activity.date === String(route.params.date));
      if (selectedActivity) {
        activitiesStore.selectedActivity = selectedActivity;
      }
    }
  },
  { immediate: true },
);
</script>

<template>
  <div class="fixed inset-0 flex flex-col bg-base-100">
    <!-- Header -->
    <AppHeader back-to="/" icon="tabler:tractor">
      <template #title>
        <div>
          <h1 class="text-xl font-bold">
            Fleet map
          </h1>
        </div>
      </template>
    </AppHeader>

    <!-- Main content area below header -->
    <div class="flex flex-row flex-1 overflow-hidden">
      <div class="w-64 overflow-y-scroll ">
        <ActivitiesList />
      </div>
      <!-- Map component (fills remaining space) -->
      <div class="flex-1">
        <MapComponent
          class="w-full h-full"
          :url="serviceUrl"
        />
      </div>
    </div>
  </div>
</template>
