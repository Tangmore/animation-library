<template>
    <div class="container">
        <div ref="cqRef" class="echarts"></div>
        <!-- 图例 -->
        <div class="tool_tip">
            <div><span>50</span></div>
            <div><span>20</span></div>
            <div><span>0</span></div>
        </div>
    </div>
</template>
<script setup>
import { reactive, ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import chongqibor from '../../public/json/chongqibor.json'
import chongqi from '../../public/json/cq.json'
import ditudata from '../../public/json/ditudata.js'
import tIcon from '../../public/img/t_icon.png'
echarts.registerMap('chongqibor', chongqibor)

const cqRef = ref()
const state = reactive({
    cqCharts: null,
    cqData: [],
    titleKey: 'fbzb', //默认展示"fbzb"的数据，并显示该指数颜色分布
    titleMap: {
        fbzb: "发布指标总数",
        yssjh: "已实施计划数",
        yjkw: "应急开挖申报数",
        lqwwg: "临期未完工数",
        ffzw: "非法占挖"
    },
})
onMounted(() => {
    state.cqData = ditudata
    initCQ()
})

const getTooltip = () => {
    return {
        show: true,
        trigger: "item",
        className: "custom-tooltip-box",
        enterable: true, //鼠标可进入浮层内
        formatter: function (params) {
            console.log({ params })
            let text = ""
            text = `<div class='echarts-popup'>
                    <div class='echarts-popup-title'>
                        <div class='echtile-name'>${params.name}</div>
                    </div>
                    <div class='echatxtcor'>${state.titleMap[state.titleKey]}：
                        <span class="span1">${params.data[state.titleKey]
                }</span>
                </div>`
            return text
        }
    }
}

const handleClickMap = (params) => {
    // console.log({ params });
    // console.log(params.seriesType);
}

const initCQ = () => {
    state.cqCharts = echarts.init(cqRef.value)
    echarts.registerMap('chongqi', chongqi)
    let option = {
        tooltip: getTooltip(), //提示框设置 
        geo: {
            roam: false, // 禁止拖拽
            map: "chongqi",
            silent: true, // 禁止hover效果
            aspectScale: 1.1,//长宽比
            zoom: 0.9, // 地图缩放
            top: 'center',
            left: 'center',
            center: [106.9049, 29.8], // 地图中心位置， 此处的纬度与下面的center相差1度是形成阴影的距离，可自己随意调整
            // 设置地图阴影
            itemStyle: {
                normal: {
                    areaColor: '#2D4EB8',
                    borderColor: 'transparent',
                    shadowColor: 'rgb(58, 134, 204, 0.6)',
                    shadowOffsetX: 10,
                    shadowOffsetY: 10,
                    opacity: 1,
                    shadowBlur: 10
                },
            },
        },
        series: [
            {
                name: "重庆",
                type: "map", //配置显示方式为用户自定义
                map: "chongqi",
                roam: false, // 禁止拖拽
                zlevel: 9,
                center: [106.9049, 29.8], // 地图中心位置， 此处的纬度与下面的center相差1度是形成阴影的距离，可自己随意调整
                aspectScale: 1.1,//长宽比
                zoom: 0.9, // 地图缩放
                top: 'center',
                left: 'center',
                // 地图hover
                emphasis: {
                    label: {
                        color: '#fff'
                    },
                    itemStyle: {
                        areaColor: '#0b4f7f',
                        borderWidth: 0,
                    }
                },
                data: convertData(chongqi.features, state.cqData)
            },
            // 柱状体的主干
            {
                type: 'lines',
                zlevel: 10,
                // tooltip: { show: false },
                lineStyle: {
                    width: 2, //尾迹线条宽度
                    opacity: 0.9, //尾迹线条透明度'
                    curveness: 0, //尾迹线条曲直度
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgba(166, 255, 203, 1)', // 0% 处的颜色
                            },
                            {
                                offset: 0.5,
                                color: 'rgba(18, 216, 250, 1)', // 40% 处的颜色
                            },
                            {
                                offset: 1,
                                color: 'rgba(31, 162, 255, 1)', // 100% 处的颜色
                            },
                        ],
                        global: false, // 缺省为 false
                    },
                },
                label: {
                    position: 'top',
                    normal: {
                        show: true,
                        padding: [5, 2, 5, 2],
                        width: 72,
                        backgroundColor: {
                            image: tIcon,
                        },
                        formatter: function (params) {
                            return ['{b1|' + params.name + '}']
                        },
                        rich: {
                            b1: {
                                align: 'center',
                                color: "#fff",
                                fontWeight: 600,
                                fontSize: 13,
                            },
                        },
                    },
                },
                data: lineData(chongqi.features, state.cqData),
            },
            // 区域散点图 
            {
                type: 'effectScatter',
                coordinateSystem: 'geo',
                tooltip: { show: false },
                zlevel: 10,
                symbolSize: [10, 6],
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke',
                    period: 10,
                    scale: 4,
                    number: 3,
                },
                itemStyle: {
                    normal: {
                        color: '#00FFFF',
                    },
                },
                data: convertPoint(chongqi.features, state.cqData),
            },
        ]
    }
    state.cqCharts.setOption(option)
    window.addEventListener('resize', () => {
        state.cqCharts.resize()
    })
    // 绑定地图点击事件
    state.cqCharts.on("click", handleClickMap)
}

const filterColor = (curItem) => {
    let color = '#081c47',
        borderColor = '#081c47'
    if (curItem[state.titleKey] > 0 && curItem[state.titleKey] <= 20) {
        color = '#3291d7'
        borderColor = '#0ac7eb'
    } else if (curItem[state.titleKey] > 20 && curItem[state.titleKey] <= 50) {
        color = '#e57d6a'
        borderColor = '#0ac7eb'
    } else if (curItem[state.titleKey] > 50) {
        color = '#e5d56a'
        borderColor = '#0ac7eb'
    } else {
        color = '#9DADBF'
        borderColor = '#0ac7eb'
    }
    return { color, borderColor }
}

/**
 * 
 * @param {*} features 
 * @param {*} mapData 
 * @param {*} showQu 是否显示
 */
function convertData (features, mapData, showQu) {
    let res = []
    for (let i = 0; i < features.length; i++) {
        let properties = features[i].properties,
            show = true,
            color = '#3291d7',
            borderColor = '#0ac7eb'
        let curItem = mapData.find((item) => item.name.indexOf(properties.name) != -1)
        if (curItem) {
            let colorRes = filterColor(curItem)
            color = colorRes.color
            borderColor = colorRes.borderColor
        }
        let obj = {
            name: properties.name,
            value: curItem ? curItem["VALUE"] : 0,
            scoreValue: curItem ? curItem["colorField"] : 0,
            fbzb: curItem ? curItem["fbzb"] : 0,
            yssjh: curItem ? curItem["yssjh"] : 0,
            lqwwg: curItem ? curItem["lqwwg"] : 0,
            ffzw: curItem ? curItem["ffzw"] : 0,
            yjkw: curItem ? curItem["yjkw"] : 0,
            center: curItem ? curItem["center"] : [0, 0],
            regCode: curItem ? curItem["regCode"] : "",
            label: {
                normal: {
                    show: false,
                },
                emphasis: {
                    label: {
                        show: false,
                    },
                }
            },
            itemStyle: {
                areaColor: color,
                borderWidth: 1, //设置外层边框
                borderColor,
                label: {
                    show
                }
            }
        }
        res.push(obj)
    }
    return res
}

function convertPoint (features, mapData) {
    let res = []
    for (let i = 0; i < features.length; i++) {
        let properties = features[i].properties
        let curItem = mapData.find((item) => item.name.indexOf(properties.name) != -1)
        if (curItem) {
            res.push({
                name: properties.name,
                value: properties.centroid,
            })
        }
    }
    return res
}

// 柱状体的主干
function lineData (features, mapData) {
    let res = []
    for (let i = 0; i < features.length; i++) {
        let properties = features[i].properties
        let curItem = mapData.find((item) => item.name.indexOf(properties.name) != -1)
        if (curItem && properties.centroid) {
            res.push({
                name: properties.name,
                value: curItem[state.titleKey],
                scoreValue: curItem ? curItem["colorField"] : 0,
                fbzb: curItem ? curItem["fbzb"] : 0,
                yssjh: curItem ? curItem["yssjh"] : 0,
                lqwwg: curItem ? curItem["lqwwg"] : 0,
                ffzw: curItem ? curItem["ffzw"] : 0,
                yjkw: curItem ? curItem["yjkw"] : 0,
                center: curItem ? curItem["center"] : [0, 0],
                regCode: curItem ? curItem["regCode"] : "",
                coords: [
                    properties.centroid,
                    [properties.centroid[0], properties.centroid[1] + 0.2],
                ],
            })
        }
    }
    return res

}
</script>
<style lang="scss" scoped>
.container {
    width: 100%;
    height: 500px;
    position: relative;
}

.echarts {
    width: 100%;
    height: 100%;
    position: absolute;
    box-sizing: border-box;
}

//图例
.tool_tip {
    position: absolute;
    right: 50px;
    bottom: 20px;
    color: #666;
    font-size: 13px;

    div {
        width: 20px;
        height: 50px;
        position: relative;

        span {
            position: absolute;
            display: inline-block;
            width: 15px;
            bottom: -10%;
            right: -100%;
        }
    }

    div:nth-child(1) {
        background-color: #e5d56a;
    }

    div:nth-child(2) {
        background-color: #e57d6a;
    }

    div:nth-child(3) {
        background-color: #3291d7;
    }
}

:deep(.custom-tooltip-box) {
    padding: 0 !important;
    border: none !important;
    background-color: transparent !important;

    // 给子盒子自定义样式
    .echarts-popup {
        width: 260px;
        height: 120px;
        background: url("../../public/img/echarts-bg.png") no-repeat center;
        background-color: #0d2d61;
        background-size: 100% 100%;
        color: #fff;
        padding-top: 12px;

        .echarts-popup-title {
            width: calc(100% - 26px);
            height: 38px;
            font-size: 18px;
            margin: 0px 13px 23px;
            display: flex;
            justify-content: space-between;
            background: url("../../public/img/echarts-title.png") no-repeat center;
            background-size: 100% 100%;

            .echtile-name {
                line-height: 38px;
                margin-left: 50px;
            }
        }

        .echatxtcor {
            font-size: 18px;
            color: #d0deee;
            margin: 0px 13px 13px;

            .span1 {
                color: #ff3838;
                font-weight: 600;
            }
        }
    }
}
</style>