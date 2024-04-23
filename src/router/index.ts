import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import MainLayout from "../layouts/Main.vue";
import { useUserStore } from "../store/user";
import ROUTE_NAMES from "./routeNames";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        name: ROUTE_NAMES.LOGIN,
        component: () => import("../views/Login.vue"),
        meta: {
          title: "login.title"
        }
      },
      {
        path: "home",
        name: ROUTE_NAMES.HOME,
        component: () => import("../views/Home.vue"),
        meta: {
          title: "home.title",
          auth: true
        }
      },
      {
        path: "settings",
        name: ROUTE_NAMES.SETTINGS,
        component: () => import("../views/Settings.vue"),
        meta: {
          title: "settings.title",
          auth: true
        }
      },
      {
        path: "/:pathMatch(.*)*",
        name: ROUTE_NAMES.NOT_FOUND,
        component: () => import("../views/NotFound.vue")
      }
    ]
  }
];

const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
  linkExactActiveClass: "nav-item active"
});

router.beforeEach((to, _, next) => {
  const userStore = useUserStore();
  if (userStore.isAuthenticated && to.name === ROUTE_NAMES.LOGIN) {
    next({
      name: ROUTE_NAMES.HOME
    });
  } else if (!userStore.isAuthenticated && to.meta.auth) {
    next({
      name: ROUTE_NAMES.LOGIN
    });
  } else {
    next();
  }
});

export default router;
