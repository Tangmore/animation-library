<template>
    <div class="container" ref="containerRef">
        <canvas id="canvasDiv" ref="canvas"></canvas>
        <div class="button-box">
            <el-button type="primary" plain size="small" @click="handleClick('boldLine')">粗线条</el-button>
            <el-button type="warning" plain size="small" @click="handleClick('thinLine')">细线条</el-button>
            <el-button type="info" plain size="small" @click="handleClick('save')">保存签名</el-button>
            <el-input type="color" style="width: 50px;height:24px;margin: 0px 10px;" v-model="state.color" @change="handleClick('color')" />
            <el-button type="primary" plain size="small" @click="handleClick('rubber')">橡皮擦</el-button>
            <el-button type="danger" plain size="small" @click="handleClick('none')">清空画布</el-button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
const canvas = ref()
const containerRef = ref()
const state = reactive({
    ctx: null,
    aId: null,
    canvasWidth: 0,
    canvasHeight: 0,
    isDraw: false,
    color: '#666',
})
onMounted(() => {
    state.ctx = canvas.value.getContext('2d')
    state.ctx.lineJoin = 'round'
    let { width, height } = containerRef.value.getBoundingClientRect()
    let div = document.getElementById('canvasDiv')
    div.setAttribute('width', width)
    div.setAttribute('height', height)
    state.canvasWidth = width
    state.canvasHeight = height
    draw()
})
const draw = () => {
    canvas.value.onmousedown = (e) => {
        state.ctx.beginPath();
        state.isDraw = true;
        let x = e.pageX - canvas.value.offsetLeft;
        let y = e.pageY - canvas.value.offsetTop;
        state.ctx.moveTo(x, y);
    };
    canvas.value.onmousemove = (e) => {
        console.log(state.isDraw);
        if (state.isDraw) {
            let x = e.pageX - canvas.value.offsetLeft;
            let y = e.pageY - canvas.value.offsetTop;
            state.ctx.lineTo(x, y);
            state.ctx.stroke();
        }
    };
    canvas.value.onmouseleave = () => {
        state.isDraw = false
        state.ctx.closePath();
    };
}

const handleClick = (type) => {
    switch (type) {
        case 'boldLine':
            state.ctx.lineWidth = 10
            break
        case 'thinLine':
            state.ctx.lineWidth = 5
            break
        case 'save':
            const downHref = canvas.value.toDataURL();
            let a = document.createElement('a')
            a.download = '签名.png'
            a.href = downHref
            a.click()
            break
        case 'color':
            state.ctx.strokeColor = state.color
            break
        case 'rubber':
            state.ctx.lineWidth = 30
            // 画笔擦除
            state.ctx.globalCompositeOperation = "destination-out";
            break
        case 'none':
            state.ctx.clearRect(0, 0, state.canvasWidth, state.canvasHeight)
            break
    }
}
</script>
<style scoped lang="scss">
.container {
    width: 100%;
    height: 200px;
    box-sizing: content-box;
    position: relative;

    .button-box {
        position: absolute;
        right: 10px;
        bottom: 10px;
        display: flex;
        align-items: center;
    }
}
</style>
