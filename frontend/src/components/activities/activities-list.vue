<script lang="ts" setup>
import { RouterLink } from "vue-router";

import { useActivitiesStore } from "../../stores/activities-store";

defineProps<{ isEnabled?: boolean }>();

const activitiesStore = useActivitiesStore();
</script>

<template>
  <div class="flex flex-col bg-base-200">
    <h2 class="text-2xl p-4">
      Activities
    </h2>
    <div class="flex flex-row lg:flex-col gap-3 p-4">
      <RouterLink
        v-for="activity in activitiesStore.activities"
        :key="activity.date"
        :to="`/activities/${activity.date}`"
        class="w-full hover:scale-[1.01] transition-transform"
        :class="{ 'border-2 border-primary rounded': activity.date === activitiesStore.selectedActivity?.date }"
        :style="{
          pointerEvents: isEnabled && !activitiesStore.loadingActivities ? '' : 'none',
        }"
      >
        <div class="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
          <div class="card-body">
            <h2 class="card-title">
              {{ new Date(activity.date).toLocaleDateString() }}
            </h2>
            <p class="text-base-content/70">
              Active vehicles: {{ activity.serialNumbers.length }}
            </p>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
