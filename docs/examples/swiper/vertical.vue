<!-- 垂直滚动 -->
<template>
    <div class="container">
        <div class="content">
            <ul class="ul-title">
                <li class="title-li">
                    <div style="flex: 1; text-align: left">工单编号</div>
                    <div style="flex: 1; text-align: left">工单类型</div>
                    <div style="flex: 1; text-align: left">所属街区</div>
                    <div style="flex: 1; text-align: left">申请人</div>
                    <div style="flex: 1.2; text-align: left">申请时间</div>
                </li>
            </ul>
            <template v-if="taskList.length">
                <Swiper :modules="modules" :slides-per-view="5" direction="vertical"
                    :autoplay="{ delay: 2000, disableOnInteraction: false }" :loop="true" class="swiper-content-box">
                    <SwiperSlide v-for="(item, index) in taskList" :key="index" class="swiper-item-content-box">
                        <div class="task-name">{{ item.id }}</div>
                        <div class="task-name">{{ item.name }}</div>
                        <div class="task-name">{{ item.street }}</div>
                        <div class="task-name">{{ item.value }}</div>
                        <div class="task-score">{{ item.time }}</div>
                    </SwiperSlide>
                </Swiper>
            </template>
            <el-empty v-else description="暂无数据" :image-size="50" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from "swiper/vue"
import "swiper/css" // 引入基本的 Swiper CSS
import { Autoplay, Pagination, Navigation, Scrollbar } from "swiper/modules"
const modules = [Autoplay, Pagination, Navigation, Scrollbar]

const taskList = ref([
    { id: 123, name: '报修工单', street: '中央街区', value: '张三四', time: '2025.01.25  10:00:02' },
    { id: 123, name: '报修工单', street: '中央街区', value: '张三四', time: '2025.01.25  10:00:02' },
    { id: 123, name: '报修工单', street: '中央街区', value: '张三四', time: '2025.01.25  10:00:02' },
    { id: 123, name: '报修工单', street: '中央街区', value: '张三四', time: '2025.01.25  10:00:02' },
    { id: 123, name: '报修工单', street: '中央街区', value: '张三四', time: '2025.01.25  10:00:02' },
    { id: 123, name: '报修工单', street: '中央街区', value: '张三四', time: '2025.01.25  10:00:02' },
    { id: 123, name: '报修工单', street: '中央街区', value: '张三四', time: '2025.01.25  10:00:02' },
    { id: 123, name: '报修工单', street: '中央街区', value: '张三四', time: '2025.01.25  10:00:02' },
    { id: 123, name: '报修工单', street: '中央街区', value: '张三四', time: '2025.01.25  10:00:02' },
    { id: 123, name: '报修工单', street: '中央街区', value: '张三四', time: '2025.01.25  10:00:02' },
])
onMounted(() => { })
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 260px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 10px;
    box-sizing: border-box;

    ul,
    li {
        padding: 0px;
        margin: 0px;
        list-style: none;
    }

    .content {
        width: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        overflow: hidden;

        .ul-title {
            width: 100%;
            color: #ABAEB1;
            height: 40px;
            line-height: 40px;
            margin-bottom: 8px;
            font-size: 16px;

            .title-li {
                margin-bottom: 0px;
                padding-bottom: 0px;
                box-sizing: border-box;
                margin-bottom: 15px;
                font-size: 15px;
                display: flex;
                justify-content: space-between;
                box-sizing: border-box;

                div {
                    text-align: center;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
        }

        .swiper-content-box {
            width: 100%;
            flex: 1;
            overflow: hidden;
            box-sizing: border-box;

            .swiper-item-content-box {
                box-sizing: border-box;
                margin: 0px;
                padding: 0px;
                margin-bottom: 15px;
                font-size: 15px;
                display: flex;
                justify-content: space-between;
                box-sizing: border-box;
                height: auto !important;
                color: #4E4F54;

                .task-name {
                    flex: 1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    text-align: left;
                }

                .task-score {
                    flex: 1.2;
                    text-align: left;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    box-sizing: border-box;
                }
            }
        }

    }
}
</style>
