<template>
  <v-navigation-drawer
    :order="1"
    v-model="state.drawer"
    :permanent="mdAndUp"
    class="pa-5"
    :class="theme.current.value.dark ? '' : 'bg-grey-lighten-5'"
  >
    <template #append>
      <v-list-item
        class="text-subtitle-2 rounded-lg px-4"
        @click="logOut"
      >
        <v-icon class="mr-3"> mdi-logout </v-icon>
        {{ i18n.t("signOut") }}
      </v-list-item>
    </template>
    <template #prepend>
      <v-list-item
        class="text-subtitle-2"
        prepend-avatar="/plenky.jpg"
      >
        {{ userStore.user?.userName || "Undefined" }}
      </v-list-item>
    </template>
    <v-list
      density="compact"
      class="mt-3"
      nav
    >
      <v-list-item
        v-for="(navItem, i) in navItems"
        :key="i"
        exact
        class="text-subtitle-2 rounded-lg px-4"
        :to="navItem.to"
      >
        <v-icon
          color="grey"
          class="mr-3"
        >
          {{ navItem.icon }}
        </v-icon>
        {{ navItem.title }}
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { RULES } from "@/constants/authorization";
import ROUTE_NAMES from "@/router/routeNames";
import { useAppStore } from "@/store/app";
import { useAuthorizationStore } from "@/store/authorization";
import { useUserStore } from "@/store/user";
import { computed, reactive, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay, useTheme } from "vuetify";

const userStore = useUserStore();
const appStore = useAppStore();
const authorizationStore = useAuthorizationStore();
const { mdAndUp } = useDisplay();
const theme = useTheme();
const i18n = useI18n();

const state = reactive({
  drawer: mdAndUp.value ? true : false
});

const navItems = computed(() => {
  const res: any[] = [
    {
      title: i18n.t("links.home"),
      icon: "mdi-home-outline",
      to: {
        name: ROUTE_NAMES.HOME
      }
    },
    {
      title: i18n.t("links.settings"),
      icon: "mdi-cogs",
      to: {
        name: ROUTE_NAMES.SETTINGS
      }
    }
  ];

  if (authorizationStore.can(RULES.CanViewArchive).do) {
    res.push({
      title: "Archive",
      icon: "mdi-archive-outline",
      to: {
        name: ROUTE_NAMES.ARCHIVE
      }
    });
  }

  return res;
});

const logOut = () => {
  userStore.logOut();
};

watch(
  () => appStore.leftDrawer,
  () => (state.drawer = !state.drawer)
);
</script>
