<template>
  <div ref="echart" class="chart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import * as echarts from 'echarts'
const props = defineProps({
  value: {
    type: Number,
    default: 78
  }
})

onMounted(() => {
  nextTick(() => {
    initEchart()
  })
})

const echart = ref(null)
const initEchart = () => {
  const myChart = echarts.init(echart.value)
  const option = {
    grid: {
      left: "70%",
      right: "8%",
      bottom: "3%",
      containLabel: true
    },
    series: [
      {
        name: "外部线",
        type: "gauge",
        radius: '115%',
        center: ['50%', '65%'],
        startAngle: 180,
        endAngle: 0,
        axisLine: {
          lineStyle: {
            color: [
              [1, 'rgba(230, 230, 230, 0.5)'] // 动态
            ],
            width: 1
          }
        },
        axisLabel: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        detail: {
          show: false
        },
        title: { //标题
          show: false,
        }
      },
      {
        name: "内部细线条",
        type: "gauge",
        radius: '40%',
        center: ['50%', '65%'],
        startAngle: 180,
        endAngle: 0,
        axisLine: {
          lineStyle: {
            color: [
              [1, 'rgba(230, 230, 230, 0.2)']
            ],
            width: 3
          }
        },
        axisLabel: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        detail: {
          show: false
        },
        title: {
          show: false,
        }
      },
      {
        name: "内部细线条",
        type: "gauge",
        radius: '80%',
        center: ['50%', '65%'],
        startAngle: 180,
        endAngle: 0,
        axisLine: {
          lineStyle: {
            color: [
              [1, 'rgba(230, 230, 230, 0.2)']
            ],
            width: 3
          }
        },
        axisLabel: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        detail: {
          show: false
        },
        title: {
          show: false,
        }
      },
      {
        name: "间隔条形",
        type: "gauge",
        radius: '126%',
        center: ['50%', '65%'],
        z: 4,
        splitNumber: 50,
        startAngle: 180,
        endAngle: 0,
        axisLine: {
          lineStyle: {
            opacity: 0,
          }
        },
        axisLabel: {
          show: false,
        },
        axisTick: {
          show: true,
          length: 15,
          splitNumber: 1,
          lineStyle: {
            color: 'rgba(230, 230, 230, 0.3)',
            width: 3
          }
        },
        splitLine: {
          show: false
        },
        detail: {
          show: false
        },
        title: {
          show: false,
        }
      },
      {
        name: "数据",
        type: "gauge",
        radius: '104%',
        center: ['50%', '65%'],
        z: 3,
        max: 100,
        startAngle: 180,
        endAngle: 0,
        axisLine: {
          lineStyle: {
            color: [
              [props.value / 100, new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(115, 174, 255, 0.8)'
                },
                {
                  offset: 1,
                  color: 'rgba(15, 53, 153, 0.40)'
                }
              ])], // 动态
              [1, 'transparent']
            ],
            width: 15
          }
        },
        tooltip: {
          show: false
        },
        axisLabel: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false
        },
        detail: {
          show: false,
        },
        pointer: {
          length: 96,
          width: 4,
          itemStyle: {
            color: 'rgba(213, 225, 236,1)'
          }
        },
        data: [{
          name: '',
          value: props.value
        }]
      },
      // 内圆
      {
        name: '内圆环',
        type: 'pie',
        radius: ['6%', '0%'],
        center: ['50%', '65%'],
        hoverAnimation: false,
        tooltip: {
          show: false
        },
        cursor: "default",
        labelLine: {
          "normal": {
            "show": false
          }
        },
        itemStyle: {
          color: 'rgba(207, 218, 230, 1)',
        },
        animation: false,
        data: [1]
      },
      // 内圆
      {
        name: '内圆环2',
        type: 'pie',
        radius: ['14%', '12%'],
        center: ['50%', '65%'],
        hoverAnimation: false,
        cursor: "default",
        tooltip: {
          show: false
        },
        labelLine: {
          normal: {
            "show": false
          }
        },
        itemStyle: {
          color: 'rgba(54, 160, 217, 1)',
          borderWidth: 0,
          shadowBlur: 44,
          shadowColor: 'rgba(54, 160, 217, 1)'
        },
        animation: false,
        data: [1]
      },
    ]
  }

  myChart.on('click', function (params: any) {
    console.log(params)
  })
  myChart.setOption(option)
}
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 186px;
  background: url(../../public/chart-bg.png) center no-repeat;
  background-size: contain;
}
</style>