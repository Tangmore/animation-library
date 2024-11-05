<template>
    <div class="container">
        <div class="card-box">
            <div class="card">
                <div></div>
            </div>
            <div class="card">
                <div></div>
            </div>
            <div class="card">
                <div></div>
            </div>
            <div class="card">
                <div></div>
            </div>
            <div class="card">
                <div></div>
            </div>
        </div>
    </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.container {
    width: 100%;
    height: 450px;
    position: relative;
    perspective: 2300px;
}

.card-box {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transform: rotateX(-10deg);
    animation: cardRotate 5s cubic-bezier(0.77, 0, 0.175, 1) infinite;
}

.card {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.card div {
    width: 350px;
    height: 250px;
    border-radius: 20px;
    background: rgba(206, 202, 202, 0.26);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(206, 202, 202, 0.56);
}

.card:nth-child(1) {
    transform: rotateY(0) translateZ(350px);
}

.card:nth-child(2) {
    transform: rotateY(72deg) translateZ(350px);
}

.card:nth-child(3) {
    transform: rotateY(144deg) translateZ(350px);
}

.card:nth-child(4) {
    transform: rotateY(216deg) translateZ(350px);
}

.card:nth-child(5) {
    transform: rotateY(288deg) translateZ(350px);
}

@keyframes cardRotate {

    0%,
    20% {
        transform: translateZ(-300px) rotateY(0);
    }

    25% {
        transform: translateZ(-300px) rotateY(-72deg);
    }

    50% {
        transform: translateZ(-300px) rotateY(-144deg);
    }

    75% {
        transform: translateZ(-300px) rotateY(-216deg);
    }

    100% {
        transform: translateZ(-300px) rotateY(-288deg);
    }
}
</style>
