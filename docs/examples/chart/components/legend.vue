<template>
  <!--图例 -->
  <template v-if="tabActiveIndex == 1">
    <!-- KPI关键绩效指标管理 -->
    <div class="danger-level ">
      <div class="title"> 风险等级 </div>
      <div class="level-list">
        <div class="level-list-item" v-for="(item, index ) in colorArr" :key="index">
          <span class="dot" :style="{ backgroundColor: item.color }"></span>
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { mapOption } from './common.js'
const { colorList1 } = mapOption
const props = defineProps({
  index: {
    type: Number,
    default: 1
  }
})
// tab切换
const tabActiveIndex = ref(1)
watch(() => props.index, () => {
  tabActiveIndex.value = props.index
},
  { deep: true, immediate: true })

const colorArr = computed(() => {
  let arr = []
  for (let key in colorList1) {
    arr.push({
      name: key,
      color: colorList1[key]
    })
  }
  return arr
}) 
</script>
<style lang="scss" scoped>
.title {
  font-family: SourceHanSansCN, SourceHanSansCN;
  font-weight: bold;
  font-size: 18px;
  color: #5a5757;
  line-height: 27px;
  margin-bottom: 12px;
}

.danger-level {
  position: absolute;
  bottom: 10px;
  left: 20px;

  .level-list-item {
    display: flex;
    margin-bottom: 8px;
    align-items: center;
  }

  .dot {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 6px;
  }

  span {
    font-family: SourceHanSansCN, SourceHanSansCN;
    font-weight: 400;
    font-size: 14px;
    color: #5a5757;
    line-height: 21px;
  }
}
</style>