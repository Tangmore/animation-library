<template>
  <div class="w-full tab-content  ">
    <div class="label" v-for="(item, index) in tabList" :key="index" :class="{
      'label-active': index + 1 == tabActiveIndex
    }" @click="handleClick(index + 1)">
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emits = defineEmits(['changeTab'])
// tab切换
const tabActiveIndex = ref(1)
const tabList = [{ name: 'KPI指标' }, { name: '阵地' }]
const handleClick = (index: number) => {
  tabActiveIndex.value = index
  emits('changeTab', tabActiveIndex.value)
} 
</script>

<style lang="scss" scoped>
.tab-content {
  position: absolute;
  right: 15px;
  top: 15px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;

  .label {
    width: 100px;
    padding: 3px;
    text-align: center;
    border: 1px solid rgba(0, 117, 255, 0.27);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    span {
      font-family: SourceHanSansCN, SourceHanSansCN;
      font-size: 14px;
      line-height: 22px;
      font-weight: 500;
      color: #5a5757;
      line-height: 22px;
    }
  }

  .label-active {
    box-shadow: 0px 0px 2px 1px rgba(0, 117, 255, 0.27), inset 0px 0px 3px 2px rgba(64, 151, 255, 1);

    span {
      font-family: AlibabaPuHuiTiM;
      font-size: 16px;
      line-height: 22px;
      text-align: left;
      font-style: normal;
      background: linear-gradient(180deg, #14abff 0%, #fff 100%);
      color: transparent;
      -webkit-background-clip: text;
      background-clip: text;
    }
  }
}
</style>
