export const areaGdCode = {
  146: 500109, //北碚区
  147: 500117, //合川区
  148: 500105, //江北区
  149: 500110, //綦江区
  150: 500235, //云阳县
  151: 500112, //渝北区
  152: 500151, //铜梁区
  153: 500119, //南川区
  154: 500120, //璧山区
  155: 500152, //潼南区
  156: 500101, //万州区
  157: 500107, //九龙坡区
  158: 500118, //永川区
  159: 500233, //忠县
  160: 500236, //奉节县
  161: 500113, //巴南区
  162: 500108, //南岸区
  163: 500106, //沙坪坝区
  164: 500243, //彭水苗族土家族自治县
  165: 500229, //城口县
  166: 500102, //涪陵区
  167: 500230, //丰都县
  168: 500115, //长寿区
  169: 500153, //荣昌区
  170: 500154, //开州区
  171: 500103, //渝中区
  172: 500111, //大足区
  173: 500114, //黔江区
  174: 500242, //酉阳土家族苗族自治县
  175: 500238, //巫溪县
  176: 500116, //江津区
  177: 500241, //秀山土家族苗族自治县
  // 178: ', //万盛区
  179: 500237, //巫山县
  180: 500155, //梁平区
  181: 500156, //武隆县
  182: 500240, //石柱土家族自治县
  183: 500231, //垫江县
  184: 500104, //大渡口区
}

// map3d地图
const mapName = 'mapName'
export const mapOption = {
  colorList1: {
    重大风险: '#E04A00',
    较大风险: '#032995',
    一般风险: '#135E4C',
    低风险: '#0BA56D',
    无风险: '#10AF4B',
  },
  colorList2: ['#10F012', '#089FF1', '#FEFF00', '#F59E24', '#F35E5E'],
  mapName,
  legend: {
    show: false,
    orient: 'vertical',
    bottom: 10,
    left: 20,
    itemWidth: 12,
    itemHeight: 12,
    zlevel: 2,
    textStyle: {
      color: '#5a5757',
      fontSize: 14,
      lineHeight: 21,
      fontFamily: 'SourceHanSansCN',
    },
  },
  geo3D: {
    show: false,
    map: mapName,
    roam: true,
    top: 'top',
    bottom: 0,
    regionHeight: 3,
    boxDepth: 110,
    shading: 'lambert',
    viewControl: {
      projection: 'perspective', //'orthographic',
      autoRotate: false,
      damping: 0,
      rotateSensitivity: 2, //旋转操作的灵敏度
      rotateMouseButton: 'left', //旋转操作使用的鼠标按键
      zoomSensitivity: 2, //缩放操作的灵敏度
      panSensitivity: 2, //平移操作的灵敏度
      panMouseButton: 'right', //平移操作使用的鼠标按键
      beta: 4,
      distance: 110, //默认视角距离主体的距离
      minAlpha: 20, // 上下旋转的最小 alpha 值。即视角能旋转到达最上面的角度。[ default: 5 ]
      center: [-2, -20, 0],
      animation: true,
      animationDurationUpdate: 1000,
      animationEasingUpdate: 'cubicInOut',
    },
  },
  mapSeries: {
    type: 'map3D',
    name: '',
    geo3DIndex: 0,
    map: mapName,
    show: true,
    roam: true,
    top: 'top',
    bottom: 0,
    regionHeight: 2.8,
    boxDepth: 110,
    zlevel: 1,
    emphasis: {
      label: {
        fontSize: 12,
        color: '#fff',
      },
      itemStyle: {
        color: '#188a8a',
      },
    },
    itemStyle: {
      color: '#034a60',
      borderColor: 'rgba(102, 178, 222,0.8)',
      borderWidth: 2,
      // opacity: 0.8
    },
    label: {
      show: false,
      color: '#fff',
      fontSize: 14,
      distance: 0,
    },
    shading: 'lambert',
    viewControl: {
      projection: 'perspective', //'orthographic',
      autoRotate: false,
      damping: 0,
      rotateSensitivity: 2, //旋转操作的灵敏度
      rotateMouseButton: 'left', //旋转操作使用的鼠标按键
      zoomSensitivity: 2, //缩放操作的灵敏度
      panSensitivity: 2, //平移操作的灵敏度
      panMouseButton: 'right', //平移操作使用的鼠标按键
      beta: 4,
      distance: 110, //默认视角距离主体的距离
      minAlpha: 20, // 上下旋转的最小 alpha 值。即视角能旋转到达最上面的角度。[ default: 5 ]
      center: [-2, -20, 0],
      animation: true,
      animationDurationUpdate: 1000,
      animationEasingUpdate: 'cubicInOut',
    },
    //此处放地图数据
    data: [],
  },
}

/**
 * @param arrList 要计算数据的数组
 * @param index 要计算数组中值的下表
 * @param precision 百分比保留几位小数，默认保留2位小数
 * @returns
 */
export const getPercentValue = (arrList, index, precision) => {
  // 判断是否为空
  if (!arrList[index]) {
    return 0
  }
  if (!precision) precision = 2
  // 求和
  const sum = arrList.reduce(function (acc, val) {
    return acc + (isNaN(val) ? 0 : val)
  }, 0)
  if (sum === 0) {
    return 0
  }
  // 10的2次幂是100，用于计算精度。
  const digits = Math.pow(10, precision)
  // 扩大比例100，
  const votesPerQuota = arrList.map(function (val) {
    return ((isNaN(val) ? 0 : val) / sum) * digits * 100
  })
  // 总数，扩大比例意味的总数要扩大
  const targetSeats = digits * 100
  // 再向下取值，组成数组
  const seats = votesPerQuota.map(function (votes) {
    return Math.floor(votes)
  })
  // 再新计算合计，用于判断与总数量是否相同，相同则占比会100%
  let currentSum = seats.reduce(function (acc, val) {
    return acc + val
  }, 0)
  // 余数部分的数组：原先数组减去向下取值的数组，得到余数部分的数组
  const remainder = votesPerQuota.map(function (votes, index) {
    return votes - seats[index]
  })
  // 给最大最大的余额加1，凑个占比100%；
  while (currentSum < targetSeats) {
    //  找到下一个最大的余额，给其加1
    let max = Number.NEGATIVE_INFINITY
    let maxId = null
    for (let i = 0, len = remainder.length; i < len; ++i) {
      if (remainder[i] > max) {
        max = remainder[i]
        maxId = i
      }
    }
    // 对最大项余额加1
    ++seats[maxId]
    // 已经增加最大余数加1，则下次判断就可以不需要再判断这个余额数。
    remainder[maxId] = 0
    // 总的也要加1，为了判断是否总数是否相同，跳出循环。
    ++currentSum
  }
  // 这时候的seats就会总数占比会100%
  return seats[index] / digits
}

/*将100000转为100,000形式*/
export const formateNumber = (data) => {
  if (data === 0) return '0'
  if (isNaN(data)) return '0'
  if (!data) return ''
  if (data && data != null) {
    data = String(data)
    const left = data.split('.')[0]
    let right = data.split('.')[1]
    right = right
      ? right.length >= 2
        ? '.' + right.substr(0, 2)
        : '.' + right + '0'
      : ''
    const temp = left
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
