import { createRouter, createWebHistory } from "vue-router";

import TelemetryLogEdit from "../views/telemetry-log-edit.vue";
import TractorView from "../views/tractor-view.vue";
import TractorsView from "../views/tractors-view.vue";

const routes = [
  { path: "/", name: "TractorsIndex", component: TractorsView },
  { path: "/tractors/:id", name: "TractorPage", component: TractorView },
  { path: "/tractors/:id/telemetry/:itemId", name: "TelemetryLogEdit", component: TelemetryLogEdit },

];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
