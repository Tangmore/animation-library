<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { getCurrentInstance, onBeforeMount } from 'vue'

//中文包
import zhCn from 'element-plus/es/locale/lang/zh-cn'
let locale = zhCn
</script>