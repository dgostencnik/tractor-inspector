<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import type { PaginatedResult, PaginationParams, Tractor, TractorTelemetryItem } from "../types";

import AppHeader from ".././components/app-header.vue";
import { tractorsApi } from "../api/tractors";
import DisplayMessage from "../components/display-message.vue";
import PaginationControls from "../components/pagination-controls.vue";
import SimpleTable from "../components/simple-table.vue";
import StatPanel from "../components/stat-panel.vue";
import { useFetch } from "../composables/use-fetch";
import { SORT_ORDERS } from "../types";
import { tractorDefaultPagination, tractorSessionTableColumns } from "../utils/const";
import { formatISO8601Date } from "../utils/formatters";

const route = useRoute();
const router = useRouter();

const pageSize = ref(Number(route.query.pageSize || tractorDefaultPagination.pageSize));
const page = ref(Number(route.query.page || tractorDefaultPagination.page));
const sort = ref(String(route.query.sort || tractorDefaultPagination.sort));
const order = ref(String(route.query.order || tractorDefaultPagination.order));

const { loading, data, error, refetchData } = useFetch<Tractor, [string]>(tractorsApi.getTractor);
const { data: telemetryData, refetchData: refetchTelemetryData, loading: telemetryDataLoading, error: telemetryDataError } = useFetch<PaginatedResult<TractorTelemetryItem[]>, [string, PaginationParams]>(tractorsApi.getTractorTelemetry);

const tractorStats = computed(() =>
  [{ title: "Total Hours", icon: "tabler:clock-filled", value: String(data.value?.totalWorkingHours), className: "text-success" }, { title: "Last Active", icon: "tabler:calendar", value: formatISO8601Date(data?.value?.lastActive), className: "text-info" }, { title: "Current Location", icon: "tabler:map-pin-filled", value: String(data?.value?.location || "N/A"), className: "text-warning" }, { title: "Status", icon: "tabler:circle-filled", value: "N/A", className: "text-warning" }]);

onMounted(async () => {
  if (route.params.id) {
    await refetchData(String(route.params.id));
    await refetchTelemetryData(String(route.params.id), { pageSize: pageSize.value, page: page.value, sort: sort.value, order: order.value });
  }
});

watch(
  () => route.query,
  async (newQuery, oldValue) => {
    if (newQuery.page !== oldValue?.page
      || newQuery.pageSize !== oldValue?.pageSize
      || newQuery.sort !== oldValue?.sort
      || newQuery.order !== oldValue?.order

    ) {
      await refetchTelemetryData(String(route.params.id), { ...newQuery });
    }
  },
  { immediate: true },
);

function handleUpdateSort(field: string) {
  if (sort.value === field) {
    order.value = order.value === SORT_ORDERS.ASC ? SORT_ORDERS.DESC : SORT_ORDERS.ASC;
  }
  else {
    sort.value = field;
    order.value = SORT_ORDERS.ASC;
  }
  page.value = 1;
  updateUrl();
}

function handleUpdatePage(newPage: number) {
  page.value = newPage;
  updateUrl();
}

function handleUpdatePageSize(newPageSize: number) {
  pageSize.value = newPageSize;
  updateUrl();
}

function handleCellSelect(field: string, data: Record<string, any>) {
  const telemetryItem = data as TractorTelemetryItem;

  if (field === "date_time") {
    router.push(`/tractors/${route.params.id}/telemetry/${telemetryItem.id}`);
  }
}

function updateUrl() {
  router.push({
    path: route.path,
    query: {
      ...route.query, // keep existing query params unless overwritten
      page: page.value.toString(),
      pageSize: pageSize.value.toString(),
      sort: sort.value,
      order: order.value,
    },
  });
}
</script>

<template>
  <AppHeader back-to="/" icon="tabler:tractor">
    <template #title>
      <div>
        <h1 class="text-xl font-bold">
          {{ data?.serialNumber }}
        </h1>
        <p class="text-sm text-base-content/70">
          Tractor Details
        </p>
      </div>
    </template>
  </AppHeader>

  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h flex-1 w-full">
    <DisplayMessage
      v-if="error"
      title="Error"
      :description="`Error loading data: ${error}`"
      icon="tabler:alert-triangle"
    >
      <div class="flex gap-2 justify-center">
        <RouterLink to="/" class="btn btn-success">
          Back Home
        </RouterLink>
      </div>
    </DisplayMessage>

    <DisplayMessage
      v-if="!loading && !error && !data"
      title="Tractor not found"
      description="No tractor matching the provided serial number was found. Please verify the number and try again."
      icon="tabler:search"
    >
      <RouterLink to="/" class="btn btn-success">
        Back Home
      </RouterLink>
    </DisplayMessage>

    <div
      v-if="loading"
      class="card  shadow mb-6"
    >
      <div class="card-body">
        <div
          class="grid grid-cols-1 stats stats-vertical md:stats-horizontal gap-4 "
          :class="`md:grid-cols-${tractorStats.length}`"
        >
          <div
            v-for="(_, i) in tractorStats"
            :key="i"
            class="flex w-52 flex-col gap-4"
          >
            <div class="flex items-center gap-4">
              <div class="flex flex-col gap-4">
                <div class="skeleton h-8 w-32" />
                <div class="skeleton h-8 w-32" />
              </div>
              <div class="skeleton h-8 w-8 shrink-0 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <StatPanel
      v-if="data"
      :stats="tractorStats"
      class="bg-base-100"
    />

    <SimpleTable
      v-if="data"
      :sort
      :order
      :page-size
      :page
      :columns="tractorSessionTableColumns"
      :data="telemetryData?.data ?? []"
      :loading="telemetryDataLoading"
      :error="telemetryDataError"
      @update:sort="handleUpdateSort"
      @cell-select="handleCellSelect"
    >
      <PaginationControls
        :page
        :page-size
        :disabled="telemetryDataLoading || !telemetryData?.data.length"
        :number-of-records="telemetryData?.total || 0"
        @update-page-size="handleUpdatePageSize"
        @update-page="handleUpdatePage"
      />
    </SimpleTable>
  </main>
</template>
