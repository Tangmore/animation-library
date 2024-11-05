<template>
  <div class="chart-content">
    <div ref="echart" v-if="xdata.length" style="width: 60%; height: 100%"></div>
    <span v-else class="empty-desc">暂无数据</span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import * as echarts from 'echarts'

const emits = defineEmits(['clickRank'])
const props = defineProps({
  count: {
    type: Number,
    default: 5
  },
  xdata: {
    type: Array,
    default: () => {
      return [
        '万州区',
        '九龙坡区',
        '江北区',
        '渝北区',
        '涪陵区',
        '渝中区',
        '璧山区',
        '大渡口区',
        '南岸区',
        '北碚区',
        '沙坪坝区'
      ]
    }
  },
  sdata: {
    type: Array,
    default: () => {
      return [1345, 1222, 1154, 1081, 939, 935, 944, 944, 954, 881, 639]
    }
  }
})

watch(() => props, () => {
  if (props.xdata && props.xdata.length) {
    nextTick(() => {
      initEchart()
    })
  }
}, { deep: true, immediate: true })

const echart = ref(null)
const initEchart = () => {
  const myChart = echarts.init(echart.value)
  let dataZoomMove = {
    start: 0,
    end: props.count - 1
  }
  let option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'none'
      },
      formatter: '{b}:{c}'
    },
    dataZoom: [
      {
        show: false,
        startValue: dataZoomMove.start,
        endValue: dataZoomMove.end,
        yAxisIndex: [0, 1] //关联多个x轴
      },
      {
        type: 'inside',
        yAxisIndex: 0,
        zoomOnMouseWheel: false,
        moveOnMouseMove: true,
        moveOnMouseWheel: true
      }
    ],
    grid: {
      left: '0%',
      right: '4%',
      bottom: '3%',
      top: '6%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      }
    },
    yAxis: [
      {
        type: 'category',
        data: props.xdata,
        inverse: true,
        axisLabel: {
          fontSize: '14px',
          inside: true,
          verticalAlign: 'bottom',
          lineHeight: 48,
          margin: 0, //刻度标签与轴线之间的距离
          formatter: function (value) {
            let k = props.xdata.indexOf(value)
            let index = k + 1
            if (index < 10) {
              return `{one|${'0' + index}} {a|${value}}`
            }
            return `{one|${index}} {a|${value}}`
          },
          rich: {
            a: {
              color: '#59c9f9'
            },
            one: {
              backgroundColor: '#36d1dc',
              color: '#fff',
              width: 12,
              height: 16,
              padding: [1, 10, 0, 10],
              fontSize: 12,
              fontFamily: 'SourceHanSansCN',
              align: 'center'
            }
          }
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: '#13387a'
          }
        }
      },
      {
        type: 'category',
        data: props.xdata,
        inverse: true,
        axisLabel: {
          inside: true,
          verticalAlign: 'bottom',
          lineHeight: 48,
          margin: 0, //刻度标签与轴线之间的距离
          formatter: function (value) {
            let k = props.xdata.indexOf(value)
            let index = k
            return `{a|${props.sdata[index]}}{u|次}`
          },
          rich: {
            a: {
              color: '#fff',
              fontSize: 14,
              fontFamily: 'D-DIN',
              fontWeight: 'bold'
            },
            u: {
              color: '#fff',
              fontSize: 14,
              padding: [2, 0, 0, 4]
            }
          }
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        }
      }
    ],
    series: [
      {
        data: props.sdata,
        type: 'bar',
        barWidth: 8,
        showBackground: true,
        backgroundStyle: {
          borderColor: 'rgba(214, 233, 250, 1)',
          borderWidth: 16
        },
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              1,
              0,
              ['#36d1dc', '#5b86e5'].map((color, offset) => ({
                color,
                offset
              }))
            ) // 渐变
          }
        }
      }
    ]
  }

  // 自动轮播和鼠标移入移出的停止和开启
  let dataZoomMoveTimer = null
  const startMoveDataZoom = (myChart, dataZoomMove) => {
    dataZoomMoveTimer = setInterval(() => {
      dataZoomMove.start += 1
      dataZoomMove.end += 1
      if (dataZoomMove.end > props.sdata.length - 1) {
        dataZoomMove.start = 0
        dataZoomMove.end = props.count - 1
      }
      myChart.setOption({
        dataZoom: [
          {
            type: 'slider', // 有type这个属性，滚动条在最下面，也可以不行，写y：36，这表示距离顶端36px，一般就是在图上面。
            startValue: dataZoomMove.start,
            endValue: dataZoomMove.end
          }
        ]
      })
    }, 1800)
  }
  startMoveDataZoom(myChart, dataZoomMove)
  let chartDom = myChart.getDom()
  chartDom.addEventListener('mouseout', () => {
    if (dataZoomMoveTimer) return
    let dataZoomMove_get = myChart.getOption().dataZoom[0]
    dataZoomMove.start = dataZoomMove_get.startValue
    dataZoomMove.end = dataZoomMove_get.endValue
    startMoveDataZoom(myChart, dataZoomMove)
  })
  // 移入
  // myChart.on
  chartDom.addEventListener('mouseover', () => {
    clearInterval(dataZoomMoveTimer)
    dataZoomMoveTimer = undefined
  })

  myChart.on('click', function (params: any) {
    console.log(params)
    emits('clickContent', params.name)
  })
  myChart.setOption(option)
}
</script>
<style lang="scss" scoped>
.chart-content {
  width: 100%;
  height: 300px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .empty-desc {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 14px;
  }
}
</style>