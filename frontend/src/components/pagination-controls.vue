<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineProps<{
  page: number;
  pageSize: number;
  numberOfRecords: number;
  disabled: boolean;
}>();

const emit = defineEmits<{
  (e: "updatePageSize", value: number): void;
  (e: "updatePage", value: number): void;
}>();

function updatePageSize(value: number) {
  emit("updatePageSize", value);
}

function updatePage(value: number) {
  emit("updatePage", value);
}
</script>

<template>
  <div class="flex flex-col-reverse md:flex-row justify-between items-center text-sm text-base-content/70 gap-2">
    <div class="flex items-center gap-2">
      <span>Show:</span>
      <select
        :value="pageSize"
        class="select select-bordered select-sm"
        :disabled="disabled"
        @change="updatePageSize(parseInt(($event.target as HTMLSelectElement).value))"
      >
        <option value="10">
          10
        </option>
        <option value="25">
          25
        </option>
        <option value="50">
          50
        </option>
        <option value="100">
          100
        </option>
      </select>
      <span class="text-sm text-base-content/70">records</span>
    </div>

    <div v-if="numberOfRecords">
      Page {{ page }} of {{ Math.ceil(numberOfRecords / pageSize) }}
    </div>

    <div class="join gap-1">
      <button
        class="join-item btn "
        :disabled="page < 2 || disabled"
        @click="updatePage(1)"
      >
        <Icon
          icon="tabler:chevrons-left"
        />
      </button>

      <button
        class="join-item btn "
        :disabled="page < 2 || disabled"
        @click="updatePage(page - 1) "
      >
        <Icon
          icon="tabler:chevron-left"
        />
      </button>

      <button
        class="join-item btn "
        :disabled="page >= Math.ceil(numberOfRecords / pageSize) || disabled"
        @click="updatePage(page + 1)"
      >
        <Icon
          icon="tabler:chevron-right"
        />
      </button>

      <button
        class="join-item btn "
        :disabled="page >= Math.ceil(numberOfRecords / pageSize) || disabled"
        @click="updatePage(Math.ceil(numberOfRecords / pageSize))"
      >
        <Icon icon="tabler:chevrons-right" />
      </button>
    </div>
  </div>
</template>
