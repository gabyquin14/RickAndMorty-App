import VueRouter from "vue-router";
import HomePage from "@/pages/HomePage";
import LandingPage from "@/pages/LandingPage";

const routes = [
  {
    path: "/",
    name: "LandingPage",
    component: LandingPage,
  },
  {
    path: "/home",
    name: "HomePage",
    component: HomePage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
