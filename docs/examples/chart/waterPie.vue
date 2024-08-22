<script setup lang="ts">
import * as echarts from 'echarts'
// import 'echarts-liquidfill'
import { ref, markRaw, nextTick, watch } from 'vue'
const props: any = defineProps({
    rate: {
        type: Number,
        default: 60
    },
})
const chartRef = ref()
const myChart = ref()
//初始化图表
const initChart = () => {
    // 初始化 ECharts 实例
    let chart: any = markRaw(echarts.init(chartRef.value))
    // 配置项
    const option = {
        title: {
            text: props.rate + '%',
            textStyle: {
                fontSize: 20,
                fontFamily: 'D-DIN-PRO',
                fontWeight: '600',
                color: '#fff',
            },
            x: 'center',
            y: 'center',
        },
        series: [
            {
                type: 'liquidFill',
                z: 2,
                radius: '80%',
                center: ['50%', '50%'],
                data: [Number(props.rate) / 100, Number(props.rate) / 100],
                backgroundStyle: {
                    color: 'transparent',
                },
                outline: {
                    borderDistance: 4,
                    itemStyle: {
                        borderWidth: 2,
                        borderColor: '#E16588',
                    },
                },
                color: ['#EAE2DC', new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                    offset: 0,
                    color: "#FFE2EB"
                },
                {
                    offset: 1,
                    color: "#E16588"
                }
                ])],
                label: {
                    normal: {
                        formatter: '',
                    },
                },
            },
        ],
    }
    // 设置并显示图表
    chart.setOption(option)
    //监听页面大小变化
    window.addEventListener('resize', () => {
        chart.resize()
    })
    myChart.value = chart
}
watch(props, () => {
    nextTick(() => {
        initChart()
    })
}, { deep: true, immediate: true, }) 
</script>
<template>
    <div class="chart-box" ref="chartRef"></div>
</template>
<style lang="scss" scoped>
.chart-box {
    position: relative;
    width: 100%;
    height: 200px;
    padding: 10px;
    box-sizing: border-box;
}
</style>
