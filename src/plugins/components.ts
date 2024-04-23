import MobileDrawerControls from "@/components/mobileDrawerControls/MobileDrawerControls.vue";
import { Field, Form } from "vee-validate";

export default {
  install: (app: any) => {
    app.component("VvForm", Form);
    app.component("VvField", Field);
    app.component("mobile-drawer-controls", MobileDrawerControls);
  }
};
