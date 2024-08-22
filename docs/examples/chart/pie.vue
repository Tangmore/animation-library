<script setup lang="ts">
import { ref, markRaw, onBeforeUnmount, nextTick, watch, reactive, } from "vue"
import * as echarts from "echarts"
import tools from './echarts-auto-tooltip'
const props: any = defineProps({
    chartData: {
        type: Array,
        default: () => {
            return [
                { name: "英语", value: 150 },
                { name: "数学", value: 603 },
                { name: "语文", value: 299 },
                { name: "体育", value: 228 },
            ]
        },
    },
})
const chartRef = ref()
const colors = ref([
    "rgba(255, 180, 43, 1)",
    "rgba(214, 233, 250, 1)",
    "rgba(0, 159, 216, 1)",
    "rgba(0, 216, 179, 1)",
    "#1A82FF",
])
const myChart = ref()
const autoLoop = ref()

//初始化图表
const initChart = () => {
    autoLoop.value && autoLoop.value.clearLoop()
    // 初始化 ECharts 实例
    let chart: any = markRaw(echarts.init(chartRef.value))
    // 配置项
    const option = {
        color: colors.value,
        tooltip: {
            show: true,
            extraCssText: "z-index:3", // 修改层级
            backgroundColor: "#fff",
            borderColor: "#fff",
            textStyle: {
                color: "#666",
                fontSize: 14,
            },
            formatter: "{a}{b} <br/>{c}人({d}%)",
        },
        series: [
            {
                name: "",
                type: "pie",
                center: ["50%", "50%"],
                radius: ["81%", "91%"], // 大小
                clockwise: true, // 饼图的扇区是否是顺时针排布
                startAngle: 90,
                silent: false,
                data: props.chartData,
                itemStyle: {
                    borderRadius: 20,
                },
                label: {
                    normal: {
                        show: false,
                        position: "center",
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontWeight: "bold",
                            fontSize: 17,
                            color: "#666",
                            fontFamily: "AlimamaFangYuanTiVF",
                        },
                        formatter: function (params) {
                            return `{aa|}${params.value} \n\n {bb|}${params.name}`
                        },
                        rich: {
                            aa: {
                                fontSize: 25,
                                fontFamily: "PangMenZhengDao",
                            },
                            bb: {
                                fontSize: 12,
                                fontFamily: "AlimamaFangYuanTiVF",
                            },
                        }
                    },
                },
            },
        ],
    }

    // 设置并显示图表
    chart.setOption(option)
    autoLoop.value = tools.autoHoverPie(option, chart, false)
    //监听页面大小变化
    window.addEventListener("resize", () => {
        chart.resize()
    })
    myChart.value = myChart
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
    <div class="chart-box">
        <div class="chart" ref="chartRef"></div>
    </div>
</template>
<style scoped lang="scss">
.chart-box {
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    height: 180px;

    .chart {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: url("../../public/img/circleBg1.png") center no-repeat;
        background-size: contain;
    }
}
</style>
