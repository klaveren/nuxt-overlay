import { defineNuxtPlugin } from "#imports";
import { useNuxtOverlay } from './composables'

export default defineNuxtPlugin( () => { 
  return {
    provide: {
      overlay: useNuxtOverlay()
    }
  }
})