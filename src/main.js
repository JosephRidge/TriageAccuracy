import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createWebHistory, createRouter } from "vue-router";

import Introduction from "./components/pages/Introduction.vue";
import Charts from "./components/charts.vue";
import HelloWorld from "./components/HelloWorld.vue";
import Patients from "./components/pages/Patients.vue";

const routes = [
  { path: "/", component: Introduction },
  { path: "/about", component: HelloWorld },
  { path: "/charts", component: Charts },
  { path: "/patients", component: Patients },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
