<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineProps<{
  title: string;
  description: string;
  icon?: string;
}>();
</script>

<template>
  <div class="hero min-h-96">
    <div class="hero-content">
      <div class="flex flex-col justify-center items-center py-12">
        <Icon
          v-if="icon"
          :data-testid="icon"
          :icon="icon"
          class="text-6xl text-gray-300 mb-4"
        />
        <h3 class="text-xl font-bold mb-2 ">
          {{ title }}
        </h3>

        <p class="text-base-content/70 mb-4">
          {{ description }}
        </p>
        <slot />
      </div>
    </div>
  </div>
</template>
