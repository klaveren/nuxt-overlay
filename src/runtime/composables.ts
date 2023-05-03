import generateUniqueId from "./utils/generateUniqueId";
import { useAppConfig } from "#imports";
import type {
  QueueItems,
  QueueCreate,
  OverlayConfig,
  INuxtOverlay,
} from "./types";
import { Ref, ref } from "vue";

export const useNuxtOverlay = (): INuxtOverlay => {
  const appConfig = useAppConfig();

  const queue: Ref<QueueItems[]> = ref([]);

  const nuxtOverlayConfig: OverlayConfig = appConfig?.nuxtOverlay || {
    closeOnClick: true,
    duration: 5000,
    position: "top-center",
    queueName: "default",
  };

  const create = async (payload: QueueCreate): Promise<void> => {
    const uid = generateUniqueId(5);
    const duration = payload.duration || nuxtOverlayConfig.duration;
    queue.value.push(
      Object.assign({
        ...payload,
        id: uid.toString(),
        queueName: payload.queueName || "default",
        closeOnClick: payload.closeOnClick || nuxtOverlayConfig.closeOnClick,
      })
    );

    // auto remove
    if (duration) await remove(uid, duration);
  };

  const remove = async (id: string, duration: number): Promise<void> => {
    setTimeout(() => {
      queue.value.splice(
        queue.value.findIndex((item) => item.id === id),
        1
      );
    }, duration);
  };

  function getQueue(): QueueItems[] | undefined {
    return queue.value;
  }
  function getConfig(): OverlayConfig {
    return nuxtOverlayConfig;
  }

  return {
    create,
    remove,
    getQueue,
    getConfig,
  };
};
