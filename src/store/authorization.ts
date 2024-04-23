import { PERMISSIONS, RULES } from "@/constants/authorization";
import { Rule, UserRuleDefinitionType } from "@/models/authorization";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useUserStore } from "./user";

export const useAuthorizationStore = defineStore("authorization", () => {
  const rules = ref<Record<number, UserRuleDefinitionType>>({});

  const userStore = useUserStore();

  const ruleExists = (ruleName: string) => !!rules.value[ruleName];

  const setRules = (values: Rule[]) => {
    for (const { name, definition } of values) rules.value[name] = definition;
  };

  /**
   * Check if the user can perform the provided action, specified by a rule name or an array of rule names.
   * @param {string[] | string} ruleName - Rule name, can be a single string or multiple.
   * @return Object with multiple values indicating if the user can perform the action or not.
   * @example
   * const x = can(RULES.CanViewAdminPanel).do; // true
   * const y = can(RULES.CanViewAdminPanel).not; // false
   * const z = can([RULES.CanViewAdminPanel, RULES.CanEditPost]).any; // true
   */
  const can = (ruleName: string | string[]) => {
    let res = {
      do: false,
      not: false,
      any: false
    };

    if (userStore.user) {
      let $do = false;
      let any = true;

      if (typeof ruleName === "string") {
        if (ruleExists(ruleName)) $do = rules.value[ruleName](userStore.user);
      } else {
        for (const rule of ruleName) {
          if (!ruleExists(rule)) {
            any = false;
            break;
          } else {
            any = any && rules.value[rule](userStore.user);
          }
        }
      }

      res.do = $do;
      res.not = !$do;
      res.any = any;

      return res;
    }
    return res;
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
    defineRules
  };
});
