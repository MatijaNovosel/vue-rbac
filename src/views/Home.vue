<template>
  <v-container class="main-ctr py-8">
    <mobile-drawer-controls />
    <v-row>
      <v-col
        cols="12"
        v-for="(post, i) in POSTS"
      >
        <v-card>
          <v-card-text>
            {{ post.content }}
          </v-card-text>
          <v-divider />
          <v-card-actions class="justify-end">
            <v-btn
              :disabled="authorizationStore.can(RULES.CanDeletePost).not"
              color="red"
            >
              Delete
            </v-btn>
            <v-btn
              :disabled="authorizationStore.can(RULES.CanArchivePost).not"
              color="green"
              class="ml-4"
            >
              Archive
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { RULES } from "@/constants/authorization";
import { POSTS } from "@/constants/posts";
import { useAuthorizationStore } from "@/store/authorization";

const authorizationStore = useAuthorizationStore();
</script>
