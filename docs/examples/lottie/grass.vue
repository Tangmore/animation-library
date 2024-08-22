<template>
  <div class="lottieContainer" ref="lottieContainer"></div>
</template>
<script setup lang="ts">
import Lottie from 'lottie-web'
import animationData from '../../public/json/animation2.json'
import { onMounted, ref, nextTick } from 'vue'
const lottieContainer = ref()
onMounted(() => {
  nextTick(() => {
    const lottieOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      container: lottieContainer.value,
      render: 'canvas',
    }
    Lottie.loadAnimation(lottieOptions)
  })
})
</script>
<style lang="scss" scoped>
.lottieContainer {
  width: 200px;
  height: 200px;
}
</style>
