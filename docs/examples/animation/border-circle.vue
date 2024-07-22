<template>
  <div class="button">我是按钮</div>
</template>
<script setup></script>
<style lang="scss" scoped>
.button {
  padding: 10px 20px;
  color: #d2bdff;
  border: 2px solid #d2bdff;
  border-radius: 4px;
  box-sizing: border-box;
  position: relative;
}

.button::before {
  content: '';
  position: absolute;
  left: -4px;
  top: -4px;
  display: inline-block;
  height: 8px;
  width: 8px;
  background: #d2bdff;
  box-shadow: 0px 0px 10px 3px #d2bdff;
  border-radius: 100%;
  animation: star 5s linear infinite;
  box-sizing: border-box;
}

@keyframes star {
  0% {
    left: -4px;
    top: -4px;
  }

  25% {
    left: calc(100% - 4px);
    top: -4px;
  }

  50% {
    left: calc(100% - 4px);
    top: calc(100% - 4px);
  }

  75% {
    left: -4px;
    top: calc(100% - 4px);
  }

  100% {
    left: -4px;
    top: -4px;
  }
}
</style>
