import { computed, ref } from 'vue'
import { createGlobalState,useStorage } from '@vueuse/core'

export const useGlobalState = createGlobalState(
  () => {
    // state
    const count1 = ref(0)

    // getters
    const doubleCount = computed(() => count1.value * 2)

    // actions
    function increment() {
      count1.value++
    }

    useStorage('vue-use-local-storage',count1) 

    return { count1, doubleCount, increment }
  }
)
