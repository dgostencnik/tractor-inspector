<script setup lang="ts">
import AppHeader from "../components/app-header.vue";
import ActivitiesList from "../components/fleet-map/activities-list.vue";
import MapComponent from "../components/fleet-map/map-component.vue";
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
      <!-- Activities list (sidebar) -->
      <div class="w-64 overflow-y-scroll ">
        <ActivitiesList />
      </div>

      <!-- Map component (fills remaining space) -->
      <div class="flex-1">
        <MapComponent class="w-full h-full" />
      </div>
    </div>
  </div>
</template>
