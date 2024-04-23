import { AuthService } from "@/api/services/auth";
import { useNotifications } from "@/composables/useNotifications";
import ROUTE_NAMES from "@/router/routeNames";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { IUserAccount } from "../models/user";
import { useAppStore } from "./app";

export const useUserStore = defineStore(
  "user",
  () => {
    // Data
    const user = ref<IUserAccount | null>(null);
    const isAuthenticated = computed(() => user.value != null);

    // Services
    const authService = new AuthService();

    // Stores
    const appStore = useAppStore();
    const userStore = useUserStore();

    // Composables
    const { alert } = useNotifications();
    const router = useRouter();

    const login = async (username: string): Promise<void> => {
      const response = await authService.signIn(username);
      user.value = response;
    };

    const logOut = async () => {
      user.value = null;
      appStore.setTheme("light");
      await authService.signOut();
      alert({
        text: "Signed out!"
      });
      router.replace({
        name: ROUTE_NAMES.LOGIN
      });
    };

    return {
      user,
      isAuthenticated,
      login,
      logOut
    };
  },
  {
    persist: {
      storage: sessionStorage
    }
  }
);
