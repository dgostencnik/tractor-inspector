<script setup lang="ts">
import { Icon } from "@iconify/vue";

import type { Toast } from "../types";

import { ToastTypes } from "../types";

defineProps<{
  toasts: Toast[];
}>();

const emit = defineEmits<{
  (e: "removeToast", value: number): void;
}>();

function onClick(id: number) {
  emit("removeToast", id);
}
</script>

<template>
  <div class="toast toast-bottom toast-end">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      :class="`alert ${toast.type === ToastTypes.success ? 'alert-success' : toast.type === ToastTypes.error ? 'alert-error' : 'alert-info'}`"
    >
      <Icon :icon="`${toast.type === ToastTypes.success ? 'tabler:circle-check-filled' : toast.type === ToastTypes.error ? 'tabler:alert-circle-filled' : 'tabler:info-circle-filled'}`" class="mr-2" />
      <span>{{ toast.message }}</span>
      <button class="btn btn-sm btn-ghost" @click="onClick(toast.id)">
        x
      </button>
    </div>
  </div>
</template>
