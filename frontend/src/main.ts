import { createApp } from "vue";

import App from "./app.vue";
import { router } from "./router";
import "./style.css";
import "vue3-openlayers/dist/vue3-openlayers.css";

import "./utils/env";

createApp(App)
  .use(router)
  .mount("#app");
