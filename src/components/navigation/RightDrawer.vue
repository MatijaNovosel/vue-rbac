<template>
  <v-navigation-drawer
    location="right"
    :order="1"
    v-model="state.drawer"
    :permanent="mdAndUp"
    class="pa-5 right-drawer"
    :class="theme.current.value.dark ? '' : 'bg-grey-lighten-4'"
  >
    <template #prepend>
      <v-text-field
        :placeholder="i18n.t('searchMemos')"
        density="compact"
        hide-details
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
.right-drawer {
  border: 0;
}

:deep(.v-navigation-drawer__content) {
  display: flex;
  flex-direction: column;
}
</style>
