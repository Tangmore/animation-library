import { EchartsPieDataItemType } from '@/types'

// 数据转为xAxis， yAxis;传入reverse为true，返回数据为xAxis为数据
const transformEchartsData = (data: any, reverse?: boolean) => {
  if (!data || !data.length)
    return {
      xAxis: [],
      yAxis: [],
    }
  const xAxis: string[] = []
  const yAxis: number[] = []
  data.forEach((item: EchartsPieDataItemType) => {
    xAxis.push(item.name)
    yAxis.push(item.value)
  })
  return {
    xAxis: reverse ? yAxis : xAxis,
    yAxis: reverse ? xAxis : yAxis,
  }
}
// 转化数据
const transformObjectToArray = (data: any) => {
  // 分离键和值到两个数组
  const keys: string[] = Object.keys(data)
  const values: number[] = Object.values(data)

  // 根据值进行降序排列
  const sortedIndices = values
    .map((_, i) => i)
    .sort((a, b) => values[b] - values[a])

  // 根据排序索引重新组织键和值数组
  const x = sortedIndices.map((i) => keys[i])
  const y = sortedIndices.map((i) => values[i])
  const objArr: any[] = y.map((item, index) => ({
    name: x[index],
    value: item,
    val: item,
    max: parseInt(y[0] * 1.3 + ''),
  }))
  return {
    x,
    y,
    objArr,
  }
}

/**
 * 参数处理
 * @param {*} params  参数
 */
const tansParams = (params: any) => {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    var part = encodeURIComponent(propName) + '='
    if (value !== null && value !== '' && typeof value !== 'undefined') {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (
            value[key] !== null &&
            value[key] !== '' &&
            typeof value[key] !== 'undefined'
          ) {
            let params = propName + '[' + key + ']'
            var subPart = encodeURIComponent(params) + '='
            result += subPart + encodeURIComponent(value[key]) + '&'
          }
        }
      } else {
        result += part + encodeURIComponent(value) + '&'
      }
    }
  }
  return result
}

/*将100000转为100,000形式*/
const formateNumber = (data: any) => {
  if (data === 0) return '0'
  if (!data) return ''
  if (data && data != null) {
    data = String(data)
    let left = data.split('.')[0],
      right = data.split('.')[1]
    right = right
      ? right.length >= 2
        ? '.' + right.substr(0, 2)
        : '.' + right + '0'
      : ''
    let temp = left
      .split('')
      .reverse()
      .join('')
      .match(/(\d{1,3})/g)
    return (
      (Number(data) < 0 ? '-' : '') +
      temp.join(',').split('').reverse().join('') +
      right
    )
  }
}

export {
  transformEchartsData,
  transformObjectToArray,
  tansParams,
  formateNumber,
}
