import { defineNuxtPlugin } from "#app";
import { type INuxtOverlay, useNuxtOverlay } from "./composables";

declare module "#app" {
  interface NuxtApp {
    $overlay: INuxtOverlay;
  }
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      overlay: useNuxtOverlay(),
    },
  };
});
