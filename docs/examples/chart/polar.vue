<script setup lang="ts">
import { ref, markRaw, reactive, nextTick, watch, onBeforeUnmount } from 'vue'
import * as echarts from "echarts"
const props: any = defineProps({
    chartData: {
        type: Array,
        default: () => {
            return [
                { name: '中央级', value: 90 },
                { name: '地方级', value: 82 },
                { name: '区级', value: 96 },
            ]
        }
    },
})
const chartRef = ref()
const autoLoop = ref()
const myChart = ref()
const state: any = reactive({
    color: ["rgba(79, 255, 159, 1)", "rgba(255, 249, 104, 1)", "rgba(243, 186, 92, 1)",],
    colorList: [
        new echarts.graphic.LinearGradient(1, 0, 0, 0, [
            {
                offset: 0,
                color: "rgba(79, 255, 159, 1)",
            },
            {
                offset: 1,
                color: "rgba(9, 39, 87, 1)",
            },
        ]),
        new echarts.graphic.LinearGradient(1, 0, 0, 0, [
            {
                offset: 0,
                color: "rgba(255, 249, 104, 1)",
            },
            {
                offset: 1,
                color: "rgba(9, 39, 87, 1)",
            },
        ]),
        new echarts.graphic.LinearGradient(1, 0, 0, 0, [
            {
                offset: 0,
                color: "rgba(243, 186, 92, 1)",
            },
            {
                offset: 1,
                color: "rgba(9, 39, 87, 1)",
            },
        ]),
    ],
})
const initChart = () => {
    let series: any = []
    let curArr = [...props.chartData].reverse().map((item: any) => {
        return {
            ...item,
            rate: item.value,
        }
    })
    for (let i = 0; i < curArr.length; i++) {
        let dd: any = []
        dd[i] = curArr[i].rate
        series.push({
            stack: "ring",
            type: "bar",
            name: curArr[i].name,
            data: dd.map((v: any) => v || 0),
            showBackground: true,
            itemStyle: {
                color: state.colorList[i],
            },
            backgroundStyle: { color: "rgba(9, 39, 87, 1)" },
            coordinateSystem: "polar",
            roundCap: true,
            barWidth: "50%",
            barGap: "-100%", // 两环重叠
        })
    }
    let chart = markRaw(echarts.init(chartRef.value))
    let option = {
        title: {
            text: '完成率',
            left: 'center',
            top: 'center',
            textStyle: {
                color: '#666',
                fontSize: '14',
            },
        },
        angleAxis: {
            max: 100, // 一圈是多少
            clockwise: false, // 逆时针
            show: false, // 隐藏刻度线
            startAngle: -90, // startAngle表示起始角度
            axisLine: {
                show: false, // 隐藏角度轴（圆心角）
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: false,
            },
            splitLine: {
                show: false, // 隐藏分割线
            },
        },
        radiusAxis: {
            type: "category",
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: false,
            },
            splitLine: {
                show: false,
            },
            z: 5,
        },
        polar: {
            center: ["50%", "50%"],
            radius: ["48%", "90%"], // 总体的最小半径、最大半径
        },
        tooltip: {
            show: true,
            trigger: 'item', // 设置触发类型为 'item'
            alwaysShowContent: true, // 设置 tooltip 始终显示内容
            extraCssText: "z-index:3", // 修改层级
            backgroundColor: "#fff",
            borderColor: "#fff",
            textStyle: {
                color: "#666",
                fontSize: 14,
                align: "left",
            },
            formatter: function (e: any) {
                let str = ''
                props.chartData.forEach((item: any, index: number) => {
                    str += `<div style="display: flex; align-items: center; justify-content: space-between;">
                        <div style="display: flex; align-items: center;">
                            <div style="width: 10px; height: 10px; background-color: ${state.color[index]};
                            border-radius: 50%;margin-right: 8px;"></div>
                            <span>${item.name}</span> 
                        </div>
                        <span style=" font-weight: bold;margin-left:20px;">${item.value}%</span>
                    </div>`
                })
                return str
            },
        },
        series,
    }
    window.addEventListener("resize", () => {
        chart.resize()
    })
    chart.setOption(option)
    setTimeout(function () {
        chart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: 0
        })
        chart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: 0
        })
    }, 600)
    myChart.value = chart
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
    }
}
</style>
