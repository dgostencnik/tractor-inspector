<script setup lang="ts" generic="T extends Record<string, any>">
import { Icon } from "@iconify/vue";

import type { SORT_ORDER } from "../types";

import { SORT_ORDERS } from "../types";
import DisplayMessage from "./display-message.vue";

defineProps<{
  columns: any [];
  sort: string;
  order: SORT_ORDER;
  loading: boolean;
  error: string | null;
  pageSize: number;
  data: T[];
}>();

const emit = defineEmits<{
  (e: "update:sort", value: string): void;
  (e: "cellSelect", key: string, row: T): void;
}>();

function onClickSort(key: string) {
  emit("update:sort", key);
}

function onCellSelect(key: string, row: T) {
  emit("cellSelect", key, row);
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="card bg-base-100 shadow">
      <div class="card-body p-0">
        <div class="overflow-x-auto">
          <table
            class="table table-pin-rows"
            :class="{ 'table-zebra': !loading }"
          >
            <thead>
              <tr class="table-header bg-base-200">
                <th
                  v-for="column in columns"
                  :key="column.key"
                  @click="onClickSort(column.key)"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex-1">
                      {{ column.label }}
                    </div>
                    <div class="flex flex-col ml-2">
                      <Icon
                        icon="tabler:caret-up"
                        class=" text-xs"
                        :class="{ 'text-primary': sort === column.key && order === SORT_ORDERS.ASC, 'text-base-content/30': !(sort === column.key && SORT_ORDERS.ASC) }"
                      />
                      <Icon
                        icon="tabler:caret-down"
                        class=" text-xs"
                        :class="{ 'text-primary': sort === column.key && SORT_ORDERS.DESC, 'text-base-content/30': !(sort === column.key && SORT_ORDERS.DESC) }"
                      />
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-if="loading">
                <tr v-for="n in pageSize" :key="`loading-${n}`">
                  <td
                    v-for="column in columns"
                    :key="column.key"
                  >
                    <div class="flex w-32 flex-col gap-4">
                      <div class="skeleton h-5 w-full" />
                    </div>
                  </td>
                </tr>
              </template>

              <tr
                v-for="(record, index) in data"
                v-else
                :key="index"
                class="hover:bg-base-200/50 transition-colors"
              >
                <td
                  v-for="column in columns"
                  :key="column.key"
                  class="whitespace-nowrap text-center"
                >
                  <template v-if="column.link">
                    <div
                      class="link link-primary font-medium"
                      @click="onCellSelect(column.key, record)"
                    >
                      {{ column.format ? column.format(record[column.key]) : record[column.key] }}
                    </div>
                  </template>
                  <template v-else>
                    {{ column.format ? column.format(record[column.key]) : record[column.key] }}
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
          <DisplayMessage
            v-if="!loading && !error && data.length === 0"
            title="No data found"
            description="No data found matching your criteria"
            icon="tabler:database"
          />
          <DisplayMessage
            v-if="!loading && error"
            title="Error"
            :description="error"
            icon="tabler:alert-triangle"
          />
        </div>
      </div>
    </div>

    <slot />
  </div>
</template>
