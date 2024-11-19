import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createWebHistory, createRouter } from "vue-router";

import Introduction from "./components/pages/Introduction.vue";
import Charts from "./components/charts.vue";
import HelloWorld from "./components/HelloWorld.vue";
import Patients from "./components/pages/Patients.vue";
import NurseExpert from "./components/pages/NurseExpert.vue";
import Nurse from "./components/pages/Nurse.vue";
import CaseStudy from "./components/pages/CaseStudy.vue";
import Expert from "./components/pages/Expert.vue";

const routes = [
  { path: "/", component: Introduction },
  { path: "/home", component: CaseStudy },
  { path: "/about", component: CaseStudy },
  { path: "/charts", component: Charts },
  { path: "/patients", component: Patients },
  { path: "/nurse-expert", component: NurseExpert },
  { path: "/nurse", component: Nurse },
  { path: "/expert", component: Expert },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
