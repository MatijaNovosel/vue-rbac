<template>
  <v-container class="main-ctr py-8">
    <mobile-drawer-controls />
    <v-row v-if="state.loading">
      <v-progress-circular
        class="my-6 mx-auto"
        color="green"
        size="50"
        indeterminate
      />
    </v-row>
    <v-row class="text-center">
      <v-col cols="12">
        <span class="text-h3"> Archive </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { reactive } from "vue";

interface State {
  loading: boolean;
}

const state: State = reactive({
  loading: false
});
</script>
