<script setup>
import { ref, markRaw, onMounted, computed, onBeforeUnmount, nextTick } from 'vue'
import * as echarts from 'echarts'
import tools from './echarts-auto-tooltip.ts'
const dataList = ref([
    { name: '二所', value: 60 }, { name: '五所', value: 70 },
    { name: '水土所', value: 85 }, { name: '鱼嘴所', value: 40 },
    { name: '人和所', value: 60 }, { name: '龙兴所', value: 70 },
    { name: '金山所', value: 85 }, { name: '礼嘉所', value: 40 },
    { name: '鸳鸯所', value: 60 }, { name: '大竹林所', value: 76 },
    { name: '天宫殿所', value: 40 }, { name: '一所', value: 70 }
])
const props = defineProps({
    title: String,
    unit: String,
    type: String,
})
const xData = computed(() => {
    return dataList.value.map(item => item.name)
})
const yData = computed(() => {
    return dataList.value.map(item => item.value)
})
const source = computed(() => {
    let source = [["税务所", "金额"]]
    dataList.value.forEach(item => {
        source.push([item.name, item.value])
    })
    return source
})
const chartRef = ref()
const myChart = ref()
const autoLoop = ref()
onMounted(() => {
    nextTick(() => [
        initChart()
    ])
})

//初始化图表
const initChart = () => {
    autoLoop.value && autoLoop.value.clearLoop()
    // 初始化 ECharts 实例
    let chart = markRaw(echarts.init(chartRef.value))
    let dataZoomMove = {
        start: 0,
        end: 8,
    }
    // 配置项
    const option = {
        dataset: {
            source: source.value,
        },
        dataZoom: [
            {
                show: false,
                startValue: dataZoomMove.start,
                endValue: dataZoomMove.end,
                xAxisIndex: [0, 1], //关联多个x轴
            },
            {
                type: 'inside',
                xAxisIndex: 0,
                zoomOnMouseWheel: false,
                moveOnMouseMove: true,
                moveOnMouseWheel: true,
            },
        ],
        grid: {
            top: 40,
            bottom: 0,
            left: 0,
            right: 0,
            containLabel: true,
        },
        xAxis: {
            type: 'category',
            // data: xData.value,
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#E7E7E7',
                },
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                fontSize: 12,
                color: '#AAAAAA',
            },
            splitLine: {
                lineStyle: {
                    color: '#E7E7E7',
                    type: 'solid',
                },
            },
        },
        yAxis: {
            name: props.unit,
            nameTextStyle: {
                color: "#4C535B",
                fontSize: 14,
                padding: [0, 0, 10, 0], // 上右下左的距离，单位为像素
            },
            type: 'value',
            min: 0, //最小值
            max: 100,
            axisTick: {
                show: false,
            },
            axisLabel: {
                fontSize: 14,
                color: '#AAAAAA',
            },
            axisLine: {
                show: false,
            },
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
        series: [
            {
                name: props.title,
                type: 'line',
                symbol: "emptyCircle",
                symbolSize: 9,
                showSymbol: false,
                emphasis: {
                    showSymbol: true
                },
                itemStyle: {
                    color: '#F6D780', // 折线图线条颜色
                },
                lineStyle: {
                    // 线条样式
                    normal: {
                        width: 3,
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                            // 颜色渐变
                            {
                                offset: 0,
                                color: 'rgba(33, 51, 85, 0)',
                            },
                            {
                                offset: 0.2,
                                color: '#EBA356',
                            },
                            {
                                offset: 0.4,
                                color: '#EBBB56',
                            },
                            {
                                offset: 0.6,
                                color: '#EBBB56',
                            },
                            {
                                offset: 0.8,
                                color: '#EBA356',
                            },
                            {
                                offset: 1,
                                color: 'rgba(33, 51, 85, 0)',
                            },
                        ]),
                    },
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                            {
                                offset: 1,
                                color: 'rgba(235, 187, 86, 1)',
                            },
                            {
                                offset: 0.8,
                                color: 'rgba(235, 187, 86, 0.2)',
                            },
                            {
                                offset: 0.1,
                                color: 'rgba(27, 104, 255, 0.01)',
                            },
                        ]),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                    },
                },
                // data: yData.value,
            },
        ],
    }
    // 设置并显示图表
    window.addEventListener('resize', () => {
        chart.resize()
    })
    // autoLoop.value = tools.autoHover(chartRef.value, chart, option, 9, 2000)
    autoLoop.value = tools.autoHover2(chartRef.value, chart, option, 9, 2000)
    chart.setOption(option)
    myChart.value = chart
}
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
