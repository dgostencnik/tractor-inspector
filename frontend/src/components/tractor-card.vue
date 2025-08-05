<script setup lang="ts">
import type { Tractor } from '../types'
import { Icon } from '@iconify/vue'

import { computed } from 'vue'
import { defaultTractorImageUrl } from '../utils/const'
import { formatLastActive } from '../utils/formatters'

const props = defineProps<{ tractor: Tractor }>()

const imageUrl = computed(() =>
  props.tractor.imageUrl ? props.tractor.imageUrl : defaultTractorImageUrl,
)
</script>

<template>
  <div
    class="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer tractor-card"
  >
    <!-- Tractor Image -->
    <figure class="relative h-48">
      <img
        :src="imageUrl"
        :alt="`Tractor ${props.tractor.serialNumber}`"
        class="w-full h-full object-cover"
      >
      <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
        <h3 class="text-white font-bold text-lg">
          {{ props.tractor.serialNumber }}
        </h3>
      </div>
    </figure>

    <div class="card-body">
      <div class="mb-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm text-base-content/70">Total Working Hours</span>
          <span data-testid="totalWorkingHours" class="text-lg font-bold">{{ props.tractor.totalWorkingHours }}</span>
        </div>
        <progress
          class="progress progress-primary w-full"
          :value="Math.random() * 100"
          max="100"
        />
      </div>

      <div class="grid grid-cols-2 gap-4 text-sm mb-4">
        <div>
          <span class="text-base-content/70 block">Last Active</span>
          <span data-testid="lastActive" class="font-medium">{{ formatLastActive(props.tractor.lastActive) }}</span>
        </div>
        <div>
          <span class="text-base-content/70 block">Last Location</span>
          <span class="font-medium">N/A</span>
        </div>
      </div>

      <div class="card-actions">
        <RouterLink
          :to="`/tractors/${props.tractor.serialNumber}`"
          class="btn btn-primary btn-block"
        >
          <Icon icon="tabler:eye" class="mr-2" />
          View Details
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style>
  .tractor-card {
    transition: all 0.3s ease;
  }

  .tractor-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
</style>
