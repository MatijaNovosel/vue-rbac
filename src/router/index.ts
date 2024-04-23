import { RULES } from "@/constants/authorization";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import MainLayout from "../layouts/Main.vue";
import { useUserStore } from "../store/user";
import { useAuthorizationStore } from "./../store/authorization";
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
        path: "archive",
        name: ROUTE_NAMES.ARCHIVE,
        component: () => import("../views/Archive.vue"),
        meta: {
          title: "home.title",
          can: RULES.CanViewArchive,
          onDeniedRoute: {
            name: ROUTE_NAMES.NOT_FOUND
          },
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
        path: "no-permissions",
        name: ROUTE_NAMES.NO_PERMISSIONS,
        component: () => import("../views/NoPermissions.vue")
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
  const authorizationStore = useAuthorizationStore();
  const userStore = useUserStore();
  const isAuthenticated = userStore.isAuthenticated;

  if (
    to.meta.can == null ||
    (isAuthenticated && authorizationStore.can(to.meta.can as string).do)
  ) {
    next();
  } else if (!isAuthenticated) {
    next({ name: ROUTE_NAMES.LOGIN });
  } else {
    next({ name: ROUTE_NAMES.NO_PERMISSIONS });
  }
});

export default router;
