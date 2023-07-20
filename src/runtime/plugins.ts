import { defineNuxtPlugin } from "#imports";
import { INuxtOverlay, useNuxtOverlay } from "./composables";

declare module "#app" {
  interface NuxtApp {
    $overlay: INuxtOverlay;
  }
}

export default defineNuxtPlugin(() => {
  const overlay: INuxtOverlay = useNuxtOverlay();
  return {
    provide: {
      overlay,
    },
  };
});
