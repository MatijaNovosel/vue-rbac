import { PERMISSIONS, PERMISSION_NAMES } from "@/constants/authorization";
import { Rule, UserRuleDefinitionType } from "@/models/authorization";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "./user";

export const useAuthorizationStore = defineStore("authorization", () => {
  const rules = ref<Record<string, UserRuleDefinitionType>>({});

  const router = useRouter();
  const userStore = useUserStore();

  const setRules = (value: Rule[]) => {
    for (const { name, definition } of value) {
      rules.value[name] = definition;
    }
  };

  const can = (ruleName: string) => {
    if (userStore.user) {
      return rules[ruleName](userStore.user);
    }
    return false;
  };

  const cannot = (ruleName: string) => {
    if (userStore.user) {
      return !rules[ruleName](userStore.user);
    }
    return false;
  };

  const defineRules = () => {
    const rules: Rule[] = [
      {
        name: PERMISSION_NAMES[PERMISSIONS.CanViewArchive],
        definition: (user) => {
          return user.permissions.includes(PERMISSIONS.CanViewArchive);
        }
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
