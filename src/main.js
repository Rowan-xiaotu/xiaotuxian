// 引入初始化样式文件
import './styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


const app = createApp(App)

// 引入懒加载指令插件并且注册
import { lazyPlugin } from './directives'

app.use(createPinia())
app.use(router)
app.use(lazyPlugin)


app.mount('#app')


