<template>
  <div class="container"> 
    <div class="content">
      <h1>Welcome to NuxtOverlay Component</h1>
      <label for="duration">Set duration time in milliseconds</label>
      <input
        id="duration"
        v-model="duration"
        type="text"
      >
      <br>
      <label for="positions">Choose a position</label>
      <select
        id="positions"
        v-model="select"
      >
        <option
          v-for="(position, index) in positions"
          :key="index"
          :value="position"
        >
          {{ position }}
        </option>
      </select>
      <button
        @click="$overlay.create({
          queueName: select,
          message: `${select} message`, 
          icon: 'icon',
          type: 'type',
          duration
        })"
      >
        show in {{ select }}
      </button>

      <NuxtOverlay
        v-for="(position, index) in positions"
        :key="index"
        :queue-name="position"
        :position="position"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const select = ref( 'top-left' )
const duration = ref(5000)
const positions = ref( [
  'top-left',
  'top-center',
  'top-right',
  'center-left',
  'center',
  'center-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
])

</script>
<style lang="css" scoped>
  .container {
    position: fixed;  /*Stay in place */
    display: block;
    overflow: auto; /* Enable scroll if needed */
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%) !important;
  }
  .content {
    position: relative;  /*Stay in place */
    display: block;
    padding: 2px;
    margin: auto;
    margin-bottom: 1px;
    width: auto;  /* Full width */
    text-align: center;
  }
</style>
