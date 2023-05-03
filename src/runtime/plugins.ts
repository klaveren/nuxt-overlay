import { defineNuxtPlugin } from "#imports";
import { useNuxtOverlay } from "./composables";
import { INuxtOverlay } from "./types";

declare module "#app" {
  interface NuxtApp {
    $overlay: INuxtOverlay;
  }
}

export default defineNuxtPlugin(() => {
  const modules: INuxtOverlay = useNuxtOverlay();
  return {
    provide: {
      overlay: modules,
    },
  };
});
