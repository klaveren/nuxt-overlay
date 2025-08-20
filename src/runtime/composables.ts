import {
  type QueueItems,
  type QueueCreate,
  type OverlayConfig,
  type INuxtOverlay,
} from "./types/";
import generateUniqueId from "./utils/generateUniqueId";
import { useAppConfig } from "nuxt/app";
import { ref } from "vue";

export function useNuxtOverlay(): INuxtOverlay {
  const appConfig = useAppConfig();

  const queue = ref<QueueItems[]>([]);

  const nuxtOverlayConfig: OverlayConfig = (appConfig?.nuxtOverlay || {
    closeOnClick: true,
    duration: 5000,
    position: "top-center",
    queueName: "default",
  }) as OverlayConfig;

  const create = async (payload: QueueCreate): Promise<void> => {
    const uid = generateUniqueId(5);

    const resolvedDuration =
      payload.duration === undefined
        ? nuxtOverlayConfig.duration
        : payload.duration;

    const item: QueueItems = {
      ...payload,
      id: String(uid),
      queueName: payload.queueName ?? nuxtOverlayConfig.queueName ?? "default",
      closeOnClick: payload.closeOnClick ?? nuxtOverlayConfig.closeOnClick,
      duration: resolvedDuration as number | false,
      position: nuxtOverlayConfig.position,
    } as QueueItems;

    queue.value.push(item);

    if (typeof resolvedDuration === "number" && resolvedDuration > 0) {
      await remove(uid, resolvedDuration);
    }
  };

  const remove = async (id: string, duration?: number): Promise<void> => {
    const executeRemoval = () => {
      const indexToRemove = queue.value.findIndex(
        (item: QueueItems) => item.id === id
      );
      if (indexToRemove >= 0) {
        queue.value.splice(indexToRemove, 1);
      }
    };

    if (typeof duration === "number" && duration > 0) {
      setTimeout(executeRemoval, duration);
    } else {
      executeRemoval();
    }
  };

  const clear = (queueName?: string): void => {
    if (!queueName) {
      queue.value = [];
      return;
    }
    queue.value = queue.value.filter(
      (item: QueueItems) => item.queueName !== queueName
    );
  };

  const removeByQueue = async (
    queueName: string,
    duration?: number
  ): Promise<void> => {
    const idsToRemove = queue.value
      .filter((q: QueueItems) => q.queueName === queueName)
      .map((q: QueueItems) => q.id);
    await Promise.all(idsToRemove.map((id: string) => remove(id, duration)));
  };

  function getQueue(): QueueItems[] {
    return queue.value;
  }
  function getConfig(): OverlayConfig {
    return nuxtOverlayConfig;
  }

  return {
    create,
    remove,
    clear,
    removeByQueue,
    getQueue,
    getConfig,
  };
}
