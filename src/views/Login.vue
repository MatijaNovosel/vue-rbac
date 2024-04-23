<template>
  <div class="d-flex flex-column justify-space-between items-center h-100 pb-10">
    <div />
    <v-card
      :width="smAndDown ? '100%' : '400'"
      flat
      color="transparent"
      class="pa-5 mx-auto"
    >
      <logo-header />
      <vv-form
        ref="loginForm"
        as="v-form"
        @submit="login"
      >
        <v-row no-gutters>
          <v-col
            cols="12"
            class="my-2"
          >
            <vv-field
              v-slot="{ field, errors }"
              v-model="state.username"
              name="username"
              rules="required"
              :label="i18n.t('username')"
            >
              <v-text-field
                type="username"
                :bg-color="theme.current.value.dark ? '' : 'white'"
                v-bind="field"
                clearable
                variant="filled"
                density="compact"
                hide-details="auto"
                prepend-icon="mdi-username-outline"
                :error-messages="errors"
                :placeholder="i18n.t('username')"
              />
            </vv-field>
          </v-col>
          <v-col
            cols="12"
            class="text-center my-4"
          >
            <v-btn
              variant="flat"
              type="submit"
              color="green-darken-1"
              rounded="md"
            >
              {{ i18n.t("login") }}
            </v-btn>
          </v-col>
        </v-row>
      </vv-form>
    </v-card>
    <bottom-options />
  </div>
</template>

<script setup lang="ts">
import BottomOptions from "@/components/bottomOptions/BottomOptions.vue";
import LogoHeader from "@/components/logoHeader/LogoHeader.vue";
import { useNotifications } from "@/composables/useNotifications";
import { IForm } from "@/models/common";
import ROUTE_NAMES from "@/router/routeNames";
import { useAppStore } from "@/store/app";
import { useUserStore } from "@/store/user";
import { reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useDisplay, useTheme } from "vuetify";

interface State {
  username: string | null;
}

const loginForm = ref<IForm>();
const userStore = useUserStore();
const appStore = useAppStore();
const i18n = useI18n();
const router = useRouter();
const theme = useTheme();
const { smAndDown } = useDisplay();
const { alert } = useNotifications();

const state: State = reactive({
  username: null
});

const resetForm = () => {
  state.username = null;
  if (loginForm.value) {
    loginForm.value?.resetForm();
  }
};

const login = async () => {
  if (!loginForm.value || !(await loginForm.value.validate()).valid) {
    return;
  }
  try {
    appStore.setLoading(true);
    await userStore.login(state.username as string);
    router.push({
      name: ROUTE_NAMES.HOME
    });
    alert({
      text: i18n.t("welcome")
    });
  } catch (e) {
    alert({
      text: i18n.t("failedToLogIn", [e]),
      type: "error"
    });
  } finally {
    resetForm();
    appStore.setLoading(false);
  }
};
</script>

<style scoped>
@media only screen and (max-width: 600px) {
  .bottom-box {
    width: 65% !important;
  }
}

.bottom-box {
  width: 400px;
}
</style>
