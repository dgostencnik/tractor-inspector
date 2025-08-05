<script setup lang="ts">
import type { Tractor } from '../types'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '.././components/app-header.vue'
import { tractorsApi } from '../api/tractors'
import DisplayMessage from '../components/display-message.vue'
import StatPanel from '../components/stat-panel.vue'
import { useFetch } from '../composables/use-fetch'

const route = useRoute()

const { loading, data, error, refetchData } = useFetch<Tractor, [string]>(tractorsApi.getTractor)
// const { data: sessionData, refetchData: refetchSessionData } = useFetch<unknown, [string, { pageSize?: number }]>(tractorsApi.getTractorSessionData)

const tractorStats = computed(() =>
  [{ title: 'Total Hours', icon: 'tabler:clock-filled', value: String(data.value?.totalWorkingHours), className: 'text-success' }, { title: 'Last Active', icon: 'tabler:calendar', value: String(data?.value?.lastActive), className: 'text-info' }, { title: 'Current Location', icon: 'tabler:map-pin-filled', value: String(data?.value?.location || 'N/A'), className: 'text-warning' }, { title: 'Status', icon: 'tabler:circle-filled', value: 'N/A', className: 'text-warning' },
  ])

onMounted(() => {
  if (route.params.id) {
    refetchData(String(route.params.id))
    // refetchSessionData(String(route.params.id), { pageSize: 1 })
  }
})
</script>

<template>
  <AppHeader back-to="/" icon="tabler:tractor">
    <template #title>
      <div>
        <h1 class="text-xl font-bold">
          {{ data?.serialNumber }}
        </h1>
        <p class="text-sm text-base-content/70">
          Tractor Details
        </p>
      </div>
    </template>
  </AppHeader>

  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h flex-1 ">
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
      title="Tractor not found"
      description="No tractor matching the provided serial number was found. Please verify the number and try again."
      icon="tabler:search"
    >
      <RouterLink to="/" class="btn btn-success">
        Back Home
      </RouterLink>
    </DisplayMessage>

    <StatPanel
      v-if="data"
      :stats="tractorStats"
      class="bg-base-100"
    />
  </main>
</template>
