<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed, ref } from 'vue'
import AppHeader from '.././components/app-header.vue'
import TractorCard from '../components/tractor-card.vue'

const loading = ref(false)
const filterQuery = ref('')

const mockTractors = [
  {
    serialNumber: 'A2302895',
    totalWorkingHours: 1245,
    imageUrl: '/images/A2302895.jpg',
    status: 'Active',
    lastActive: 'Mar 14, 2026 6:44:12 AM',
    location: 'Field A-12',
  },
  {
    serialNumber: 'A2302900',
    totalWorkingHours: 987,
    imageUrl: '/images/A2302900.jpg',
    status: 'Maintenance',
    lastActive: '2024-07-30T16:45:00Z',
    location: 'Workshop',
  },
  {
    serialNumber: 'A6002059',
    totalWorkingHours: 2156,
    imageUrl: '/images/A6002059.jpg',
    status: 'Active',
    lastActive: '2024-08-01T09:15:00Z',
    location: 'Field B-7',
  },

]

const filteredTractors = computed(() => mockTractors.filter((t) => {
  const query = filterQuery.value.toLocaleLowerCase()
  return t.serialNumber.toLowerCase().includes(query)
    || t.location.toLowerCase().includes(query)
    || t.lastActive.toLowerCase().includes(query)
}))
</script>

<template>
  <AppHeader icon="tabler:tractor">
    <template #title>
      <h1 class="text-2xl font-bold">
        Tractor Inspector
      </h1>
    </template>
  </AppHeader>

  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h flex-1">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      <div>
        <h2 class="text-3xl font-bold mb-2">
          Fleet Overview
        </h2>
        <p class="text-base-content/70">
          Monitor and manage your agricultural machinery
        </p>
      </div>
      <div class="mt-4 sm:mt-0 flex items-center space-x-4">
        <div class="stats shadow">
          <div class="stat">
            <div class="stat-title">
              Total Tractors
            </div>
            <div class="stat-value text-info">
              {{ filteredTractors.length }}
            </div>
          </div>
        </div>
        <div class="stats shadow">
          <div class="stat">
            <div class="stat-title">
              Active Today
            </div>
            <div class="stat-value text-error">
              {{ 0 }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow mb-8">
      <div class="card-body">
        <label class="input flex items-center w-full">
          <Icon icon="tabler:search" class="size-6 mr-2" />
          <input
            v-model="filterQuery"
            type="search"
            class="grow w-full"
            placeholder="Filter by serial number..."
          >
        </label>
      </div>
    </div>

    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="n in 8" :key="n" class="card bg-base-100 shadow">
        <div class="skeleton h-48 w-full" />
        <div class="card-body">
          <div class="skeleton h-4 w-full" />
          <div class="skeleton h-4 w-full" />
          <div class="skeleton h-4 w-full" />
        </div>
      </div>
    </div>

    <TransitionGroup
      v-else
      name="list"
      tag="div"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <TractorCard
        v-for="tractor in filteredTractors"
        :key="tractor.serialNumber"
        :tractor
      />
    </TransitionGroup>

    <div v-if="!loading && filteredTractors.length === 0" class="hero min-h-96">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <i class="fas fa-search text-6xl text-base-content/20 mb-4" />
          <h3 class="text-xl font-bold mb-2">
            No tractors found
          </h3>
          <p class="text-base-content/70 mb-4">
            Try adjusting your filter criteria or check back later.
          </p>
          <button
            class="btn btn-success"
            @click="filterQuery = ''"
          >
            Clear Search
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
</style>
