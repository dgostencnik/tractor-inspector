<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = defineProps<{
  icon: string
  backTo?: string
}>()
</script>

<template>
  <div class="navbar bg-base-100 shadow-sm border-b">
    <div class="navbar-start">
      <RouterLink v-if="backTo" :to="backTo" class="btn btn-ghost btn-circle mr-2">
        <Icon icon="tabler:arrow-left" />
      </RouterLink>

      <div class="flex items-center space-x-3">
        <Icon :icon="props.icon" class="text-primary size-12" />
        <slot name="title" />
      </div>
    </div>
    <div class="navbar-end">
      <div class="flex items-center space-x-4">
        <span class="text-sm text-base-content/70">admin</span>
        <div class="avatar avatar-placeholder">
          <div class="bg-neutral text-neutral-content w-10 rounded-full">
            <span class="text">A</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
