import { createWebHistory, createRouter } from "vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    alias: "/Home",
    name: "tutorials",
    component: () => import("./components/Home.vue"),
  },
  {
    path: "/Register",
    name: "Register",
    component: () => import("./components/Register.vue"),
  },
  {
    path: "/Login",
    name: "Login",
    component: () => import("./components/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;