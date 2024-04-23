import { AccountService } from "@/api/services/account";
import { AuthService } from "@/api/services/auth";
import { useNotifications } from "@/composables/useNotifications";
import ROUTE_NAMES from "@/router/routeNames";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { IUserAccount, TokenModel } from "../models/user";
import { useAppStore } from "./app";

export const useUserStore = defineStore(
  "user",
  () => {
    // Data
    const user = ref<IUserAccount | null>(null);
    const permissions = ref<number[]>([]);
    const token = ref<TokenModel | null>(null);
    const isAuthenticated = computed(() => user.value != null);

    // Services
    const authService = new AuthService();
    const accountService = new AccountService();

    // Stores
    const appStore = useAppStore();
    const userStore = useUserStore();

    // Composables
    const { alert } = useNotifications();
    const router = useRouter();

    const login = async (email: string, password: string): Promise<void> => {
      const response = await authService.signInWithEmailAndPassword(email, password);
      setToken(response);
      const userData = await getUserData(response.userId);
      user.value = {
        userName: userData.username,
        id: response.userId,
        email
      };
    };

    const setToken = (tokenModel: TokenModel) => {
      token.value = tokenModel;
    };

    const getUserData = async (id: string) => {
      const userData = await accountService.getUserData(id);
      return userData;
    };

    const logOut = async () => {
      user.value = null;
      token.value = null;
      permissions.value = [];
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
      permissions,
      token,
      isAuthenticated,
      login,
      setToken,
      getUserData,
      logOut
    };
  },
  {
    persist: {
      storage: sessionStorage
    }
  }
);
