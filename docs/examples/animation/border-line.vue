<template>
  <div class="main">
    我是按钮
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.main {
  padding: 10px 20px;
  color: rgb(124, 224, 191);
  font-size: 16px;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
}

.main div {
  position: absolute;
}

.main :nth-child(1) {
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  animation: run1 1s linear infinite;
  background: linear-gradient(to right, #fff, #acd, cyan);
}

.main :nth-child(2) {
  top: 0;
  right: 0;
  height: 100%;
  width: 2px;
  animation: run2 1s linear infinite;
  background: linear-gradient(to bottom, #fff, #acd, cyan);
}

.main :nth-child(3) {
  bottom: 0;
  left: 0;
  height: 2px;
  width: 100%;
  animation: run3 1s linear infinite;
  background: linear-gradient(to right, #fff, #acd, cyan);
}

.main :nth-child(4) {
  top: 0;
  left: 0;
  height: 100%;
  width: 2px;
  animation: run4 1s linear infinite;
  background: linear-gradient(to top, #fff, #acd, cyan);
}

@keyframes run1 {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(100%);
  }
}

@keyframes run2 {
  from {
    transform: translateY(-100%);
  }

  to {
    transform: translateY(100%);
  }
}

@keyframes run3 {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(-100%);
  }
}

@keyframes run4 {
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(-100%);
  }
}
</style>
