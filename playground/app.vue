<template>
  <div class="container">
    <div class="content">
      <h1>Welcome to NuxtOverlay Playground Component</h1>
      <label for="duration">Set duration time in milliseconds</label>
      <input id="duration" v-model="duration" type="text" />
      <br />
      <label for="positions">Choose a position</label>
      <select id="positions" v-model="select">
        <option
          v-for="(position, index) in positions"
          :key="index"
          :value="position"
        >
          {{ position }}
        </option>
      </select>
      <button
        @click="
          overlayCreate({
            queueName: select,
            duration: 5000,
            type: `success`,
            text: `${select} message`,
            icon: `icon`,
            title: `Component title`,
            color: 'green',
          })
        "
      >
        show in {{ select }}
      </button>

      <h1>Configs</h1>
      <pre>
        {{ $overlay.getConfig() }}
      </pre>

      <h1>Queue Items ({{ $overlay.getQueue().length }})</h1>
      <div style="overflow: auto; height: 300px">
        <pre>
          {{ $overlay.getQueue() }}
        </pre>
      </div>

      <NuxtOverlay
        v-for="(position, index) in positions"
        :key="index"
        :queue-name="position"
        :position="position"
        width="33vw"
      />
    </div>
  </div>
</template>

<script setup>
import { useNuxtApp } from "#app";
import { ref } from "vue";
const { $overlay } = useNuxtApp();

const select = ref("top-left");
const duration = ref(5000);
const positions = ref([
  "top-left",
  "top-center",
  "top-right",
  "center-left",
  "center",
  "center-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
]);

function overlayCreate(payload) {
  $overlay.create(payload);
}
</script>
<style lang="css" scoped>
.container {
  position: fixed; /*Stay in place */
  display: block;
  overflow: auto; /* Enable scroll if needed */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.content {
  position: relative; /*Stay in place */
  display: block;
  padding: 2px;
  margin: auto;
  margin-bottom: 1px;
  width: auto; /* Full width */
  text-align: center;
}
</style>
