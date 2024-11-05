<template>
  <div class="content">
    <div class="left-btn">
      我是按钮
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>

    <div class="border-ani">
      button
    </div>
  </div>
</template>
<script setup></script>

<style lang="scss" scoped>
.content {
  display: flex;
  align-items: center;
  gap: 28px;
}

.left-btn {
  padding: 10px 20px;
  color: rgb(124, 224, 191);
  font-size: 16px;
  border-radius: 5px;
  position: relative;
  overflow: hidden;

  div {
    position: absolute;
  }
}

.left-btn :nth-child(1) {
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  animation: run1 1s linear infinite;
  background: linear-gradient(to right, #fff, #acd, cyan);
}

.left-btn :nth-child(2) {
  top: 0;
  right: 0;
  height: 100%;
  width: 2px;
  animation: run2 1s linear infinite;
  background: linear-gradient(to bottom, #fff, #acd, cyan);
}

.left-btn :nth-child(3) {
  bottom: 0;
  left: 0;
  height: 2px;
  width: 100%;
  animation: run3 1s linear infinite;
  background: linear-gradient(to right, #fff, #acd, cyan);
}

.left-btn :nth-child(4) {
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

.border-ani {
  width: 4rem;
  height: 4rem;
  border: 1px solid rgb(124, 224, 191);
  font-size: 16px;
  border-radius: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(124, 224, 191);

  &::before {
    content: '';
    display: block;
    width: 4rem;
    height: 4rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    border: 3px solid rgba(124, 224, 191, 0.5);
    animation: scale 2s linear infinite;
  }
}

@keyframes scale {
  0% {
    transform: translate(-50%, -50%) scale(1.01);
    opacity: 1;
  }

  100% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
  }
}
</style>
