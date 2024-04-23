<template>
  <v-container class="main-ctr">
    <mobile-drawer-controls />
    <v-row v-if="state.loading">
      <v-progress-circular
        class="my-6 mx-auto"
        color="orange"
        size="50"
        indeterminate
      />
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";

interface State {
  loading: boolean;
}

const state: State = reactive({
  loading: false
});

onMounted(async () => {
  //
});
</script>
