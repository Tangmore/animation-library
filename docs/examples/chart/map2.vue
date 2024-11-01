<template>
    <div class="container">
        <div class="back-btn" v-if="mapLevel == 2" @click="clickCq()">《 返回一级地图</div>
        <div ref="mapRef" class="map" v-if="showMap"></div>
        <LegendComponent :index="tabActiveIndex" />
        <!-- 底部tab切换 -->
        <Tab style="" @change-tab="changeTab" />
    </div>
</template>
<script setup>
import { ref, onMounted, toRaw, watchEffect, nextTick } from 'vue'
import axios from 'axios'
import * as echarts from 'echarts'
import 'echarts-gl'
import { debounce, isEqual } from 'lodash'
import { areaGdCode, mapOption } from './components/common.js'
import LegendComponent from './components/legend.vue'
import Tab from './components/tab.vue'
import { areaList, zdData, kpiData } from './components/data.js'
const { colorList1, colorList2, mapName, legend, geo3D, mapSeries } = mapOption
// 底部tab切换
const tabActiveIndex = ref(1)
const changeTab = (index) => {
    tabActiveIndex.value = index
    if (mapLevel.value == 2) {
        clickCq()
    } else {
        loadData(mapChoseArea.value)
    }
}

// 返回一级地图
const clickCq = () => {
    mapChoseArea.value = ''
    changeMapLevel(mapChoseArea.value)
    mapLevel.value = 1
}

const mapRef = ref(null)
const mapChart = ref()
const showMap = ref(true)
const mapLevel = ref(1)
const changeMapLevel = (type) => {
    showMap.value = false
    mapChart.value = null
    setTimeout(() => {
        showMap.value = true
        nextTick(() => {
            loadData(type)
        })
    }, 300)
}

const curItemData = ref()
const getTooltip = () => {
    return {
        show: true,
        trigger: 'item',
        enterable: true,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        extraCssText: 'z-index:100;color:#fff;',
        confine: true, //是否将 tooltip 框限制在图表的区域内
        axisPointer: {
            type: 'shadow'
        },
        formatter: function (params) {
            curItemData.value = params.data
            if (params.seriesType === 'map3D') {
                if (tabActiveIndex.value == 1) {
                    const res = `<div class="jsc-zd-class">
                          <div class="zd-class-title">${curItemData.value.name}</div>
                          <div class="zd-class-items">
                            <div class="zd-class-item">总数：${curItemData.value.otherParams?.total || 0}</div> 
                            <div class="zd-class-item">办结数：${curItemData.value.otherParams?.doneNum || 0}</div>  
                          </div> 
                        </div>`
                    return res
                } else {
                    return ``
                }
            } else if (params.seriesType === 'bar3D') {
                const res = `<div class="jsc-zd-class" onclick="clickToolTip()">
                        <div class="zd-class-title">${params.name}</div>
                        <div class="zd-class-items">
                          <div class="zd-class-item">${params.data.establishTime}</div>  
                        </div>  
                      </div>`
                return res
            } else {
                return ''
            }
        }
    }
}

// 初始化option
const option = ref({
    legend,
    tooltip: getTooltip(),
    geo3D,
    series: []
})
const initOption = () => {
    let targetArr = [
        { name: '防御阵地', color: '#FEFF00' },
        { name: '核心阵地', color: '#10F012' },
        { name: '党建阵地', color: '#F35E5E' },
        { name: '工作阵地', color: '#089FF1' },
        { name: '空间阵地', color: '#F59E24' },
    ]
    let series = []
    for (let index = 0; index < targetArr.length; index++) {
        const element = targetArr[index]
        series.push({
            type: 'bar3D',
            name: element.name,
            coordinateSystem: 'geo3D',
            barSize: 0.6,
            minHeight: 3,
            bevelSize: 0.4,
            zlevel: 999,
            silent: false,
            shading: 'lambert',
            itemStyle: {
                color: element.color,
            },
            data: [],
        })
    }
    option.value.series = [mapSeries, ...series]
}

const resetSeries = () => {
    option.value.series[1].data = []
    option.value.series[2].data = []
    option.value.series[3].data = []
    option.value.series[4].data = []
    option.value.series[5].data = []
}

// 动态获取区县json数据
const loadData = (mapArea) => {
    let url = areaGdCode[mapArea]
        ? `../../public/mapData/${areaGdCode[mapArea]}.json`
        : `../../public/mapData/cq-map.json`
    axios
        .get(url)
        .then((res) => {
            console.log({ res })
            initMap(res.data?.features)
        })
        .finally(() => { })
}
// 初始化地图
const initMap = (features) => {
    if (!mapChart.value) {
        mapChart.value = echarts.init(mapRef.value)
    }
    let mapFeatures = features
    let cqMapData = {
        type: 'FeatureCollection',
        features: mapFeatures,
    }
    echarts.registerMap(mapName, cqMapData)
    toRaw(mapChart.value).setOption(option.value)
    mapChart.value.on(
        'click',
        debounce(function (params) {
            if (params.seriesType === 'bar3D') {
                curItemData.value = params.data
                clickToolTip()
            }
            if (params.seriesType === 'map3D') {
                if (mapChoseArea.value === '') {
                    //还需要判断一级屏 区县屏 点击
                    mapChoseArea.value = params?.data?.value || ''
                    changeMapLevel(mapChoseArea.value)
                    mapLevel.value = 2
                    streetList.value = params?.data?.children || []
                }
                console.log(mapChoseArea.value)
            }
        })
    )
    if (tabActiveIndex.value == 1) {
        kpiSetting()
    } else if (tabActiveIndex.value == 2) {
        serviceSetting()
    }
}

const kpiSetting = () => {
    option.value.legend.show = false
    let seriesData = JSON.parse(JSON.stringify(mapOption.mapSeries))
    let result = kpiData || []
    seriesData.data = result.map((item, index) => {
        return {
            name: item.value,
            value: item.key,
            itemStyle: {
                color: colorList1[item.level],
                borderWidth: 2, //设置外层边框
                borderColor: '#fff',
                // opacity: 0.8
            },
            otherParams: item
        }
    })
    option.value.series[0] = seriesData
    resetSeries()
    toRaw(mapChart.value).setOption(option.value)
}

// 二级地区
const streetList = ref([])
const serviceSetting = () => {
    option.value.legend.show = true
    option.value.series[0].data = areaList.map((item) => {
        return {
            name: item.deptName,
            value: item.deptId
        }
    })
    const lists = zdData || []
    const series1 = []
    const series2 = []
    const series3 = []
    const series4 = []
    const series5 = []
    lists.forEach((item) => {
        let fixItem = {
            name: item.name,
            type: 3,
            value: [item.longitude, item.latitude, 0],
            address: item.address || '',
            id: item.id,
            area: item.area,
            establishTime: item.establishTime
        }
        // 防御阵地
        if (item.type === 'wh' || item.type == 'ch' || item.type == 'cps') {
            series1.push(fixItem)
        }
        // 核心阵地
        if (item.type === 'wsh') {
            series2.push(fixItem)
        }
        // 党建阵地
        if (item.type === 'rps') {
            series3.push(fixItem)
        }
        // 家风家教基地
        if (item.type === 'eb') {
            series4.push(fixItem)
        }
        // 空间阵地
        if (item.type === 'ys') {
            series5.push(fixItem)
        }
    })
    option.value.series[1].data = series1
    option.value.series[2].data = series2
    option.value.series[3].data = series3
    option.value.series[4].data = series4
    option.value.series[5].data = series5
    toRaw(mapChart.value).setOption(option.value)
}

const mapChoseArea = ref('') //当前区县屏用户areaId, 101代表重庆市 北培区
const clickToolTip = () => {
    console.log(curItemData.value)
    if (tabActiveIndex.value == 1) {

    } else if (tabActiveIndex.value == 2) {

    }
}
onMounted(async () => {
    initOption()
    loadData(mapChoseArea.value)
    window.clickToolTip = clickToolTip
})
defineExpose({})
</script>
<style scoped lang="scss">
.container {
    width: 100%;
    height: 500px;
    position: relative;

    .map {
        width: 100%;
        height: 100%;
    }

    .back-btn {
        position: absolute;
        top: 20px;
        left: 20px;
        font-family: SourceHanSansCN, SourceHanSansCN;
        font-weight: 400;
        font-size: 14px;
        color: #5a5757;
        cursor: pointer;
        z-index: 9;
    }
}
</style>
<style lang="scss">
.jsc-zd-class {
    min-width: 300px;
    min-height: 100px;
    position: absolute;
    top: -110px;
    left: -20px;
    background-image: url('../../public/img/zd-icon.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    box-sizing: border-box;
    padding: 8px 8px 10px 125px;
    color: #fff;
    font-size: 14px;

    .zd-class-title {
        font-size: 16px;
        font-family: SourceHanSansCN, SourceHanSansCN;
        font-weight: 500;
        color: #ffffff;
        line-height: 24px;
        text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.7);
        background: linear-gradient(90deg, #14ABFF 0%, #D9FFFC 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        white-space: pre-wrap;
        margin-bottom: 4px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .zd-class-items {
        display: flex;
        flex-direction: column;
        font-size: 14px;
        color: #fff;

        .zd-class-item {
            width: 100%;
            white-space: pre-wrap;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 4px;
        }
    }
}
</style>
