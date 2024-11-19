import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createMemoryHistory, createRouter } from "vue-router";

import Introduction from "./components/pages/Introduction.vue";

const routes = [
  { path: "/", component: Introduction },
  { path: "/about", component: Introduction },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
