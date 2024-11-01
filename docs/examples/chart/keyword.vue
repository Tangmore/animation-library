<template>
  <div ref="echartRef1" style="width: 100%; height: 160px"></div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import * as echarts from 'echarts'
const props = defineProps({
  fwszInfo: {
    type: Object,
    default: () => { }
  }
})
const emits = defineEmits(['clickContent'])
watch(() => props, () => {
  nextTick(() => {
    initEchart()
  })
}, { deep: true, immediate: true })
const dictValues = ref([
  { name: '初中', value: 7 },
  { name: '高中', value: 45 },
  { name: '研究生及以上', value: 12 },
  { name: '文盲', value: 124 },
  { name: '本科', value: 52 },
  { name: '小学', value: 32 },
  { name: '不详', value: 152 },
])
const echartRef1 = ref(null)
const echart1 = ref<any>()
const initEchart = () => {
  if (!echart1.value) {
    echart1.value = echarts.init(echartRef1.value)
  }
  const option = {
    tooltip: {
      show: true,
      borderColor: '#fe9a8bb3',
      borderWidth: 1,
      padding: [10, 15, 10, 15],
      confine: true,
      backgroundColor: 'rgba(255, 255, 255, .9)',
      textStyle: {
        color: '#000',
        lineHeight: 22
      },
      extraCssText: 'box-shadow: 0 4px 20px -4px rgba(199, 206, 215, .7);border-radius: 4px;'
    },
    series: [
      {
        type: 'wordCloud',
        shape: 'pentagon',
        left: 'center',
        top: 'center',
        width: '100%',
        height: '100%',
        right: null,
        bottom: null,
        sizeRange: [14, 21],
        rotationRange: [0, 0],
        rotationStep: 0,
        gridSize: 25,
        drawOutOfBound: false,
        layoutAnimation: true,
        textStyle: {
          fontFamily: 'SourceHanSansCN',
          fontWeight: 600,
          color: function (params) {
            let colors = ['#81D3F8', '#4088EE', '#F49A23', '#007DB4', '#079CA1', '#73DDFF', '#36D9CB', '#00AAFF']
            return colors[parseInt(Math.random() * 10)]
          },
        },
        emphasis: {
          focus: 'none',
        },
        data: dictValues.value,
      },
    ],
  }
  toRaw(echart1.value).setOption(option)
}
</script>

<style lang="scss" scoped></style>
