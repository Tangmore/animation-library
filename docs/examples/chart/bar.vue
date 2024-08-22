<script setup lang="ts">
import { ref, reactive, markRaw, watch, onMounted, nextTick, onBeforeUnmount } from "vue"
import * as echarts from "echarts"
import tools from "./echarts-auto-tooltip"
const props = defineProps({
    chartData: {
        type: Object,
        default: () => {
            return {
                xData: ['中央级', '地方级', '区级'],
                yData1: [300, 200, 0],
                yData2: [260, 190, 80],
            }
        },
    },
})

const chartRef = ref()
const myChart = ref()
const autoLoop = ref()
let visibleCount = 5
const offsetX = 8
const offsetY = 4
// 绘制左侧面
const CubeLeft = echarts.graphic.extendShape({
    shape: {
        x: 0,
        y: 0,
    },
    buildPath: function (ctx: any, shape) {
        const xAxisPoint = shape.xAxisPoint
        const c0 = [shape.x, shape.y]
        const c1 = [shape.x - offsetX, shape.y - offsetY]
        const c2 = [xAxisPoint[0] - offsetX, xAxisPoint[1] - offsetY]
        const c3 = [xAxisPoint[0], xAxisPoint[1]]
        ctx
            .moveTo(c0[0], c0[1])
            .lineTo(c1[0], c1[1])
            .lineTo(c2[0], c2[1])
            .lineTo(c3[0], c3[1])
            .closePath()
    },
})
// 绘制右侧面
const CubeRight = echarts.graphic.extendShape({
    shape: {
        x: 0,
        y: 0,
    },
    buildPath: function (ctx: any, shape) {
        const xAxisPoint = shape.xAxisPoint
        const c1 = [shape.x, shape.y]
        const c2 = [xAxisPoint[0], xAxisPoint[1]]
        const c3 = [xAxisPoint[0] + offsetX, xAxisPoint[1] - offsetY]
        const c4 = [shape.x + offsetX, shape.y - offsetY]
        ctx
            .moveTo(c1[0], c1[1])
            .lineTo(c2[0], c2[1])
            .lineTo(c3[0], c3[1])
            .lineTo(c4[0], c4[1])
            .closePath()
    },
})
// 绘制顶面
const CubeTop = echarts.graphic.extendShape({
    shape: {
        x: 0,
        y: 0,
    },
    buildPath: function (ctx: any, shape) {
        if (!shape.yValue) return
        const c1 = [shape.x, shape.y]
        const c2 = [shape.x + offsetX, shape.y - offsetY] //右点
        const c3 = [shape.x, shape.y - offsetX]
        const c4 = [shape.x - offsetX, shape.y - offsetY]
        ctx
            .moveTo(c1[0], c1[1])
            .lineTo(c2[0], c2[1])
            .lineTo(c3[0], c3[1])
            .lineTo(c4[0], c4[1])
            .closePath()
    },
})
// 注册三个面图形
echarts.graphic.registerShape("CubeLeft", CubeLeft)
echarts.graphic.registerShape("CubeRight", CubeRight)
echarts.graphic.registerShape("CubeTop", CubeTop)
//初始化
const initChart = () => {
    autoLoop.value && autoLoop.value.clearLoop()
    myChart.value = markRaw(echarts.init(chartRef.value))
    const option = {
        color: [
            "rgba(133, 176, 196, 1)",
            "rgba(229, 197, 127, 1)",
        ],
        //图例配置
        grid: {
            containLabel: true,
            left: 10,
            right: 10,
            top: 60,
            bottom: 10,
        },
        legend: {
            textStyle: {
                color: '#000',
                fontSize: 15,
                padding: [0, 0, 0, 10],
            },
            itemWidth: 12,
            itemHeight: 12,
            itemGap: 30,
            icon: 'rect',
            backgroundColor: '#fff',
            padding: [8, 46, 8, 46],
            // 单独设置
            data: [
                {
                    name: "本年度",
                },
                {
                    name: "去年同期",
                },
            ],
        },
        //信息栏配置
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
            extraCssText: "z-index:3", // 修改层级
            backgroundColor: "#fff",
            borderColor: "#fff",
            textStyle: {
                color: "#666",
                fontSize: 14,
                align: "left",
            },
        },
        dataZoom: [
            {
                show: false,
                xAxisIndex: 0,
                type: "inside",
                startValue: 0,
                endValue: visibleCount,
            },
        ],
        xAxis: {
            type: "category",
            data: props.chartData.xData,
            axisTick: {
                show: false, //隐藏X轴刻度
            },
            axisLine: {
                lineStyle: {
                    color: ["#E7E7E7"],
                    width: 1,
                    type: "dashed",
                },
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: "#AAAAAA",
                    fontSize: 16,
                },
            },
            splitLine: {
                show: false
            },
        },
        yAxis: {
            name: "单位：亿元",
            nameTextStyle: {
                color: "#FFFFFF",
                fontSize: 15,
                padding: [0, 0, 10, 0], // 上右下左的距离，单位为像素
            },
            axisLabel: {
                color: "#AAAAAA",
                fontFamily: "D-DIN-PRO",
                fontSize: 16,
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: "#9FB2C3",
                },
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: [5, 10],
                    dashOffset: 10,
                    color: '#AAAAAA',
                },
            },
            position: "left", // 左侧Y轴
        },
        series: [
            {
                name: "本年度",
                type: "custom",
                renderItem: (_: any, api: any) => {
                    const location = api.coord([api.value(0), api.value(1)])
                    return {
                        type: "group",
                        x: -10,
                        children: [
                            {
                                type: "CubeLeft",
                                shape: {
                                    api,
                                    xValue: api.value(0),
                                    yValue: api.value(1),
                                    x: location[0],
                                    y: location[1],
                                    xAxisPoint: api.coord([api.value(0), 0]),
                                },
                                style: {
                                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {
                                            offset: 0,
                                            color: "rgba(133, 176, 196, 1)",
                                        },
                                        {
                                            offset: 1,
                                            color: "rgba(0, 6, 24, 1)",
                                        },
                                    ]),
                                },
                            },
                            {
                                type: "CubeRight",
                                shape: {
                                    api,
                                    xValue: api.value(0),
                                    yValue: api.value(1),
                                    x: location[0],
                                    y: location[1],
                                    xAxisPoint: api.coord([api.value(0), 0]),
                                },
                                style: {
                                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {
                                            offset: 0,
                                            color: "rgba(133, 176, 196, 1)",
                                        },
                                        {
                                            offset: 1,
                                            color: "rgba(0, 6, 24, 1)",
                                        },
                                    ]),
                                },
                            },
                            {
                                type: "CubeTop",
                                shape: {
                                    api,
                                    xValue: api.value(0),
                                    yValue: api.value(1),
                                    x: location[0],
                                    y: location[1],
                                    xAxisPoint: api.coord([api.value(0), 0]),
                                },
                                style: {
                                    fill: "rgba(161, 213, 241, 1)",
                                },
                            },
                        ],
                    }
                },
                data: props.chartData.yData1,
            },
            {
                name: "去年同期",
                type: "custom",
                renderItem: (_: any, api: any) => {
                    const location = api.coord([api.value(0), api.value(1)])
                    return {
                        type: "group",
                        x: 10,
                        children: [
                            {
                                type: "CubeLeft",
                                shape: {
                                    api,
                                    xValue: api.value(0),
                                    yValue: api.value(1),
                                    x: location[0],
                                    y: location[1],
                                    xAxisPoint: api.coord([api.value(0), 0]),
                                },
                                style: {
                                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {
                                            offset: 0,
                                            color: "rgba(211, 186, 126, 1)",
                                        },
                                        {
                                            offset: 1,
                                            color: "rgba(0, 6, 24, 1)",
                                        },
                                    ]),
                                },
                            },
                            {
                                type: "CubeRight",
                                shape: {
                                    api,
                                    xValue: api.value(0),
                                    yValue: api.value(1),
                                    x: location[0],
                                    y: location[1],
                                    xAxisPoint: api.coord([api.value(0), 0]),
                                },
                                style: {
                                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {
                                            offset: 0,
                                            color: "rgba(211, 186, 126, 1)",
                                        },
                                        {
                                            offset: 1,
                                            color: "rgba(0, 6, 24, 1)",
                                        },
                                    ]),
                                },
                            },
                            {
                                type: "CubeTop",
                                shape: {
                                    api,
                                    xValue: api.value(0),
                                    yValue: api.value(1),
                                    x: location[0],
                                    y: location[1],
                                    xAxisPoint: api.coord([api.value(0), 0]),
                                },
                                style: {
                                    fill: "rgba(255, 223, 106, 1)",
                                },
                            },
                        ],
                    }
                },
                data: props.chartData.yData2,
            },
        ],
    }
    tools.autoHover(chartRef.value, myChart.value, option, 6, 2000)
    // 绘制图表
    myChart.value.setOption(option)
    // 自适应大小
    window.onresize = () => {
        myChart.value.resize()
    }
}

watch(props, () => {
    nextTick(() => {
        props.chartData && initChart()
    })
}, { deep: true, immediate: true, })

onBeforeUnmount(() => {
    autoLoop.value && autoLoop.value.clearLoop()
})
</script>
<template>
    <div class="chart-box" ref="chartRef"></div>
</template>
<style lang="scss" scoped>
.chart-box {
    position: relative;
    width: 100%;
    height: 380px;
    padding: 10px;
    box-sizing: border-box;
}
</style>