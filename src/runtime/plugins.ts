import { defineNuxtPlugin } from "nuxt/app";
import { useNuxtOverlay } from "./composables";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      overlay: useNuxtOverlay(),
    },
  };
});
