export interface OverlayConfig {
  closeOnClick: boolean;
  duration: number | false;
  position:
    | "top-left"
    | "top-center"
    | "top-right"
    | "center-left"
    | "center"
    | "center-right"
    | "bottom-left"
    | " bottom-center"
    | "bottom-right";
  queueName: string;
}
export interface QueueItems extends OverlayConfig {
  id: string;
  [key: string]: any;
}
export interface QueueCreate {
  queueName: string;
  closeOnClick?: boolean;
  duration: number | false;
  [key: string]: any;
}
export interface QueueRemove {
  id: string;
  duration?: number;
}

export interface INuxtOverlay {
  getQueue: () => QueueItems[] | undefined;
  create: (payload: QueueCreate) => Promise<void>;
  remove: (id: string, duration: number) => Promise<void>;
  getConfig: () => OverlayConfig;
}
