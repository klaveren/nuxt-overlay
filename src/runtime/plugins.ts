import { defineNuxtPlugin } from "nuxt/app";
import { useNuxtOverlay } from "./composables";
import { OverlayConfig, INuxtOverlay } from "./types";

declare module "@nuxt/schema" {
  interface AppConfigInput {
    nuxtOverlay?: Partial<OverlayConfig> & { queueName?: string };
  }
}

declare module "nuxt/app" {
  interface NuxtApp {
    $overlay: ReturnType<typeof useNuxtOverlay>;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
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
