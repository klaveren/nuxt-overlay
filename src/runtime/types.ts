export interface ModuleOptions {
}
export interface QueueItems {
  closeOnClick?: boolean
  duration?: number
  position?: string
  queueName?: string
  [key: string]: any;
}
export interface QueueCreate {
  id: string
  queueName?: string
  closeOnClick?: boolean
  duration?: number
  [key: string]: any;
}
export interface QueueRemove {
  id: string
  duration?: number
}
export interface OverlayConfig {
  closeOnClick: boolean,
  duration: number,
  position: string,
  queueName: string,
}
export interface OverlayType {
  getQueue: QueueItems[] | any;
  create: (payload: QueueCreate) => Promise<void>
  remove: (id: string, duration: number) => Promise<void>
  getConfig: OverlayConfig | any
}