<template>
  <div class="p-4">
    <h1>Nuxt Overlay Playground</h1>
    <button @click="notify">Create overlay</button>
    <NuxtOverlay queue-name="top-center" position="top-center" width="33vw" />
  </div>
</template>

<script setup>
// import { useNuxtApp } from "#app";
// const { $overlay } = useNuxtApp();

function notify() {
  $overlay.create({
    queueName: "top-center",
    text: "Hello from playground",
    type: "info",
    duration: 2000,
  });
}
</script>

<style scoped>
button {
  padding: 6px 10px;
  border: 1px solid #999;
  border-radius: 4px;
}
</style>
