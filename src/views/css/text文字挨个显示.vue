<template>
  <div class="screen-header">
    <div class="header-title">
      <span
        class="text-glow"
        v-for="(item, index) in systemTitle"
        :key="index"
        :style="{ 'animation-delay': 0.2 * (index + 1) + 's' }"
        >{{ item }}</span
      >
      <div class="arrow leftArrow" :class="`leftArrow${index}`"></div>
      <div class="arrow rightArrow" :class="`rightArrow${index}`"></div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount } from 'vue'
const systemTitle = ref('蹦跶的标题')
const index = ref(1)
let timer = null
onMounted(() => {
  timer = setInterval(() => {
    if (index.value < 4) {
      index.value++
    } else {
      index.value = 1
    }
  }, 1000)
})
onBeforeUnmount(() => {
  clearInterval(timer)
  timer = null
})
</script>

<style lang="scss" scoped>
.screen-header {
  width: 100%;
  height: 114px;
  color: #abbfdb;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  .header-title {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .text-glow {
      font-family: PangMenZhengDao;
      font-size: 50px;
      letter-spacing: 7px;
      display: inline-block;
      background: -webkit-linear-gradient(180deg, #ffffff 0%, #5ad5f8 100%);
      background: linear-gradient(180deg, #ffffff 0%, #5ad5f8 100%);
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

    .arrow {
      position: absolute;
      width: 48px;
      height: 40px;
      background-repeat: no-repeat;
      background-size: 100%;
      top: 50px;
      z-index: 100;
    }

    .leftArrow {
      left: 354px;
    }

    .rightArrow {
      right: 377px;
    }

    .leftArrow1 {
      background-image: url('@/assets/arrow/left1.png');
    }

    .leftArrow2 {
      background-image: url('@/assets/arrow/left2.png');
    }

    .leftArrow3 {
      background-image: url('@/assets/arrow/left3.png');
    }

    .leftArrow4 {
      background-image: url('@/assets/arrow/left4.png');
    }

    .rightArrow1 {
      background-image: url('@/assets/arrow/right1.png');
    }

    .rightArrow2 {
      background-image: url('@/assets/arrow/right2.png');
    }

    .rightArrow3 {
      background-image: url('@/assets/arrow/right3.png');
    }

    .rightArrow4 {
      background-image: url('@/assets/arrow/right4.png');
    }
  }
}
</style>
