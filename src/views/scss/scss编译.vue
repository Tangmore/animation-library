<template>
    <div class="container">
        <span v-for="(item, index) in dataList" :key="index" :class="[{ ['item' + index]: index < 3 }, 'item']">{{
            item.name
        }}</span>
    </div>
</template>
<script setup>
import { reactive, ref, onMounted } from 'vue'
const props = defineProps({})
const state = reactive({})
const dataList = ref([
    { name: '1' },
    { name: '2' },
    { name: '3' },
    { name: '4' },
])
const colors = ref({
    'color-scheme': 'light',
    '--el-header-bg-color': '#020C40',//头部背景颜色
    '--el-header-tagsname-color': '#333333',//面包屑右键提示文字颜色
    '--el-content-bg-color': '#EBEFF7',//内容背景颜色
})
onMounted(() => {
    Object.keys(colors.value).map(item => {
        document.documentElement.style.setProperty(item, colors.value[item])
    })
})
defineExpose({})
</script>
<style lang="scss">
html:root {
    // --text-color: #f00;
}
</style>
<style scoped lang="scss">
// @import './1.scss';

.item {
    color: var(--text-color, #fcc);
}

$top: top;
$color: rgb(17, 0, 255);

// #{} 插值语句，作用类似es6的字符串模板
.item1 {
    padding-#{$top}: 89px;
    color: #{$color};
}
.item2{
    // @extend .item1;
}

@mixin base($top:0px,$left:0px){
    position: absolute;
    top: $top;
    left: $left;
}
.item1{
    @include base(10px,20px);
}
.item2{
    @include base($left:190px);
}
</style>