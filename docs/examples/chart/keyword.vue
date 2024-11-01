<template>
  <div ref="echart" style="width: 100%; height: 160px"></div>
</template>

<script setup lang="ts">
import { ref, watch,nextTick } from 'vue'
import * as echarts from 'echarts'
const props = defineProps({
  fwszInfo: {
    type: Object,
    default: () => { }
  }
})
const emits = defineEmits(['clickContent'])
const xData = ref(['初中', '高中', '研究生及以上', '文盲', '不详', '小学', '本科'])
const yData = ref([0, 0, 0, 0, 0, 0, 0])
watch(() => props, () => { 
  nextTick(() => {
    initEchart()
  })
}, { deep: true, immediate: true })

const echart = ref(null)
const initEchart = () => {
  const myChart = echarts.init(echart.value) 
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: '0%',
      right: '4%',
      bottom: '0%',
      top: '18%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      data: xData.value,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        fontSize: 12,
        color: '#CFDAE6',
        interval: 0,
          overflow: 'breakAll',
          formatter: function (value: any) {
            // 每三个字换行
            const str = value.split('')
            let strNew = ''
            for (let i = 0; i < str.length; i++) {
              strNew += str[i]
              if ((i + 1) % 4 === 0) {
                strNew += '\n'
              }
            }
            return strNew
          }
      },
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      minInterval:1,
      axisLine: {
        lineStyle: {
          color: '#ADBFCC',
          fontSize: 12
        }
      },
      axisLabel: {
        fontSize: 12,
        color: '#ADBFCC'
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: [2, 3],
          dashOffset: 15,
          color: '#757575'
        }
      }
    },
    series: [
      {
        name: '',
        data: yData.value,
        type: 'bar',
        barWidth: 20,
        smooth: true,
        symbol: 'emptyCircle',
        symbolSize: 5,
        showSymbol: false,
        emphasis: {
          showSymbol: true
        },
        lineStyle: {
          width: 2
        },
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(1, 0, 0, 1, [
              {
                offset: 0,
                color: '#73D0FF'
              },
              {
                offset: 1,
                color: 'rgba(15, 84, 153, 0.40)'
              }
            ])
          }
        }
      }
    ]
  }
  myChart.on('click', function (params: any) {
    console.log(params)
    emits('clickContent', params.name)
  })
  myChart.setOption(option)
}
</script>

<style lang="scss" scoped></style>
