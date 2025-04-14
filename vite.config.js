import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// elementPlus按需导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


// https://vite.dev/config/
export default defineConfig({
  base: '/vue-xiaotuxian/', // 设置为你的仓库名
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      imports:['vue'],
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [
        // 1. 配置elementPlus采用sass样式配色系统
        ElementPlusResolver({ importStyle: "sass" }),
      ],
    }),
  ],
  resolve: {
    // 实际的路径转化  @  ->  src
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 2. 自动导入定制化样式文件进行样式覆盖
        additionalData: `
          @use "@/styles/element/index.scss" as *;
          @use "@/styles/var.scss" as *;
        `,
      }
    }
  },
  server: {
    proxy: {
      '/api': {  // 将所有以 /api 开头的请求代理到目标服务器
        target: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
        changeOrigin: true,  // 必须设置为 true 以允许跨域请求
        rewrite: (path) => path.replace(/^\/api/, '') // 可选：重写路径，移除/api 前缀
      }
    }
  }
})
