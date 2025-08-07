import { createPinia } from "pinia";
import { createApp } from "vue";
import OpenLayersMap from "vue3-openlayers";

import App from "./app.vue";
import "./style.css";
import "vue3-openlayers/dist/vue3-openlayers.css";

import { router } from "./router";
import "./utils/env";

const pinia = createPinia();

createApp(App)
  .use(router)
  .use(pinia)
  .use(OpenLayersMap)
  .mount("#app");
