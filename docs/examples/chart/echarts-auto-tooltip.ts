const tools: any = {}
/**
 *  echarts tooltip 自动轮播  根据series里面的数据自动轮播
 *  @param dom     // 图表的dom
 *  @param myChart  // 初始化echarts的实例
 *  @param option   // 指定图表的配置项和数据
 *  @param pageSize      // 一页显示的数据数目
 *  @param time     // 轮播间隔时长
 */
tools.autoHover = (
  dom: any,
  myChart: any,
  option: any,
  pageSize: number,
  time: number,
  direction: string = 'xAxis'
) => {
  let timeTicket: any = null
  let length: number = option[direction].data.length
  function setHighLight(myChart: any, count: number) {
    myChart.dispatchAction({
      type: 'downplay',
      seriesIndex: 0, //serieIndex的索引值   可以触发多个
      dataIndex: count,
    })
    myChart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: count,
    })
    myChart.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: count,
    })
  }
  function circleHandler() {
    count = count % length
    let center = Math.floor(pageSize / 2) // 4
    if (pageSize < length) {
      // 因为一页显示不满 所以才显示滚动条
      // 如果当前下标在中间值后面 则 滚动条不动
      if (count <= center) {
        // 先滚动条走到最刚开始 再高亮
        option.dataZoom[0].endValue = pageSize - 1
        option.dataZoom[0].startValue = 0
        myChart.setOption(option)
        setHighLight(myChart, count)
      } else if (count > center && option.dataZoom[0].endValue != length - 1) {
        // 如果当前小标大于中间值并且滚动条还没到最后，走滚动条
        option.dataZoom[0].endValue = option.dataZoom[0].endValue + 1
        option.dataZoom[0].startValue = option.dataZoom[0].startValue + 1
        myChart.setOption(option)
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0, //serieIndex的索引值   可以触发多个
          dataIndex: count - 1,
        })
        setHighLight(myChart, count)
      } else if (
        count < length - 1 &&
        option.dataZoom[0].endValue == length - 1
      ) {
        // 如果滚动条到最后
        option.dataZoom[0].endValue = length - 1
        option.dataZoom[0].startValue = length - 1 - (pageSize - 1)
        myChart.setOption(option)
        setHighLight(myChart, count)
      } else if (count == length - 1) {
        // 下标结束了
        setHighLight(myChart, count)
      }
    } else {
      setHighLight(myChart, count)
    }
    count++
    if (count >= length) {
      count = 0
    }
  }
  let count = 0
  timeTicket && clearInterval(timeTicket)
  timeTicket = null
  timeTicket = setInterval(circleHandler, time)
  // 设置移入移除
  dom.addEventListener('mouseover', () => {
    timeTicket && clearInterval(timeTicket)
  })
  dom.addEventListener('mouseout', () => {
    timeTicket && clearInterval(timeTicket)
    timeTicket = setInterval(circleHandler, time)
  })
  function clearLoop() {
    timeTicket && clearInterval(timeTicket)
    timeTicket = null
  }
  return {
    clearLoop,
  }
}
/**
 * echarts tooltip  自动轮播，  根据dataset自动轮播
 *  @param dom     // 图表的dom
 *  @param myChart  // 初始化echarts的实例
 *  @param option   // 指定图表的配置项和数据
 *  @param pageSize      // 一页显示的数据数目
 *  @param time     // 轮播间隔时长
 */
tools.autoHover2 = (
  dom: any,
  myChart: any,
  option: any,
  pageSize: number,
  time: number
) => {
  let timeTicket: any = null
  let length: number = option.dataset.source.length
  const arr = option.dataset.source.map((_: any, index: number) => index)
  function setHighLight(myChart: any, count: number) {
    myChart.dispatchAction({
      type: 'downplay',
      seriesIndex: 0, //serieIndex的索引值   可以触发多个
      dataIndex: arr,
    })
    myChart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: count,
    })
    myChart.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: count,
    })
  }
  function circleHandler() {
    count = count % length
    let center = Math.floor(pageSize / 2) // 4
    if (pageSize < length) {
      // 因为一页显示不满 所以才显示滚动条
      // 如果当前下标在中间值后面 则 滚动条不动
      if (count <= center) {
        // 先滚动条走到最刚开始 再高亮
        option.dataZoom[0].endValue = pageSize - 1
        option.dataZoom[0].startValue = 0
        myChart.setOption(option)
        setHighLight(myChart, count)
      } else if (count > center && option.dataZoom[0].endValue != length - 1) {
        // 如果当前小标大于中间值并且滚动条还没到最后，走滚动条
        option.dataZoom[0].endValue = option.dataZoom[0].endValue + 1
        option.dataZoom[0].startValue = option.dataZoom[0].startValue + 1
        myChart.setOption(option)
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0, //serieIndex的索引值   可以触发多个
          dataIndex: count - 1,
        })
        setHighLight(myChart, count)
      } else if (
        count < length - 1 &&
        option.dataZoom[0].endValue == length - 1
      ) {
        // 如果滚动条到最后
        option.dataZoom[0].endValue = length - 1
        option.dataZoom[0].startValue = length - 1 - (pageSize - 1)
        myChart.setOption(option)
        setHighLight(myChart, count)
      } else if (count == length - 1) {
        // 下标结束了
        setHighLight(myChart, count)
      }
    } else {
      setHighLight(myChart, count)
    }
    count++
    if (count >= length) {
      count = 0
    }
  }
  let count = 0
  timeTicket && clearInterval(timeTicket)
  timeTicket = null
  timeTicket = setInterval(circleHandler, time)
  // 设置移入移除
  dom.addEventListener('mouseover', () => {
    timeTicket && clearInterval(timeTicket)
  })
  dom.addEventListener('mouseout', () => {
    timeTicket && clearInterval(timeTicket)
    timeTicket = setInterval(circleHandler, time)
  })
  function clearLoop() {
    timeTicket && clearInterval(timeTicket)
    timeTicket = null
  }
  return {
    clearLoop,
  }
}
/**
 * echarts tooltip  自动轮播， 第二屏和第三屏左侧纵向滚动柱形图自动轮播
 */
tools.autoHover3 = (
  dom: any,
  myChart: any,
  option: any,
  pageSize: number,
  time: number
) => {
  let timeTicket: any = null
  let length: number = option.dataset.source.length
  const arr = option.dataset.source.map((_: any, index: number) => index)
  function setHighLight(myChart: any, count: number) {
    myChart.dispatchAction({
      type: 'downplay',
      seriesIndex: 0, //serieIndex的索引值   可以触发多个
      dataIndex: arr,
    })
    myChart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: count,
    })
    myChart.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: count,
    })
  }
  function circleHandler() {
    count = count % length
    if (count === 1) {
      count = 6
    }
    let center = Math.floor(pageSize / 2) // 4
    if (pageSize < length) {
      // 因为一页显示不满 所以才显示滚动条
      // 如果当前下标在中间值后面 则 滚动条不动
      if (count <= center) {
        // 先滚动条走到最刚开始 再高亮
        option.dataZoom[0].endValue = pageSize - 1
        option.dataZoom[0].startValue = 0
        myChart.setOption(option)
        setHighLight(myChart, count)
      } else if (count > center && option.dataZoom[0].endValue != length - 1) {
        // 如果当前小标大于中间值并且滚动条还没到最后，走滚动条
        option.dataZoom[0].endValue = option.dataZoom[0].endValue + 1
        option.dataZoom[0].startValue = option.dataZoom[0].startValue + 1
        myChart.setOption(option)
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0, //serieIndex的索引值   可以触发多个
          dataIndex: count - 1,
        })
        setHighLight(myChart, count)
      } else if (count < length - 1 && option.dataZoom[0].endValue == 6) {
        // 如果滚动条到最后
        option.dataZoom[0].endValue = pageSize - 1
        option.dataZoom[0].startValue = 0
        myChart.setOption(option)
        setHighLight(myChart, count)
      } else if (count == length - 5) {
        // 下标结束了
        setHighLight(myChart, count)
      }
    } else {
      setHighLight(myChart, count)
    }
    count++
    if (count >= length - 5) {
      count = 0
    }
  }
  let count = 0
  timeTicket && clearInterval(timeTicket)
  timeTicket = null
  timeTicket = setInterval(circleHandler, time)
  // 设置移入移除
  dom.addEventListener('mouseover', () => {
    timeTicket && clearInterval(timeTicket)
  })
  dom.addEventListener('mouseout', () => {
    timeTicket && clearInterval(timeTicket)
    timeTicket = setInterval(circleHandler, time)
  })
  function clearLoop() {
    timeTicket && clearInterval(timeTicket)
    timeTicket = null
  }
  return {
    clearLoop,
  }
}
/**
 * echarts tooltip  自动轮播， 饼图自动轮播
 */
tools.autoHoverPie = (option: any, myChart: any, showTip: boolean = true) => {
  let timeTicket: any = null
  if (!myChart) {
    return
  }
  let currentIndex = -1 // 当前高亮图形在饼图数据中的下标
  // 取消所有高亮并高亮当前图形
  const highlightPie = () => {
    // 遍历饼图数据，取消所有图形的高亮效果
    for (var idx in option.series[0].data) {
      myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: idx,
      })
    }
    // 高亮当前图形
    myChart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: currentIndex,
    })
    if (showTip) {
      myChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: currentIndex,
      })
    }
  }
  // 高亮效果切换到下一个图形
  const selectPie = () => {
    var dataLen = option.series[0].data.length
    currentIndex = (currentIndex + 1) % dataLen
    highlightPie()
  }
  timeTicket = setInterval(selectPie, 2000) // 设置自动切换高亮图形的定时器

  // 用户鼠标悬浮到某一图形时，停止自动切换并高亮鼠标悬浮的图形
  myChart.on('mouseover', (params) => {
    clearInterval(timeTicket)
    currentIndex = params.dataIndex
    highlightPie()
  })

  // 用户鼠标移出时，重新开始自动切换
  myChart.on('mouseout', (params) => {
    if (timeTicket) {
      clearInterval(timeTicket)
    }
    timeTicket = setInterval(selectPie, 1000)
  })
  function clearLoop() {
    timeTicket && clearInterval(timeTicket)
    timeTicket = null
  }
  return {
    clearLoop,
  }
}

export default tools
