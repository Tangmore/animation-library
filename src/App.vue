<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { getCurrentInstance, onBeforeMount } from 'vue'

//中文包
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
let locale = zhCn
</script>