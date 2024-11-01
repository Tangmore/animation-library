<template>
   <div ref="echartRef" style="width: 100%; height: 160px"></div>
</template>

<script setup lang="ts">
import { ref, toRaw, watch, nextTick } from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill'
const props = defineProps({
   fwszInfo: {
      type: Object,
      default: () => {
         return {
            male: 467,
            female: 267,
         }
      }
   }
})
const emits = defineEmits(['handleView'])
const manRate = ref(0)
const womenRate = ref(0)
watch(() => props, () => {
   let total = (props.fwszInfo.male || 0) + (props.fwszInfo.female || 0)
   if (total) {
      manRate.value = (props.fwszInfo.male || 0) / total.toFixed(2)
      womenRate.value = (props.fwszInfo.female || 0) / total.toFixed(2)
   }
   nextTick(() => {
      initEchart()
   })
}, { deep: true, immediate: true })


const echartRef = ref(null)
const echart = ref<any>()
const initEchart = () => {
   if (!echart.value) {
      echart.value = echarts.init(echartRef.value)
   }
   const path = 'path://M800 0h-576c-17.92 0-32 14.08-32 32v960c0 17.92 14.08 32 32 32h576c17.92 0 32-14.08 32-32V32c0-17.92-14.08-32-32-32z'
   const option = {
      title: [
         {
            text: '女性占比',
            x: '23.5%',
            y: ' 80%',
            textAlign: 'center',
            textStyle: {
               fontSize: '14',
               color: '#fff',
               textAlign: 'center',
            },
         },
         {
            text: '男性占比',
            x: '73.5%',
            y: ' 80%',
            textAlign: 'center',
            textStyle: {
               fontSize: '14',
               color: '#fff',
               textAlign: 'center',
            },
         },
      ],
      series: [
         {
            name: '女性占比',
            type: 'liquidFill',
            radius: '65%',
            center: ['25%', '40%'],
            backgroundStyle: {
               color: 'transparent',
            },
            shape: path,
            data: [womenRate.value, womenRate.value],
            amplitude: 8, //水波振幅
            label: {
               textStyle: {
                  fontSize: '18', //文本字号,
                  color: '#fff',
                  fontFamily: 'SourceHanSansCN'
               },
            },
            outline: {
               borderDistance: 10,
               itemStyle: {
                  borderWidth: 2,
                  borderColor: '#ADBFCC',
               },
            },
            itemStyle: {
               color: {
                  type: 'linear',
                  x: 0,
                  y: 1,
                  x2: 0,
                  y2: 0,
                  colorStops: [
                     {
                        offset: 1,
                        color: 'rgba(31, 222, 225, 1)',
                     },
                     {
                        offset: 0,
                        color: 'rgba(31, 222, 225, 0.3)',
                     }
                  ],
                  globalCoord: false,
               },
               shadowBlur: 20 // 波浪的阴影范围
            },
         },
         {
            name: '男性占比',
            type: 'liquidFill',
            radius: '65%',
            center: ['75%', '40%'],
            shape: path,
            data: [manRate.value, manRate.value],
            amplitude: 8, //水波振幅
            backgroundStyle: {
               color: 'transparent',
            },
            label: {
               textStyle: {
                  fontSize: '18', //文本字号,
                  color: '#fff',
                  fontFamily: 'SourceHanSansCN'
               },
            },
            outline: {
               borderDistance: 10,
               itemStyle: {
                  borderWidth: 2,
                  borderColor: '#ADBFCC',
               },
            },
            itemStyle: {
               color: {
                  type: 'linear',
                  x: 0,
                  y: 1,
                  x2: 0,
                  y2: 0,
                  colorStops: [
                     {
                        offset: 1,
                        color: 'rgba(230, 230, 230, 1)',
                     },
                     {
                        offset: 0,
                        color: 'rgba(117, 117, 117, 0.60)',
                     }
                  ],
                  globalCoord: false,
               },
               shadowBlur: 20 // 波浪的阴影范围
            },
         },
      ]
   }
   echart.value.on('click', function (params: any) {
      console.log(params)
      emits('handleView', params.seriesIndex ? 'man' : 'woman', 2)
   })
   toRaw(echart.value).setOption(option)
}
</script>

<style scoped></style>
