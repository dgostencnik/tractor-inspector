import { createApp } from "vue";

import App from "./app.vue";
import { router } from "./router";
import "./style.css";
import "./utils/env";

createApp(App).use(router).mount("#app");
