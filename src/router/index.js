import { createRouter, createWebHistory } from "vue-router";
import Main1 from "@/views/admin/main.vue";
import Main2 from "@/views/clients/main.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Main2,
    },
    {
      path: "/admin",
      name: "admin",
      component: Main1,
    },
  ],
});
export default router;
