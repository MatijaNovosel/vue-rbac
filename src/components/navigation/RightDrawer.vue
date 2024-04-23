<template>
  <v-navigation-drawer
    location="right"
    :order="1"
    v-model="state.drawer"
    :permanent="mdAndUp"
    class="pa-5"
  >
    <template #prepend>
      <v-text-field
        placeholder="Search"
        density="compact"
        hide-details
        variant="filled"
        prepend-inner-icon="mdi-magnify"
        clearable
        :bg-color="theme.current.value.dark ? '' : 'white'"
      />
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/store/app";
import { reactive, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay, useTheme } from "vuetify";

const { mdAndUp } = useDisplay();
const appStore = useAppStore();
const theme = useTheme();
const i18n = useI18n();

const state = reactive({
  drawer: mdAndUp.value ? true : false
});

watch(
  () => appStore.rightDrawer,
  () => (state.drawer = !state.drawer)
);
</script>

<style scoped lang="scss">
:deep(.v-navigation-drawer__content) {
  display: flex;
  flex-direction: column;
}
</style>
