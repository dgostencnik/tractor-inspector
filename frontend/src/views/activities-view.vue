<script setup lang="ts">
import { fromLonLat } from "ol/proj";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

import type { ActivityLogRecord } from "../types";

import { activitiesApi } from "../api/activities";
import ActivitiesList from "../components/activities/activities-list.vue";
import Legend from "../components/activities/legend.vue";
import MapComponent from "../components/activities/map-component.vue";
import Player from "../components/activities/player.vue";
import AppHeader from "../components/app-header.vue";
import DisplayMessage from "../components/display-message.vue";
import { useFetch } from "../composables/use-fetch";
import { usePlayer } from "../composables/use-player";
import { useActivitiesStore } from "../stores/activities-store";
import env from "../utils/env";
import { formatISO8601Time } from "../utils/formatters";
import { getCenter, getColorForFeature } from "../utils/map";

const route = useRoute();

const activitiesStore = useActivitiesStore();
const player = usePlayer({ step: 1000 * 20 });

const { data, refetchData, loading, error } = useFetch<Map<string, ActivityLogRecord>, [string[], string]>(activitiesApi.getActivityLogsForTractors);

const features = ref<{ serialNumber: string; color: string; coordinate: [number, number] }[]>([]);

const legendItems = computed(() => features.value.map(f => ({ id: f.serialNumber, title: f.serialNumber, color: f.color })));
const mapCenter = ref(fromLonLat([20, 46]));

const activitiesTracksUrl = computed(() => {
  if (activitiesStore.selectedActivity) {
    return `${env.VITE_TRACTOR_API_URL}/activities/${activitiesStore.selectedActivity.date}`;
  }
  return undefined;
});

onMounted(() => {
  if (!activitiesStore.activities) {
    activitiesStore.fetchActivities();
  }
  if (activitiesStore.selectedActivity) {
    refetchData(activitiesStore.selectedActivity.serialNumbers, activitiesStore.selectedActivity.date);
  }
});

onUnmounted(() => {
  player.cleanUp();
});

function resetPlayerAndMapFeatures() {
  if (features.value.length > 0) {
    features.value = [];
  }
  player.isEnabled.value = false;
  player.cleanUp();
}

watch(
  () => route.params,
  async (newParams, oldParams) => {
    if (newParams.date !== oldParams?.date) {
      resetPlayerAndMapFeatures();
      const selectedActivity = activitiesStore.activities?.find(activity => activity.date === newParams.date);
      if (selectedActivity) {
        activitiesStore.selectedActivity = selectedActivity;
      }
    }
  },
  { immediate: true },
);

watch(
  () => activitiesStore.selectedActivity,
  async (newSelectedActivity, oldSelectedActivity) => {
    resetPlayerAndMapFeatures();
    if (newSelectedActivity && newSelectedActivity?.date !== oldSelectedActivity?.date) {
      refetchData(newSelectedActivity.serialNumbers, newSelectedActivity.date);
    }
  },

  { immediate: true },
);

watch(
  () => activitiesStore.activities,
  async (newActivities, oldActivities) => {
    if (!!newActivities?.length && !oldActivities?.length) {
      resetPlayerAndMapFeatures();
      const selectedActivity = newActivities?.find(activity => activity.date === String(route.params.date));
      if (selectedActivity) {
        activitiesStore.selectedActivity = selectedActivity;
      }
    }
  },
  { immediate: true },
);

watch(() => data.value, () => {
  // initialize features
  const initialFeatures: { serialNumber: string; color: string; coordinate: [number, number] }[] = [];
  if (data.value) {
    for (const [key, value] of data.value) {
      initialFeatures.push({ serialNumber: key, color: getColorForFeature(key), coordinate: [value.points[0].lng, value.points[0].lat] });
    }
    features.value = initialFeatures;

    const center = getCenter(initialFeatures.map(f => ({ lat: f.coordinate[0], lng: f.coordinate[1] })));

    mapCenter.value = fromLonLat(center);
  }

  // initialize player
  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;
  if (data.value) {
    for (const value of data.value.values()) {
      if (value.min < min) {
        min = value.min;
      }
      if (value.max > max) {
        max = value.max;
      }
    }
  }
  player.initialize({ speed: 1, minValue: min, maxValue: max });
});

watch(() => player.currentValue.value, () => {
  if (data.value) {
    const newLocations = new Map<string, [number, number]>();
    for (const [key, value] of data.value) {
      if (!value.points)
        return;

      for (let i = 0; i < value.points.length; i++) {
        if (new Date(value.points[i].date).getTime() > player.currentValue.value) {
          newLocations.set(key, [value.points[i].lng, value.points[i].lat]);
          break;
        }
      }
    }
    features.value = features.value?.map(f => ({ ...f, coordinate: newLocations.get(f.serialNumber) ?? [0, 0] }));
  }
});
</script>

<template>
  <div class="fixed inset-0 flex flex-col bg-base-100">
    <AppHeader back-to="/" icon="tabler:tractor">
      <template #title>
        <div>
          <h1 class="text-xl font-bold">
            Fleet map
          </h1>
          <p>
            {{ activitiesStore.selectedActivity ? new Date(activitiesStore.selectedActivity.date).toLocaleDateString() : '' }}
          </p>
        </div>
      </template>
    </AppHeader>

    <div class="flex flex-col lg:flex-row flex-1 lg:overflow-hidden">
      <div class="w-full lg:w-64 overflow-x-scroll lg:overflow-y-scroll  ">
        <ActivitiesList :is-enabled="!loading" />
      </div>
      <div class="flex flex-col flex-1">
        <MapComponent
          class="w-full h-full p-4 bg-base-200"
          :overlay-layer-url="activitiesTracksUrl"
          :features
          :center="mapCenter"
        />

        <div
          v-if="error"
          class="flex flex-col-reverse md:flex-row"
        >
          <DisplayMessage
            title="Error"
            :description="`Error loading data: ${error}`"
            icon="tabler:alert-triangle"
          />
        </div>
        <div
          v-else
          class="flex flex-col-reverse md:flex-row"
        >
          <Legend :legend-items="legendItems" :is-loading="loading" />
          <div class="flex-1">
            <Player
              :is-playing="player.isPlaying.value"
              :speed="player.speed.value"
              :min-time="player.minValue.value"
              :max-time="player.maxValue.value"
              :current-time="player.currentValue.value"
              :is-enabled="player.isEnabled.value && !loading"
              :is-loading="loading"
              :title-formatter="formatISO8601Time"
              @on-pause="player.onPause"
              @on-stop="player.onStop"
              @on-play="player.onPlay"
              @on-seek="player.onSeek"
              @on-speed-change="player.onSpeedChange"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
