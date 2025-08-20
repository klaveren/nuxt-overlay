<template>
  <Teleport to="body">
    <div
      :id="`overlay-${queueName}`"
      :class="[
        `overlay-container`,
        `overlay-position-${position || $overlay.getConfig().position}`,
      ]"
      :style="{ width: computedWidth }"
      role="status"
      aria-live="polite"
    >
      <div
        v-for="itemQueue in $overlay
          .getQueue()
          .filter((item: any) => item.queueName === queueName)"
        :id="itemQueue.id"
        :key="itemQueue.id"
        :class="[
          'overlay-content',
          `overlay-position-${position || $overlay.getConfig().position}`,
        ]"
        @click="onClickClose(itemQueue.id)"
      >
        <slot name="default" :item-queue="itemQueue">
          <div>
            <h3>Provide your own customized content</h3>
            itemQueue Data:
            <pre style="font-size: 10px">
                {{ itemQueue || "" }}
            </pre>
          </div>
        </slot>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { type OverlayPosition, type INuxtOverlay } from "../types/index";
import { useNuxtApp } from "nuxt/app";
const nuxtApp = useNuxtApp();
const $overlay = nuxtApp.$overlay as INuxtOverlay;

interface Props {
  position?: OverlayPosition;
  queueName?: string;
  width?: string | number;
  closeOnClick?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  position: "top-center",
  queueName: "default",
  width: "33vw",
});

const computedWidth = computed(() =>
  typeof props.width === "number" ? `${props.width}px` : props.width
);

async function onClickClose(id: string) {
  const shouldCloseOnClick =
    props.closeOnClick === true ||
    (props.closeOnClick === undefined && $overlay.getConfig().closeOnClick);
  if (shouldCloseOnClick) await $overlay.remove(id, 1);
}
</script>

<style scoped>
.overlay-slot {
  margin: 1;
  padding: 2px;
}

.overlay-slot:hover {
  cursor: pointer;
}
</style>
