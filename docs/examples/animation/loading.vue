<template>
  <div class="app-loading-wrap">
    <div class="app-loading-dots"></div>
    <div class="app-loading-title">资源加载中，请稍后</div>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.app-loading-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.app-loading-dots {
  width: 300px;
  height: 120px;
  position: relative;
}

/*椭圆*/
.app-loading-dots::before {
  content: '';
  display: inline-block;
  width: 80px;
  height: 15px;
  background: #b2b5b9;
  opacity: 0.3;
  border-radius: 50%;
  position: absolute;
  top: 100px;
  left: 110px;
  animation: shadow 1s linear infinite;
}

/*方块*/
.app-loading-dots::after {
  content: '';
  display: inline-block;
  width: 50px;
  height: 50px;
  background: linear-gradient(150deg, #36d1dc, #5b86e5);
  border-radius: 6px;
  position: absolute;
  top: 40px;
  left: 125px;
  animation: animate 1s linear infinite;
}

.app-loading-title {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0px;
  color: #798ab1;
  font-size: 16px;
  letter-spacing: 2px;
  font-weight: 600;
}

@keyframes animate {
  17% {
    border-bottom-right-radius: 4px;
  }

  25% {
    transform: translateY(9px) rotate(22.5deg);
  }

  50% {
    transform: translateY(18px) scale(1, 0.9) rotate(45deg);
    border-bottom-right-radius: 40px;
  }

  75% {
    transform: translateY(9px) rotate(67.5deg);
  }

  100% {
    transform: translateY(0) rotate(90deg);
  }
}

@keyframes shadow {
  0%,
  100% {
    transform: scale(1, 1);
  }

  50% {
    transform: scale(1.2, 1);
  }
}
</style>
