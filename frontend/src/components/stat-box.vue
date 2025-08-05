<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  icon?: string
  title: string
  value: string
  className: string
}>()
</script>

<template>
  <div class="stat">
    <div class="stat-figure" :class="className">
      <Icon v-if="icon" :icon="icon" class="text-2xl" />
    </div>
    <div class="stat-title text-lg">
      {{ title }}
    </div>
    <div class="stat-value text-xl" :class="className">
      {{ value }}
    </div>
  </div>
</template>
