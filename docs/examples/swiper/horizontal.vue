<!-- 横向滚动 -->
<template>
    <div class="container">
        <div class="content">
            <Swiper :modules="modules" :slides-per-view="2" :space-between="20"
                :autoplay="{ delay: 4000, disableOnInteraction: false }" :loop="true" class="right-swiper-box">
                <SwiperSlide class="right-swiper-item" v-for="(item, index) in chartData" :key="index">
                    <div class="swiper-content">
                        {{ item.name }}
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation, Scrollbar } from 'swiper/modules'
import 'swiper/css' // 引入基本的 Swiper CSS 

const modules = [Autoplay, Pagination, Navigation, Scrollbar]
const chartData = ref < any[] > ([
    { name: '语文', money: 0, rate: 0, ins: '0' },
    { name: '数学', money: 0, rate: 0, ins: '0' },
    { name: '外语', money: 0, rate: 0, ins: '0' },
    { name: '生物', money: 0, rate: 0, ins: '0' },
    { name: '化学', money: 0, rate: 0, ins: '0' },
    { name: '物理', money: 0, rate: 0, ins: '0' },
    { name: '历史', money: 0, rate: 0, ins: '0' },
    { name: '整治', money: 0, rate: 0, ins: '0' },
])

</script>
<style scoped lang="scss">
.container {
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 10px;
    box-sizing: border-box;

    .content {
        width: 100%;
        flex: 1;
        overflow: hidden;

        .right-swiper-box {
            width: 100%;
            height: 100%;

            .right-swiper-item {
                box-sizing: border-box;
                display: flex;
                align-items: center;
                border: 1px solid #666;

                .swiper-content {
                    padding: 10px;
                    box-sizing: border-box;
                    font-family: PingFangSC, PingFang SC;
                    font-weight: 400;
                    font-size: 14px;
                    color: #666;
                    line-height: 17px;
                    text-align: left;
                    font-style: normal;

                }
            }
        }
    }
}
</style>
