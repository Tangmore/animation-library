<template>
  <div class="container" ref="containerRef">
    <canvas id="canvasDiv" ref="canvas"></canvas>
  </div>
</template>
<script setup>
import { onMounted, ref, reactive } from 'vue'
const canvas = ref()
const containerRef = ref()

const particleCount = 120
const particleSpeed = 1
const particleSize = 2
const paperSize = 15
const maxDistance = 100
const lightningColor = '#fff'
const state = reactive({
  ctx: null,
  canvasWidth: 0,
  canvasHeight: 0,
  aId: null,
  particles: [],
  connections: [],
})
onMounted(() => {
  state.ctx = canvas.value.getContext('2d')
  let { width, height } = containerRef.value.getBoundingClientRect()
  let div = document.getElementById('canvasDiv')
  div.width = width
  div.height = height
  state.canvasWidth = width
  state.canvasHeight = height

  createPapers()
  animate()
  handleMove()
})
// 粒子
class Paper {
  constructor() {
    this.x = Math.random() * state.canvasWidth
    this.y = Math.random() * state.canvasHeight
    this.w = Math.random() * paperSize + 2
    this.h = Math.random() * paperSize + 2
    this.angle = Math.random() * 360
    this.speed = Math.random() * particleSpeed
    this.opacity = Math.random() * 0.5 + 0.5
    let r = parseInt(Math.random() * 255),
      g = parseInt(Math.random() * 255),
      b = parseInt(Math.random() * 255)
    this.color = `rgb(${r},${g},${b})`
  }
  draw() {
    state.ctx.beginPath()
    state.ctx.fillStyle = this.color
    state.ctx.fillRect(this.x, this.y, this.w, this.h)
  }
  update() {
    this.x += Math.cos(this.angle) * this.speed
    this.y += this.speed

    if (
      this.x < 0 ||
      this.x > state.canvasWidth ||
      this.y < 0 ||
      this.y > state.canvasHeight
    ) {
      this.x = Math.random() * state.canvasWidth
      this.y = Math.random() * state.canvasHeight
    }
  }
}
// 创建粒子
function createPapers() {
  for (let i = 0; i < particleCount; i++) {
    state.particles.push(new Paper())
  }
}
// 绘制连线
function drawConnections() {
  for (let i = 0; i < state.particles.length; i++) {
    for (let j = i + 1; j < state.particles.length; j++) {
      let dx = state.particles[i].x - state.particles[j].x
      let dy = state.particles[i].y - state.particles[j].y
      let distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < maxDistance) {
        state.ctx.beginPath()
        state.ctx.moveTo(state.particles[i].x, state.particles[i].y)
        state.ctx.lineTo(state.particles[j].x, state.particles[j].y)
        state.ctx.strokeStyle = lightningColor
        state.ctx.lineWidth = 0.2 * (1 - distance / maxDistance)
        state.ctx.stroke()
        state.ctx.closePath()
      }
    }
  }
}
// 动画
function animate() {
  state.ctx.clearRect(0, 0, state.canvasWidth, state.canvasHeight)
  for (let particle of state.particles) {
    particle.update()
    particle.draw()
  }
  // drawConnections()
  state.aId = requestAnimationFrame(animate)
}
function handleMove() {
  canvas.value.onmousemove = (e) => {
    let mouseX = e.pageX,
      mouseY = e.pageY
    for (let particle of state.particles) {
      let dx = mouseX - particle.x,
        dy = mouseY - particle.y
      let distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < maxDistance) {
        particle.angle = Math.atan2(dy, dx)
        particle.speed = 5
      } else {
        particle.speed = Math.random() * particleSpeed
      }
    }
  }
}
</script>
<style scoped lang="scss">
.container {
  width: 100%;
  height: 300px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;

  canvas {
    width: 100%;
    height: 100%;
    background: url('/img/05.png') no-repeat center;
    background-size: 100% 100%;
  }
}
</style>
