<script lang="ts" setup>
import { onMounted } from "vue";
import { RouterLink } from "vue-router";

import type { Activity } from "../../types";

import { activitiesApi } from "../../api/activities";
import { useFetch } from "../../composables/use-fetch";

const { data: activities, refetchData } = useFetch<Activity[], []>(activitiesApi.getActivities);

onMounted(() => {
  refetchData();
});
</script>

<template>
  <div class="flex flex-col bg-base-200 ">
    <h2 class="text-2xl p-4">
      Activities
    </h2>
    <div class="flex flex-col gap-2 justify-center items-center ">
      <RouterLink
        v-for="activity in activities"
        :key="activity.date"
        :to="`/map/${activity.date}`"
        class="w-full"
      >
        <div class="card bg-base-100 shadow  flex-1">
          <div class="card-body">
            <h2 class="card-title">
              {{ new Date(activity.date).toLocaleDateString() }}
            </h2>
            <p>
              active vehicles: {{ activity.serialNumbers.length }}
            </p>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
