import { defineStore } from "pinia";
import { ref } from "vue";

import type { Activity } from "../types";

import { activitiesApi } from "../api/activities";
import { useFetch } from "../composables/use-fetch";

export const useActivitiesStore = defineStore("activitiesStore", () => {
  const { data: activities, refetchData: fetchActivities, loading: loadingActivities, error: errorActivities } = useFetch<Activity[], []>(activitiesApi.getActivities);

  const selectedActivity = ref<Activity | null>(null);

  return { activities, fetchActivities, loadingActivities, errorActivities, selectedActivity };
});
