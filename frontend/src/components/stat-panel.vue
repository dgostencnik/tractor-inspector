<script setup lang="ts">
import StatBox from './stat-box.vue'

defineProps<{
  stats: {
    className: string
    value: string
    title: string
    icon?: string
  }[]
}>()
</script>

<template>
  <div class="card  shadow mb-6">
    <div class="card-body">
      <div
        class="grid grid-cols-1 stats stats-vertical md:stats-horizontal gap-4 "
        :class="`md:grid-cols-${stats.length}`"
      >
        <StatBox
          v-for="stat in stats" :key="stat.title"
          :icon="stat.icon"
          :title="stat.title"
          :value="stat.value"
          :class-name="stat.className"
          class="px-2"
        />
      </div>
    </div>
  </div>
</template>
