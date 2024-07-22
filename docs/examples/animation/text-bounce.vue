<template>
  <span
    class="text-glow"
    v-for="(item, index) in systemTitle"
    :key="index"
    :style="{ 'animation-delay': 0.2 * (index + 1) + 's' }"
    >{{ item }}</span
  >
</template>
<script setup>
import { ref } from 'vue'
const systemTitle = ref('蹦跶的标题')
</script>
<style lang="scss" scoped>
.text-glow {
  padding: 10px;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 4px;
  display: inline-block;
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  background: linear-gradient(315deg, #42d392 25%, #647eff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  -webkit-animation: fadeUp 0.8s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: fadeUp 0.8s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

@keyframes fadeUp {
  0% {
    opacity: 0;
    -webkit-transform: translateY(10px);
    transform: translateY(10px);
  }

  50% {
    opacity: 0;
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
  }

  100% {
    opacity: 1;
    -webkit-transform: translateY(0px);
    transform: translateY(-10px);
  }
}
</style>
