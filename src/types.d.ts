import type { INuxtOverlay } from "./runtime/composables";
import type { OverlayConfig } from "./runtime/types";

declare module "#app" {
  interface NuxtApp {
    $overlay: INuxtOverlay;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $overlay: INuxtOverlay;
  }
}

declare module "@nuxt/schema" {
  interface AppConfigInput {
    nuxtOverlay?: Partial<OverlayConfig> & { queueName?: string };
  }
}

export type { INuxtOverlay } from "./runtime/composables";
export type {
  OverlayPosition,
  OverlayConfig,
  QueueItems,
  QueueCreate,
  QueueRemove,
} from "./runtime/types";

export {};
