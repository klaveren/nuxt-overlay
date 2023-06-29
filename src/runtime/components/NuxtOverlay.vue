<template>
  <Teleport to="body">
    <div
      :id="`overlay-${queueName}`"
      :class="[
        `overlay-container`,
        `overlay-position-${position || $overlay.getConfig().position}`,
      ]"
      :style="`width: ${width} !important`"
    >
      <div
        v-for="itemQueue in $overlay
          .getQueue()
          .filter((item: QueueItems) => item.queueName === queueName)"
        :id="itemQueue.id"
        :key="itemQueue.id"
        class="overlay-content"
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
import { useNuxtApp } from "#imports";
import { QueueItems } from "../types";
const { $overlay } = useNuxtApp();

const props = defineProps({
  position: {
    type: String,
    required: false,
    default: "top-center",
  },
  queueName: {
    type: String,
    required: false,
    default: "default",
  },
  width: {
    type: [Number, String],
    required: false,
    default: "33vw",
  },
  closeOnClick: {
    type: Boolean,
    required: false,
  },
});
async function onClickClose(id: string) {
  if (props.closeOnClick || $overlay.getConfig().closeOnClick)
    await $overlay.remove(id, 1);
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
