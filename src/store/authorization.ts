import { PERMISSIONS, RULES } from "@/constants/authorization";
import { Rule, UserRuleDefinitionType } from "@/models/authorization";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "./user";

export const useAuthorizationStore = defineStore("authorization", () => {
  const rules = ref<Record<number, UserRuleDefinitionType>>({});

  const router = useRouter();
  const userStore = useUserStore();

  const setRules = (values: Rule[]) => {
    for (const { name, definition } of values) {
      rules.value[name] = definition;
    }
  };

  const can = (ruleName: string) => {
    if (userStore.user && rules.value[ruleName]) {
      return rules.value[ruleName](userStore.user);
    }
    return false;
  };

  const cannot = (ruleName: string) => {
    if (userStore.user && rules.value[ruleName]) {
      return !rules.value[ruleName](userStore.user);
    }
    return false;
  };

  const defineRules = () => {
    const rules: Rule[] = [
      {
        name: RULES.CanViewArchive,
        definition: (user) => user.permissions.includes(PERMISSIONS.CanViewArchive)
      },
      {
        name: RULES.CanArchivePost,
        definition: (user) => user.permissions.includes(PERMISSIONS.CanArchivePost)
      },
      {
        name: RULES.CanDeletePost,
        definition: (user) => user.permissions.includes(PERMISSIONS.CanDeletePost)
      }
    ];
    setRules(rules);
  };

  return {
    setRules,
    can,
    cannot,
    defineRules
  };
});
