<template>
  <v-container class="main-ctr">
    <mobile-drawer-controls hide-right />
    <v-card
      class="pa-5"
      flat
      border
    >
      <v-card-text class="d-flex flex-column flex-gap pt-0">
        <div class="text-grey">
          {{ i18n.t("appPreferences") }}
        </div>
        <v-select
          prepend-icon="mdi-earth"
          hide-details
          density="compact"
          v-model="state.language"
          :items="LANGUAGE_OPTIONS"
          :placeholder="i18n.t('language')"
          @update:model-value="updateLanguage"
        />
        <v-select
          prepend-icon="mdi-moon-waning-crescent"
          hide-details
          density="compact"
          v-model="state.theme"
          :items="THEME_OPTIONS"
          :placeholder="i18n.t('theme')"
          @update:model-value="updateTheme"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { LANGUAGE_OPTIONS, THEME_OPTIONS } from "@/constants/app";
import { useAppStore } from "@/store/app";
import { onMounted, reactive } from "vue";
import { useI18n } from "vue-i18n";

interface State {
  theme: string | null;
  language: string | null;
}

const i18n = useI18n();
const appStore = useAppStore();

const state: State = reactive({
  theme: null,
  language: null
});

const updateTheme = () => {
  appStore.setTheme(state.theme || "light");
};

const updateLanguage = () => {
  appStore.setLanguage(state.language || "en");
};

onMounted(() => {
  state.theme = appStore.darkMode ? "dark" : "light";
  state.language = appStore.language;
});
</script>
