<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useRouter } from "vue-router";

import AppHeader from "../components/app-header.vue";
import DisplayMessage from "../components/display-message.vue";
import { useActivitiesStore } from "../stores/activities-store";

const activitiesStore = useActivitiesStore();

const router = useRouter();

onMounted(async () => {
  if (!activitiesStore.activities) {
    await activitiesStore.fetchActivities();
  }
});

watch(
  () => activitiesStore.activities,
  async (newActivities, oldActivities) => {
    if (!!newActivities?.length && !oldActivities?.length) {
      activitiesStore.selectedActivity = newActivities[0];
      router.push(`/activities/${activitiesStore.selectedActivity.date}`);
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
    <div class="flex  flex-1 overflow-hidden justify-center items-center gap-2">
      <div v-if="activitiesStore.loadingActivities" class="flex flex-col justify-center items-center gap-2">
        <span
          class="loading loading-spinner loading-xl"
        />
        <p>Loading</p>
      </div>
      <DisplayMessage
        v-if="!activitiesStore.loadingActivities && activitiesStore.errorActivities"
        title="Error"
        :description="activitiesStore.errorActivities"
        icon="tabler:alert-triangle"
      />
    </div>
  </div>
</template>
