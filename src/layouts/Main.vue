<template>
  <v-layout>
    <alerts />
    <template v-if="isAuthenticated">
      <left-drawer />
      <right-drawer />
    </template>
    <v-main
      class="main"
      :class="theme.current.value.dark ? '' : 'bg-grey-lighten-4'"
    >
      <router-view />
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import { useTheme } from "vuetify";
import LeftDrawer from "../components/navigation/LeftDrawer.vue";
import RightDrawer from "../components/navigation/RightDrawer.vue";
import Alerts from "../components/notifications/Alerts.vue";

const userStore = useUserStore();
const { isAuthenticated } = storeToRefs(userStore);
const theme = useTheme();
</script>

<style scoped lang="scss">
.main {
  overflow: auto;
}
</style>
