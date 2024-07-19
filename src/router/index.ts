import { createRouter, createWebHistory } from 'vue-router'
/**
 * 动态加载路由配置文件
 * moduleFiles是一个函数，那么可以接受一个参数（string：文件的相对路径），
 * 调用其从而获取到对应路径下的模块的导出对象导出的对象中有一个属性：default，可以获取到默认导出的所有内容
 */
let routes: any[] = []
let moduleFiles: Record<
  string,
  {
    [key: string]: any
  }
> = import.meta.glob('./modules/*.ts', { eager: true })

Object.keys(moduleFiles).map((ele: any) => {
  const value = moduleFiles[ele].default || {}
  // 判断导出的是不是数组，是则进行拓展解构
  if (Array.isArray(value)) routes.push(...value)
  else routes.push(value)
})
console.log({ routes })

// 创建路由实例
const router = createRouter({
  history: createWebHistory(), // createWebHashHistory URL带#，createWebHistory URL不带#
  strict: true,
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router
