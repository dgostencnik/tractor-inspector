<script setup lang="ts">
import AppHeader from "../components/app-header.vue";
import DisplayMessage from "../components/display-message.vue";
</script>

<template>
  <AppHeader icon="tabler:tractor">
    <template #title>
      <div class="flex gap-4 items-center">
        <h1 class="text-2xl font-bold">
          Tractor Inspector
        </h1>
        <RouterLink
          class="btn btn-primary"
          to="/activities"
        >
          <Icon icon="tabler:map" />
          <span>Fleet Map</span>
        </RouterLink>
      </div>
    </template>
  </AppHeader>

  <main class="flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h flex-1 w-full">
    <DisplayMessage
      title="Error"
      description="Page not found"
      icon="tabler:alert-triangle"
      class="flex-1"
    >
      <div class="flex gap-2 justify-center">
        <RouterLink to="/" class="btn btn-success">
          Home
        </RouterLink>
      </div>
    </DisplayMessage>
  </main>
</template>
