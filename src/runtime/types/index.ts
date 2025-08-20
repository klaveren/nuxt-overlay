export interface INuxtOverlay {
  getQueue: () => QueueItems[];
  create: (payload: QueueCreate) => Promise<void>;
  remove: (id: string, duration?: number) => Promise<void>;
  clear: (queueName?: string) => void;
  removeByQueue: (queueName: string, duration?: number) => Promise<void>;
  getConfig: () => OverlayConfig;
}

export type TNuxtOverlay = INuxtOverlay;

export type OverlayPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface OverlayConfig {
  closeOnClick: boolean;
  duration: number | false;
  position: OverlayPosition;
  queueName: string;
}

export interface QueueItems extends OverlayConfig {
  id: string;
  [key: string]: unknown;
}

export interface QueueCreate {
  queueName?: string;
  closeOnClick?: boolean;
  duration?: number | false;
  [key: string]: unknown;
}

export interface QueueRemove {
  id: string;
  duration?: number;
}
