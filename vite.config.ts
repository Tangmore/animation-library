import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import cesium from 'vite-plugin-cesium' // 引入插件
// *********************************** 路径配置新增 start
import { resolve } from 'path'
const pathResolve = (dir: string): any => {
  return resolve(__dirname, '.', dir)
}
const alias: Record<string, string> = {
  '@': pathResolve('src'),
  '@/views': pathResolve('src/views'),
  '@/components': pathResolve('src/components'),
  '@/styles': pathResolve('src/styles'),
  '@/assets': pathResolve('src/assets'),
  '@/utils': pathResolve('src/utils'),
}
// ********************************** 路径配置新增  end
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    cesium(),
    AutoImport({
      // ****************** 按需导入
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  // 配置前端服务地址和端口
  server: {
    port: 8991,
    // 设置反向代理，跨域
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    host: '0.0.0.0',
    open: false,
    cors: true,
    https: false,
    proxy: {
      '/api': {
        // 后台地址
        target: 'http://127.0.0.1:8990/',
        changeOrigin: true,
        rewrite: (path) => path.replace('^/api', '/'),
      },
      '/api2': {
        // 后台地址
        target: 'http://127.0.0.1:8956/',
        changeOrigin: true,
        rewrite: (path) => path.replace('^/api2', ''),
      },
      '/geoserver': {
        target: 'http://127.0.0.1:8990/',
        changeOrigin: true,
        rewrite: (path) => path.replace('^/geoserver', ''),
      },
    },
  },

  resolve: {
    // ****************** 路径配置新增
    alias, // ****************** 路径配置新增
  }, // ****************** 路径配置新增
})
