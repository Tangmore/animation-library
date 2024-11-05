<template>
    <div class="content">
        <div class="item">
            <img src="../../public/img/circle/640.gif" alt="" />
        </div>
        <div class="item">
            <img src="../../public/img/circle/641.gif" alt="" />
        </div>
        <div class="item">
            <img src="../../public/img/circle/646.gif" alt="" />
        </div>
        <div class="item">
            <img src="../../public/img/circle/643.gif" alt="" />
        </div>
        <div class="item">
            <img src="../../public/img/circle/645.gif" alt="" />
        </div>
    </div>
</template>
<script setup></script>
<style lang="scss" scoped>
$size: 250px;
$imgSize: 80px;
$n: 5;
$deg: 360deg / $n;

.content {
    width: $size;
    height: $size;
    outline: 1px solid #ccc;
    margin: 0 auto;
    position: relative;
    border-radius: 50%;
    margin: 40px;
    display: flex;
    justify-content: center;
    align-items: start;
    animation: rotation 10s linear infinite;

    &:hover {
        animation-play-state: paused;
    }

    .item {
        width: $imgSize;
        height: $imgSize;
        position: absolute;
        margin-top: -40px;
        transform-origin: center $size / 2 + $imgSize / 2;

        @for $i from 1 through $n {
            $d: (
                $i - 1) * $deg ;

            &:nth-child(#{$i}) {
                transform: rotate($d
                );

            img {
                --initDeg: #{-$d};
                transform: rotate(-$d);
                animation: rotation 10s linear infinite reverse;
            }
        }
    }

    img {
        max-width: 100%;
        max-height: 100%;
    }
}
}

@keyframes rotation {
    to {
        transform: rotate(calc(360deg + var(--initDeg, 0deg)));
    }
}
</style>
