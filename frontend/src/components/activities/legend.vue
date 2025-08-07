<script setup lang="ts">
defineProps<{
  legendItems: { id: string; title: string; color: string }[];
  isLoading?: boolean;
}>();
</script>

<template>
  <div class="flex flex-col bg-base-200 items-center">
    <div class="p-4">
      <div class="card bg-base-100 shadow-md w-64">
        <div class="card-body">
          <div class="mb-4">
            <h3 class="text-sm font-semibold mb-3 text-base-content">
              Legend
            </h3>

            <div v-if="isLoading" class="flex gap-2">
              <div class="skeleton h-4 w-28" />
              <div class="skeleton h-4 w-28" />
            </div>
            <div
              v-else
              class="flex gap-2"
            >
              <div
                v-for="item in legendItems"
                :key="item.id"
                class="flex items-center space-x-2"
              >
                <div
                  class="w-3 h-3 rounded-sm"
                  :style="{ backgroundColor: item.color }"
                />
                <span class="text-xs text-base-content whitespace-nowrap">{{ item.title }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
