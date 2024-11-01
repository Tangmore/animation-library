<template>
    <div ref="echart" style="width: 100%; height:250px"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

onMounted(() => {
    initEchart()
})

const echart = ref(null)
const optionData = ref([
    { value: 12 || 0, name: '婚姻' },
    { value: 23 || 0, name: '离婚' },
    { value: 8 || 0, name: '恋爱' },
    { value: 65 || 0, name: '父母与子女' },
    { value: 32 || 0, name: '共同居住' },
    { value: 88 || 0, name: '其他' },
])
const initEchart = () => {
    const myChart = echarts.init(echart.value)
    let option = getPie3D(optionData.value, 0) // 可做为调整内环大小 0为实心圆饼图，大于0 小于1 为圆环
    /*************************
  生成扇形的曲面参数方程 生成 3D 扇形环曲面：
     【 getParametricEquation 函数说明 】 
        startRatio（浮点数）: 当前扇形起始比例，取值区间 [0, endRatio)
        endRatio（浮点数）: 当前扇形结束比例，取值区间 (startRatio, 1]
        isSelected（布尔值）:是否选中，效果参照二维饼图选中效果（单选）
        isHovered（布尔值）: 是否放大，效果接近二维饼图高亮（放大）效果（未能实现阴影）
        k（0~1之间的浮点数）：用于参数方程的一个参数，取值 0~1 之间，通过「内径/外径」的值换算而来。
        h :饼图的初始高度
   *************************/
    function getParametricEquation (startRatio, endRatio, isSelected, isHovered, k, h) {
        const midRatio = (startRatio + endRatio) / 2
        const startRadian = startRatio * Math.PI * 2
        const endRadian = endRatio * Math.PI * 2
        const midRadian = midRatio * Math.PI * 2
        // 如果只有一个扇形，则不实现选中效果。
        if (startRatio === 0 && endRatio === 1) {
            isSelected = false
        }
        k = typeof k !== 'undefined' ? k : 1 / 3
        const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0
        const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0
        // 鼠标滑过时外环放大大小
        const hoverRate = isHovered ? 1.05 : 1
        // 返回曲面参数方程
        return {
            u: {
                min: -Math.PI,
                max: Math.PI * 3,
                step: Math.PI / 32
            },

            v: {
                min: 0,
                max: Math.PI * 2,
                step: Math.PI / 20
            },

            x (u, v) {
                if (u < startRadian) {
                    return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
                }
                if (u > endRadian) {
                    return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
                }
                return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate
            },

            y (u, v) {
                if (u < startRadian) {
                    return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
                }
                if (u > endRadian) {
                    return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
                }
                return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate
            },

            z (u, v) {
                if (u < -Math.PI * 0.5) {
                    return Math.sin(u)
                }
                if (u > Math.PI * 2.5) {
                    return Math.sin(u) * h * 0.1
                }
                // 当前图形的高度是Z根据h（每个value的值决定的）
                return Math.sin(v) > 0 ? 1 * h * 0.1 : -1
            }
        }
    }
    /********** 
  生成模拟 3D 饼图的配置项
     【 getPie3D 函数说明 】 :
        pieData（object）：饼图数据
        internalDiameterRatio（0~1之间的浮点数）：内径/外径的值（默认值 1/2），当该值等于 0 时，为普通饼图
     // 为每一个饼图数据，生成一个 series-surface 配置
     // 使用遍历计算出的数据和 sumValue，调用 getParametricEquation 函数，实现每一个扇形。
  */
    function getPie3D (pieData, internalDiameterRatio) {
        const series = []
        let sumValue = 0
        let startValue = 0
        let endValue = 0
        const legendData = []
        const k =
            typeof internalDiameterRatio !== 'undefined'
                ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
                : 1 / 3
        for (let i = 0; i < pieData.length; i += 1) {
            sumValue += pieData[i].value
            const seriesItem = {
                name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
                type: 'surface',
                parametric: true,
                wireframe: {
                    show: false
                },
                pieData: pieData[i],
                pieStatus: {
                    selected: false,
                    hovered: false,
                    k
                }
            }
            if (typeof pieData[i].itemStyle !== 'undefined') {
                const { itemStyle } = pieData[i]
                typeof pieData[i].itemStyle.color !== 'undefined'
                    ? (itemStyle.color = pieData[i].itemStyle.color)
                    : null
                typeof pieData[i].itemStyle.opacity !== 'undefined'
                    ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
                    : null

                seriesItem.itemStyle = itemStyle
            }
            series.push(seriesItem)
        }
        for (let i = 0; i < series.length; i += 1) {
            endValue = startValue + series[i].pieData.value
            series[i].pieData.startRatio = startValue / sumValue
            series[i].pieData.endRatio = endValue / sumValue
            series[i].parametricEquation = getParametricEquation(
                series[i].pieData.startRatio,
                series[i].pieData.endRatio,
                true,
                false,
                k,
                10 //在此处传入饼图初始高度h
            )
            startValue = endValue
            legendData.push(series[i].name)
        }

        // 准备待返回的配置项，把准备好的series 传入。
        const option = {
            legend: {
                show: true,
                right: '5%',
                top: 'center',
                orient: 'vertical',
                icon: 'path://M512 0C229.2 0 0 229.2 0 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0z m0 737c-124.3 0-225-100.7-225-225s100.7-225 225-225 225 100.7 225 225-100.7 225-225 225z',
                itemHeight: 10,
                itemWidth: 10,
                itemGap: 18,
                textStyle: {
                    color: '#5a5757',
                    fontSize: 14,
                    fontWeight: '400'
                },
                formatter: (name) => {
                    if (optionData.value.length) {
                        const item = optionData.value.filter((item) => item.name === name)[0]
                        return `  ${name}      ${item.value}`
                    }
                }
            },
            color: [
                'rgba(54, 217, 203,0.5)',
                'rgba(0, 170, 255,0.5)',
                'rgba(210, 108, 194, 0.5)',
                'rgba(255, 215, 2, 0.5)',
                'rgba(242, 91, 91, 0.5)',
                'rgba(129, 0, 255, 0.5)',
                'rgba(224, 134, 18, 0.5)'
            ],
            tooltip: {
                formatter: (params) => {
                    if (params.seriesName !== 'mouseoutSeries') {
                        return `${params.marker}${params.seriesName}：${optionData.value[params.seriesIndex].value}`
                    }
                    return ''
                }
            },
            xAxis3D: {
                min: -1,
                max: 1
            },
            yAxis3D: {
                min: -1,
                max: 1
            },
            zAxis3D: {
                min: -1,
                max: 1
            },
            grid3D: {
                show: false,
                boxHeight: 22, //修改立体饼图的高度
                top: '-10%',
                left: '-20%',
                viewControl: {
                    // 3d效果可以放大、旋转等，
                    alpha: 35, //饼图翻转的程度
                    beta: 30,
                    rotateSensitivity: 1,
                    zoomSensitivity: 0,
                    panSensitivity: 0,
                    autoRotate: true, //是否自动旋转
                    distance: 390 //距离越小看到的饼图越大
                }
            },
            series
        }
        return option
    }
    myChart.on('click', function (params: any) {
        console.log(params)
    })
    myChart.setOption(option)
}
</script>
<style lang="scss" scoped></style>
