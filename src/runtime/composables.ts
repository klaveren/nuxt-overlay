import generateUniqueId from './utils/generateUniqueId'
import { useAppConfig } from '#imports'
import type { QueueItems, QueueCreate, OverlayConfig, OverlayType } from "./types"
import { Ref, ref } from 'vue'

export const useNuxtOverlay = (): OverlayType => {
  const appConfig = useAppConfig()

  const queue: Ref<QueueItems[]> = ref( [] )

  const nuxtOverlayConfig: OverlayConfig = appConfig?.nuxtOverlay || {
    closeOnClick: true,
    duration: 5000,
    position: 'top-center',
    queueName: 'default',
  } 

  const create = async ( payload: QueueCreate ): Promise<void> => {
    const uid = generateUniqueId( 5 )
    const duration = payload.duration || nuxtOverlayConfig.duration
    queue.value.push( Object.assign({
        ...payload,
        id: uid.toString(),
        queueName: payload.queueName || 'default',
        closeOnClick: payload.closeOnClick || nuxtOverlayConfig.closeOnClick
      })
    )
    if(duration) await remove(uid, duration)
  }

  const remove = async ( id: string, duration: number) : Promise<void>=> {
    setTimeout( () => { 
      queue.value.splice( queue.value.findIndex( item => item.id === id ), 1 );
    }, duration || nuxtOverlayConfig.duration )
  }

  function getQueue() {
    return queue.value
  }
  function getConfig() {
    return nuxtOverlayConfig
  }
  
  return {
    create,
    remove,
    getQueue,
    getConfig
  }
}
