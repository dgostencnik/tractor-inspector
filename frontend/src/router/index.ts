import { createRouter, createWebHistory } from "vue-router";

import ActivitiesLoader from "../views/activities-loader.vue";
import ActivitiesView from "../views/activities-view.vue";
import NotFoundView from "../views/not-found-view.vue";
import TelemetryLogEdit from "../views/telemetry-log-edit.vue";
import TractorView from "../views/tractor-view.vue";
import TractorsView from "../views/tractors-view.vue";

const routes = [
  { path: "/", name: "TractorsIndex", component: TractorsView },
  { path: "/tractors/:id", name: "TractorPage", component: TractorView },
  { path: "/tractors/:id/telemetry/:itemId", name: "TelemetryLogEdit", component: TelemetryLogEdit },
  { path: "/activities", name: "Fleet map activities overview", component: ActivitiesLoader },
  { path: "/activities/:date", name: "Fleet map", component: ActivitiesView },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundView },

];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
